import React, { useState, useEffect } from "react";
import { MessageSquare, Heart, Send, Image as ImageIcon, Trash2, Award, Loader2, Sparkles, X } from "lucide-react";
import { auth, db, handleFirestoreError, OperationType, logGoogleAnalyticsEvent } from "../../lib/firebase";
import { isStorageAvailable, uploadImage } from "../../lib/storageService";
import { collection, query, orderBy, where, onSnapshot, setDoc, doc, updateDoc, deleteDoc, serverTimestamp, increment, addDoc, limit } from "firebase/firestore";

interface CommunityPost {
  id: string;
  postId: string;
  userId?: string;
  displayName?: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  title: string;
  content: string;
  trainRoute: string;
  likesCount: number;
  commentsCount: number;
  imageUrls?: string[];
  createdAt: any;
}

interface CommunityViewProps {
  lang: "vi" | "en";
  user: {
    uid: string;
    email: string;
    displayName: string;
    isPremium: boolean;
    role: "member" | "admin";
  } | null;
}

// Memoized Comment Item Component to optimize rendering performance
const CommentItem = React.memo(function CommentItem({
  comment,
  lang,
}: {
  comment: any;
  lang: "vi" | "en";
}) {
  return (
    <div id={`comment-item-${comment.id}`} className="text-xs bg-white rounded-xl p-2.5 border border-slate-150 space-y-1 shadow-2xs">
      <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-0.5">
        <span className="text-[#01411C] font-extrabold">{comment.displayName || comment.authorName}</span>
        <span>
          {(() => {
            try {
              const d = comment.createdAt instanceof Date ? comment.createdAt : new Date(comment.createdAt);
              return d.toLocaleTimeString(lang === "vi" ? "vi-VN" : "en-US", { hour: "2-digit", minute: "2-digit" });
            } catch (e) {
              return "";
            }
          })()}
        </span>
      </div>
      <p className="text-slate-600 leading-normal font-sans">{comment.content}</p>
    </div>
  );
});

// Subcomponent to fetch and render post comments in real-time
function PostCommentsSection({ 
  postId, 
  user, 
  lang,
  onCommentAdded,
  onCommentRollback
}: { 
  postId: string; 
  user: any; 
  lang: "vi" | "en";
  onCommentAdded?: () => void;
  onCommentRollback?: () => void;
}) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);
  const [comments, setComments] = useState<any[]>([]);
  const [optimisticComments, setOptimisticComments] = useState<any[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  // Single subscription to comments for this postId, memoized, absolutely no redundant dependencies
  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            commentId: data.commentId || docSnap.id,
            postId: data.postId,
            userId: data.userId || data.authorId || "",
            displayName: data.displayName || data.authorName || "An Explorer",
            content: data.content || "",
            createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt)) : new Date(),
          });
        });
        // Sort comments by createdAt in memory ascending to prevent composite index requirements in Firestore
        list.sort((a, b) => {
          const timeA = a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime();
          const timeB = b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime();
          return timeA - timeB;
        });
        setComments(list);
        setLoading(false);
      },
      (error) => {
        console.error("Comments subscription failed:", error);
        try {
          handleFirestoreError(error, OperationType.LIST, "comments");
        } catch (err) {}
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const trimmedText = newCommentText.trim();
    const getRandomId = () => {
      try {
        if (typeof window !== "undefined" && window.crypto && typeof window.crypto.randomUUID === "function") {
          return window.crypto.randomUUID();
        }
      } catch (e) {}
      return Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 10);
    };
    const tempCommentId = `comment-optimistic-${getRandomId()}`;
    const authorDisplayName = user?.displayName || user?.email.split("@")[0] || "Lữ khách";

    const optimisticComment = {
      id: tempCommentId,
      commentId: tempCommentId,
      postId,
      userId: uid,
      authorId: uid,
      displayName: authorDisplayName,
      authorName: authorDisplayName,
      content: trimmedText,
      createdAt: new Date()
    };

    // Optimistically push to local visual list and trigger parent index increments
    setOptimisticComments((prev) => [...prev, optimisticComment]);
    onCommentAdded?.();
    setNewCommentText("");

    const commentPayload = {
      commentId: tempCommentId,
      postId,
      userId: uid,
      authorId: uid, // compatibility
      displayName: authorDisplayName,
      authorName: authorDisplayName, // compatibility
      content: trimmedText,
      createdAt: serverTimestamp(),
    };

    console.log("COMMENT CREATE", commentPayload);

    try {
      await setDoc(doc(db, "comments", tempCommentId), commentPayload);

      // Safe update or create for the parent post document
      const postDocRef = doc(db, "posts", postId);
      try {
        await updateDoc(postDocRef, {
          commentsCount: increment(1),
          updatedAt: serverTimestamp(),
        });
      } catch (updateErr: any) {
        if (updateErr && (updateErr.code === "not-found" || String(updateErr).includes("not-found"))) {
          console.log("Post doc not found on update, checking if fallback post for on-demand creation:", postId);
          const fbPosts = getFallbackPosts();
          const matchedFb = fbPosts.find((f) => f.id === postId);
          if (matchedFb) {
            await setDoc(postDocRef, {
              postId: matchedFb.id,
              userId: uid, // current user as author to pass security rules
              displayName: matchedFb.authorName,
              authorId: uid,
              authorName: matchedFb.authorName,
              authorRole: matchedFb.authorRole,
              title: matchedFb.title,
              content: matchedFb.content,
              trainRoute: matchedFb.trainRoute,
              imageUrls: matchedFb.imageUrls,
              likesCount: matchedFb.likesCount,
              commentsCount: matchedFb.commentsCount + 1,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }
        } else {
          throw updateErr;
        }
      }

      logGoogleAnalyticsEvent("create_comment", {
        postId,
        userId: uid,
      });

    } catch (err) {
      console.error("Firebase comment write failed:", err);
      try {
        handleFirestoreError(err, OperationType.WRITE, `comments/${tempCommentId}`);
      } catch (e) {}
      setOptimisticComments((prev) => prev.filter((c) => c.commentId !== tempCommentId));
      onCommentRollback?.();
    }
  };

  // Combine real comments stream and pending optimistic comments safely checking duplicates
  const sequentialComments = [
    ...comments,
    ...optimisticComments.filter((opt) => !comments.some((real) => real.content === opt.content || real.commentId === opt.commentId))
  ];

  return (
    <div id={`comments-section-${postId}`} className="bg-slate-50/70 border-t border-slate-100 p-4 -mx-5 -mb-5 mt-3 space-y-3">
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {loading ? (
          <p className="text-[10px] text-slate-450">{t("Đang tải bình luận...", "Loading comments...")}</p>
        ) : sequentialComments.length > 0 ? (
          sequentialComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} lang={lang} />
          ))
        ) : (
          <p className="text-[10px] text-slate-400 py-1 text-center">{t("Chưa có bình luận nào. Hãy là người đầu tiên đặt gạch!", "No comments yet. Be the first to express thoughts!")}</p>
        )}
      </div>

      {user ? (
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            id={`comment-input-${postId}`}
            type="text"
            placeholder={t("Nhập bình luận...", "Write a comment...")}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-[#01411C]"
            style={{ ringColor: "#01411C" }}
          />
          <button
            id={`submit-comment-button-${postId}`}
            type="submit"
            className="bg-[#01411C] hover:bg-green-800 text-white font-extrabold px-4 py-2 rounded-xl cursor-pointer text-xs transition-colors shrink-0"
          >
            {t("Gửi", "Send")}
          </button>
        </form>
      ) : (
        <p className="text-[10px] text-orange-850 font-mono bg-orange-50 border border-orange-100 p-2 rounded-lg text-center">
          ⚠️ {t("Vui lòng Chuyển sang 'Trang cá nhân' Đăng Nhập để gửi bình luận.", "Please switch to the 'Profile' tab and log in to share comments.")}
        </p>
      )}
    </div>
  );
}

const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error(`Tệp ảnh "${file.name}" vượt quá giới hạn 5MB. / Image exceeds the 5MB size limit.`));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const max_size = 1200;
        if (width > height) {
          if (width > max_size) {
            height = Math.round((height * max_size) / width);
            width = max_size;
          }
        } else {
          if (height > max_size) {
            width = Math.round((width * max_size) / height);
            height = max_size;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Cannot get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Compression failed - blob is null"));
            }
          },
          "image/jpeg",
          0.7
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const getFallbackPosts = (): CommunityPost[] => [
  {
    id: "post-fallback-1",
    postId: "post-fallback-1",
    authorId: "sys-001",
    authorName: "Vũ Nam",
    authorRole: "conductor",
    title: "Kinh nghiệm chụp ảnh đèo Hải Vân từ toa tàu hỏa di sản HD1",
    content: "Hành trình tàu nối di sản Huế - Đà Nẵng cực kỳ hot! Để chụp được bức ảnh toa tàu uốn lượn ôm sát vách đá đèo Hải Vân nhìn thẳng ra vịnh Lăng Cô, các bạn nhớ chọn đặt ghế bên phía tay TRÁI (nếu đi chiều Huế -> Đà Nẵng) và đón ánh sáng rực rỡ nhất vào khung giờ khởi hành 14h chiều.",
    trainRoute: "Huế - Đà Nẵng (HD1)",
    likesCount: 142,
    commentsCount: 2,
    imageUrls: ["https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=800&q=80"],
    createdAt: null
  },
  {
    id: "post-fallback-2",
    postId: "post-fallback-2",
    authorId: "sys-002",
    authorName: "Sarah Jenkins",
    authorRole: "backpacker",
    title: "Trải nghiệm ấm cúng trên khoang tàu SE19 đêm Hà Nội đi Đà Nẵng",
    content: "Đúng như review trên TikTok, khoang giường nằm chất lượng cao SE19 cực kỳ sạch sẽ, có wifi riêng và nước sạch miễn phí. Tiếng xình xịch của bánh xích đưa bạn vào giấc ngủ êm ái, sáng thức dậy mở mắt ra đã thấy biển xanh Quy Nhơn và núi non trùng điệp.",
    trainRoute: "Hà Nội - Đà Nẵng",
    likesCount: 95,
    commentsCount: 1,
    imageUrls: ["https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80"],
    createdAt: null
  }
];

// Global cache for image URLs to prevent unnecessary refetches and flickering
const imageCache = new Set<string>();

const CachedImage = React.memo(function CachedImage({
  src,
  alt,
  className
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(imageCache.has(src));

  useEffect(() => {
    if (loaded) return;
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      imageCache.add(src);
      setLoaded(true);
    };
  }, [src, loaded]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-50">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
          <Loader2 className="w-4 h-4 text-slate-350 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className || ""}`}
      />
    </div>
  );
});

// Memoized Post Card Component to optimize rendering performance
const PostCardItem = React.memo(function PostCardItem({
  post,
  hasLiked,
  isExpanded,
  lang,
  user,
  onLike,
  onToggleComments,
  onCommentAdded,
  onCommentRollback,
  uploadTasks
}: {
  post: CommunityPost;
  hasLiked: boolean;
  isExpanded: boolean;
  lang: "vi" | "en";
  user: any;
  onLike: (postId: string, currentLikesCount: number) => void;
  onToggleComments: (postId: string) => void;
  onCommentAdded: (postId: string) => void;
  onCommentRollback: (postId: string) => void;
  uploadTasks: Record<string, { status: "uploading" | "success" | "timeout" | "failed"; title: string }>;
}) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  // Split post list and post detail listener: maintain a local real-time listener for the individual post's fields (likes and comments counts)
  const [detailPost, setDetailPost] = useState<CommunityPost>(post);

  useEffect(() => {
    setDetailPost(post);
  }, [post]);

  useEffect(() => {
    if (post.id.startsWith("optimistic-") || post.id.startsWith("post-fallback-")) {
      return;
    }
    const unsubscribe = onSnapshot(
      doc(db, "posts", post.id),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDetailPost((prev) => ({
            ...prev,
            likesCount: Number(data.likesCount ?? prev.likesCount),
            commentsCount: Number(data.commentsCount ?? prev.commentsCount),
            title: data.title || prev.title,
            content: data.content || prev.content,
            imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : prev.imageUrls,
          }));
        }
      },
      (error) => {
        console.error("Split post detail listener subscription error:", error);
      }
    );
    return () => unsubscribe();
  }, [post.id]);

  const getPostTitle = (p: CommunityPost) => {
    if (p.id === "post-fallback-1") {
      return t("Kinh nghiệm chụp ảnh đèo Hải Vân từ toa tàu hỏa di sản HD1", "Photo tips for Hai Van Pass from the HD1 Heritage Train");
    }
    if (p.id === "post-fallback-2") {
      return t("Trải nghiệm ấm cúng trên khoang tàu SE19 đêm Hà Nội đi Đà Nẵng", "Cozy night on the SE19 Sleeper from Hanoi to Da Nang");
    }
    return p.title;
  };

  const getPostContent = (p: CommunityPost) => {
    if (p.id === "post-fallback-1") {
      return t("Hành trình tàu nối di sản Huế - Đà Nẵng cực kỳ hot! Để chụp được bức ảnh toa tàu uốn lượn ôm sát vách đá đèo Hải Vân nhìn thẳng ra vịnh Lăng Cô, các bạn nhớ chọn đặt ghế bên phía tay TRÁI (nếu đi chiều Huế -> Đà Nẵng) và đón ánh sáng rực rỡ nhất vào khung giờ khởi hành 14h chiều.", "The Hue - Da Nang connector is phenomenal. For the best curves hugging the cliffside of Hai Van Pass look out of the LEFT window (Hue -> Da Nang direction) and aim for the 2:00 PM departure for optimal golden lighting!");
    }
    if (p.id === "post-fallback-2") {
      return t("Đúng như review trên TikTok, khoang giường nằm chất lượng cao SE19 cực kỳ sạch sẽ, có wifi riêng và nước sạch miễn phí. Tiếng xình xịch của bánh xích đưa bạn vào giấc ngủ êm ái, sáng thức dậy mở mắt ra đã thấy biển xanh Quy Nhơn và núi non trùng điệp.", "Exactly as seen on TikTok! The quality sleeper compartment on SE19 is extremely clean with stable power outlets and fresh bottled water. The gentle chugging sounds sang me to sleep and waking up to the blue ocean was unforgettable!");
    }
    return p.content;
  };

  const getPostRole = (p: CommunityPost) => {
    const roleStr = String(p.authorRole).toLowerCase();
    if (p.authorId === "sys-001" || roleStr === "conductor") {
      return t("Đường sắt viên", "Senior Conductor");
    }
    if (p.authorId === "sys-002" || roleStr === "backpacker") {
      return t("Lữ khách quốc tế", "Global Backpacker");
    }
    if (roleStr === "admin") {
      return t("Quản Trị Viên", "Admin Staff");
    }
    return p.authorRole || t("Hội Viên Thân Thiết", "VNR Core Member");
  };

  const renderStamp = (createdAt: any, isOptimistic?: boolean) => {
    if (isOptimistic) return t("Đang tải & tạo bài viết...", "Publishing post...");
    if (!createdAt) return t("Ghim", "Pinned");
    try {
      const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
      return date.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return t("Vừa xong", "Just now");
    }
  };

  return (
    <div id={`post-card-${detailPost.id}`} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 relative overflow-hidden hover:border-[#01411C]/30 transition-colors">
      
      {/* Post author and route banner */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-extrabold text-xs text-slate-900">{detailPost.authorName}</span>
            <span className="bg-emerald-50 text-[#01411C] border border-emerald-150 px-1.5 py-0.2 rounded text-[8px] font-black uppercase font-mono flex items-center gap-0.5">
              <Award className="w-2.5 h-2.5" /> {getPostRole(detailPost)}
            </span>
          </div>
          <span className="text-[10px] text-slate-405 block mt-0.5 font-mono">
            {renderStamp(detailPost.createdAt, (detailPost as any).isOptimistic)}
          </span>
        </div>

        <span className="text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-150 px-2.5 py-1 rounded-full uppercase shrink-0 font-mono">
          🛤️ {detailPost.trainRoute}
        </span>
      </div>

      {/* Title and content */}
      <div className="space-y-2">
        <h4 className="font-extrabold text-sm text-slate-950 leading-snug">{getPostTitle(detailPost)}</h4>
        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
          {getPostContent(detailPost)}
        </p>

        {/* Render Uploaded Image gallery with caching and preloading support */}
        {detailPost.imageUrls && detailPost.imageUrls.length > 0 ? (
          <div className={`grid gap-2 mt-3 overflow-hidden rounded-xl ${
            detailPost.imageUrls.length === 1 
              ? "grid-cols-1" 
              : detailPost.imageUrls.length === 2 
                ? "grid-cols-2" 
                : "grid-cols-3"
          }`}>
            {detailPost.imageUrls.map((url, i) => (
              <div key={i} className="aspect-video relative bg-slate-50 border border-slate-100 overflow-hidden rounded-lg">
                <CachedImage
                  src={url}
                  alt={`${getPostTitle(detailPost)} - Attachment ${i + 1}`}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          uploadTasks[detailPost.id] && (uploadTasks[detailPost.id].status === "uploading" || uploadTasks[detailPost.id].status === "timeout") && (
            <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-4 text-center space-y-1.5 mt-2 animate-pulse">
              <div className="flex items-center justify-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase font-mono tracking-wide">
                <Loader2 className="w-3.5 h-3.5 text-[#01411C] animate-spin" />
                <span>
                  {uploadTasks[detailPost.id].status === "timeout" 
                    ? t("Tải nền dài hẵn (>10s)...", "Background upload running longer (>10s)...")
                    : t("Đang tải ảnh lên (Uploading images...)", "Uploading images...")}
                </span>
              </div>
            </div>
          )
        )}
      </div>

      {/* Like / comments interactive panel */}
      <div className="border-t border-slate-100 pt-3 flex gap-4 text-xs font-bold">
        <button
          id={`like-btn-${detailPost.id}`}
          disabled={(detailPost as any).isOptimistic}
          onClick={() => onLike(detailPost.id, detailPost.likesCount)}
          className={`flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-xl border select-none ${
            (detailPost as any).isOptimistic
              ? "text-slate-300 bg-slate-50 border-slate-100 cursor-not-allowed opacity-60"
              : hasLiked 
                ? "text-rose-600 bg-rose-50 border-rose-100 cursor-pointer" 
                : "text-slate-450 hover:text-rose-600 hover:bg-rose-50/30 bg-slate-50/50 border-slate-200 cursor-pointer"
          }`}
        >
          <Heart className={`w-4 h-4 ${hasLiked ? "fill-rose-600 text-rose-600 animate-ping-once" : ""}`} />
          <span className="font-mono text-xs">{detailPost.likesCount}</span>
        </button>

        <button
          id={`toggle-comments-btn-${detailPost.id}`}
          disabled={(detailPost as any).isOptimistic}
          onClick={() => onToggleComments(detailPost.id)}
          className={`flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-xl border select-none ${
            (detailPost as any).isOptimistic
              ? "text-slate-300 bg-slate-50 border-slate-100 cursor-not-allowed opacity-60"
              : isExpanded 
                ? "text-green-700 bg-green-50 border-green-150 cursor-pointer" 
                : "text-slate-450 hover:text-[#01411C] hover:bg-green-50/30 bg-slate-50/50 border-slate-200 cursor-pointer"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="font-mono text-xs">{detailPost.commentsCount}</span>
        </button>
      </div>

      {/* Expanded comments box sub-layer using real-time synchronization */}
      {isExpanded && (
        <PostCommentsSection 
          postId={detailPost.postId} 
          user={user} 
          lang={lang} 
          onCommentAdded={() => onCommentAdded(detailPost.id)}
          onCommentRollback={() => onCommentRollback(detailPost.id)}
        />
      )}

    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.hasLiked === nextProps.hasLiked &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.lang === nextProps.lang &&
    prevProps.user?.uid === nextProps.user?.uid &&
    prevProps.uploadTasks === nextProps.uploadTasks &&
    prevProps.post.id === nextProps.post.id &&
    prevProps.post.title === nextProps.post.title &&
    prevProps.post.content === nextProps.post.content &&
    JSON.stringify(prevProps.post.imageUrls) === JSON.stringify(nextProps.post.imageUrls)
  );
});

export default function CommunityView({ lang, user }: CommunityViewProps) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [myLikes, setMyLikes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [limitCount, setLimitCount] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newRoute, setNewRoute] = useState("Huế - Đà Nẵng (HD1)");

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadingPosts, setUploadingPosts] = useState(false);
  const [uploadTasks, setUploadTasks] = useState<Record<string, { status: "uploading" | "success" | "timeout" | "failed"; title: string }>>({});
  const [optimisticPosts, setOptimisticPosts] = useState<CommunityPost[]>([]);

  // Keep references to state values stable for callbacks to prevent re-renders
  const myLikesRef = React.useRef(myLikes);
  React.useEffect(() => {
    myLikesRef.current = myLikes;
  }, [myLikes]);

  const userRef = React.useRef(user);
  React.useEffect(() => {
    userRef.current = user;
  }, [user]);

  // 0. Diagnostic Logs
  useEffect(() => {
    console.log("POSTS COLLECTION");
    console.log("COMMENTS COLLECTION");
    console.log("LIKES COLLECTION");
  }, []);

  const displayedPosts = [
    ...optimisticPosts,
    ...posts.filter((p) => !optimisticPosts.some((opt) => opt.title === p.title && opt.content === p.content))
  ];

  // 1. Single real-time listing feed using onSnapshot from Firestore, limited to limitCount + 1 for pagination
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(limitCount + 1));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docsList: CommunityPost[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          docsList.push({
            id: docSnap.id,
            postId: data.postId || docSnap.id,
            userId: data.userId || data.authorId || "",
            displayName: data.displayName || data.authorName || "Anonymous Explorer",
            authorId: data.userId || data.authorId || "", // compatibility
            authorName: data.displayName || data.authorName || "Anonymous Explorer", // compatibility
            authorRole: data.authorRole || "Member",
            title: data.title || "",
            content: data.content || "",
            trainRoute: data.trainRoute || "Hà Nội - Đà Nẵng",
            likesCount: Number(data.likesCount || 0),
            commentsCount: Number(data.commentsCount || 0),
            imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : [],
            createdAt: data.createdAt,
          });
        });
        
        if (snapshot.empty) {
          console.log("No posts found in database. Setting client-side fallback posts.");
          setPosts(getFallbackPosts());
          setHasMore(false);
        } else {
          if (docsList.length > limitCount) {
            setHasMore(true);
            setPosts(docsList.slice(0, limitCount));
          } else {
            setHasMore(false);
            setPosts(docsList);
          }
        }
        setLoading(false);
      },
      (error) => {
        console.error("Realtime subscription to community posts unsuccessful:", error);
        try {
          handleFirestoreError(error, OperationType.LIST, "posts");
        } catch (err) {}
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [limitCount]); // Re-run whenever pagination limitCount is updated

  // Single reader sync bound to primitive userId updates to prevent nested/duplicated listeners
  useEffect(() => {
    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) {
      setMyLikes({});
      return;
    }
    const q = query(collection(db, "likes"), where("userId", "==", uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const mapping: Record<string, boolean> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.postId) {
            mapping[data.postId] = true;
          }
        });
        setMyLikes(mapping);
      },
      (error) => {
        console.warn("My likes real-time registry sync omitted:", error);
        try {
          handleFirestoreError(error, OperationType.LIST, "likes");
        } catch (err) {}
      }
    );
    return () => unsubscribe();
  }, [user?.uid]);

  // Multiple File Selection Handling
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    
    const validImages = files.filter(f => f.type.startsWith("image/"));
    setSelectedImages([...selectedImages, ...validImages]);

    const urls = validImages.map((f) => URL.createObjectURL(f));
    setPreviewUrls([...previewUrls, ...urls]);
  };

  const removeSelectedImage = (index: number) => {
    const updatedFiles = [...selectedImages];
    updatedFiles.splice(index, 1);
    setSelectedImages(updatedFiles);

    const updatedPreviews = [...previewUrls];
    updatedPreviews.splice(index, 1);
    setPreviewUrls(updatedPreviews);
  };

  // Create post logic with automatic parallel image uploading
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert(t("Vui lòng nhấn sang tab 'Trang cá nhân' để kết nối tài khoản trước khi gửi bài viết!", "Please sign in under the 'Profile' tab to publish posts!"));
      return;
    }

    // 9. Reject images >5MB immediately
    const tooLarge = selectedImages.find(img => img.size > 5 * 1024 * 1024);
    if (tooLarge) {
      alert(t(
        `Hình ảnh "${tooLarge.name}" quá lớn (vượt quá 5MB). Vui lòng chọn ảnh nhỏ hơn!`,
        `Image "${tooLarge.name}" is too large (exceeds 5MB limit). Please select a smaller photo!`
      ));
      return;
    }

    setUploadingPosts(true);
    const imagesToUpload = [...selectedImages];
    const postTitle = newTitle.trim();
    const postContent = newContent.trim();
    const postRoute = newRoute;

    // Start high-level timing
    console.time("create-post");

    try {
      const displayNameText = user?.displayName || user?.email.split("@")[0] || t("Người Dùng Thống Nhất", "Express Passenger");

      // 3. Add optimistic UI: Immediately render the post in UI before Firestore operations finish
      const tempPostId = `optimistic-${Date.now()}`;
      const tempPost: CommunityPost & { isOptimistic?: boolean } = {
        id: tempPostId,
        postId: tempPostId,
        userId: uid,
        displayName: displayNameText,
        authorId: uid,
        authorName: displayNameText,
        authorRole: user?.role === "admin" ? "admin" : "member",
        title: postTitle,
        content: postContent,
        trainRoute: postRoute,
        imageUrls: [...previewUrls], // use local object URLs for instantaneous feedback
        likesCount: 0,
        commentsCount: 0,
        createdAt: null, // marked as local/pending
        isOptimistic: true
      };
      setOptimisticPosts((prev) => [tempPost, ...prev]);

      // 2. Clear visual user inputs immediately (non-blocking) & dismiss submitting spinners
      setNewTitle("");
      setNewContent("");
      setSelectedImages([]);
      setPreviewUrls([]);
      setUploadingPosts(false);

      // 1. Create post document in Firestore immediately:
      console.time("firestore-write");
      const postRef = await addDoc(
        collection(db, "posts"),
        {
          userId: uid,
          displayName: displayNameText,
          authorId: uid, // compatibility fallback
          authorName: displayNameText, // compatibility fallback
          authorRole: user?.role === "admin" ? "admin" : "member",
          title: postTitle,
          content: postContent,
          trainRoute: postRoute,
          imageUrls: [],
          likesCount: 0,
          commentsCount: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
      );
      console.timeEnd("firestore-write");
      console.timeEnd("create-post");

      // Set internal postId to match the generated ID for full query integrity
      await updateDoc(postRef, {
        postId: postRef.id
      });

      const finalPostId = postRef.id;

      logGoogleAnalyticsEvent("create_post", {
        postId: finalPostId,
        userId: uid,
        attachmentsCount: imagesToUpload.length,
        trainRoute: postRoute
      });

      // 3. Process images or trigger safe fallback gracefully if Storage is not enabled
      if (imagesToUpload.length > 0) {
        if (isStorageAvailable()) {
          try {
            const uploadPromises = imagesToUpload.map(async (file, idx) => {
              try {
                const compressedBlob = await compressImage(file);
                const filename = `posts/${finalPostId}/${Date.now()}-${idx}.jpg`;
                const downloadUrl = await uploadImage(filename, compressedBlob);
                return downloadUrl;
              } catch (compressOrUploadErr) {
                console.warn("[Storage Safe Fallback] Individual image upload failed, skipping:", compressOrUploadErr);
                return null;
              }
            });
            const uploadedUrls = await Promise.all(uploadPromises);
            const finalImageUrls = uploadedUrls.filter((url): url is string => url !== null);

            if (finalImageUrls.length > 0) {
              await updateDoc(postRef, {
                imageUrls: finalImageUrls
              });
              // Update optimistic post to show the actual uploaded URLs
              setOptimisticPosts((prev) =>
                prev.map((opt) => (opt.id === tempPostId ? { ...opt, imageUrls: finalImageUrls } : opt))
              );
            } else {
              throw new Error("No images were successfully uploaded.");
            }
          } catch (uploadErr) {
            console.warn("[Storage Safe Fallback] Image upload process failed:", uploadErr);
            alert(t(
              "Tải ảnh lên tạm thời không khả dụng. Bài viết của bạn sẽ được đăng mà không có hình ảnh.",
              "Image upload is currently unavailable. Your post will be published without images."
            ));
            setOptimisticPosts((prev) =>
              prev.map((opt) => (opt.id === tempPostId ? { ...opt, imageUrls: [] } : opt))
            );
          }
        } else {
          // Explicit requirement: "Nếu người dùng chọn ảnh: Hiển thị thông báo: 'Image upload is currently unavailable. Your post will be published without images.' Vẫn tạo post bình thường. imageUrls phải lưu []"
          alert(t(
            "Tải ảnh lên tạm thời không khả dụng. Bài viết của bạn sẽ được đăng mà không có hình ảnh.",
            "Image upload is currently unavailable. Your post will be published without images."
          ));

          // Clear optimistic imageUrls to reflect the true post content
          setOptimisticPosts((prev) =>
            prev.map((opt) => (opt.id === tempPostId ? { ...opt, imageUrls: [] } : opt))
          );
        }
      }

    } catch (err) {
      console.error("Immediate community post creation failed:", err);
      // Remove optimistic post upon failure
      setOptimisticPosts((prev) => prev.filter((opt) => opt.title !== postTitle));
      try {
        handleFirestoreError(err, OperationType.CREATE, "posts");
      } catch (e) {}
      alert(t("Lỗi không thể đăng bài viết lên Firestore. Vui lòng kiểm tra quyền truy cập!", "Failed to publish post to Firestore. Please verify account permissions!"));
    } finally {
      setUploadingPosts(false);
    }
  };

  // Optimistic UI for likes count updates with rollback (using useCallback and stable refs to avoid recreating callback)
  const handleLike = React.useCallback(async (postId: string, currentLikesCount: number) => {
    if (postId.startsWith("optimistic-")) return;
    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert(lang === "vi" ? "Vui lòng chuyển sang 'Trang cá nhân' để Đăng nhập để yêu mến bài viết!" : "Please log in under the 'Profile' tab to react to posts!");
      return;
    }

    const likeId = `${uid}_${postId}`;
    const alreadyLiked = myLikesRef.current[postId] === true;

    // OPTIMISTIC UPDATE: instant toggle
    setMyLikes((prev) => ({
      ...prev,
      [postId]: !alreadyLiked
    }));
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId || p.postId === postId) {
          return {
            ...p,
            likesCount: alreadyLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1
          };
        }
        return p;
      })
    );

    try {
      if (alreadyLiked) {
        await deleteDoc(doc(db, "likes", likeId));
        
        const postDocRef = doc(db, "posts", postId);
        try {
          await updateDoc(postDocRef, {
            likesCount: increment(-1),
            updatedAt: serverTimestamp()
          });
        } catch (updateErr: any) {
          if (updateErr && (updateErr.code === "not-found" || String(updateErr).includes("not-found"))) {
            console.log("Post doc not found on unlike update, checking if fallback post for on-demand creation:", postId);
            const fbPosts = getFallbackPosts();
            const matchedFb = fbPosts.find((f) => f.id === postId);
            if (matchedFb) {
              await setDoc(postDocRef, {
                postId: matchedFb.id,
                userId: uid,
                displayName: matchedFb.authorName,
                authorId: uid,
                authorName: matchedFb.authorName,
                authorRole: matchedFb.authorRole,
                title: matchedFb.title,
                content: matchedFb.content,
                trainRoute: matchedFb.trainRoute,
                imageUrls: matchedFb.imageUrls,
                likesCount: Math.max(0, matchedFb.likesCount - 1),
                commentsCount: matchedFb.commentsCount,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              });
            }
          } else {
            throw updateErr;
          }
        }

        logGoogleAnalyticsEvent("affiliate_interaction", {
          postId,
          userId: uid,
          action: "unlike"
        });
      } else {
        const likePayload = {
          likeId,
          postId,
          userId: uid,
          authorId: uid, // compatibility fallback
          createdAt: serverTimestamp()
        };

        console.log("LIKE CREATE", likePayload);

        await setDoc(doc(db, "likes", likeId), likePayload);

        const postDocRef = doc(db, "posts", postId);
        try {
          await updateDoc(postDocRef, {
            likesCount: increment(1),
            updatedAt: serverTimestamp()
          });
        } catch (updateErr: any) {
          if (updateErr && (updateErr.code === "not-found" || String(updateErr).includes("not-found"))) {
            console.log("Post doc not found on like update, checking if fallback post for on-demand creation:", postId);
            const fbPosts = getFallbackPosts();
            const matchedFb = fbPosts.find((f) => f.id === postId);
            if (matchedFb) {
              await setDoc(postDocRef, {
                postId: matchedFb.id,
                userId: uid,
                displayName: matchedFb.authorName,
                authorId: uid,
                authorName: matchedFb.authorName,
                authorRole: matchedFb.authorRole,
                title: matchedFb.title,
                content: matchedFb.content,
                trainRoute: matchedFb.trainRoute,
                imageUrls: matchedFb.imageUrls,
                likesCount: matchedFb.likesCount + 1,
                commentsCount: matchedFb.commentsCount,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              });
            }
          } else {
            throw updateErr;
          }
        }

        logGoogleAnalyticsEvent("affiliate_interaction", {
          postId,
          userId: uid,
          action: "like"
        });
      }
    } catch (error) {
      console.warn("Toggling community like failed in Firestore, rolling back visual UI:", error);
      try {
        handleFirestoreError(error, OperationType.WRITE, `likes/${likeId}`);
      } catch (err) {}
      // Revert optimistic updates
      setMyLikes((prev) => ({
        ...prev,
        [postId]: alreadyLiked
      }));
      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p.id === postId || p.postId === postId) {
            return {
              ...p,
              likesCount: currentLikesCount
            };
          }
          return p;
        })
      );
    }
  }, [lang]);

  // Parent stable optimistic comment count updates
  const handleCommentAdded = React.useCallback((targetPostId: string) => {
    setPosts((prevPosts) => 
      prevPosts.map((p) => {
        if (p.id === targetPostId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1
          };
        }
        return p;
      })
    );
  }, []);

  const handleCommentRollback = React.useCallback((targetPostId: string) => {
    setPosts((prevPosts) => 
      prevPosts.map((p) => {
        if (p.id === targetPostId) {
          return {
            ...p,
            commentsCount: Math.max(0, p.commentsCount - 1)
          };
        }
        return p;
      })
    );
  }, []);

  const toggleCommentsExpansion = React.useCallback((postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  const activeUploads = Object.entries(uploadTasks) as Array<[string, { status: "uploading" | "success" | "timeout" | "failed"; title: string }]>;

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Header section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-6 relative overflow-hidden">
        <span className="text-[#01411C] font-extrabold text-[10px] uppercase font-mono tracking-widest block">
          {t("Cộng đồng đường sắt Việt Nam", "VNR Enthusiasts community")}
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-[#E65F2B] animate-pulse" />
          {t("Cộng Đồng Du Khách VNR Travel AI", "VNR Railway Travel Forums")}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
          {t("Không gian giao lưu thời gian thực cho các tín đồ mê du ngoạn bằng tàu hỏa Việt Nam. Chia sẻ chặng ngủ giường nằm, góc bấm máy tại đèo Hải Vân, hay mác tàu hơi nước Đà Lạt hoài cổ ngay hôm nay.", "Connecting rolling stock enthusiasts, photographers and overland rail adventurers with realtime onSnapshot synchronization.")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column - Forum Feed (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Background upload progress tracker */}
          {activeUploads.some(([_, task]) => task.status === "uploading" || task.status === "timeout") && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2 animate-pulse shadow-xs">
              <div className="flex items-center gap-2 text-[#01411C] font-extrabold text-[11px] uppercase tracking-wider font-sans">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>{t("Đang tải ảnh lên (Uploading images...)", "Uploading images in the background...")}</span>
              </div>
              <div className="space-y-1 font-mono text-[10px] text-slate-500 pl-6">
                {activeUploads.map(([id, task]) => {
                  if (task.status === "uploading") {
                    return (
                      <div key={id} className="flex justify-between items-center bg-white/65 px-2.5 py-1.5 rounded-xl border border-slate-100">
                        <span className="truncate max-w-[200px] font-bold text-slate-700">📝 {task.title}</span>
                        <span className="text-[#01411C] font-extrabold uppercase shrink-0">{t("Đang tải lên...", "Uploading...")}</span>
                      </div>
                    );
                  }
                  if (task.status === "timeout") {
                    return (
                      <div key={id} className="flex justify-between items-center bg-amber-50/50 border border-amber-150 px-2.5 py-1.5 rounded-xl">
                        <span className="truncate max-w-[200px] font-bold text-amber-800">📝 {task.title}</span>
                        <span className="text-amber-700 font-extrabold flex items-center gap-1 shrink-0">
                          ⏱️ {t("Tải nền dài (>10s)...", "Backgrounding (>10s)...")}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#01411C] animate-spin mx-auto" />
              <p className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">{t("Đang tải dữ liệu diễn đàn...", "Connecting real-time feeds...")}</p>
            </div>
          ) : displayedPosts.length > 0 ? (
            displayedPosts.map((post) => {
              const hasLiked = myLikes[post.id] === true;
              const isExpanded = expandedComments[post.id] === true;
              return (
                <PostCardItem
                  key={post.id}
                  post={post}
                  hasLiked={hasLiked}
                  isExpanded={isExpanded}
                  lang={lang}
                  user={user}
                  onLike={handleLike}
                  onToggleComments={toggleCommentsExpansion}
                  onCommentAdded={handleCommentAdded}
                  onCommentRollback={handleCommentRollback}
                  uploadTasks={uploadTasks}
                />
              );
            })
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-2">
              <p className="text-xs text-slate-400">{t("Chưa có bất kỳ bài viết nào trên hệ thống. Hãy là chủ bài viết đầu tiên!", "No travel forum entries located. Share your journey first!")}</p>
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && hasMore && (
            <button
              id="load-more-posts-btn"
              onClick={() => setLimitCount((prev) => prev + 10)}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-extrabold py-3 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-xs text-xs"
            >
              <Loader2 className="w-3.5 h-3.5 text-[#01411C] animate-spin hidden group-hover:block" />
              <span>{t("Xem Thêm Bài Viết", "Load More Posts")}</span>
            </button>
          )}

        </div>

        {/* Right column - Create a custom Post (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 uppercase font-sans tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#01411C]" />
                {t("Kể Lại Trải Nghiệm Của Bạn", "Share Your Own Journey")}
              </h4>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed">
                {t("Chia sẻ chặng hành trình, cảm nghiệm, hình ảnh của bạn cùng cộng đồng lữ khách bốn phương ngay hôm nay.", "Submit logs & reviews instantly. Photo attachments will stream to Cloud Storage.")}
              </p>
            </div>

            {user ? (
              <form onSubmit={handleCreatePost} className="space-y-4 text-xs font-sans">
                
                {/* Fixed Display User Name and Role */}
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">{t("Tác giả khả dụng", "Validated Identity")}</span>
                    <strong className="text-xs text-[#01411C] font-extrabold block">{user.displayName || user.email.split("@")[0]}</strong>
                  </div>
                  <span className="bg-emerald-50 text-[#01411C] border border-green-150 px-2 py-0.5 rounded text-[8px] font-bold uppercase font-mono">
                    {user.role === "admin" ? t("Nhà Quản Trị", "CRM Staff") : t("Kỳ Cựu", "Forum Active")}
                  </span>
                </div>

                <div>
                  <label id="lbl-route" className="block text-[10px] font-black text-slate-500 uppercase mb-1">{t("Gắn Tuyến Đường", "Tag Railway Route")}</label>
                  <select
                    id="input-route-select"
                    value={newRoute}
                    onChange={(e) => setNewRoute(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-780 font-semibold text-slate-700"
                  >
                    <option value="Huế - Đà Nẵng (HD1)">Huế - Đà Nẵng (Tàu di sản HD1)</option>
                    <option value="Hà Nội - Lào Cai (SP3)">Hà Nội - Lào Cai (Tàu đêm SP3)</option>
                    <option value="Hà Nội - Đà Nẵng (SE19)">Hà Nội - Đà Nẵng (Tàu đêm SE19)</option>
                    <option value="Bắc Nam Xuyên Việt (SE1)">Xuyên Việt Thống Nhất (SE1)</option>
                    <option value="Đà Lạt (Tàu cổ hơi nước)">Đà Lạt (Tàu hơi nước bánh răng Cổ)</option>
                  </select>
                </div>

                <div>
                  <label id="lbl-title" className="block text-[10px] font-black text-slate-500 uppercase mb-1">{t("Tiêu đề bài viết", "Post Title")}</label>
                  <input
                    id="input-post-title"
                    type="text"
                    required
                    placeholder={t("Ví dụ: Kinh nghiệm chi tiết nằm toa hạng sang SE19...", "E.g. Full review of woodwork VIP SE19 sleeper...")}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-780 text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label id="lbl-content" className="block text-[10px] font-black text-slate-500 uppercase mb-1">{t("Nội dung chia sẻ", "Detailed Review")}</label>
                  <textarea
                    id="input-post-content"
                    required
                    rows={4}
                    placeholder={t("Chia sẻ về thời tiết, dịch vụ ăn uống trên tàu Thống Nhất, chặng Hải Vân hớp hồn...", "Explain curves, hot teas, ticket fee catalogs...")}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-780 text-slate-850 font-medium leading-relaxed resize-none"
                  />
                </div>

                {/* Multiple Images Selector with preview */}
                <div className="space-y-2">
                  <label id="lbl-attachments" className="block text-[10px] font-black text-slate-500 uppercase flex justify-between items-center">
                    <span>📸 {t("Thêm Hình Ảnh (Nhiều ảnh)", "Attach Images (Multi-photos support)")}</span>
                    <span className="text-[8px] text-[#01411C] font-mono lowercase font-normal">posts/{`{postId}`}/*</span>
                  </label>
                  
                  <div className="flex items-center gap-2">
                    {isStorageAvailable() ? (
                      <label id="upload-clickable-mask" className="flex items-center gap-2 bg-slate-50 border border-dashed border-slate-250 rounded-xl px-4 py-3 cursor-pointer hover:border-[#01411C]/40 transition-all select-none text-slate-500 hover:text-slate-800">
                        <ImageIcon className="w-4 h-4 text-[#01411C]" />
                        <span className="font-extrabold text-[10px] uppercase font-mono tracking-wide">{t("Chọn tệp ảnh...", "Choose photos...")}</span>
                        <input
                          id="input-file-mutliple"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageSelection}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div 
                        id="upload-clickable-mask" 
                        title={t("Dịch vụ lưu trữ chưa được kích hoạt", "Storage service not enabled")}
                        className="flex items-center gap-2 bg-slate-100 border border-dashed border-slate-200 rounded-xl px-4 py-3 cursor-not-allowed select-none text-slate-400"
                      >
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                        <span className="font-extrabold text-[10px] uppercase font-mono tracking-wide">{t("Chọn tệp ảnh...", "Choose photos...")}</span>
                        <span className="text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200/50 rounded px-1.5 py-0.5 ml-2">
                          ⚠️ {t("Dịch vụ lưu trữ chưa bật (Storage service not enabled)", "Storage service not enabled")}
                        </span>
                      </div>
                    )}
                    {selectedImages.length > 0 && isStorageAvailable() && (
                      <span className="text-[10px] font-mono text-slate-450">({selectedImages.length} {t("ảnh", "selected")})</span>
                    )}
                  </div>

                  {/* Thumbnail Previews with individual remove cross buttons */}
                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="aspect-square relative rounded-lg overflow-hidden border border-slate-200 group bg-white">
                          <img
                            src={url}
                            alt={`selected-thumb-${index}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeSelectedImage(index)}
                            className="absolute top-1 right-1 bg-red-650 hover:bg-red-800 text-white rounded-full p-0.5 cursor-pointer shadow-sm transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  id="publish-btn-submit"
                  type="submit"
                  disabled={uploadingPosts}
                  className="w-full bg-[#01411C] hover:bg-green-800 text-white font-extrabold h-12 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-md disabled:bg-slate-350 disabled:cursor-not-allowed select-none"
                >
                  {uploadingPosts ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t("Đang tải ảnh & đăng bài...", "Uploading & creating...")}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-yellow-300" />
                      <span>{t("ĐĂNG BÀI VIẾT LÊN DIỄN ĐÀN", "PUBLISH IMMEDATELY")}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-amber-50 border border-amber-150 rounded-2xl p-6 text-center space-y-3.5">
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  🔒 {t("Bạn cần đăng nhập tài khoản trước khi thực hiện viết lách, bình luận và bày tỏ cảm xúc với hành trình lữ hành của những lữ khách khác.", "Access restriction: User authenticated certificate required. Please connect your credentials first to interact.")}
                </p>
                <div className="pt-1.5">
                  <p className="text-[10px] text-slate-400 mb-2">({t("Mẹo: Mở tab 'Trang cá nhân' ở thanh định hướng để đồng bộ hóa tài khoản Google)", "Tip: Access the 'Profile' tab in the navbar to connect Google Account in 3s")})</p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
