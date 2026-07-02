import React, { useState, useEffect } from "react";
import { Download, WifiOff, X, Sparkles, Check } from "lucide-react";
import { logGoogleAnalyticsEvent } from "../lib/firebase";

interface PWAManagerProps {
  lang: "vi" | "en";
}

export default function PWAManager({ lang }: PWAManagerProps) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default"
  );
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  useEffect(() => {
    // 1. Monitor network changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 2. Capture install prompt (beforeinstallprompt)
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);

    // 3. Register Service Worker with precaching
    if ("serviceWorker" in navigator) {
      try {
        navigator.serviceWorker.register("/sw.js")
          .then((reg) => {
            console.log("Service Worker registered successfully:", reg.scope);
          })
          .catch((err) => {
            console.warn("Service Worker registration skipped or failed:", err);
          });
      } catch (swErr) {
        console.warn("Service Worker register threw a synchronous error (typically in private/sandboxed iframe):", swErr);
      }
    }

    // Check if running in standalone display mode (installed)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    logGoogleAnalyticsEvent("pwa_install_interactive", {
      outcome,
      userId: "anonymous"
    });

    if (outcome === "accepted") {
      setIsInstalled(true);
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleRequestNotification = async () => {
    if (!("Notification" in window)) {
      alert(t("Trình duyệt này không hỗ trợ Thông Báo Đẩy.", "This browser does not support push notifications."));
      return;
    }

    try {
      let permission: NotificationPermission;
      try {
        permission = await Notification.requestPermission();
      } catch (e) {
        // Fallback for callback-based requestPermission or restriction throw
        permission = await new Promise<NotificationPermission>((resolve) => {
          try {
            Notification.requestPermission(resolve);
          } catch (innerErr) {
            resolve("denied");
          }
        });
      }
      setNotificationPermission(permission);
      
      logGoogleAnalyticsEvent("push_permission_grant", {
        permission,
        userId: "anonymous"
      });

      if (permission === "granted") {
        setShowNotificationToast(true);
        setTimeout(() => setShowNotificationToast(false), 4000);

        // Send a mock local notification to trigger worker foundation
        if ("serviceWorker" in navigator) {
          try {
            const reg = await navigator.serviceWorker.ready;
            if (reg && typeof reg.showNotification === "function") {
              await reg.showNotification(t("VNR Travel AI Kích Hoạt!", "VNR Travel AI Activated!"), {
                body: t("Chúc mừng bạn đã kết nối thành công hệ thống tin báo đẩy di sản đường sắt.", "You have successfully plugged into the VNR heritage push notification vault!"),
                icon: "/icons/icon-192x192.png",
                badge: "/favicon.ico",
              });
            }
          } catch (swError) {
            console.warn("Service Worker ready local notification failed (typically iframe context):", swError);
          }
        }
      }
    } catch (err) {
      console.error("Error setting up notifications permissions:", err);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 flex flex-col gap-3 max-w-sm w-full">
      {/* 1. Offline / Online network state monitor toast */}
      {!isOnline && (
        <div className="bg-red-600 text-white rounded-2xl p-3.5 shadow-xl border border-red-500 flex items-center gap-3 animate-bounce">
          <WifiOff className="w-5 h-5 text-white animate-pulse shrink-0" />
          <div className="text-xs">
            <strong className="block font-bold">{t("Chế độ Ngoại tuyến / Offline Mode", "Offline Connection Mode")}</strong>
            <span className="text-[10px] opacity-80">{t("Đang hiển thị dữ liệu từ bộ nhớ đệm Cache.", "Serving elements directly from persistent service worker cache.")}</span>
          </div>
        </div>
      )}



      {/* 2. Custom Application Install banner prompt */}
      {showInstallBanner && !isInstalled && (
        <div className="bg-white border-2 border-[#01411C] rounded-2xl p-4 shadow-2xl space-y-3 relative overflow-hidden animate-fade-in text-slate-800">
          <button 
            onClick={() => setShowInstallBanner(false)} 
            className="absolute top-2.5 right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#01411C] shrink-0 border border-emerald-100">
              <Download className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                {t("Cài đặt VNR Travel AI", "Install VNR Travel App")}
              </h4>
              <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                {t("Cài đặt ứng dụng lên màn hình chính để lưu lịch trình ngoại tuyến, lướt diễn đàn mượt mà và tiết kiệm pin.", "Add to home screen for offline travel storage, seamless feed browsing and minimal battery consumption.")}
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-[10px] font-black text-slate-450 hover:text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer"
            >
              {t("Để sau", "Later")}
            </button>
            <button
              onClick={handleInstallClick}
              className="bg-[#01411C] text-white hover:bg-green-800 text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md cursor-pointer"
            >
              <Download className="w-3 h-3 text-yellow-300" />
              {t("CÀI ĐẶT NGAY", "INSTALL APP")}
            </button>
          </div>
        </div>
      )}



      {/* 4. Notification success toast */}
      {showNotificationToast && (
        <div className="bg-[#01411C] text-white rounded-2xl p-3 shadow-xl border border-green-600 flex items-center gap-3 animate-slide-in">
          <div className="w-6 h-6 bg-green-855 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-yellow-300" />
          </div>
          <div className="text-[10px] leading-tight">
            <strong className="block font-semibold">{t("Mạng Tin Báo Đã Sẵn Sàng", "Push Services Linked")}</strong>
            <span className="opacity-80">{t("Hệ thống thông báo đẩy VNR Travel AI đã chạy ngầm.", "VNR background notification vault is listening.")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
