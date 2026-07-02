import React, { useState, useEffect } from "react";
import { User, ShieldAlert, Award, Star, RefreshCw, Send, CheckCircle2, Crown, Sparkles, Mail, KeyRound, AlertTriangle } from "lucide-react";

// Import Firebase SDK & Initializer exports
import { auth, db, setupPrivateProfile } from "../../lib/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

interface ProfileViewProps {
  lang: "vi" | "en";
  user: { uid: string; email: string; displayName: string; isPremium: boolean; role: "member" | "admin" } | null;
  setUser: (usr: any) => void;
}

export default function ProfileView({ lang, user, setUser }: ProfileViewProps) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  console.log("AUTH UID:", auth.currentUser?.uid);

  // Sign-in states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Reset password form view
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMessage, setAuthSuccessMessage] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isRefreshingVerification, setIsRefreshingVerification] = useState(false);

  // Edit states
  const [editName, setEditName] = useState(user?.displayName || "");

  // Sync stateful editName with loading/updating user details
  useEffect(() => {
    if (user?.displayName) {
      setEditName(user.displayName);
    }
  }, [user]);

  // Handle Google popup credential SSO
  const handleGoogleSignIn = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    setAuthSuccessMessage(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Google Auth error:", err);
      setAuthError(err.message || "Failed to authenticate with Google.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Handle Email & Password signup/login integration
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || (!isPasswordReset && !password)) {
      setAuthError(t("Vui lòng điền đầy đủ email và mật khẩu", "Fill in email and password fields."));
      return;
    }
    setIsLoadingAuth(true);
    setAuthError(null);
    setAuthSuccessMessage(null);

    // Password Reset Flow
    if (isPasswordReset) {
      try {
        await sendPasswordResetEmail(auth, email);
        setAuthSuccessMessage(t(
          "Một liên kết khôi phục mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư!",
          "A password reset link has been dispatched to your email address. Please check your inbox!"
        ));
      } catch (err: any) {
        console.error("Password reset failure: ", err);
        setAuthError(err.message || "Failed to dispatch password recovery email.");
      } finally {
        setIsLoadingAuth(false);
      }
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: email.split("@")[0]
          });
          // Call direct Firebase sendEmailVerification upon brand new signup
          try {
            await sendEmailVerification(userCredential.user);
            setAuthSuccessMessage(t(
              "Tạo tài khoản thành công! Một email xác minh đã được tự động gửi đến bạn. Hãy kiểm tra hộp thư để kích hoạt hồ sơ bảo mật.",
              "Sign up successful! A verification email has been automatically generated and sent to you. Please confirm to verify your account."
            ));
          } catch (verificationErr) {
            console.error("Automatic email verification dispatch issue: ", verificationErr);
            setAuthSuccessMessage(t(
              "Tạo tài khoản thành công nhưng gặp sự cố gửi email xác nhận. Bạn có thể yêu cầu gửi lại sau.",
              "Account registered! However, email verification failed to auto-dispatch. You can request a resend manually."
            ));
          }
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error("Email authentication failed:", err);
      if (err.code === "auth/email-already-in-use") {
        setAuthError(t("Địa chỉ email này đã được sử dụng trước đó.", "This email is already registered."));
      } else if (err.code === "auth/weak-password") {
        setAuthError(t("Mật khẩu phải chứa ít nhất 6 ký tự.", "Password should be at least 6 characters."));
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setAuthError(t("Thông tin email hoặc mật khẩu không khớp hoặc không chính xác.", "Incorrect email format or unmatched credentials."));
      } else {
        setAuthError(err.message || "Credential authentication failed.");
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Resend Verification Email manual handler
  const handleResendVerificationEmail = async () => {
    if (auth.currentUser) {
      setIsRefreshingVerification(true);
      setAuthError(null);
      setAuthSuccessMessage(null);
      try {
        await sendEmailVerification(auth.currentUser);
        setAuthSuccessMessage(t(
          "Email xác minh mới đã được gửi thành công! Xin hãy kiểm tra hộp thư đến và mục thư rác (Spam).",
          "A fresh authentication verification email has been sent. Check your primary box and promotional/spam folders."
        ));
      } catch (err: any) {
        console.error("Resend error:", err);
        setAuthError(err.message || "Failed to dispatch resend email verification request.");
      } finally {
        setIsRefreshingVerification(false);
      }
    }
  };

  // Reload current session credentials and check if the user verified their email
  const handleCheckEmailVerificationStatus = async () => {
    if (auth.currentUser) {
      setIsRefreshingVerification(true);
      setAuthError(null);
      setAuthSuccessMessage(null);
      try {
        // Force authentication token session state synchronizing reload
        await auth.currentUser.reload();
        const reloadedUser = auth.currentUser;
        
        if (reloadedUser.emailVerified) {
          setAuthSuccessMessage(t(
            "Tuyệt vời! Email của bạn đã được xác minh thành công. Đang thiết lập phân hệ bảo mật...",
            "Congratulations! Your email verified status is active. Organizing secure sub-collection directories..."
          ));
          // Async populate private info structure on first confirmed verification
          await setupPrivateProfile(reloadedUser);
          
          // Force active state refresh on page wrapper context
          setUser((prev: any) => prev ? { ...prev, isEmailVerified: true } : null);
        } else {
          setAuthError(t(
            "Hệ thống chưa ghi nhận trạng thái xác minh. Vui lòng bấm vào liên kết trong email gửi đến bạn, sau đó thử lại.",
            "Verification status not active yet. Click the email link first, then check verification again."
          ));
        }
      } catch (err: any) {
        console.error("Verification status verify failure: ", err);
        setAuthError(err.message || "Failed to communicate verification status reload.");
      } finally {
        setIsRefreshingVerification(false);
      }
    }
  };

  // Handle Sign Out action
  const handleSignOut = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      await signOut(auth);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error("Logout error:", err);
      setAuthError(err.message || "Failed to disconnect account.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Profile public state modifier (allows user to update display name sync in Firestore)
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    if (auth.currentUser && uid && editName) {
      setIsLoadingAuth(true);
      setAuthError(null);
      try {
        const publicName = editName.trim();
        await updateProfile(auth.currentUser, {
          displayName: publicName
        });

        // Sync change straight into Firestore profile document
        const userDocRef = doc(db, "users", uid);
        const userDocSnapshot = await getDoc(userDocRef);
        let existingData = {};
        if (userDocSnapshot.exists()) {
          existingData = userDocSnapshot.data();
        }

        const freshProfile = {
          userId: uid,
          displayName: publicName,
          email: auth.currentUser.email || "",
          role: (existingData as any).role || (auth.currentUser.email === "vnrtravelai@gmail.com" ? "admin" : "user"),
          premium: (existingData as any).premium || false,
          createdAt: (existingData as any).createdAt || serverTimestamp()
        };

        await setDoc(userDocRef, freshProfile);

        setUser({
          ...user,
          displayName: publicName
        });
      } catch (err: any) {
        console.error("Profile edit mismatch:", err);
        setAuthError(err.message || "Failed to write profile update.");
      } finally {
        setIsLoadingAuth(false);
      }
    }
  };

  // Handle premium upgrade simulations gracefully (client status)
  const handleTogglePremium = async () => {
    const uid = auth.currentUser?.uid;
    if (user && auth.currentUser && uid) {
      setIsLoadingAuth(true);
      try {
        const userDocRef = doc(db, "users", uid);
        const nextPremiumState = !user.isPremium;
        
        // Note: Unless logged in as the admin, firestore.rules prevents modification.
        // We attempt a database update; if forbidden, we alert and map local simulation
        await setDoc(userDocRef, { premium: nextPremiumState }, { merge: true });
        
        setUser({
          ...user,
          isPremium: nextPremiumState
        });
      } catch (err: any) {
        console.warn("Firestore Rules forbid changing premium fields directly for non-admins. Simulating status locally.", err);
        setUser({
          ...user,
          isPremium: !user.isPremium
        });
      } finally {
        setIsLoadingAuth(false);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Header section */}
      <div>
        <span className="text-[#01411C] font-extrabold text-[10px] uppercase font-mono tracking-widest block">
          {t("Cơ cấu Firebase Authentication", "Firebase Identity Portal")}
        </span>
        <h3 className="text-lg font-bold text-slate-900 mt-1">{t("Cổng Xác Thực Tài Khoản Người Dùng", "User Accounts & Authentication Hub")}</h3>
        <p className="text-xs text-slate-400">{t("Đăng nhập Google Sign-In hoặc Email/Password để lưu trữ lịch trình và chia sẻ phản hồi lên máy chủ đám mây.", "Real user authentication connecting Google SSO, secure email registrations and real-time profile documents.")}</p>
      </div>

      <div className="max-w-2xl">
        
        {/* Left side: Sign In Form or Profile Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {!user ? (
            /* Authentication Panel */
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h4 className="font-extrabold text-sm text-slate-950">
                  {isPasswordReset 
                    ? t("Khôi phục mật khẩu tài khoản", "Recover Account Password") 
                    : isSignUp 
                      ? t("Đăng ký tài khoản VNR", "Register New VNR Account") 
                      : t("Đăng nhập tài khoản VNR", "Sign In to VNR travel")}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {isPasswordReset 
                    ? t("Nhận liên kết khôi phục mật khẩu bảo mật qua hệ thống email tự động.", "Get a secure password reset link.")
                    : t("Đồng bộ lịch trình AI lên máy chủ đám mây, tham gia bình luận cộng đồng.", "Secure cloud sync, participate in community discussions, unlock itineraries.")}
                </p>
              </div>

              {/* Only show Google SignIn if not resetting password */}
              {!isPasswordReset && (
                <>
                  {/* Single Tap Google Sign-In */}
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoadingAuth}
                    className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-slate-700 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.8 2.7l2.8 2.17c1.63-1.5 2.58-3.7 2.58-6.5z" fill="#4285F4" />
                      <path d="M9 18c2.43 0 4.47-.8 5.96-2.2l-2.8-2.17c-.78.52-1.78.83-2.96.83-2.28 0-4.21-1.54-4.9-3.61L1.4 13.06C2.88 16 5.86 18 9 18z" fill="#34A853" />
                      <path d="M4.1 10.85a5.4 5.4 0 0 1 0-3.7L1.4 5.02a8.96 8.96 0 0 0 0 7.96l2.7-2.13z" fill="#FBBC05" />
                      <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.4C13.46.97 11.4 0 9 0 5.86 0 2.88 2 1.4 4.94l2.7 2.13C4.79 5.12 6.72 3.58 9 3.58z" fill="#EA4335" />
                    </svg>
                    {t("Đăng nhập bằng Google", "Sign in with Google Account Launcher")}
                  </button>

                  <div className="flex items-center gap-2 justify-center text-[10px] text-slate-450 font-bold uppercase tracking-widest font-mono">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span>Hoặc</span>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>
                </>
              )}

              {/* Success Alert */}
              {authSuccessMessage && (
                <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-xl font-semibold text-xs leading-relaxed flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-4.5 h-4.5 text-green-600 shrink-0" />
                  <span>{authSuccessMessage}</span>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">{t("Địa chỉ Email", "Email Address")}</label>
                  <input
                    type="email"
                    placeholder="vietnam.traveler@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-708"
                  />
                </div>

                {!isPasswordReset && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase">{t("Mật khẩu bảo mật", "Account Password")}</label>
                      {!isSignUp && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsPasswordReset(true);
                            setAuthError(null);
                            setAuthSuccessMessage(null);
                          }}
                          className="text-[10px] text-[#01411C] hover:underline font-bold cursor-pointer"
                        >
                          {t("Quên mật khẩu?", "Forgot Password?")}
                        </button>
                      )}
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={!isPasswordReset}
                      className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-708"
                    />
                  </div>
                )}

                {authError && (
                  <div className="space-y-3">
                    <div className="p-3 bg-red-100 text-red-800 border border-red-200 rounded-xl font-semibold text-xs leading-relaxed">
                      {authError}
                    </div>

                    {(authError.toLowerCase().includes("unauthorized-domain") || 
                      authError.toLowerCase().includes("authorized domain") ||
                      authError.toLowerCase().includes("auth/unauthorized-domain")) && (
                      <div className="p-4 bg-emerald-50 text-slate-800 border border-emerald-200 rounded-xl space-y-3 text-[11px] leading-relaxed">
                        <div className="flex items-center gap-2 text-[#01411C] font-extrabold text-xs">
                          <ShieldAlert className="w-4 h-4 text-[#01411C] shrink-0" />
                          <span>{t("Yêu cầu thêm tên miền vào Whitelist Firebase", "Action Required: Firebase Console Whitelisting")}</span>
                        </div>
                        <p>
                          {t(
                            "Vì bạn đang chạy dự án trên môi trường AI Studio Cloud Preview, Firebase Auth của bạn từ chối yêu cầu đăng nhập Google từ tên miền chưa đăng ký. Hãy thêm tên miền này vào danh sách được ủy quyền trong bảng quản trị Firebase Console để mở khóa đăng nhập bằng Google.",
                            "Google Sign-In is blocked because your personal Firebase Auth project settings do not have this AI Studio preview site listed as an authorized domain yet."
                          )}
                        </p>
                        
                        <div className="space-y-1.5 font-mono text-[10px] bg-slate-900 text-slate-200 p-2.5 rounded-lg border border-slate-800">
                          <div className="text-slate-400 font-extrabold pb-1 uppercase tracking-wider">{t("Tên miền của bạn (Hãy copy):", "Domains to copy and whitelist:")}</div>
                          
                          <div className="flex justify-between items-center bg-slate-800/50 px-2 py-1.5 rounded border border-slate-75">
                            <span className="truncate mr-2 font-mono text-slate-300">{window.location.hostname}</span>
                            <button 
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(window.location.hostname);
                                alert(t("Đã sao chép tên miền vào bộ nhớ đệm!", "Copied development hostname to clipboard!"));
                              }}
                              className="bg-[#01411C] hover:bg-[#003010] text-white font-extrabold px-1.5 py-0.5 rounded text-[9px] shrink-0 cursor-pointer transition-all"
                            >
                              Copy
                            </button>
                          </div>

                          {window.location.hostname.includes("-dev-") && (
                            <div className="flex justify-between items-center bg-slate-800/50 px-2 py-1.5 rounded border border-slate-75 mt-1.5">
                              <span className="truncate mr-2 font-mono text-slate-300">
                                {window.location.hostname.replace("-dev-", "-pre-")}
                              </span>
                              <button 
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(window.location.hostname.replace("-dev-", "-pre-"));
                                  alert(t("Đã sao chép tên miền liên kết chia sẻ!", "Copied production preview hostname to clipboard!"));
                                }}
                                className="bg-[#01411C] hover:bg-[#003010] text-white font-extrabold px-1.5 py-0.5 rounded text-[9px] shrink-0 cursor-pointer transition-all"
                              >
                                Copy
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="text-slate-500 text-[10px] leading-relaxed">
                          <strong>{t("Cách thực hiện:", "How to solve:")}</strong>{' '}
                          {t(
                            "Truy cập Firebase Console của dự án vnr-travel-ai → Vào mục Authentication → Chọn tab Settings → Click vào Authorized domains ở cột bên trái → Nhấn nút Add domain rồi dán giá trị ở trên vào.",
                            "Go to your Firebase Console under Authentication → select Settings tab → select Authorized domains section → click Add domain button and paste the copied domain."
                          )}
                        </div>

                        <div className="border-t border-emerald-250 pt-2 font-bold text-[#01411C] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#01411C]" />
                          <span>{t("Gợi ý: Bạn có thể đăng ký Email & Mật khẩu bên dưới để trải nghiệm ngay mà không cần cấu hình Whitelist!", "Tip: You can use secure Email & Password input below to login right now without whitelisting!")}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoadingAuth}
                  className="w-full bg-[#01411C] hover:bg-green-800 text-white font-extrabold h-12 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  {isLoadingAuth ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> {t("Đang xử lý...", "Connecting sync...")}
                    </>
                  ) : isPasswordReset ? (
                    <>
                      <KeyRound className="w-4 h-4 shrink-0" /> {t("Gửi Yêu Cầu Khôi Phục", "Send Reset Link")}
                    </>
                  ) : (
                    <>
                      {isSignUp ? t("Đăng Ký Tài Khoản", "Register New User") : t("Xác Thực Đăng Nhập", "Sign In Credential")}
                    </>
                  )}
                </button>
              </form>

              <div className="text-center flex flex-col gap-2">
                {isPasswordReset ? (
                  <button
                    onClick={() => {
                      setIsPasswordReset(false);
                      setAuthError(null);
                      setAuthSuccessMessage(null);
                    }}
                    className="text-[11px] text-slate-500 hover:underline font-bold cursor-pointer"
                  >
                    {t("← Quay lại Đăng nhập", "← Back to Authentication")}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setAuthError(null);
                      setAuthSuccessMessage(null);
                    }}
                    className="text-[11px] text-slate-500 hover:underline font-bold cursor-pointer"
                  >
                    {isSignUp ? t("Đã có tài khoản? Đăng nhập", "Have an account already? Sign In") : t("Chưa có tài khoản? Tạo mới ngay", "New enthusiast? Click to SignUp")}
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Logged In Dashboard */
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row gap-5 items-center pb-5 border-b border-slate-100">
                <div className="w-14 h-14 bg-green-50 text-[#01411C] rounded-full flex items-center justify-center shrink-0 shadow-inner font-extrabold text-lg uppercase">
                  {user.displayName.slice(0, 2)}
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{user.displayName}</h4>
                    <span className="bg-blue-50 text-blue-700 font-mono text-[9px] font-black px-2 py-0.2 rounded uppercase border border-blue-150">
                      UID: {user.uid}
                    </span>
                    {user.isPremium && (
                      <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 font-mono text-[9px] font-black px-2 py-0.2 rounded uppercase flex items-center gap-0.5">
                        <Crown className="w-3 h-3 text-yellow-600 fill-yellow-600 animate-pulse" /> PREMIUM
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block font-mono">{user.email}</span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold px-3 py-1.5 rounded-lg text-[10px] shrink-0 cursor-pointer"
                >
                  {t("Đăng Xuất", "Log Out")}
                </button>
              </div>

              {/* Dynamic Authentication Alerts */}
              {authSuccessMessage && (
                <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-xl font-semibold text-xs leading-relaxed flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-green-600 shrink-0" />
                  <span>{authSuccessMessage}</span>
                </div>
              )}

              {authError && (
                <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl font-semibold text-xs leading-relaxed flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-655 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Email Verification Box Required */}
              {!auth.currentUser?.emailVerified && (
                <div className="bg-amber-50/75 border border-amber-200 p-5 rounded-2xl space-y-3.5">
                  <div className="flex items-start gap-2 text-amber-900">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-bounce" />
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-xs uppercase tracking-wide block font-sans text-amber-900">
                        {t("Yêu Cầu Xác Minh Email (Authentication Required)", "Email Verification Required")}
                      </span>
                      <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                        {t(
                          "Tài khoản của bạn chưa được xác minh email. Để bảo mật tuyệt đối thông tin nhạy cảm của lữ khách (số điện thoại, token lịch trình riêng tư), bạn chỉ được quyền lưu trữ dữ liệu riêng này khi trạng thái xác minh thành công.",
                          "To ensure maximum travel safety, sensitive private folders (such as secure itinerary records and companion contact links) require a fully verified email status before data storage writes."
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleResendVerificationEmail}
                      disabled={isRefreshingVerification}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-2 px-3.5 rounded-xl text-[10px] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      {isRefreshingVerification ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Mail className="w-3.5 h-3.5" />
                      )}
                      {t("Gửi lại email xác minh", "Resend Verification Email")}
                    </button>

                    <button
                      type="button"
                      onClick={handleCheckEmailVerificationStatus}
                      disabled={isRefreshingVerification}
                      className="bg-slate-900 hover:bg-black text-white font-extrabold py-2 px-3.5 rounded-xl text-[10px] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      {isRefreshingVerification ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      )}
                      {t("Tôi Đã Xác Minh, Kiểm Tra Lại", "I Have Verified, Check Status")}
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Profile Form */}
              <form onSubmit={handleUpdateName} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">{t("Sửa Tên Hiển Thị", "Modify Public Display Name")}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      className="bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-708 flex-1"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 text-white font-bold py-2 px-4 rounded-xl cursor-pointer hover:bg-black transition-colors"
                    >
                      {t("Cập Nhật", "Update Name")}
                    </button>
                  </div>
                </div>
              </form>

              {/* Upgrade Business Simulation */}
              <div className="bg-[#FFFDF0] border border-yellow-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                  <span className="font-extrabold text-[#01411C] text-xs uppercase tracking-wider block font-sans">
                    {t("Gói Premium Membership Đặc Quyền Cao", "Premium Access (Ecosystem monetization conversion)")}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {t(
                    "Phiên bản Premium mở khóa lịch trình Gemini không giới hạn, bộ lọc mác toa VIP bọc gỗ lim, không dính quảng cáo, nhận dặm thưởng affiliate giảm giá trực tiếp 12% cho các khách sạn gần ga tàu.",
                    "Premium subscription model unlocks limitless AI iterations, smart multi-city scheduling with intermediate station hops, and 12% affiliate booking cashbacks."
                  )}
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-yellow-150 p-4 rounded-xl gap-3">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-mono block">{t("Phí thường niên", "Standard pricing")}</span>
                    <span className="text-sm font-black text-slate-900 font-mono">199,000đ <span className="text-[10px] font-normal text-slate-400">/ {t("tháng", "month")}</span></span>
                  </div>

                  <button
                    onClick={handleTogglePremium}
                    className={`font-black py-2.5 px-5 rounded-xl text-xs flex items-center gap-1 transition-all shadow-md hover:shadow-lg cursor-pointer ${
                      user.isPremium 
                        ? "bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100" 
                        : "bg-amber-400 hover:bg-amber-500 text-slate-930"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 fill-slate-900 text-slate-900" />
                    {user.isPremium ? t("Hạ Cấp Xuống Thường", "Cancel Premium Subscription") : t("Nâng Cấp VIP Ngay (Chỉ giả định)", "Upgrade Mock Account")}
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
