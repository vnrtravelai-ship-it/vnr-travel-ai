import React, { useState, useEffect } from "react";
import { Train, Compass, Users, BookOpen, Sparkles, Cpu, Award, Database, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import FounderDashboard from "./FounderDashboard";

// Statically import internal sub-components. Since Workspace itself is lazy-loaded,
// these will be bundled in the lazy chunk and not loaded in Production.
import PrdViewer from "./PrdViewer";
import ArchitectureViewer from "./ArchitectureViewer";
import DemoPrototype from "../components/DemoPrototype";

export default function Workspace() {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname === "/" ? "/internal" : window.location.pathname;
    }
    return "/internal";
  });
  
  const [liveLeadCount, setLiveLeadCount] = useState<number>(1);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Sync state with history actions (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Poll for lead count updates periodically so the founder has an interactive experience
  useEffect(() => {
    const checkLeads = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leads`);
        const contentType = res.headers.get("content-type") || "";
        if (res.ok && contentType.includes("application/json")) {
          const data = await res.json();
          const count = data.leads?.length || 1;
          if (count > liveLeadCount) {
            setLiveLeadCount(count);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 5000);
          }
        }
      } catch (e) {
        console.error("Failed to fetch CRM leads for founder dashboard:", e);
      }
    };
    
    // Check initially and then every 5 seconds
    checkLeads();
    const interval = setInterval(checkLeads, 5000);
    return () => clearInterval(interval);
  }, [liveLeadCount]);

  const navigateTo = (newPath: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", newPath);
      setPath(newPath);
    }
  };

  const activeTab = (() => {
    if (path.includes("/architecture")) return "architecture";
    if (path.includes("/dashboard")) return "dashboard";
    return "prd";
  })();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased flex flex-col justify-between">
      
      {/* GLOBAL NOTIFICATION MILESTONE */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] border border-slate-800 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            <span className="text-xs font-bold font-mono">
              [CRM UPDATE] Có thêm lượt đăng ký tham gia Cộng Đồng Đường Sắt! Leads: {liveLeadCount}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* HEADER BRANDING BANNER */}
        <header className="bg-white border-b border-gray-200/90 shadow-xs sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Branding Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#01411C] rounded-xl flex items-center justify-center shadow-lg shadow-green-950/20 antialiased border border-[#FFD700]/30">
                <Train className="w-6 h-6 text-[#FFD700]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg md:text-xl font-black tracking-tight text-[#01411C]">VNR Travel AI</h1>
                  <span className="bg-amber-100/80 text-amber-900 text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono border border-amber-200">
                    Enterprise Workspace
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                  Internal Development & Operational Suite
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="bg-slate-50 border border-gray-100 rounded-lg p-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-green-700 font-bold" />
                <div>
                  <span className="text-[9px] text-gray-400 block font-sans">CRM Leads</span>
                  <span className="font-extrabold text-gray-700">{liveLeadCount}</span>
                </div>
              </div>
              
              <div className="bg-slate-50 border border-gray-100 rounded-lg p-2 hidden sm:flex items-center gap-2">
                <div className="p-1 text-yellow-600">
                  <Award className="w-4 h-4 text-[#EEC200]" />
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-sans">Mục Tiêu Tháng</span>
                  <strong className="text-gray-700">100k views</strong>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE SELECTION RAIL BAR */}
        <section className="bg-white border-b border-gray-200 py-3.5 px-4 sticky top-[73px] md:top-[77px] z-30 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Context/Title */}
            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-green-700 animate-pulse" />
              <span>Sẵn sàng chuyển đổi:</span>
              <span className="text-gray-800 uppercase bg-slate-100 px-2 py-0.5 rounded text-[10px] tracking-wider font-mono">
                {activeTab === "prd" ? "💡 Trung Tâm Chiến Lược PRD" : activeTab === "dashboard" ? "🚄 Vietnam Railway Travel Assistant" : "🛡️ Kiến Trúc Firebase Enterprise"}
              </span>
            </div>

            {/* Selection Buttons */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto gap-0.5">
              <button
                onClick={() => navigateTo("/internal")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === "prd"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> 💡 1. Xem PRD
              </button>
              <button
                onClick={() => navigateTo("/internal/dashboard")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-green-750 bg-[#01411C] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" /> 🚄 2. Smart Railway Travel Platform
              </button>
              <button
                onClick={() => navigateTo("/internal/architecture")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === "architecture"
                    ? "bg-slate-900 text-[#FFD700] shadow-sm font-extrabold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Database className="w-3.5 h-3.5" /> 🛡️ 3. Kiến Trúc Firebase
              </button>
            </div>
          </div>
        </section>

        {/* OVERALL APP INTRODUCTION CARDS FOR FOUNDER */}
        {activeTab === "prd" && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
            <FounderDashboard onNavigate={navigateTo} />
          </div>
        )}

        {/* MAIN CURRENT WORKSPACE COMPONENT */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <AnimatePresence mode="wait">
            {activeTab === "prd" && (
              <motion.div
                key="prd-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <PrdViewer />
              </motion.div>
            )}
            
            {activeTab === "dashboard" && (
              <motion.div
                key="demo-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <DemoPrototype />
              </motion.div>
            )}
            
            {activeTab === "architecture" && (
              <motion.div
                key="arch-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <ArchitectureViewer />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* FOOTER ACCENTS */}
      <footer className="bg-white border-t border-gray-200 py-8 px-4 md:px-8 text-xs mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Brand Column */}
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#01411C]" />
              <span className="font-black text-slate-900 text-sm">VNR Travel AI</span>
            </div>
            <p className="text-slate-500 font-medium">
              Powered by Vietnam Railway Community
            </p>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              © {new Date().getFullYear()} VNR Travel AI. Được phát hành tuân thủ chặt chẽ tài nguyên tiêu chuẩn chất lượng lữ hành di sản.
            </p>
          </div>

          {/* Affiliate Partners Column */}
          <div className="space-y-2 text-left md:text-center">
            <h5 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider">Affiliate Partners</h5>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-slate-600 font-bold justify-start md:justify-center">
              <span>Baolau</span>
              <span className="text-slate-300">•</span>
              <span>12Go</span>
              <span className="text-slate-300">•</span>
              <span>Traveloka</span>
              <span className="text-slate-300">•</span>
              <span>Trip.com</span>
              <span className="text-slate-300">•</span>
              <span>VeXeRe</span>
            </div>
          </div>

          {/* Build Info Column */}
          <div className="space-y-2 text-left md:text-right">
            <h5 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider">Production Version</h5>
            <p className="text-slate-800 font-extrabold">Version 1.0 Production</p>
            <p className="text-slate-500 font-medium text-[11px]">Build Date: June 2026</p>
            <div className="flex gap-2 justify-start md:justify-end text-slate-400 text-[10px] mt-1">
              <span>Google AI Studio Build</span>
              <span>•</span>
              <span>Google Cloud Run Sandboxed</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
