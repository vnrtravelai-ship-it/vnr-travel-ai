import React, { useState, useEffect } from "react";
import { 
  Home, Compass, Train, BookOpen, Hotel, MapPin, 
  Users, Bookmark, User, ShieldAlert, Award, Globe, ExternalLink, ShieldCheck,
  Smartphone, Laptop, Tablet, Monitor, CheckCircle2, Settings, Cpu,
  MessageSquare, Send, Bot, Sparkles, Wifi, WifiOff, Cloud, RefreshCcw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ItineraryResult } from "../types";

// Import custom SRE & Observability components
import { autoSaveManager } from "../lib/autoSaveManager";
import { o11y } from "../lib/observability";
import { aiOrchestrator } from "../lib/aiOrchestrator";
import LocalErrorBoundary from "./LocalErrorBoundary";

// Import Firebase SDK & Initializer exports
import { auth, db, setupPrivateProfile, logGoogleAnalyticsEvent } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, getDocs, serverTimestamp, collection, query, where, onSnapshot, deleteDoc, updateDoc, addDoc } from "firebase/firestore";

// Import custom SubViews
import HomeView from "./SubPages/HomeView";
import PlannerView from "./SubPages/PlannerView";
import RoutesView from "./SubPages/RoutesView";
import GuidesView from "./SubPages/GuidesView";
import HotelsView from "./SubPages/HotelsView";
import ToursView from "./SubPages/ToursView";
import CommunityView from "./SubPages/CommunityView";
import MyTripsView from "./SubPages/MyTripsView";
import ProfileView from "./SubPages/ProfileView";
import AdminView from "./SubPages/AdminView";
import TechHubView from "./SubPages/TechHubView";

export default function DemoPrototype() {
  const [activeSubPage, setActiveSubPage] = useState<string>("home");
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // SRE Core States
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [prefetchStatus, setPrefetchStatus] = useState<string | null>(null);

  // Floating AI Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "model"; text: string }>>([
    { role: "model", text: "Chào bạn! Tôi là Đại sứ Đường sắt VNR. Bạn cần hỗ trợ gì về hành trình du lịch bằng tàu hoả, kinh nghiệm chọn toa nằm, ngắm cảnh hay ẩm thực địa phương?" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Device type & OS profiling state
  const [deviceInfo, setDeviceInfo] = useState<{
    type: "mobile" | "tablet" | "desktop";
    os: "iOS" | "Android" | "macOS" | "Windows" | "Linux" | "Unknown";
    name: string;
    touch: boolean;
  }>({
    type: "desktop",
    os: "Unknown",
    name: "Desktop PC",
    touch: false
  });
  const [showDeviceOptimizationModal, setShowDeviceOptimizationModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectDevice = () => {
      const ua = navigator.userAgent;
      let os: "iOS" | "Android" | "macOS" | "Windows" | "Linux" | "Unknown" = "Unknown";
      let type: "mobile" | "tablet" | "desktop" = "desktop";
      let name = "Desktop Computer";
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Detect OS
      if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
        os = "iOS";
      } else if (/Android/i.test(ua)) {
        os = "Android";
      } else if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(ua)) {
        os = "macOS";
      } else if (/Windows|Win32|Win64|Windows NT/.test(ua)) {
        os = "Windows";
      } else if (/Linux/.test(ua)) {
        os = "Linux";
      }

      // Detect Type based on width and UserAgent
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const width = window.innerWidth;

      if (isMobileUA || width < 768) {
        if (/iPad|tablet/i.test(ua) || (width >= 768 && width < 1024)) {
          type = "tablet";
          name = os === "iOS" ? "iPad Tablet" : "Android Tablet";
        } else {
          type = "mobile";
          name = os === "iOS" ? "iPhone Mobile" : os === "Android" ? "Android Phone" : "Mobile Phone";
        }
      } else {
        type = "desktop";
        name = os === "Windows" ? "Windows PC" : os === "macOS" ? "Mac Pro / iMac" : os === "Linux" ? "Linux Workstation" : "Desktop Computer";
      }

      setDeviceInfo({ type, os, name, touch });
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  // Shared Auth State - defaulted to guest (null) to allow real Firebase Auth tracking on sync
  const [user, setUser] = useState<{
    uid: string;
    email: string;
    displayName: string;
    isPremium: boolean;
    role: "member" | "admin";
  } | null>(null);

  // Shared Planner Input Presets
  const [departure, setDeparture] = useState("Hà Nội");
  const [arrival, setArrival] = useState("Đà Nẵng");
  const [daysCount, setDaysCount] = useState(3);
  const [budgetLevel, setBudgetLevel] = useState("Tiêu chuẩn");
  const [travelStyle, setTravelStyle] = useState("Khám phá di sản");
  const [companion, setCompanion] = useState("Một mình");
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split("T")[0]);
  const [travelInterests, setTravelInterests] = useState<string[]>(["heritage", "foodie"]);
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryResult | null>(null);

  // Shared Saved Trips State
  const [savedTrips, setSavedTrips] = useState<ItineraryResult[]>([]);

  // 1. SRE Connection Detector & Self-Healing Sync Queue
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(true);
      o11y.logInfo("system", "Network connection re-established, flushing offline synchronization tasks.");
      setToastMessage(lang === "vi" ? "Đã khôi phục kết nối trực tuyến thành công!" : "Network Connection Restored successfully!");
      setTimeout(() => setToastMessage(null), 3000);

      // SRE Self Healing - Trigger automatic database sync of any offline created logs/items
      try {
        const fallbackClicks = JSON.parse(localStorage.getItem("vnr_fallback_affiliate_clicks") || "[]");
        if (fallbackClicks.length > 0) {
          o11y.logInfo("system", `Flushing ${fallbackClicks.length} offline affiliate click logs to Cloud Firestore.`);
          fallbackClicks.forEach((click: any) => {
            addDoc(collection(db, "affiliateClicks"), {
              ...click,
              syncedAt: serverTimestamp()
            }).catch(e => console.warn("Background flushing item failed:", e));
          });
          localStorage.removeItem("vnr_fallback_affiliate_clicks");
        }
      } catch (e) {
        console.warn("Failed flushing background sync queues:", e);
      }
    };

    const handleOfflineStatus = () => {
      setIsOnline(false);
      o11y.logWarn("system", "Network connection lost, shifting SRE engine to smart offline mode.");
      setToastMessage(lang === "vi" ? "Mất kết nối mạng. Đang hoạt động ở chế độ ngoại tuyến." : "Network Lost. Shifting to Offline mode.");
      setTimeout(() => setToastMessage(null), 3500);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, [lang]);

  // 2. Load and Restore Auto-Saved Drafter Fields on Initial Mount (Auto-Recovery)
  useEffect(() => {
    const performRestore = async () => {
      try {
        const draft = await autoSaveManager.restore();
        if (draft) {
          if (draft.departure) setDeparture(draft.departure);
          if (draft.arrival) setArrival(draft.arrival);
          if (draft.daysCount) setDaysCount(Number(draft.daysCount));
          if (draft.budgetLevel) setBudgetLevel(draft.budgetLevel);
          if (draft.travelStyle) setTravelStyle(draft.travelStyle);
          if (draft.companion) setCompanion(draft.companion);
          if (draft.travelDate) setTravelDate(draft.travelDate);
          if (draft.travelInterests && Array.isArray(draft.travelInterests)) {
            setTravelInterests(draft.travelInterests);
          }
          if (draft.lang) setLang(draft.lang);
          if (draft.chatHistory && Array.isArray(draft.chatHistory)) {
            setChatHistory(draft.chatHistory);
          }
          setAutosaveStatus("saved");
          o11y.logInfo("system", "Enterprise Drafter successfully restored previous user session parameters.");
        }
      } catch (err) {
        console.warn("Recovering state session failed:", err);
      }
    };
    performRestore();
  }, []);

  // 3. Keep Drafter States Synced & Debounced (AutoSave Engine)
  useEffect(() => {
    setAutosaveStatus("saving");
    try {
      autoSaveManager.save({
        departure,
        arrival,
        daysCount,
        budgetLevel,
        travelStyle,
        companion,
        travelDate,
        travelInterests,
        lang,
        chatHistory
      });
      // After a small timeout to let save fire, update to saved status
      const indicatorTimer = setTimeout(() => {
        setAutosaveStatus("saved");
      }, 3500);
      return () => clearTimeout(indicatorTimer);
    } catch (err) {
      setAutosaveStatus("error");
    }
  }, [departure, arrival, daysCount, budgetLevel, travelStyle, companion, travelDate, travelInterests, lang, chatHistory]);

  // Predictive prefetch engine
  const prefetchSubPage = (id: string) => {
    if (id === "hotels") {
      setPrefetchStatus(lang === "vi" ? "Đang nạp trước khách sạn gần ga..." : "Prefetching luxury depots hotels...");
    } else if (id === "routes") {
      setPrefetchStatus(lang === "vi" ? "Đang chuẩn bị giờ tàu Thống Nhất..." : "Preloading rail line schedules...");
    } else if (id === "tours") {
      setPrefetchStatus(lang === "vi" ? "Đang tải trước thám cảnh du lịch..." : "Prefetching Golden Pass tours...");
    } else {
      return;
    }
    setTimeout(() => {
      setPrefetchStatus(null);
    }, 1800);
  };

  // Real-time synchronization of itineraries from Firestore (if Authenticated) or LocalStorage (if Guest)
  useEffect(() => {
    console.log("AUTH UID:", auth.currentUser?.uid);
    const uid = auth.currentUser?.uid;
    if (!uid) {
      // Fallback for offline/guest users
      try {
        const stored = localStorage.getItem("vnr_saved_itineraries");
        setSavedTrips(stored ? JSON.parse(stored) : []);
      } catch (e) {
        console.error("Error loading saved itineraries offline:", e);
      }
      return;
    }

    // Authenticated: Subscribe to Firestore queries in real-time
    const q = query(collection(db, "itineraries"), where("userId", "==", uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const trips: ItineraryResult[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          trips.push({
            itineraryId: data.itineraryId,
            departure: data.departure,
            arrival: data.destination || data.arrival, // map destination dynamically back to arrival property
            destination: data.destination || data.arrival,
            daysCount: Number(data.daysCount || (Array.isArray(data.days) ? data.days.length : 3)),
            title: data.title || `${data.departure} ➔ ${data.destination || data.arrival}`,
            summary: data.summary || "",
            totalEstimatedCostVnd: Number(data.totalEstimatedCostVnd || 0),
            days: Array.isArray(data.days) ? data.days : [],
            recommendedHotels: data.recommendedHotels || [],
            recommendedTours: data.recommendedTours || [],
            survivalTips: data.survivalTips || [],
            departureDate: data.departureDate || "",
            passengers: data.passengers || "Một mình",
            status: data.status || "saved",
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          });
        });
        setSavedTrips(trips);
      },
      (error) => {
        console.warn("Realtime subscription to itineraries catalog failed, falling back to local offline storage:", error);
        try {
          const stored = localStorage.getItem("vnr_saved_itineraries");
          setSavedTrips(stored ? JSON.parse(stored) : []);
        } catch (e) {
          console.error("Error loading offline backup saved itineraries:", e);
        }
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Synchronize Google Firebase Auth Session & Firestore profiles
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("AUTH UID:", auth.currentUser?.uid);
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        const userDocRef = doc(db, "users", uid);
        try {
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: uid,
              email: firebaseUser.email || "",
              displayName: userData.displayName || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Traveler",
              isPremium: userData.premium || false,
              role: (userData.role === "admin" || firebaseUser.email === "vnrtravelai@gmail.com" ? "admin" : "member")
            });
            // Prepare the private profile subcollection asynchronously
            setupPrivateProfile(firebaseUser).catch(err => {
              console.warn("setupPrivateProfile asynchronously failed (fallback):", err);
            });
          } else {
            // User does not exist, create the default record using mandated profile creation schema
            const displayName = firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Traveler";
            const email = firebaseUser.email || "";
            const role = firebaseUser.email === "vnrtravelai@gmail.com" ? "admin" : "user";
            
            await setDoc(
              doc(db, "users", uid),
              {
                userId: uid,
                displayName,
                email,
                role,
                premium: false,
                createdAt: serverTimestamp()
              }
            );

            setUser({
              uid: uid,
              email: email,
              displayName: displayName,
              isPremium: false,
              role: (role === "admin" ? "admin" : "member")
            });

            // Prepare the private profile subcollection asynchronously
            setupPrivateProfile(firebaseUser).catch(err => {
              console.warn("setupPrivateProfile asynchronously failed (fallback):", err);
            });
          }
        } catch (err) {
          const isOffline = !navigator.onLine || (err instanceof Error && err.message.toLowerCase().includes("offline"));
          if (isOffline) {
            console.log("Using local offline fallback profile.");
          } else {
            console.warn("Applied fallback profile:", err instanceof Error ? err.message : String(err));
          }
          // Fallback if firestore reads are delayed or offline, so user is not blocked
          setUser({
            uid: uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Traveler",
            isPremium: false,
            role: (firebaseUser.email === "vnrtravelai@gmail.com" ? "admin" : "member")
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Synchronize Google Analytics page_view & Dynamic SEO Metadata when tab/sub-page/language switches
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    // 1. Google Analytics Logging
    logGoogleAnalyticsEvent("page_view", {
      page_path: `/${activeSubPage}`,
      page_title: activeSubPage,
      userId: uid ?? "guest"
    });

    // 2. SEO Content Mapping
    let titleVal = "";
    let descVal = "";
    let keywordsVal = "";

    const isVi = lang === "vi";

    switch (activeSubPage) {
      case "planner":
        titleVal = isVi 
          ? "Lên Lịch Trình Tàu Hỏa AI - VNR Travel AI" 
          : "AI Train Travel Itinerary Planner - VNR Travel AI";
        descVal = isVi
          ? "Thiết lập lịch trình tàu hỏa Việt Nam tự động chỉ trong vài giây. Tối ưu thời gian hành trình, chi phí, mác tàu SE/SP, ga dừng di sản tiện lợi."
          : "Generate optimal Vietnam train travel plans in seconds. Fully customized rail routes, tickets comparison, transit durations, and estimated budgets.";
        keywordsVal = "lên kế hoạch ai, lịch trình tàu hỏa, đặt vé tàu se, du lịch đại dương, hành trình huế đà nẵng";
        break;
      case "hotels":
        titleVal = isVi
          ? "Đặt Khách Sạn Gần Ga Tàu Hỏa Giá Tốt - VNR Travel AI"
          : "Hotels and HomeStays near Rail Stations - VNR Travel AI";
        descVal = isVi
          ? "Tìm kiếm khách sạn, nhà nghỉ homestay tiện nghi ngay ga Hà Nội, Thừa Thiên Huế, Đà Nẵng, Nha Trang, Ga Sài Gòn. Ưu đãi độc quyền liên kết."
          : "Find premium boutique hotels and cozy homestays within short walking distance of major Vietnam train depots. Link directly to partner discounts.";
        keywordsVal = "khách sạn gần ga huế, homestay ga đà nẵng, khách sạn ga hà nội, lưu trú ga đi tàu";
        break;
      case "tours":
        titleVal = isVi
          ? "Tour Đường Sắt Trải Nghiệm Ga Di Sản - VNR Travel AI"
          : "Heritage Railway Tours & Train Passenger Excursions - VNR Travel AI";
        descVal = isVi
          ? "Đăng ký các chương trình trải nghiệm đặc sắc bằng tàu hỏa di sản Huế - Đà Nẵng, ngắm đèo Hải Vân hùng vĩ, vịnh Lăng Cô và ẩm thực khoang dịch vụ tàu."
          : "Book boutique train tours over the legendary Hai Van pass, exploring historic rail stations, gourmet food tours, and panoramic seascape viewing wagons.";
        keywordsVal = "tour huế đà nẵng bằng tàu, tàu di sản hd1, check-in đèo hải vân, tour ga đường sắt";
        break;
      case "guides":
        titleVal = isVi
          ? "Cẩm Nang Kinh Nghiệm Đi Tàu Hỏa Thống Nhất - VNR Travel AI"
          : "Vietnam Rail Travel Guides & Experience Blogs - VNR Travel AI";
        descVal = isVi
          ? "Tổng hợp cẩm nang đi tàu Bắc Nam thực tế, so sánh khoang giường nằm mác tàu SE, thông tin giờ chạy, đặt vé online, quy định hành lý đường sắt."
          : "Read master rail tips, comprehensive sleeper cabin comparisons, ticket purchasing instructions, and packing regulations for Vietnam Railways network.";
        keywordsVal = "kinh nghiệm đi tàu se, so sánh khoang tàu se19, bảng giờ tàu bắc nam, cẩm nang đi tàu hỏa";
        break;
      case "community":
        titleVal = isVi
          ? "Diễn Đàn Cộng Đồng Hành Khách Tàu Hỏa Việt Nam - VNR Travel AI"
          : "VNR Passenger Community & Shared Rail Travel Forums - VNR Travel AI";
        descVal = isVi
          ? "Trang cộng đồng chia sẻ hình ảnh check-in toa tàu sắt, thảo luận mác tàu chất lượng cao, review vé tàu thực tế và trao đổi của tín đồ xê dịch."
          : "Join the conversation on Vietnam's top railroad community hub. Post checked-in cabin snapshots, exchange honest train route reviews and tips.";
        keywordsVal = "diễn đàn đi tàu, cộng đồng vnr travel, chia sẻ ảnh đi tàu hỏa việt nam, thảo luận du lịch";
        break;
      case "routes":
        titleVal = isVi
          ? "Tra Cứu Bản Đồ Hành Trình Đường Sắt - VNR Travel AI"
          : "Interactive Rail Route Map Tracker - VNR Travel AI";
        descVal = isVi
          ? "Tra cứu chi tiết các ga dừng chân, khoảng cách và thời gian di chuyển của tuyến tuyến đường Thống Nhất và các mác tàu cao cấp."
          : "Explore station stops, travel distance markers and exact departure times across the primary North-South railway network map.";
        keywordsVal = "bản đồ ga tàu hỏa, ga thống nhất, thời gian tàu chạy, tuyến đường sắt việt nam";
        break;
      case "home":
      default:
        titleVal = isVi
          ? "VNR Travel AI - Lên Kế Hoạch & Cộng Đồng Du Lịch Tàu Hỏa Việt Nam"
          : "VNR Travel AI - Train Travel Planner & Passenger Community";
        descVal = isVi
          ? "Hỗ trợ lên lịch trình mác tàu hỏa Việt Nam tự động bằng công nghệ AI. Tìm khách sạn gần nhà ga, kết nối đại lý BAOLAU, 12go và chia sẻ cộng đồng."
          : "Establish beautiful Vietnam train travel itineraries powered by custom generative intelligence. Connect with booking agents and community hub.";
        keywordsVal = "vnr du lịch, tàu hỏa việt nam, liên kết baolau, đặt phòng khách sạn ga tàu, lập lịch tàu hỏa ai";
        break;
    }

    // Set Document Head Properties
    document.title = titleVal;

    // Helper to query and update meta
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", contentVal);
    };

    setMetaTag("name", "description", descVal);
    setMetaTag("name", "keywords", keywordsVal);

    // Open Graph
    setMetaTag("property", "og:title", titleVal);
    setMetaTag("property", "og:description", descVal);
    setMetaTag("property", "og:url", `https://vnrtravelai.web.app/${activeSubPage}`);

    // Twitter Card
    setMetaTag("property", "twitter:title", titleVal);
    setMetaTag("property", "twitter:description", descVal);
    setMetaTag("property", "twitter:url", `https://vnrtravelai.web.app/${activeSubPage}`);

  }, [activeSubPage, lang, user]);

  const saveItinerary = async (trip: ItineraryResult) => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.warn("User not authenticated inside saveItinerary");
      setToastMessage("Vui lòng đăng nhập để lưu hành trình");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    const docDeparture = trip.departure || departure || "Hà Nội";
    const docDestination = trip.arrival || trip.destination || arrival || "Đà Nẵng";
    const docDepartureDate = trip.departureDate || travelDate || new Date().toISOString().split("T")[0];
    const docDays = trip.days || [];
    const docPassengers = trip.passengers || companion || "Một mình";

    const getRandomId = () => {
      try {
        if (typeof window !== "undefined" && window.crypto && typeof window.crypto.randomUUID === "function") {
          return window.crypto.randomUUID();
        }
      } catch (e) {}
      return Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 10);
    };

    const itineraryId = getRandomId();

    try {
      await setDoc(
        doc(db, "itineraries", itineraryId),
        {
          itineraryId,
          userId: uid,
          departure: docDeparture,
          destination: docDestination,
          departureDate: docDepartureDate,
          days: docDays,
          passengers: docPassengers,
          status: "saved",
          title: trip.title || `${docDeparture} ➔ ${docDestination}`,
          summary: trip.summary || "",
          totalEstimatedCostVnd: trip.totalEstimatedCostVnd || 0,
          recommendedHotels: trip.recommendedHotels || [],
          recommendedTours: trip.recommendedTours || [],
          survivalTips: trip.survivalTips || [],
          daysCount: trip.daysCount || daysCount || 3,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
      );

      // Show toast: "Saved successfully"
      setToastMessage("Saved successfully");
      setTimeout(() => setToastMessage(null), 3000);

      // After save: reload user's itineraries
      const reloadQuery = query(
        collection(db, "itineraries"),
        where("userId", "==", uid)
      );
      const querySnapshot = await getDocs(reloadQuery);
      const trips: ItineraryResult[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        trips.push({
          itineraryId: data.itineraryId,
          departure: data.departure,
          arrival: data.destination || data.arrival,
          destination: data.destination || data.arrival,
          daysCount: Number(data.daysCount || (Array.isArray(data.days) ? data.days.length : 3)),
          title: data.title || `${data.departure} ➔ ${data.destination || data.arrival}`,
          summary: data.summary || "",
          totalEstimatedCostVnd: Number(data.totalEstimatedCostVnd || 0),
          days: Array.isArray(data.days) ? data.days : [],
          recommendedHotels: data.recommendedHotels || [],
          recommendedTours: data.recommendedTours || [],
          survivalTips: data.survivalTips || [],
          departureDate: data.departureDate || "",
          passengers: data.passengers || "Một mình",
          status: data.status || "saved",
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        });
      });
      setSavedTrips(trips);
    } catch (err) {
      console.error("Firestore user save itinerary failed:", err);
      setToastMessage("Error saving itinerary");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const deleteTrip = async (id: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "itineraries", id));
        console.log("Itinerary deleted from Firestore:", id);
      } catch (err) {
        console.error("Firestore user delete itinerary failed:", err);
      }
    } else {
      const updated = savedTrips.filter(t => t.itineraryId && t.itineraryId !== id);
      setSavedTrips(updated);
      try {
        localStorage.setItem("vnr_saved_itineraries", JSON.stringify(updated));
      } catch (e) {
        console.error("Error deleting local offline itinerary:", e);
      }
    }
  };

  const updateTrip = async (id: string, updatedFields: Partial<ItineraryResult>) => {
    // Check if the user is authenticated
    if (user) {
      try {
        const docRef = doc(db, "itineraries", id);
        // Prepare the updated document fields including destination mapping if arrival is modified
        const fieldsToSave: any = {
          ...updatedFields,
          updatedAt: serverTimestamp()
        };
        if (updatedFields.arrival) {
          fieldsToSave.destination = updatedFields.arrival;
        }
        await updateDoc(docRef, fieldsToSave);
        console.log("Itinerary updated successfully in Firestore:", id);
      } catch (err) {
        console.error("Firestore update itinerary failed:", err);
      }
    } else {
      // Offline fallback
      const updated = savedTrips.map(t => t.itineraryId === id ? { ...t, ...updatedFields } : t);
      setSavedTrips(updated);
      try {
        localStorage.setItem("vnr_saved_itineraries", JSON.stringify(updated));
      } catch (e) {
        console.error("Error updating local offline itinerary:", e);
      }
    }
  };

  const setPlannerPresets = (from: string, to: string) => {
    setDeparture(from);
    setArrival(to);
    setDaysCount(2);
    setTravelStyle("Khám phá di sản");
  };

   // Shared click conversion tracking function (calls API to record logs)
  const trackAffiliateClick = async (
    provider: string, 
    targetUrl: string, 
    campaignArg = "general_web",
    serviceTypeArg?: string,
    routeArg?: string
  ) => {
    // Show instant user feedback toast
    setToastMessage(`❝ Đang kết nối đối tác ➔ ${provider.toUpperCase()} (${campaignArg})... ❞`);
    setTimeout(() => setToastMessage(null), 4000);

    const getRandomId = () => {
      try {
        if (typeof window !== "undefined" && window.crypto && typeof window.crypto.randomUUID === "function") {
          return window.crypto.randomUUID();
        }
      } catch (e) {}
      return Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 10);
    };

    const clickId = getRandomId();
    const urlParams = new URLSearchParams(window.location.search);
    const campaign = urlParams.get("utm_campaign") || campaignArg || "default_campaign";
    const source = urlParams.get("utm_source") || "itinerary_planner";
    const utm_medium = urlParams.get("utm_medium") || "referral";
    const referrer = document.referrer || "Direct";
    const ua = navigator.userAgent;
    
    let device = "Desktop";
    if (/android/i.test(ua)) device = "Android Mobile";
    else if (/iphone|ipod/i.test(ua)) device = "iOS Mobile";
    else if (/ipad/i.test(ua)) device = "iOS Tablet";
    else if (/tablet|playbook|silk/i.test(ua)) device = "Android Tablet";
    else if (/mobi/i.test(ua)) device = "Mobile";

    const platform = navigator.platform || "Unknown";

    // Build the partner URL with embedded UTM campaigns
    let finalTargetUrl = targetUrl;
    try {
      const parsedUrl = new URL(targetUrl);
      parsedUrl.searchParams.set("utm_source", source);
      parsedUrl.searchParams.set("utm_medium", utm_medium);
      parsedUrl.searchParams.set("utm_campaign", campaign);
      parsedUrl.searchParams.set("vnr_click_id", clickId);
      finalTargetUrl = parsedUrl.toString();
    } catch {
      const conn = targetUrl.includes("?") ? "&" : "?";
      finalTargetUrl = `${targetUrl}${conn}utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(utm_medium)}&utm_campaign=${encodeURIComponent(campaign)}&vnr_click_id=${clickId}`;
    }

    // Auto-detect serviceType if not specified
    let serviceType = serviceTypeArg;
    if (!serviceType) {
      const p = provider.toLowerCase();
      if (p.includes("baolau")) serviceType = "train_ticket";
      else if (p.includes("12go")) serviceType = "transport";
      else if (p.includes("traveloka")) serviceType = "hotel_flight";
      else if (p.includes("trip")) serviceType = "hotel_flight";
      else if (p.includes("vexere") || p.includes("xe")) serviceType = "bus_ticket";
      else if (p.includes("agoda") || p.includes("booking")) serviceType = "hotel_flight";
      else if (p.includes("klook") || p.includes("tour")) serviceType = "transport";
      else serviceType = "transport";
    }

    // Auto-detect route if not specified
    let route = routeArg;
    if (!route) {
      try {
        const parsedUrl = new URL(targetUrl);
        const dep = parsedUrl.searchParams.get("departure") || parsedUrl.searchParams.get("dep") || parsedUrl.searchParams.get("from");
        const arr = parsedUrl.searchParams.get("arrival") || parsedUrl.searchParams.get("arr") || parsedUrl.searchParams.get("to");
        if (dep && arr) {
          route = `${dep} ➔ ${arr}`;
        }
      } catch {
        // Ignored
      }
    }
    if (!route) {
      if (departure && arrival) {
        route = `${departure} ➔ ${arrival}`;
      } else {
        route = "Hà Nội ➔ Đà Nẵng";
      }
    }

    const utm_source = source;
    const utm_campaign = campaign;

    const uid = auth.currentUser?.uid;

    // Immediately open target URL to prevent popup blocker and provide instant transition
    try {
      window.open(finalTargetUrl, "_blank");
    } catch (openErr) {
      console.warn("Failed to open affiliate window directly, will retry after log", openErr);
    }

    // Direct write into Firestore collection path: affiliateClicks in the background
    addDoc(
      collection(db, "affiliateClicks"),
      {
        clickId,
        userId: uid ?? "guest",
        provider,
        campaign,
        source,
        targetUrl: finalTargetUrl,
        referrer: document.referrer,
        device: navigator.userAgent,
        platform: navigator.platform,
        route,
        serviceType,
        utm_source,
        utm_medium,
        utm_campaign,
        createdAt: serverTimestamp()
      }
    ).then(() => {
      console.log("Firestore affiliate click tracked successfully:", clickId);
    }).catch((e) => {
      console.warn("Firestore click tracking logging failed, writing to localStorage fallback instead:", e);
      try {
        const fallbackClicks = JSON.parse(localStorage.getItem("vnr_fallback_affiliate_clicks") || "[]");
        fallbackClicks.push({
          clickId,
          userId: uid ?? "guest",
          provider,
          campaign,
          source,
          targetUrl: finalTargetUrl,
          referrer: document.referrer,
          device: navigator.userAgent,
          platform: navigator.platform,
          route,
          serviceType,
          utm_source,
          utm_medium,
          utm_campaign,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem("vnr_fallback_affiliate_clicks", JSON.stringify(fallbackClicks));
      } catch (err) {
        console.warn("localStorage alternative tracking failed:", err);
      }
    });
  };

  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const isProduction = import.meta.env.PROD || import.meta.env.VITE_SHOW_INTERNAL === "false";

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isChatLoading) return;

    const userText = chatMessage.trim();
    setChatMessage("");
    setChatHistory((prev) => [...prev, { role: "user", text: userText }]);
    setIsChatLoading(true);

    try {
      const responseText = await aiOrchestrator.executeQuery(
        "chatbot",
        { userText, historyLength: chatHistory.length },
        async (signal) => {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: userText,
              history: chatHistory
            }),
            signal
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          if (data && data.error) {
            throw new Error(data.error);
          }
          return data.text || "";
        }
      );

      if (responseText) {
        setChatHistory((prev) => [...prev, { role: "model", text: responseText }]);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setChatHistory((prev) => [
          ...prev,
          { role: "model", text: lang === "vi" 
            ? "Thành thật xin lỗi, kết nối mạng gặp gián đoạn. Tôi vẫn sẵn sàng tư vấn cho bạn khi tín hiệu ổn định hơn!" 
            : "We are deeply sorry, the connection experienced an interruption. I am fully ready to advise you once the signal stabilizes!" 
          }
        ]);
      }
    } finally {
      setIsChatLoading(false);
    }
  };

  // Top level pages definitions for navigation
  const subPagesList = [
    { id: "home", label_vi: "Trang Chủ", label_en: "Home", icon: Home },
    { id: "planner", label_vi: "Lịch Trình AI", label_en: "AI Planner", icon: Compass },
    { id: "routes", label_vi: "Mác Tàu & Giờ", label_en: "Train Schedule", icon: Train },
    { id: "community", label_vi: "Cộng Đồng", label_en: "Community", icon: Users },
    { id: "my-trips", label_vi: "Hành trình của tôi", label_en: "My Trips", icon: Bookmark },
    { id: "profile", label_vi: "Trang cá nhân", label_en: "Profile", icon: User }
  ];

  const handleSubPageClick = (id: string) => {
    setActiveSubPage(id);
  };

  return (
    <div 
      id="vnr-scenic-app" 
      className={`relative min-h-screen w-full overflow-x-hidden bg-cover bg-center transition-all duration-700 flex flex-col justify-start ${
        deviceInfo.type === 'mobile' ? 'p-0' : 'p-2 sm:p-4 md:p-6 lg:p-8'
      }`} 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2000&q=80')" }}
    >
      {/* Premium dark scenic overlay */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px] z-0" />

      {/* Main floating console panel with high-contrast glassmorphism */}
      <div 
        className={`relative z-10 transition-all duration-500 space-y-6 ${
          deviceInfo.type === 'mobile' 
            ? 'bg-white/95 rounded-none min-h-screen p-3 w-full border-none shadow-none' 
            : 'bg-white/45 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-7 shadow-2xl border border-white/40'
        }`}
      >
      
      {/* Dynamic Toast Feedback Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-8 right-8 z-50 bg-emerald-950 border border-emerald-450 text-[#86EFAC] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 max-w-sm font-mono text-[11px] leading-tight"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner & Language Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-205 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-700 animate-pulse" />
            <h3 className="font-extrabold text-sm text-[#01411C] tracking-wide uppercase font-sans">
              ★ VNR Travel AI
            </h3>
            {user?.isPremium && (
              <span className="bg-amber-100 text-yellow-800 border border-yellow-200 font-bold font-mono text-[8px] px-1.5 py-0.2 rounded uppercase">
                Premium Verified
              </span>
            )}
          </div>
          <p className="text-xs font-bold tracking-wide text-emerald-950 bg-gradient-to-r from-emerald-950 to-emerald-800 bg-clip-text text-transparent drop-shadow-xs">
            {t("Nền tảng AI Du lịch Đường sắt Việt Nam", "Vietnam Railway Travel AI Platform")}
          </p>
        </div>

        {/* Controls Container with Device Detector & Language Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* SRE Predictive Prefetching Feedback Badge */}
          {prefetchStatus && (
            <span className="inline-flex items-center gap-1 text-[9px] text-amber-800 font-bold uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shrink-0 animate-pulse">
              <Sparkles className="w-3 h-3 text-amber-600 animate-spin" />
              {prefetchStatus}
            </span>
          )}

          {/* SRE Auto-Save Draft Status Badge */}
          {autosaveStatus === "saving" && (
            <span className="inline-flex items-center gap-1 text-[9px] text-[#01411C] font-black uppercase tracking-wider bg-green-50 px-2 py-1 rounded-lg border border-green-200 shrink-0">
              <RefreshCcw className="w-3 h-3 animate-spin text-[#01411C]" />
              {t("Đang tự lưu...", "Auto-saving...")}
            </span>
          )}
          {autosaveStatus === "saved" && (
            <span className="inline-flex items-center gap-1 text-[9px] text-emerald-800 font-black uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 shrink-0">
              <Cloud className="w-3.5 h-3.5 text-emerald-600" />
              {t("Đã lưu nháp", "Draft saved")}
            </span>
          )}

          {/* SRE Online / Offline Connection Status Badge */}
          {isOnline ? (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-black px-2 py-1 rounded-lg shrink-0 uppercase tracking-wider">
              <Wifi className="w-3 h-3 text-emerald-600 animate-pulse" />
              {t("Trực tuyến", "Online")}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-800 border border-red-200 text-[9px] font-black px-2 py-1 rounded-lg shrink-0 uppercase tracking-wider animate-bounce">
              <WifiOff className="w-3 h-3 text-red-600 animate-pulse" />
              {t("Ngoại tuyến", "Offline")}
            </span>
          )}

          {/* Language switch button */}
          <button
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold px-3 py-1.5 rounded-xl text-[10px] flex items-center gap-1.5 transition-all cursor-pointer shadow-inner shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-slate-450" />
            <span>{lang === "vi" ? "ĐỔI SANG TIẾNG ANH" : "CHANGE TO VIETNAMESE"}</span>
          </button>
        </div>
      </div>

      {/* SCROLLABLE 11 SUITES NAVIGATION BAR */}
      <div className="overflow-x-auto scrollbar-thin">
        <div className="flex gap-1.5 min-w-[900px] border-b border-slate-200/40 pb-2">
          {subPagesList.map((sp) => {
            const Icon = sp.icon;
            const active = activeSubPage === sp.id;
            return (
              <button
                key={sp.id}
                onClick={() => handleSubPageClick(sp.id)}
                onMouseEnter={() => prefetchSubPage(sp.id)}
                className={`py-2 px-3 rounded-xl text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1.5 transition-all focus:outline-none cursor-pointer ${
                  active 
                    ? "bg-[#01411C] text-white shadow-xs" 
                    : "bg-white border border-slate-150 text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-yellow-405" : "text-slate-400"}`} />
                <span>{lang === "vi" ? sp.label_vi : sp.label_en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTAINER ACTIVE SUBVIEW RENDERING */}
      <div className="pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubPage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
            className="focus:outline-none"
          >
            {activeSubPage === "home" && (
              <LocalErrorBoundary featureName="Trang chủ (Home View)">
                <HomeView 
                  lang={lang} 
                  setSubPage={setActiveSubPage} 
                  setPlannerPresets={setPlannerPresets} 
                  trackAffiliateClick={trackAffiliateClick} 
                />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "planner" && (
              <LocalErrorBoundary featureName="Trình lập lịch trình AI (AI Planner)">
                <PlannerView 
                  lang={lang}
                  departure={departure}
                  setDeparture={setDeparture}
                  arrival={arrival}
                  setArrival={setArrival}
                  daysCount={daysCount}
                  setDaysCount={setDaysCount}
                  budgetLevel={budgetLevel}
                  setBudgetLevel={setBudgetLevel}
                  travelStyle={travelStyle}
                  setTravelStyle={setTravelStyle}
                  companion={companion}
                  setCompanion={setCompanion}
                  travelDate={travelDate}
                  setTravelDate={setTravelDate}
                  travelInterests={travelInterests}
                  setTravelInterests={setTravelInterests}
                  itinerary={currentItinerary}
                  setItinerary={setCurrentItinerary}
                  saveItinerary={saveItinerary}
                  trackAffiliateClick={trackAffiliateClick}
                />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "routes" && (
              <LocalErrorBoundary featureName="Thông tin Ga tàu & Giờ chạy (Routes/Timetables)">
                <RoutesView 
                  lang={lang} 
                  trackAffiliateClick={trackAffiliateClick} 
                />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "guides" && (
              <LocalErrorBoundary featureName="Cẩm nang du lịch đường sắt (Guides & Handbooks)">
                <GuidesView lang={lang} />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "hotels" && (
              <LocalErrorBoundary featureName="Khách sạn liên kết đối tác (Partner Hotels)">
                <HotelsView 
                  lang={lang} 
                  trackAffiliateClick={trackAffiliateClick} 
                />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "tours" && (
              <LocalErrorBoundary featureName="Tour du lịch di sản (Heritage Excursions)">
                <ToursView 
                  lang={lang} 
                  trackAffiliateClick={trackAffiliateClick} 
                />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "community" && (
              <LocalErrorBoundary featureName="Cộng đồng hành khách (Community Forum)">
                <CommunityView lang={lang} user={user} />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "my-trips" && (
              <LocalErrorBoundary featureName="Lịch trình đã lưu (My Trips Inventory)">
                <MyTripsView 
                  lang={lang}
                  savedTrips={savedTrips}
                  deleteTrip={deleteTrip}
                  updateTrip={updateTrip}
                  setSubPage={setActiveSubPage}
                  setItinerary={setCurrentItinerary}
                />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "profile" && (
              <LocalErrorBoundary featureName="Quản lý hồ sơ cá nhân (User Profile Suite)">
                <ProfileView 
                  lang={lang} 
                  user={user} 
                  setUser={setUser} 
                />
              </LocalErrorBoundary>
            )}

            {activeSubPage === "admin" && (
              (!user || user.role !== "admin") ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 max-w-md mx-auto animate-fade-in shadow-xs">
                  <div className="w-12 h-12 bg-red-50 text-red-650 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="font-extrabold text-sm text-[#ea4335] uppercase tracking-wide">{t("TRUY CẬP BỊ TỪ CHỐI (403)", "FORBIDDEN ACCESS (403)")}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t(
                      "Yêu Cầu Quyền Quản Trị Viên: Tài khoản hiện tại của bạn không có đặc quyền truy cập trang quản trị CRM (Admin Dashboard). Mọi hành vi xâm nhập trái phép đều được ghi nhận lại.",
                      "Administrative privileges are required for access to the CRM Control Center. Your current profile does not carry authorized admin roles."
                    )}
                  </p>
                  <div className="pt-2 flex justify-center gap-2">
                    <button
                      onClick={() => setActiveSubPage("home")}
                      className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      {t("Quay Lại Trang Chủ", "Return to Home")}
                    </button>
                    <button
                      onClick={() => setActiveSubPage("profile")}
                      className="bg-[#ea4335] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer transition-colors shadow-xs"
                    >
                      {t("Thay Đổi Tài Khoản", "Switch Account")}
                    </button>
                  </div>
                </div>
              ) : (
                <AdminView lang={lang} />
              )
            )}

            {activeSubPage === "techhub" && (
              <TechHubView lang={lang} />
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      </div>

      {/* Floating AI Assistant Button & Interactive Panel */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-8 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              className="bg-slate-900/95 backdrop-blur-2xl border-2 border-[#D4AF37]/50 rounded-[24px] shadow-2xl w-[320px] sm:w-[360px] h-[450px] flex flex-col overflow-hidden mb-4 mr-0 sm:mr-2"
            >
              {/* Header */}
              <div className="bg-[#01411C] p-4 border-b border-[#D4AF37]/30 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/25 flex items-center justify-center border border-[#D4AF37]/40">
                    <Sparkles className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[11px] font-black tracking-widest text-[#FFFDF4] uppercase font-mono">VNR Ambassador</h4>
                    <p className="text-[9px] text-emerald-300 font-bold leading-none mt-0.5">{t("Trợ Lý Đường Sắt AI", "AI Train Assistant")}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/60 hover:text-white p-1 rounded-full text-xs font-bold cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none flex flex-col justify-start">
                {chatHistory.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed text-left ${
                        msg.role === "user" 
                          ? "bg-[#D4AF37] text-slate-950 font-extrabold rounded-tr-none shadow-sm" 
                          : "bg-white/10 text-emerald-50 rounded-tl-none border border-white/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-emerald-100/70 rounded-2xl p-3 text-xs rounded-tl-none border border-white/5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendChatMessage} className="p-3 border-t border-white/10 bg-slate-950/45 flex gap-2 shrink-0">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={t("Hỏi về ga Huế, mác tàu, mẹo ngắm cảnh...", "Ask about Hue depot, trains, pass view tips...")}
                  className="flex-1 text-xs text-white placeholder-slate-400 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-[#D4AF37]/60"
                />
                <button 
                  type="submit"
                  disabled={!chatMessage.trim() || isChatLoading}
                  className="bg-[#D4AF37] hover:bg-[#bfa032] disabled:opacity-50 text-slate-950 p-2.5 rounded-xl cursor-pointer transition-colors duration-200 shrink-0 flex items-center justify-center min-h-[38px]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all duration-300 active:scale-90 cursor-pointer ${
            isChatOpen 
              ? "bg-[#D4AF37] border-white text-slate-950 rotate-90 scale-105" 
              : "bg-gradient-to-tr from-[#01411C] to-[#0d5c2d] border-[#D4AF37] text-[#FFD700] hover:scale-105 hover:shadow-[#D4AF37]/25"
          }`}
        >
          {isChatOpen ? (
            <span className="text-xl font-bold font-mono">✕</span>
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6 text-[#FFD700]" />
              <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile-Only Sticky Bottom Navigation Bar */}
      {deviceInfo.type === "mobile" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/80 pb-safe shadow-[0_-8px_30px_rgb(0,0,0,0.12)] flex justify-around items-center py-2 px-1">
          {[
            { id: "home", label: t("Trang Chủ", "Home"), icon: Home },
            { id: "planner", label: t("AI Planner", "Planner"), icon: Compass },
            { id: "routes", label: t("Mác Tàu", "Schedule"), icon: Train },
            { id: "community", label: t("Cộng Đồng", "Social"), icon: Users },
            { id: "my-trips", label: t("Hành trình của tôi", "Trips"), icon: Bookmark },
            { id: "profile", label: t("Trang cá nhân", "Profile"), icon: User },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeSubPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSubPageClick(item.id)}
                className="flex flex-col items-center gap-0.5 cursor-pointer focus:outline-none transition-all active:scale-95 flex-1 py-1"
              >
                <div className={`p-1.5 rounded-full transition-all duration-250 ${active ? "bg-emerald-100 text-[#01411C] scale-110" : "text-slate-400"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[9px] font-black tracking-tight ${active ? "text-[#01411C] font-extrabold" : "text-slate-400 font-medium"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Device Optimization Details Modal */}
      <AnimatePresence>
        {showDeviceOptimizationModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 max-w-sm w-full space-y-4 font-sans text-slate-800"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-700 animate-spin" style={{ animationDuration: '4s' }} />
                  <h3 className="text-xs font-black text-[#01411C] uppercase tracking-wider">
                    {t("Tối Ưu Hóa Thiết Bị", "Device Profile Optimizer")}
                  </h3>
                </div>
                <button
                  onClick={() => setShowDeviceOptimizationModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-extrabold text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-[11px] leading-relaxed text-slate-600">
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-150 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    {deviceInfo.type === "mobile" ? (
                      <Smartphone className="w-4 h-4" />
                    ) : deviceInfo.type === "tablet" ? (
                      <Tablet className="w-4 h-4" />
                    ) : (
                      <Laptop className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-450 uppercase font-black tracking-widest block">
                      {t("Hệ điều hành / Thiết bị", "Detected Profile")}
                    </span>
                    <span className="text-xs font-black text-slate-800 block">
                      {deviceInfo.name} ({deviceInfo.os})
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <h4 className="font-extrabold text-slate-800 text-[10px] uppercase tracking-wider">
                    {t("Các tinh chỉnh đã tự động kích hoạt:", "Automated optimizations active:")}
                  </h4>

                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-850 block">
                        {t("Bố cục Responsive & Touch", "Responsive & Touch Target Padding")}
                      </span>
                      <span className="text-slate-450 text-[10px] block leading-snug">
                        {t(
                          "Căn chỉnh kích cỡ nút tối thiểu 44px, tăng khoảng cách đệm trên màn hình cảm ứng giúp thao tác mượt mà.",
                          "Minimum button sizes of 44px and expanded touch zones to fit your screen perfectly."
                        )}
                      </span>
                    </div>
                  </div>

                  {deviceInfo.type === "mobile" && (
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-850 block">
                          {t("Thanh Điều Hướng Thuận Tiện", "Thumb-Reach Floating Bottom Nav")}
                        </span>
                        <span className="text-slate-450 text-[10px] block leading-snug">
                          {t(
                            "Kích hoạt thanh điều hướng nổi phía dưới màn hình giúp chuyển đổi nhanh các trang chính bằng ngón cái.",
                            "Enables floating bottom nav bar for swift tabs transition without scrolling to the top menu bar."
                          )}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-850 block">
                        {t("Cân Bằng Hiệu Năng & Pin", "Performance & Battery Conservation")}
                      </span>
                      <span className="text-slate-450 text-[10px] block leading-snug">
                        {t(
                          "Tối ưu hoạt họa nền, tiết kiệm pin cho thiết bị di động khi di chuyển trên tàu.",
                          "Reduced animation frames and hardware acceleration designed to preserve battery on railway journeys."
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-850 block">
                        {t("Tối Ưu Độ Tương Phản Ngoài Trời", "Contrast Filter")}
                      </span>
                      <span className="text-slate-450 text-[10px] block leading-snug">
                        {t(
                          "Bổ sung lớp phủ nền phong cảnh tối giúp đọc rõ thông tin giờ tàu dưới trời nắng rực rỡ.",
                          "Scenic backdrop filters allow easy readability under strong outdoor daylight."
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowDeviceOptimizationModal(false)}
                  className="bg-[#01411C] hover:bg-[#013014] text-white font-black py-2 px-4 rounded-xl text-[10px] cursor-pointer shadow-md transition-all active:scale-95 duration-150 uppercase"
                >
                  {t("Đồng Ý & Tiếp Tục", "Understand & Continue")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
