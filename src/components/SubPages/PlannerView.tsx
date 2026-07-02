import React, { useState, useEffect } from "react";
import { Train, MapPin, Calendar, Coins, Compass, Users, Sparkles, RefreshCw, ArrowRight, AlertTriangle, CheckCircle, ExternalLink, Activity, Heart, BookmarkPlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ItineraryResult } from "../../types";
import { logGoogleAnalyticsEvent } from "../../lib/firebase";
import { ItinerarySkeleton } from "../Skeletons";
import { aiOrchestrator } from "../../lib/aiOrchestrator";

interface PlannerViewProps {
  lang: "vi" | "en";
  departure: string;
  setDeparture: (val: string) => void;
  arrival: string;
  setArrival: (val: string) => void;
  daysCount: number;
  setDaysCount: (val: number) => void;
  budgetLevel: string;
  setBudgetLevel: (val: string) => void;
  travelStyle: string;
  setTravelStyle: (val: string) => void;
  companion: string;
  setCompanion: (val: string) => void;
  travelDate: string;
  setTravelDate: (val: string) => void;
  travelInterests: string[];
  setTravelInterests: (val: string[]) => void;
  itinerary: ItineraryResult | null;
  setItinerary: (val: ItineraryResult | null) => void;
  saveItinerary: (plan: ItineraryResult) => void;
  trackAffiliateClick: (
    provider: string, 
    targetUrl: string, 
    camp?: string,
    serviceType?: string,
    route?: string
  ) => void;
}

export default function PlannerView({
  lang,
  departure,
  setDeparture,
  arrival,
  setArrival,
  daysCount,
  setDaysCount,
  budgetLevel,
  setBudgetLevel,
  travelStyle,
  setTravelStyle,
  companion,
  setCompanion,
  travelDate,
  setTravelDate,
  travelInterests,
  setTravelInterests,
  itinerary,
  setItinerary,
  saveItinerary,
  trackAffiliateClick
}: PlannerViewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"days" | "hotels" | "survival">("days");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const popularRoutes = [
    { from: "Hà Nội", to: "Đà Nẵng", name: t("Hành trình Xuyên Việt", "Across Vietnam Express"), days: 4 },
    { from: "Đà Nẵng", to: "Huế", name: t("Cung Tàu Di Sản HD1/HD2", "Heritage Train HD1/HD2"), days: 2 },
    { from: "Sài Gòn", to: "Nha Trang", name: t("Cung Tàu Biển Hoàng Hôn", "Sunset Coastal Route"), days: 3 },
    { from: "Hà Nội", to: "Lào Cai", name: t("Tàu Đêm Fansipan Sapa", "Sapa Midnight Express"), days: 3 },
  ];

  const handleCreateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);
    setSavedSuccess(false);

    try {
      const data = await aiOrchestrator.executeQuery(
        "itinerary",
        {
          departure,
          arrival,
          daysCount,
          budgetLevel,
          travelStyle,
          companion,
          travelDate,
          travelInterests
        },
        async (signal) => {
          const response = await fetch("/api/itinerary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              departure,
              arrival,
              daysCount,
              budgetLevel,
              travelStyle,
              companion,
              travelDate,
              travelInterests
            }),
            signal
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP error! Status: ${response.status}`);
          }

          const resJson = await response.json();
          if (resJson && resJson.error) {
            throw new Error(resJson.error);
          }
          return resJson;
        }
      );

      const enriched: ItineraryResult = {
        ...data,
        itineraryId: data.itineraryId || `iti-${Date.now()}`,
        departure: data.departure || departure,
        arrival: data.arrival || arrival,
        daysCount: data.daysCount || daysCount
      };
      setItinerary(enriched);
      setActiveTab("days");
      logGoogleAnalyticsEvent("generate_itinerary", {
        departure,
        arrival,
        daysCount,
        budgetLevel,
        travelStyle
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError(t("Yêu cầu tạo lịch trình đã được hủy bỏ.", "The itinerary generation request was aborted."));
      } else {
        setError(err.message || t("Không thể liên lạc với máy chủ VNR Travel AI. Vui lòng thử lại sau.", "Unable to connect to the VNR Travel AI backend. Please try again later."));
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    if (travelInterests.includes(interest)) {
      setTravelInterests(travelInterests.filter(i => i !== interest));
    } else {
      setTravelInterests([...travelInterests, interest]);
    }
  };

  const handleSaveToMyTrips = () => {
    if (itinerary) {
      saveItinerary(itinerary);
      setSavedSuccess(true);
      logGoogleAnalyticsEvent("save_itinerary", {
        departure: itinerary.departure || departure,
        arrival: itinerary.arrival || arrival,
        daysCount: itinerary.daysCount || daysCount,
        title: itinerary.title || ""
      });
      setTimeout(() => setSavedSuccess(false), 4000);
    }
  };

  const interestsList = [
    { id: "heritage", label: t("Văn hóa di sản", "Culture Heritage") },
    { id: "healing", label: t("Chữa lành, nghỉ ngơi", "Healing Recovery") },
    { id: "foodie", label: t("Khám phá ẩm thực", "Local Train Food") },
    { id: "photo", label: t("Săn ảnh phong cảnh", "Landscape Photo") },
    { id: "adventure", label: t("Phiêu lưu khám phá", "Wild Adventure") }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#01411C] to-[#0A5C2D] text-white p-6">
          <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Train className="w-6 h-6 text-[#FFD700]" /> {t("Trình Thiết Kế Hành Trình Đường Sắt AI", "AI Heritage Railway Trip Planner")}
          </h3>
          <p className="text-xs text-green-150 mt-1 max-w-2xl">
            {t("Ứng dụng Trí tuệ Nhân tạo Gemini phân tích ga tàu thực tế, gối đầu khách sạn, danh thắng địa phương trong nháy mắt.", "Powered by Google Gemini 3.5 Flash server-side. Coordinates routes, ticket channels, and hotels near stations.")}
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Input Form Column */}
            <div className="lg:col-span-5 space-y-6">
              <form onSubmit={handleCreateItinerary} className="space-y-4">
                
                {/* 1. Departure / Arrival */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3" /> {t("Ga Đi", "Depart Station")}
                    </label>
                    <select
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-700 transition-all font-medium"
                    >
                      <option value="Hà Nội">Ga Hà Nội</option>
                      <option value="Đà Nẵng">Ga Đà Nẵng</option>
                      <option value="Huế">Ga Huế</option>
                      <option value="Sài Gòn">Ga Sài Gòn</option>
                      <option value="Nha Trang">Ga Nha Trang</option>
                      <option value="Quy Nhơn">Ga Quy Nhơn (Diêu Trì)</option>
                      <option value="Lào Cai">Ga Lào Cai</option>
                      <option value="Đà Lạt">Ga Đà Lạt (Cổ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3" /> {t("Ga Đến", "Arrive Station")}
                    </label>
                    <select
                      value={arrival}
                      onChange={(e) => setArrival(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-700 transition-all font-medium"
                    >
                      <option value="Đà Nẵng">Ga Đà Nẵng</option>
                      <option value="Huế">Ga Huế</option>
                      <option value="Hà Nội">Ga Hà Nội</option>
                      <option value="Sài Gòn">Ga Sài Gòn</option>
                      <option value="Nha Trang">Ga Nha Trang</option>
                      <option value="Quy Nhơn">Ga Quy Nhơn (Diêu Trì)</option>
                      <option value="Lào Cai">Ga Lào Cai</option>
                      <option value="Đà Lạt">Ga Đà Lạt (Cổ)</option>
                    </select>
                  </div>
                </div>

                {/* 2. Days Count & Budget */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3" /> {t("Thời Lượng", "Schedules Days")}
                    </label>
                    <select
                      value={daysCount}
                      onChange={(e) => setDaysCount(Number(e.target.value))}
                      className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-700 transition-all font-medium"
                    >
                      <option value={2}>2 {t("Ngày", "Days")} 1 {t("Đêm", "Night")}</option>
                      <option value={3}>3 {t("Ngày", "Days")} 2 {t("Đêm", "Nights")}</option>
                      <option value={4}>4 {t("Ngày", "Days")} 3 {t("Đêm", "Nights")}</option>
                      <option value={5}>5 {t("Ngày", "Days")} 4 {t("Đêm", "Nights")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                      <Coins className="w-3 font-bold" /> {t("Ngân Sách", "Budget Scale")}
                    </label>
                    <select
                      value={budgetLevel}
                      onChange={(e) => setBudgetLevel(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-700 transition-all font-medium"
                    >
                      <option value="Tiết kiệm">{t("Tiết kiệm (Tối ưu)", "Budget Friendly")}</option>
                      <option value="Tiêu chuẩn">{t("Tiêu chuẩn (Khuyên dùng)", "Standard (Balanced)")}</option>
                      <option value="Chất lượng cao">{t("Cao cấp (Khoang VIP)", "Premium VIP Sleeper")}</option>
                    </select>
                  </div>
                </div>

                {/* 3. Style & Companion */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                      <Compass className="w-3" /> {t("Phong Cách", "Style Interest")}
                    </label>
                    <select
                      value={travelStyle}
                      onChange={(e) => setTravelStyle(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-700 transition-all font-medium"
                    >
                      <option value="Khám phá di sản">{t("Khám phá Di Sản", "Heritage Discover")}</option>
                      <option value="Chữa lành">{t("Chữa Lành & Sống Chậm", "Healing & Quiet")}</option>
                      <option value="Ẩm thực ga tàu">{t("Ẩm Thực Địa Phương", "Station Food Tour")}</option>
                      <option value="Nhiếp ảnh">{t("Nhiếp Ảnh Thám Cảnh", "Photo Landscape")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                      <Users className="w-3" /> {t("Bạn Đồng Hành", "Companion")}
                    </label>
                    <select
                      value={companion}
                      onChange={(e) => setCompanion(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-700 transition-all font-medium"
                    >
                      <option value="Một mình">{t("Du lịch một mình", "Solo Backpacker")}</option>
                      <option value="Cặp đôi">{t("Hẹn hò cặp đôi", "Romantic Couple")}</option>
                      <option value="Gia đình">{t("Gia đình đông ấm", "Family Group")}</option>
                      <option value="Nhóm bạn">{t("Nhóm bạn tinh nghịch", "Adoring Friends")}</option>
                    </select>
                  </div>
                </div>

                {/* 4. Travel Date Field (New) */}
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3" /> {t("Ngày Khởi Hành Dự Kiến", "Expected Travel Date")}
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-700 transition-all font-medium"
                  />
                </div>

                {/* 5. Custom Interest Badges */}
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">
                    {t("Sở Thích Chi Tiết (Có thể chọn nhiều)", "Detailed Interests (Multi-select)")}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {interestsList.map((interest) => {
                      const selected = travelInterests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                            selected
                              ? "bg-[#01411C] text-white border border-transparent"
                              : "bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-350"
                          }`}
                        >
                          {interest.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FFD700] hover:bg-[#EEC200] text-gray-900 font-extrabold h-12 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> {t("Gemini AI đang dệt lịch trình...", "Gemini active parsing...")}
                    </>
                  ) : (
                    <>
                      {t("Kiến Tạo Lịch Trình AI", "Forge AI Itinerary")} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Direct Preset Links */}
              <div className="bg-[#F8FAFC] border border-gray-150 rounded-xl p-4">
                <h4 className="text-[10px] font-bold text-[#01411C] uppercase tracking-wider mb-2">
                  🔥 {t("Cung Đường Vàng Săn Đón Nhiều", "Popular Heritage Routes presets:")}
                </h4>
                <div className="space-y-1.5 text-xs">
                  {popularRoutes.map((route, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDeparture(route.from);
                        setArrival(route.to);
                        setDaysCount(route.days);
                      }}
                      className="text-left w-full bg-white hover:bg-slate-50 p-2 rounded-lg border border-gray-150 transition-all flex justify-between items-center group font-medium"
                    >
                      <div>
                        <span className="font-bold text-slate-800 group-hover:text-[#01411C]">{route.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{route.from} ➔ {route.to} ({route.days} {t("ngày", "days")})</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-green-700 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* AI Results Output Column */}
            <div className="lg:col-span-7 border border-dashed border-gray-250 bg-slate-50 rounded-2xl min-h-[400px] flex flex-col justify-center items-center p-4">
              <AnimatePresence mode="wait">
                
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full space-y-4"
                  >
                    {/* Floating status loader badge */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3 animate-pulse">
                      <div className="relative shrink-0">
                        <div className="w-6 h-6 border-2 border-[#01411C] border-t-transparent rounded-full animate-spin"></div>
                        <Train className="w-3.5 h-3.5 text-yellow-600 absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div className="text-[10px] leading-tight">
                        <strong className="block text-emerald-950 font-extrabold">{t("Đang khởi tạo lịch trình di sản...", "Initiating Heritage Schedule...")}</strong>
                        <span className="text-emerald-800 opacity-90">{t("Robot AI đang tính toán cung đường Thống Nhất tối ưu và lập liên kết vé Baolau...", "AI robot is calculating Thong Nhat rail transit routes and mapping affiliate Baolau tickers...")}</span>
                      </div>
                    </div>
                    
                    {/* Render elegant skeleton segments */}
                    <ItinerarySkeleton />
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-center p-6 space-y-3"
                  >
                    <AlertTriangle className="w-12 h-12 text-rose-500" />
                    <h3 className="font-bold text-sm text-gray-800">{t("Lỗi Thiết Kế Lịch Trình", "AI Generation Encountered Error")}</h3>
                    <p className="text-xs text-red-600 max-w-md bg-red-50 p-3 rounded-lg border border-red-100 font-mono">
                      {error}
                    </p>
                    <p className="text-[10px] text-gray-400 max-w-xs leading-relaxed">
                      {t("*Gợi ý: Anh/chị hãy đảm bảo đã cấu hình GEMINI_API_KEY ở mục Settings > Secrets bên trong giao diện AI Studio Hub.", "*Tip: Verify GEMINI_API_KEY is configured under Settings > Secrets panel of the AI Studio interface.")}
                    </p>
                  </motion.div>
                )}

                {!loading && !error && !itinerary && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-8 space-y-4 max-w-sm"
                  >
                    <div className="w-14 h-14 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Compass className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-gray-800">{t("Vùng Kế Hoạch Sẵn Sàng", "Planner Pipeline Awaiting")}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {t("Điền các tham số ở bảng bên trái hoặc bấm chọn các cung đường vàng có sẵn để robot AI dệt lịch trình hoàn chỉnh.", "Set targets on the left form or select a golden route preset above. AI generates full maps in seconds.")}
                      </p>
                    </div>
                  </motion.div>
                )}

                {itinerary && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-white rounded-xl shadow-xs border border-gray-150 overflow-hidden text-left"
                  >
                    
                    {/* Header Details */}
                    <div className="bg-[#F8FAFC] border-b border-gray-150 p-5 space-y-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold text-[#01411C] uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {departure} ➔ {arrival} ({daysCount} {t("Ngày", "Days")})
                            </span>
                            {travelDate && <span className="text-[10px] text-slate-400 font-mono">📅 {travelDate}</span>}
                          </div>
                          <h4 className="text-base font-bold text-gray-950 mt-1">{itinerary.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">&ldquo;{itinerary.summary}&rdquo;</p>
                        </div>

                        <div className="flex md:flex-col items-center justify-between md:justify-center bg-green-50/80 border border-green-200/50 p-2.5 rounded-xl text-center min-w-[120px] w-full md:w-auto">
                          <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider">{t("Chi phí gộp", "Total Est Cost")}</span>
                          <span className="text-sm font-black text-[#01411C] mt-0.5">
                            {itinerary.totalEstimatedCostVnd ? itinerary.totalEstimatedCostVnd.toLocaleString() : "---"}đ
                          </span>
                        </div>
                      </div>

                      {/* Display Switch Tabs */}
                      <div className="flex border-b border-gray-150 gap-2 text-[10px] font-black uppercase tracking-wider pt-2">
                        <button
                          onClick={() => setActiveTab("days")}
                          className={`pb-2 px-1 focus:outline-none border-b-2 transition-all ${
                            activeTab === "days" ? "border-green-700 text-green-700" : "border-transparent text-gray-400"
                          }`}
                        >
                          📅 {t("Lịch Trình Chi Tiết", "Day Schedule")}
                        </button>
                        <button
                          onClick={() => setActiveTab("hotels")}
                          className={`pb-2 px-1 focus:outline-none border-b-2 transition-all ${
                            activeTab === "hotels" ? "border-green-700 text-green-700" : "border-transparent text-gray-400"
                          }`}
                        >
                          🏨 {t("Lưu Trú & Tour", "Stays & Tours")} ({itinerary.recommendedHotels?.length || 0})
                        </button>
                        <button
                          onClick={() => setActiveTab("survival")}
                          className={`pb-2 px-1 focus:outline-none border-b-2 transition-all ${
                            activeTab === "survival" ? "border-green-700 text-green-700" : "border-transparent text-gray-400"
                          }`}
                        >
                          🎒 {t("Bỏ túi sống sót", "Survival Guide")}
                        </button>
                      </div>
                    </div>

                    {/* Tab Panels */}
                    <div className="p-5 max-h-[420px] overflow-y-auto">
                      
                      {/* Sub tab DAYS */}
                      {activeTab === "days" && (
                        <div className="space-y-6">
                          {itinerary.days?.map((day, dIdx) => (
                            <div key={dIdx} className="relative pl-6 border-l-2 border-slate-150 space-y-3 pb-2 last:pb-0">
                              <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 bg-green-700 rounded-full flex items-center justify-center ring-4 ring-green-100">
                                <span className="text-[10px] font-bold text-white">{day.dayNumber}</span>
                              </div>
                              <div>
                                <h5 className="font-bold text-gray-900 text-xs">Day {day.dayNumber}: {day.title}</h5>
                                <p className="text-[11px] text-gray-500 mt-0.5">{day.description}</p>
                              </div>

                              {/* Rail Trains recommendations inside Day */}
                              {day.recommendedTrains && day.recommendedTrains.length > 0 && (
                                <div className="bg-[#FFFDF0] border border-yellow-200 rounded-xl p-3 space-y-2 text-xs">
                                  <span className="font-bold text-yellow-800 text-[10px] uppercase tracking-wider block flex items-center gap-1">
                                    <Train className="w-3" /> {t("Mác Tàu Đường Sắt Tiêu Biểu Chặng Này", "Recommended Trains for this legs")}:
                                  </span>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {day.recommendedTrains.map((train, tIdx) => (
                                      <div key={tIdx} className="bg-white border border-gray-150 p-2.5 rounded-lg flex flex-col justify-between">
                                        <div>
                                          <div className="flex justify-between items-center text-[10px]">
                                            <span className="font-black text-[#01411C]">{train.trainCode}</span>
                                            <span className="bg-yellow-50 text-yellow-800 font-bold px-1 py-0.2 rounded font-mono uppercase">
                                              12Go & Baolau
                                            </span>
                                          </div>
                                          <p className="text-[10px] text-slate-400 mt-1">{train.departure} ➔ {train.arrival}</p>
                                          <p className="text-[10px] text-gray-600 font-bold mt-1">{t("Khung Giờ: ", "Hours: ")} {train.timeRange}</p>
                                          <p className="text-[9px] text-gray-500 mt-0.5">{train.seatTypeRecommended}</p>
                                        </div>
                                        <div className="border-t border-slate-50 pt-2 mt-2 flex justify-between items-center text-[10px]">
                                          <span className="font-bold text-slate-800">{train.estimatedPriceVnd ? `${train.estimatedPriceVnd.toLocaleString()}đ` : "---"}</span>
                                          <button
                                            onClick={() => trackAffiliateClick("baolau", `https://www.baolau.com/vi/transportation/vietnam/trains?departure=${train.departure}&arrival=${train.arrival}&source=vnrailway`, `planner_train_${train.trainCode}`)}
                                            className="text-blue-700 hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                                          >
                                            {t("Đặt vé", "Book ticket")} <ExternalLink className="w-2.5" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Day Activities */}
                              <div className="space-y-2">
                                {day.activities?.map((act, aIdx) => (
                                  <div key={aIdx} className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-xs flex gap-2">
                                    <span className="font-mono text-slate-400 min-w-[45px] font-black">{act.time}</span>
                                    <div>
                                      <span className="font-bold text-slate-800">{act.title}</span>
                                      {act.location && <span className="text-[9px] text-slate-400 font-bold block">📍 {act.location}</span>}
                                      <p className="text-slate-500 text-[11px] mt-0.5">{act.details}</p>
                                      {act.costEstimateVnd && <span className="inline-block text-[10px] text-[#01411C] bg-[#EFFFFA] px-1.5 py-0.2 rounded font-bold mt-1">{t("Giá: ", "Price: ")} {act.costEstimateVnd.toLocaleString()}đ</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>

                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sub tab HOTELS */}
                      {activeTab === "hotels" && (
                        <div className="space-y-6 text-xs">
                          
                          {/* Recommended Hotels */}
                          <div className="space-y-3">
                            <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest block font-mono">
                              🏨 {t("Khách Sạn Tiêu Biểu Liên Kết agoda / booking", "Agoda & Booking Partners Accommodation Stays")}:
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {itinerary.recommendedHotels?.map((hotel, hIdx) => (
                                <div key={hIdx} className="border border-slate-150 rounded-xl p-3 bg-white flex flex-col justify-between space-y-3 shadow-xs">
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <span className="font-bold text-slate-900 leading-tight">{hotel.hotelName}</span>
                                      <span className="text-[10px] text-amber-500 shrink-0">{"★".repeat(hotel.starRating)}</span>
                                    </div>
                                    <p className="text-slate-400 text-[10px]">📍 {hotel.location}</p>
                                    <p className="text-slate-500 text-[11px] mt-2 leading-relaxed">&ldquo;{hotel.whyRecommended}&rdquo;</p>
                                  </div>
                                  <div className="border-t border-slate-100 pt-2 flex justify-between items-center">
                                    <div>
                                      <span className="text-[9px] text-slate-400 block uppercase font-mono">{t("Giá trung bình", "Avg Night")}</span>
                                      <span className="font-bold text-[#01411C]">{hotel.pricePerNightVnd ? hotel.pricePerNightVnd.toLocaleString() : "---"}đ</span>
                                    </div>
                                    <button
                                      onClick={() => trackAffiliateClick("agoda", "https://website.beacons.ai/vnrailway", `planner_hotel_${hotel.hotelName}`)}
                                      className="bg-[#01411C] hover:bg-green-800 text-white font-bold p-1.5 px-3 rounded-lg text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                      {t("Xem Phòng", "View Rooms")} <ExternalLink className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recommended Tours */}
                          <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                            <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest block font-mono">
                              🗺️ {t("Tours & Vé Tham Quan Địa Phương klook partner", "Local Experiences and Tours via Klook")}:
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {itinerary.recommendedTours?.map((tour, tIdx) => (
                                <div key={tIdx} className="border border-slate-150 rounded-xl p-3 bg-white flex flex-col justify-between space-y-3 shadow-xs">
                                  <div>
                                    <span className="font-bold text-slate-900 leading-tight block">{tour.tourName}</span>
                                    <span className="text-slate-400 text-[10px]">{t("Thời lượng: ", "Duration: ")} {tour.duration}</span>
                                    <p className="text-slate-500 mt-2 leading-relaxed text-[11px]">✨ {tour.highlights}</p>
                                  </div>
                                  <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[10px]">
                                    <div>
                                      <span className="text-[9px] text-slate-400 block uppercase font-mono">{t("Giá chỉ từ", "Stating from")}</span>
                                      <span className="font-bold text-blue-700">{tour.priceVnd ? tour.priceVnd.toLocaleString() : "---"}đ</span>
                                    </div>
                                    <button
                                      onClick={() => trackAffiliateClick("klook", "https://12go.asia/en?z=15761336", `planner_tour_${tour.tourName}`)}
                                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                      Klook Partner <ExternalLink className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      )}

                      {/* Sub tab SURVIVAL */}
                      {activeTab === "survival" && (
                        <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                          <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest block font-mono">
                            🎒 {t("Cẩm Nang Đi Tàu Cho Người Mới Sống Sót", "Survival Guides & Pro Tips for Safe Railways Journey")}:
                          </span>
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                            {itinerary.survivalTips?.map((tip, idx) => (
                              <div key={idx} className="flex gap-2 items-start text-[11px] font-medium">
                                <CheckCircle className="w-4 h-4 text-[#01411C] shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Bookmarking / Save Trip */}
                    <div className="bg-[#FAFBFD] border-t border-gray-150 p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <span className="text-[10px] text-slate-400 font-bold font-mono uppercase">
                        {t("✓ GA KHỚP ĐỐI TÁC THÀNH CÔNG VỚI ID: vnrailway", "✓ ALL PARSED CHANNELS TAGGED WITH KEY ID: vnrailway")}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveToMyTrips}
                          className="bg-slate-900 border border-slate-800 hover:bg-black text-white py-1.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <BookmarkPlus className="w-3.5 h-3.5" /> {savedSuccess ? t("Đã Lưu Thành Công!", "Saved to profile!") : t("Lưu Lại Hành Trình", "Save Itinerary")}
                        </button>
                      </div>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
