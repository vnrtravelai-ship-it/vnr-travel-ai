import React, { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  MousePointerClick, 
  RefreshCw, 
  Sparkles, 
  Sliders, 
  BarChart3, 
  Download, 
  Layers, 
  Globe, 
  Calendar, 
  CheckCircle,
  ShieldCheck,
  AlertTriangle,
  Link,
  Search,
  Laptop,
  Monitor,
  Compass,
  MapPin
} from "lucide-react";
import { motion } from "motion/react";
import { Lead } from "../../types";
import { db } from "../../lib/firebase";
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";

interface ClickLog {
  id: string;
  clickId?: string;
  userId: string;
  provider: string;
  serviceType?: string;
  route?: string;
  campaign?: string;
  utmCampaign?: string;
  source?: string;
  utmSource?: string;
  targetUrl: string;
  referrer?: string;
  device?: string;
  deviceType?: string;
  platform?: string;
  country: string;
  createdAt: string;
}

interface AdminViewProps {
  lang: "vi" | "en";
}

export default function AdminView({ lang }: AdminViewProps) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<"analytics" | "funnel" | "integrations">("analytics");

  // States for live data fetching
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clicks, setClicks] = useState<ClickLog[]>([]);
  const [loading, setLoading] = useState(false);

  // States for search and date filters
  const [searchTerm, setSearchTerm] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [dateFilterType, setDateFilterType] = useState("all"); // "all", "today", "7days", "30days", "custom"
  const [startDateStr, setStartDateStr] = useState("");
  const [endDateStr, setEndDateStr] = useState("");

  // States for Financial funnel business projections calculator
  const [tiktokViews, setTiktokViews] = useState(500000); // Slider 10K to 3M
  const [ctrPercent, setCtrPercent] = useState(2.5); // Slider 0.1% to 10%
  const [paymentPercent, setPaymentPercent] = useState(1.5); // Slider 0.1% to 10%
  const [ticketAvgValue, setTicketAvgValue] = useState(800000); // Slider 100k to 3M Vnd
  const [commissionRate, setCommissionRate] = useState(8); // Slider 1% to 15%

  const fetchLiveMetrics = async () => {
    setLoading(true);
    try {
      const leadsRes = await fetch("/api/leads");
      const leadsContentType = leadsRes.headers.get("content-type") || "";
      if (leadsRes.ok && leadsContentType.includes("application/json")) {
        const data = await leadsRes.json();
        setLeads(data.leads || []);
      }
      
      // Also trigger a manual read to complement if needed
      const clicksRes = await fetch("/api/clicks");
      const clicksContentType = clicksRes.headers.get("content-type") || "";
      if (clicksRes.ok && clicksContentType.includes("application/json")) {
        const data = await clicksRes.json();
        const apiClicks = (data.clicks || []).map((clk: any) => ({
          id: clk.id || clk.clickId,
          clickId: clk.clickId,
          userId: clk.userId,
          provider: clk.provider,
          serviceType: clk.serviceType,
          route: clk.route,
          campaign: clk.utmCampaign || clk.campaign,
          utmCampaign: clk.utmCampaign || clk.campaign,
          source: clk.utmSource || clk.source,
          utmSource: clk.utmSource || clk.source,
          targetUrl: clk.targetUrl,
          referrer: clk.referrer || "Direct",
          device: clk.device || clk.deviceType,
          deviceType: clk.device || clk.deviceType,
          platform: clk.platform || "Unknown",
          country: clk.country || "Vietnam",
          createdAt: clk.createdAt
        }));

        setClicks(prev => {
          // If Firestore is empty, fallback to API clicks
          if (prev.length === 0) {
            return apiClicks;
          }
          return prev;
        });
      }
    } catch (e) {
      console.error("Lỗi đồng bộ live admin metrics: ", e);
    } finally {
      setLoading(false);
    }
  };

  // Real-time Firestore sync for affiliateClicks collection
  useEffect(() => {
    fetchLiveMetrics();

    const q = query(collection(db, "affiliateClicks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const firestoreClicks: ClickLog[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          let formattedTime = new Date().toISOString();
          if (d.createdAt) {
            if (typeof d.createdAt.toDate === "function") {
              formattedTime = d.createdAt.toDate().toISOString();
            } else {
              formattedTime = d.createdAt;
            }
          }
          firestoreClicks.push({
            id: d.clickId || docSnap.id,
            clickId: d.clickId,
            userId: d.userId,
            provider: d.provider,
            serviceType: d.serviceType,
            route: d.route,
            campaign: d.campaign || "none",
            utmCampaign: d.campaign || "none",
            source: d.source || "none",
            utmSource: d.source || "none",
            targetUrl: d.targetUrl,
            referrer: d.referrer || "Direct",
            device: d.device || "Desktop",
            deviceType: d.device || "Desktop",
            platform: d.platform || "Unknown",
            country: d.country || "Vietnam",
            createdAt: formattedTime
          });
        });

        if (firestoreClicks.length > 0) {
          setClicks(firestoreClicks);
        }
      },
      (error) => {
        console.error("Error subscribing to affiliateClicks collection:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Projections formulas
  const estLandingVisits = Math.round(tiktokViews * (ctrPercent / 100));
  const estCompletedPurchases = Math.round(estLandingVisits * (paymentPercent / 100));
  const totalWagonRevenue = estCompletedPurchases * ticketAvgValue;
  const projectedEarnings = Math.round(totalWagonRevenue * (commissionRate / 100));

  // FILTERED CLICKS CALCULATION
  const filteredClicks = clicks.filter(c => {
    // 1. Search term (matches provider, campaign, source, targetUrl, referrer, device, platform, userId)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchProvider = (c.provider || "").toLowerCase().includes(term);
      const matchCampaign = (c.campaign || c.utmCampaign || "").toLowerCase().includes(term);
      const matchSource = (c.source || c.utmSource || "").toLowerCase().includes(term);
      const matchTarget = (c.targetUrl || "").toLowerCase().includes(term);
      const matchReferrer = (c.referrer || "").toLowerCase().includes(term);
      const matchDevice = (c.device || c.deviceType || "").toLowerCase().includes(term);
      const matchPlatform = (c.platform || "").toLowerCase().includes(term);
      const matchUserId = (c.userId || "").toLowerCase().includes(term);
      
      if (!matchProvider && !matchCampaign && !matchSource && !matchTarget && !matchReferrer && !matchDevice && !matchPlatform && !matchUserId) {
        return false;
      }
    }

    // 2. Provider Filter
    if (providerFilter !== "all" && providerFilter !== "") {
      if ((c.provider || "").toUpperCase() !== providerFilter.toUpperCase()) {
        return false;
      }
    }

    // 3. Date Filter Type
    if (c.createdAt) {
      const clickTime = new Date(c.createdAt).getTime();
      const now = Date.now();

      if (dateFilterType === "today") {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        if (clickTime < startOfDay.getTime()) return false;
      } else if (dateFilterType === "7days") {
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        if (clickTime < sevenDaysAgo) return false;
      } else if (dateFilterType === "30days") {
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
        if (clickTime < thirtyDaysAgo) return false;
      } else if (dateFilterType === "custom") {
        if (startDateStr) {
          const start = new Date(startDateStr).getTime();
          if (clickTime < start) return false;
        }
        if (endDateStr) {
          const end = new Date(endDateStr);
          end.setHours(23, 59, 59, 999);
          if (clickTime > end.getTime()) return false;
        }
      }
    }

    return true;
  });

  // AGGREGATED METRICS FROM FILTERED CLICKS
  const totalClicksCount = filteredClicks.length;

  // Clicks by Provider
  const clicksByProvider = filteredClicks.reduce((acc, c) => {
    const prov = (c.provider || "Unknown").trim().toUpperCase();
    acc[prov] = (acc[prov] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Clicks by Campaign
  const clicksByCampaign = filteredClicks.reduce((acc, c) => {
    const camp = (c.campaign || c.utmCampaign || "none").trim();
    acc[camp] = (acc[camp] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Clicks by Service Type
  const clicksByServiceType = filteredClicks.reduce((acc, c) => {
    const svc = (c.serviceType || "transport").trim().toLowerCase();
    acc[svc] = (acc[svc] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Clicks by Route
  const clicksByRoute = filteredClicks.reduce((acc, c) => {
    const route = (c.route || "Hà Nội ➔ Đà Nẵng").trim();
    acc[route] = (acc[route] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Clicks by Date
  const clicksByDate = filteredClicks.reduce((acc, c) => {
    let dateStr = "Unknown";
    try {
      if (c.createdAt) {
        dateStr = new Date(c.createdAt).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
          month: "short",
          day: "numeric"
        });
      }
    } catch {}
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top Referrers
  const clicksByReferrer = filteredClicks.reduce((acc, c) => {
    const ref = (c.referrer || "Direct").trim();
    acc[ref] = (acc[ref] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top Devices (Requested Yêu cầu 4)
  const clicksByDevice = filteredClicks.reduce((acc, c) => {
    const dev = (c.device || c.deviceType || "Desktop").trim();
    acc[dev] = (acc[dev] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top Platforms (Requested Yêu cầu 4)
  const clicksByPlatform = filteredClicks.reduce((acc, c) => {
    const plat = (c.platform || "Unknown").trim();
    acc[plat] = (acc[plat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert aggregates to sorted lists for visual display
  const sortedProviders = (Object.entries(clicksByProvider) as [string, number][]).sort((a, b) => b[1] - a[1]);
  const sortedCampaigns = (Object.entries(clicksByCampaign) as [string, number][]).sort((a, b) => b[1] - a[1]);
  const sortedServiceTypes = (Object.entries(clicksByServiceType) as [string, number][]).sort((a, b) => b[1] - a[1]);
  const sortedRoutes = (Object.entries(clicksByRoute) as [string, number][]).sort((a, b) => b[1] - a[1]);
  const sortedDates = (Object.entries(clicksByDate) as [string, number][]).slice(0, 15); // Show longer date view
  const sortedReferrers = (Object.entries(clicksByReferrer) as [string, number][]).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const sortedDevices = (Object.entries(clicksByDevice) as [string, number][]).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const sortedPlatforms = (Object.entries(clicksByPlatform) as [string, number][]).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // EXPORT TO CSV
  const handleExportCSV = () => {
    if (filteredClicks.length === 0) {
      alert(t("Không có dữ liệu click phù hợp bộ lọc để tải về.", "No filtered click data available for download."));
      return;
    }
    
    // Prepare headers
    const headers = [
      "clickId",
      "userId",
      "campaign",
      "provider",
      "serviceType",
      "route",
      "source",
      "targetUrl",
      "referrer",
      "device",
      "platform",
      "country",
      "createdAt"
    ];

    const rows = filteredClicks.map(c => [
      c.clickId || c.id || "",
      c.userId || "anonymous",
      c.campaign || c.utmCampaign || "none",
      c.provider || "unknown",
      c.serviceType || "transport",
      `"${(c.route || "Hà Nội ➔ Đà Nẵng").replace(/"/g, '""')}"`,
      c.source || c.utmSource || "none",
      `"${(c.targetUrl || "").replace(/"/g, '""')}"`,
      `"${(c.referrer || "Direct").replace(/"/g, '""')}"`,
      c.device || c.deviceType || "Desktop",
      c.platform || "Unknown",
      c.country || "Vietnam",
      c.createdAt || ""
    ]);

    const csvContent = "\uFEFF" + [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `VNR_Affiliate_Clicks_Report_Filtered_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Header section with telemetry updates */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[#01411C] font-extrabold text-[10px] uppercase font-mono tracking-widest block">
            {t("Bảng điều hành quản trị viên", "Real-Time Administrative Telemetry")}
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            {t("Hệ Thống Kiểm Kiểm Click Tiếp Thị Liên Kết", "Affiliate Tracking Engine Production")}
          </h3>
          <p className="text-xs text-slate-400">
            {t("Phân tích lưu lượng chuyển đổi từ Ga tàu di sản, được số hóa thời gian thực bằng Firebase Firestore Secure Rules.", "Real-time analytics of heritage rail conversion streams secured with robust Firebase Security Rules.")}
          </p>
        </div>

        <button
          onClick={fetchLiveMetrics}
          disabled={loading}
          className="bg-white border border-slate-200 hover:bg-slate-50 font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#01411C] ${loading ? "animate-spin" : ""}`} />
          {t("Cập Nhật Live", "Sync Database")}
        </button>
      </div>

      {/* Tabs Menu Navigation */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-3 border-b-2 px-1 focus:outline-none transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === "analytics" ? "border-[#01411C] text-[#01411C]" : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          {t("Affiliate Analytics", "Affiliate Analytics")}
        </button>

        <button
          onClick={() => setActiveTab("funnel")}
          className={`pb-3 border-b-2 px-1 focus:outline-none transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === "funnel" ? "border-[#01411C] text-[#01411C]" : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <Sliders className="w-4 h-4" />
          {t("Giả Lập Doanh Thu", "Funnel Projections")}
        </button>

        <button
          onClick={() => setActiveTab("integrations")}
          className={`pb-3 border-b-2 px-1 focus:outline-none transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === "integrations" ? "border-[#01411C] text-[#01411C]" : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <Layers className="w-4 h-4" />
          {t("Sẵn Sàng TikTok & GA4", "GA4 / TikTok Specs")}
        </button>
      </div>

      {/* RENDER ACTIVE TAB: ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="space-y-6 animate-fade-in">

          {/* FILTER CONTROL PANEL */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#01411C]" />
                  {t("Bộ Lọc & Tìm Kiếm Chiến Dịch", "Campaign Filters & Search Engine")}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {t("Lọc dữ liệu live theo hãng đối tác, ngày khởi tạo hoặc nhập từ khóa bất kỳ để truy lục.", "Filter real-time records by partner, date limits, or type queries to isolate patterns.")}
                </p>
              </div>

              {/* Reset quickly */}
              {(searchTerm || providerFilter !== "all" || dateFilterType !== "all" || startDateStr || endDateStr) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setProviderFilter("all");
                    setDateFilterType("all");
                    setStartDateStr("");
                    setEndDateStr("");
                  }}
                  className="text-[10px] font-black text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  ✕ {t("XÓA BỘ LỌC", "RESET FILTERS")}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
              {/* Keyword Search */}
              <div className="md:col-span-5 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("Tìm kiếm chiến dịch, hãng, thiết bị, url, link...", "Search campaign, provider, device, platform, url...")}
                  className="pl-9 w-full bg-slate-50 border border-slate-205 focus:border-[#01411C] focus:bg-white text-xs py-2 rounded-xl focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Provider Filter */}
              <div className="md:col-span-3">
                <select
                  value={providerFilter}
                  onChange={(e) => setProviderFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 focus:border-[#01411C] focus:bg-white text-xs py-2 px-3 rounded-xl focus:outline-none transition-all text-slate-705 font-medium"
                >
                  <option value="all">🌐 {t("Tất cả đối tác", "All Partners")}</option>
                  <option value="baolau">🚂 BAOLAU</option>
                  <option value="12go">🚂 12GO</option>
                  <option value="traveloka">🏨 TRAVELOKA</option>
                  <option value="trip">🏨 TRIP.COM</option>
                  <option value="vexere">🚌 VEXERE</option>
                  <option value="agoda">🏨 AGODA</option>
                  <option value="booking">🏨 BOOKING</option>
                  <option value="klook">🎫 KLOOK</option>
                </select>
              </div>

              {/* Date Filter Selection */}
              <div className="md:col-span-4">
                <select
                  value={dateFilterType}
                  onChange={(e) => setDateFilterType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 focus:border-[#01411C] focus:bg-white text-xs py-2 px-3 rounded-xl focus:outline-none transition-all text-slate-705 font-medium"
                >
                  <option value="all">📅 {t("Tất cả thời gian", "All Time")}</option>
                  <option value="today">📅 {t("Hôm nay", "Today")}</option>
                  <option value="7days">📅 {t("7 ngày qua", "Last 7 Days")}</option>
                  <option value="30days">📅 {t("30 ngày qua", "Last 30 Days")}</option>
                  <option value="custom">📅 {t("Khoảng ngày tùy chỉnh", "Custom Range")}</option>
                </select>
              </div>
            </div>

            {/* Custom Date Picker Fields (Only visible when "custom" is active) */}
            {dateFilterType === "custom" && (
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{t("Từ ngày (Start Date)", "Start Date")}</label>
                  <input
                    type="date"
                    value={startDateStr}
                    onChange={(e) => setStartDateStr(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 focus:border-[#01411C] text-xs py-1.5 px-3 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{t("Tới ngày (End Date)", "End Date")}</label>
                  <input
                    type="date"
                    value={endDateStr}
                    onChange={(e) => setEndDateStr(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-205 focus:border-[#01411C] text-xs py-1.5 px-3 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Top Quick Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-[#FFFDF0] border border-yellow-200 p-4 rounded-xl relative overflow-hidden flex flex-col justify-between h-24">
              <span className="text-[10px] text-yellow-800 font-extrabold uppercase font-mono tracking-wider">
                📈 {t("Tổng Số Lượt Clicks", "Total Active Clicks")}
              </span>
              <span className="text-2xl font-black text-slate-900 font-mono mt-1">
                {totalClicksCount}
              </span>
              <span className="text-[9px] text-slate-400">{t("Đồng bộ trực tiếp", "Firestore live sync")}</span>
              <MousePointerClick className="w-12 h-12 text-yellow-300/40 absolute right-2 bottom-2" />
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl relative overflow-hidden flex flex-col justify-between h-24">
              <span className="text-[10px] text-emerald-800 font-extrabold uppercase font-mono tracking-wider">
                🚂 {t("Đối tác Baolau & 12Go", "Rail Ticket Clicks")}
              </span>
              <span className="text-2xl font-black text-[#01411C] font-mono mt-1">
                {Number(clicksByProvider["BAOLAU"] || 0) + Number(clicksByProvider["12GO"] || 0) + Number(clicksByProvider["BAOLAU_VI"] || 0) + Number(clicksByProvider["BAOLAU_EN"] || 0)}
              </span>
              <span className="text-[9px] text-slate-400">{t("Mác tàu di sản", "Via rail schedule recommendations")}</span>
              <Sparkles className="w-12 h-12 text-emerald-200/40 absolute right-2 bottom-2" />
            </div>

            <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl relative overflow-hidden flex flex-col justify-between h-24">
              <span className="text-[10px] text-sky-800 font-extrabold uppercase font-mono tracking-wider">
                🏨 {t("Lượt Đặt Phòng Agoda / Booking", "Agoda & Booking Stays")}
              </span>
              <span className="text-2xl font-black text-sky-900 font-mono mt-1">
                {Number(clicksByProvider["AGODA"] || 0) + Number(clicksByProvider["BOOKING"] || 0)}
              </span>
              <span className="text-[9px] text-slate-400">{t("Ưu đãi thành viên tích lũy", "Member rewards active")}</span>
              <Globe className="w-12 h-12 text-sky-200/40 absolute right-2 bottom-2" />
            </div>

            <div className="bg-violet-50 border border-violet-200 p-4 rounded-xl flex flex-col justify-between h-24">
              <span className="text-[10px] text-violet-800 font-extrabold uppercase font-mono tracking-wider block">
                🛠️ {t("Tác Vụ Quản Trị", "Admin Action Hub")}
              </span>
              <button
                onClick={handleExportCSV}
                className="w-full bg-[#01411C] hover:bg-green-800 text-white font-extrabold text-[10px] py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer font-sans"
              >
                <Download className="w-3.5 h-3.5" /> {t("Xuất File Báo Cáo CSV", "Export CSV click records")}
              </button>
              <span className="text-[9px] text-slate-400 text-center">{t("Sẵn sàng phân tích excel", "Excel-friendly encoding")}</span>
            </div>

          </div>

          {/* Aggregations Grid displays */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Provider breakdowns visual progress bars */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#01411C]" />
                {t("Lượt Bấm Theo Nhà Cung Cấp", "Clicks by Affiliate Provider")}
              </h4>
              <div className="space-y-3 pt-1">
                {sortedProviders.length > 0 ? (
                  sortedProviders.map(([provider, count]) => {
                    const percentage = totalClicksCount > 0 ? Math.round((count / totalClicksCount) * 100) : 0;
                    return (
                      <div key={provider} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="bg-[#EFFFFA] text-[#01411C] border border-emerald-100 px-1.5 py-0.2 rounded font-mono uppercase text-[10px]">
                            {provider}
                          </span>
                          <span>{count} clicks ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className="bg-[#01411C] h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-450 text-center py-6">{t("Chưa ghi nhận clicks nào", "Waiting for analytics telemetry stream...")}</p>
                )}
              </div>
            </div>

            {/* Campaign breakdowns visual progress bars */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-violet-700" />
                {t("Hiệu Suất Theo Nguồn Truy Cập", "Clicks by UTM Campaign Source")}
              </h4>
              <div className="space-y-3 pt-1">
                {sortedCampaigns.length > 0 ? (
                  sortedCampaigns.map(([campaign, count]) => {
                    const percentage = totalClicksCount > 0 ? Math.round((count / totalClicksCount) * 100) : 0;
                    return (
                      <div key={campaign} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="font-mono text-slate-900 font-extrabold text-[10px]">
                            {campaign}
                          </span>
                          <span>{count} clicks ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className="bg-violet-600 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-450 text-center py-6">{t("Chưa ghi nhận clicks nào", "Waiting for analytics telemetry stream...")}</p>
                )}
              </div>
            </div>

            {/* Top Service Types breakdowns visual progress bars */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#01411C]" />
                {t("Top Loại Hình Dịch Vụ (Service Types)", "Top Affiliate Service Types")}
              </h4>
              <div className="space-y-3 pt-1">
                {sortedServiceTypes.length > 0 ? (
                  sortedServiceTypes.map(([svc, count]) => {
                    const percentage = totalClicksCount > 0 ? Math.round((count / totalClicksCount) * 100) : 0;
                    // Format service Type cleanly
                    let prettySvc = svc;
                    if (svc === "train_ticket") prettySvc = "🚂 Vé Tàu Hỏa (train_ticket)";
                    else if (svc === "transport") prettySvc = "✈️ Di Chuyển / Vé Máy Xe (transport)";
                    else if (svc === "hotel_flight") prettySvc = "🏨 Khách Sạn & Combo (hotel_flight)";
                    else if (svc === "bus_ticket") prettySvc = "🚌 Vé Xe Khách / Coach (bus_ticket)";
                    
                    return (
                      <div key={svc} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="font-mono text-slate-900 font-extrabold text-[10px] uppercase">
                            {prettySvc}
                          </span>
                          <span>{count} clicks ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className="bg-[#01411C] h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-450 text-center py-6">{t("Chưa có loại hình dịch vụ nào dán nhãn", "Waiting for service types stream...")}</p>
                )}
              </div>
            </div>

            {/* Clicks by Route breakdowns */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#E65F2B]" />
                {t("Hiệu Suất Theo Tuyến Đường (Routes)", "Affiliate Clicks by Route")}
              </h4>
              <div className="space-y-3 pt-1">
                {sortedRoutes.length > 0 ? (
                  sortedRoutes.map(([route, count]) => {
                    const maxVal = Math.max(...(Object.values(clicksByRoute) as number[]));
                    const percentage = maxVal > 0 ? Math.round((count / maxVal) * 100) : 0;
                    return (
                      <div key={route} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="font-mono text-slate-800 text-[10px] truncate max-w-[240px]">
                            🛤️ {route}
                          </span>
                          <span className="font-mono font-bold text-slate-900">{count} clicks</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div 
                            className="bg-orange-600 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-450 text-center py-6">{t("Chưa ghi nhận clicks theo hành trình", "Waiting for route performance data...")}</p>
                )}
              </div>
            </div>

            {/* Clicks grouped by Calendar dates */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-yellow-600" />
                {t("Lượng Click Theo Ngày Gần Nhất", "Conversion Tracking by Date")}
              </h4>
              <div className="space-y-3 pt-1">
                {sortedDates.length > 0 ? (
                  sortedDates.map(([date, count]) => {
                    const percentage = totalClicksCount > 0 ? Math.round((count / Math.max(...(Object.values(clicksByDate) as number[]))) * 100) : 0;
                    return (
                      <div key={date} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="text-[10px] text-slate-500 font-mono">📅 {date}</span>
                          <span className="font-bold text-slate-900 font-mono">{count} clicks</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div 
                            className="bg-amber-500 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-450 text-center py-6">{t("Chưa ghi nhận clicks nào", "Waiting for analytics telemetry stream...")}</p>
                )}
              </div>
            </div>

            {/* Top Traffic Referrers */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <Link className="w-4 h-4 text-blue-700" />
                {t("Nguồn Giới Thiệu Nhiều Nhất (Referrers)", "Top Conversion Referrers")}
              </h4>
              <div className="space-y-3 pt-1">
                {sortedReferrers.length > 0 ? (
                  sortedReferrers.map(([ref, count]) => {
                    const percentage = totalClicksCount > 0 ? Math.round((count / totalClicksCount) * 100) : 0;
                    return (
                      <div key={ref} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="truncate max-w-[250px] font-mono text-slate-600 text-[10px]" title={ref}>
                            🔗 {ref}
                          </span>
                          <span className="shrink-0">{count} clicks ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-450 text-center py-6">{t("Chưa ghi nhận clicks nào", "Waiting for analytics telemetry stream...")}</p>
                )}
              </div>
            </div>

            {/* Devices Breakdown Widget */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-emerald-700" />
                {t("Click Theo Thiết Bị (Devices)", "Top Operating Devices")}
              </h4>
              <div className="space-y-3 pt-1">
                {sortedDevices.length > 0 ? (
                  sortedDevices.map(([device, count]) => {
                    const percentage = totalClicksCount > 0 ? Math.round((count / totalClicksCount) * 100) : 0;
                    return (
                      <div key={device} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="truncate max-w-[200px] font-mono text-slate-650 text-[10px]" title={device}>
                            📱 {device}
                          </span>
                          <span className="shrink-0">{count} clicks ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div 
                            className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-450 text-center py-6">{t("Chưa ghi nhận thiết bị nào", "Waiting for analytics device stream...")}</p>
                )}
              </div>
            </div>

            {/* Platforms Breakdown Widget */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-sky-700" />
                {t("Click Theo Nền Tảng (Platforms)", "Top Client Platforms")}
              </h4>
              <div className="space-y-3 pt-1">
                {sortedPlatforms.length > 0 ? (
                  sortedPlatforms.map(([platform, count]) => {
                    const percentage = totalClicksCount > 0 ? Math.round((count / totalClicksCount) * 100) : 0;
                    return (
                      <div key={platform} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="truncate max-w-[200px] font-mono text-slate-650 text-[10px]" title={platform}>
                            🖥️ {platform}
                          </span>
                          <span className="shrink-0">{count} clicks ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div 
                            className="bg-sky-500 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-450 text-center py-6">{t("Chưa ghi nhận hệ điều hành nào", "Waiting for platform telemetry stream...")}</p>
                )}
              </div>
            </div>

          </div>

          {/* Master clicks ledger datatable stream */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 uppercase flex items-center gap-1.5">
                <MousePointerClick className="w-4 h-4 text-green-700" />
                {t("Cơ Sở Dữ Liệu AffiliateClicks (Firebase Live Ledger)", "Real-Time Master Outbound Conversions Ledger")} ({filteredClicks.length} / {clicks.length})
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{t("Dữ liệu được nạp tự động, tức thời từ collection 'affiliateClicks' trên Firestore.", "Real-time records streaming securely from public-private split collection 'affiliateClicks'.")}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] font-mono text-slate-500 border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100 text-[9px] font-sans">
                    <th className="p-2.5">{t("Nhà Mạng", "Partner")}</th>
                    <th className="p-2.5">{t("Dịch vụ", "Service")}</th>
                    <th className="p-2.5">{t("Hành Trình / Tuyến", "Route")}</th>
                    <th className="p-2.5">{t("Chiến dịch / UTM", "Campaign (UTM)")}</th>
                    <th className="p-2.5">{t("Thiết bị / OS", "Client Device / OS")}</th>
                    <th className="p-2.5">{t("Nguồn tham chiếu", "Referrer")}</th>
                    <th className="p-2.5 text-right">{t("Thời gian", "Stamp")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClicks.map((clk) => (
                    <tr key={clk.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-2.5">
                        <span className="bg-[#EFFFFA] text-[#01411C] border border-emerald-150 px-1.5 py-0.5 rounded font-bold uppercase text-[9px]">
                          {clk.provider}
                        </span>
                      </td>
                      <td className="p-2.5 text-[9px]">
                        <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[8px] uppercase font-bold">
                          {clk.serviceType || "transport"}
                        </span>
                      </td>
                      <td className="p-2.5 text-[#E65F2B] font-bold text-[9px]">
                        {clk.route || "Hà Nội ➔ Đà Nẵng"}
                      </td>
                      <td className="p-2.5 font-sans">
                        <span className="font-bold text-slate-800 text-[11px] block">{clk.campaign || clk.utmCampaign || "none"}</span>
                        <span className="text-[9px] text-[#01411C] font-semibold font-mono block truncate max-w-[200px]" title={clk.targetUrl}>
                          {clk.targetUrl}
                        </span>
                      </td>
                      <td className="p-2.5 font-sans">
                        <span className="font-semibold text-slate-700 block text-[10px]">{clk.device || clk.deviceType || "Desktop"}</span>
                        <span className="text-[9px] text-slate-400 font-mono block">{clk.platform || "macIntel"}</span>
                      </td>
                      <td className="p-2.5">
                        <span className="text-slate-500 truncate block max-w-[120px]" title={clk.referrer || "Direct"}>
                          {clk.referrer || "Direct"}
                        </span>
                      </td>
                      <td className="p-2.5 text-right font-mono text-[9px] text-slate-450">
                        {clk.createdAt ? (
                          <>
                            <span className="block font-bold">{new Date(clk.createdAt).toLocaleDateString()}</span>
                            <span>{new Date(clk.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </>
                        ) : "---"}
                      </td>
                    </tr>
                  ))}
                  {clicks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-6 text-slate-450">
                        {t("Đang thu nhận sự kiện điều hướng đối tác từ Firestore...", "No clicks registered yet in active database nodes.")}
                      </td>
                    </tr>
                  ) : filteredClicks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-6 text-slate-450">
                        {t("Không tìm thấy sự kiện click nào phù hợp với bộ lọc hiện tại...", "No clicks match the active query filters in active database nodes.")}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          {/* CRM Leads Table as secondary data review */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase flex items-center gap-1.5">
              <Users className="w-4 h-4 text-green-700" />
              {t("Bản Ghi Lữ Khách Thành Viên Đăng Ký (GA Leads)", "Registrant Travel Lead Network Database")} ({leads.length})
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-medium text-slate-600 border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100 text-[10px]">
                    <th className="p-2.5">{t("Lữ Khách/Email", "Nomad/Contact")}</th>
                    <th className="p-2.5">{t("Số Điện Thoại", "Phone")}</th>
                    <th className="p-2.5">{t("Tần Suất", "Frequency")}</th>
                    <th className="p-2.5 text-right">{t("Ngày Đăng Ký", "Joined")}</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-2.5">
                        <span className="font-extrabold text-slate-900 block">{l.fullName}</span>
                        <span className="text-[10px] text-slate-400 font-mono block">{l.email}</span>
                      </td>
                      <td className="p-2.5 font-mono text-[10px]">{l.phoneNumber}</td>
                      <td className="p-2.5">
                        <span className="bg-green-50 text-[#01411C] border border-green-150 px-1.5 py-0.2 rounded text-[10px]">
                          {l.travelFrequency}
                        </span>
                      </td>
                      <td className="p-2.5 text-right text-slate-400 text-[10px] font-mono">
                        {l.createdAt ? new Date(l.createdAt).toLocaleDateString() : "---"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* RENDER ACTIVE TAB: FUNNEL CALCULATOR */}
      {activeTab === "funnel" && (
        <div className="bg-white border border-slate-250 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
          
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-yellow-600" />
            <div>
              <span className="font-extrabold text-slate-950 text-xs uppercase tracking-wider block font-sans">
                {t("Trang Tính Giả Lập Hiệu Suất & Lượng Khách (Dành Cho Nhà Sáng Lập)", "TikTok ➜ Partner Traffic & Reach Funnel Projection Calculator")}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">{t("Kéo thanh trượt điều kiện phễu quảng bá để thẩm định lượng tiếp cận và chuyển đổi hàng tháng:", "Adjust conversion layers to simulate and visualize monthly traffic and reach dynamically:")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sliders Input Left Column */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-5 text-xs font-bold text-slate-500">
              
              {/* View slide */}
              <div className="space-y-1.52">
                <div className="flex justify-between items-center text-[11px]">
                  <label className="text-slate-800">{t("Lượt Xem TikTok Viral / Tháng", "TikTok Video Views / Month")}</label>
                  <span className="bg-slate-100 text-slate-800 font-mono font-black px-2 py-0.5 rounded text-[10px]">
                    {tiktokViews.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="3000000"
                  step="10000"
                  value={tiktokViews}
                  onChange={(e) => setTiktokViews(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#01411C]"
                />
              </div>

              {/* CTR slide */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <label className="text-slate-800">{t("Tỷ lệ Chuyển Đổi Click Link Bio (CTR)", "Bio-Link CTR Click% (Layer 1)")}</label>
                  <span className="bg-slate-100 text-slate-800 font-mono font-black px-2 py-0.5 rounded text-[10px]">
                    {ctrPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.1"
                  value={ctrPercent}
                  onChange={(e) => setCtrPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#01411C]"
                />
              </div>

              {/* Checkout buy slide */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <label className="text-slate-800">{t("Tỷ lệ Booking Đặt Vé / Mua Tour", "Ecosystem Reservation Rate% (Layer 2)")}</label>
                  <span className="bg-slate-100 text-slate-800 font-mono font-black px-2 py-0.5 rounded text-[10px]">
                    {paymentPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5"
                  step="0.1"
                  value={paymentPercent}
                  onChange={(e) => setPaymentPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#01411C]"
                />
              </div>

              {/* Average Ticket cost */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <label className="text-slate-800">{t("Đơn Giá Trị Trung Bình Sản Phẩm (Vé/Hotel/Tour)", "Average Order value (AOV)")}</label>
                  <span className="bg-slate-150 text-slate-800 font-mono font-black px-2 py-0.5 rounded text-[10px]">
                    {ticketAvgValue.toLocaleString()}đ
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2500000"
                  step="50000"
                  value={ticketAvgValue}
                  onChange={(e) => setTicketAvgValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#01411C]"
                />
              </div>

              {/* Commission commissionRate */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <label className="text-slate-800">{t("Phần Trăm Hoa Hồng Chi Trả (Trung bình Agoda+Baolau)", "Flat Affiliate Revenue Commission Ratio")}</label>
                  <span className="bg-slate-100 text-slate-800 font-mono font-black px-2 py-0.5 rounded text-[10px]">
                    {commissionRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#01411C]"
                />
              </div>

            </div>

            {/* Projection Outputs Right Column - Visual Card */}
            <div className="lg:col-span-12 xl:col-span-5 bg-[#FAFBFD] border border-blue-50 p-5 rounded-2xl flex flex-col justify-between space-y-4 h-full min-h-[290px]">
              
              <div className="space-y-4">
                <span className="text-indigo-800 font-black text-[9px] uppercase tracking-widest block font-mono">
                  🚀 {t("DOANH SỐ KIỂM CHỨNG THEO PHỄU", "PREDICTIVE METRIC CONVERSION PYRAMID")}
                </span>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-1.5 text-slate-500 font-bold">
                    <span>{t("Khách Truy Cập BioLink / Tháng", "Bio Link Landing Visits")}</span>
                    <span className="font-mono text-slate-800">{estLandingVisits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-1.5 text-slate-500 font-bold">
                    <span>{t("Giao Dịch Đặt Thành Công", "Expected Successful Checkouts")}</span>
                    <span className="font-mono text-slate-800">{estCompletedPurchases.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-1.5 text-slate-500 font-bold">
                    <span>{t("Doanh Thu Hàng Hóa Gộp (GMV)", "Estimated Gross Merchandise Value")}</span>
                    <span className="font-mono text-slate-800">{totalWagonRevenue.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#EFFFFA] border border-[#A7F3D0] p-4 rounded-xl text-center">
                <span className="text-[10px] text-[#065F46] font-black uppercase tracking-wider block font-mono">{t("Lợi Nhuận Tiếp Thị Ròng / Tháng", "Projected Net Affiliate Commissions")}</span>
                <span className="text-xl md:text-2xl font-black text-[#047857] mt-1 block font-mono">
                  {projectedEarnings.toLocaleString()}đ <span className="text-xs">VND</span>
                </span>
                <span className="text-[9px] text-[#047857] font-semibold mt-1 block">➔ {t("Dữ liệu gối trực tiếp hoa hộc Agoda + Baolau 12Go", "Direct affiliate commission aggregation of primary bookings")}</span>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* RENDER ACTIVE TAB: INTEGRATIONS SPECS */}
      {activeTab === "integrations" && (
        <div className="space-y-6 animate-fade-in text-xs font-medium text-slate-600">
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              {t("Cơ Cấu Liên Kết Đối Tác Đã Sẵn Sàng Sản Xuất", "Ecosystem Integration Architecture Integration Blueprint")}
            </h4>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              {t(
                "Để tối ưu hóa trải nghiệm lữ khách, các liên kết từ các cổng truyền thông bên ngoài (Tiktok Bio Link, Beacons Portal, UTM parameters & GA4) được đóng gói và kết nối chuẩn hóa hoàn thiện tự động.",
                "To streamline traffic telemetry from social channels, production hook skeletons for TikTok, Beacons, UTM campaign strings and GA4 have been successfully integrated."
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <span className="bg-black text-white text-[9px] font-black font-mono tracking-wider px-2 py-0.5 rounded uppercase">
                  TikTok Pixel Events API
                </span>
                <p className="text-slate-950 font-bold text-xs">{t("Lỗ ghim sự kiện Click của TikTok", "TikTok Custom Outbound Click Hook")}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {t(
                    "Theo dõi chuyển đổi ròng từ người xem đèo Hải Vân kéo về Bio Link. Code đã thiết kế sẵn hàm gửi sự kiện click với tham số TikTok EventID tương thích Pixel Tracking.",
                    "Integrates with standard Pixel API parameters. Outbound click events assign a unique clickId string to cross-reference with TikTok analytics dashboards."
                  )}
                </p>
                <div className="bg-slate-900 text-yellow-400 font-mono text-[9px] p-2.5 rounded-lg border border-slate-800">
                  ttq.track('ClickAffiliate', &#123; content_name: provider, event_id: clickId &#125;);
                </div>
              </div>

              <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <span className="bg-indigo-600 text-white text-[9px] font-black font-mono tracking-wider px-2 py-0.5 rounded uppercase">
                  Beacons Link-In-Bio Ready
                </span>
                <p className="text-slate-950 font-bold text-xs">{t("Cầu nối di sản Beacons Portal", "Beacons Partner Redirect Gateway")}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {t(
                    "Tương thích hoàn toàn với chuyển hướng liên kết Beacons. Người dùng nhấn nút liên kết của Beacons sẽ tự động kích hoạt triggers đồng bộ Firestore clickId trước khi chuyển đổi đại lý.",
                    "Decodes outbound clicks routed from beacons.ai/vnrailway. Synchronizes lead conversion tracking dynamically, bypassing standard ad-blocker limitations."
                  )}
                </p>
                <div className="bg-slate-900 text-[#00E5FF] font-mono text-[9px] p-2.5 rounded-lg border border-slate-800">
                  const targetUrl = 'https://website.beacons.ai/vnrailway';
                </div>
              </div>

              <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <span className="bg-[#01411C] text-white text-[9px] font-black font-mono tracking-wider px-2 py-0.5 rounded uppercase">
                  UTM Tracking Engine
                </span>
                <p className="text-slate-950 font-bold text-xs">{t("Tự động hóa bóc tách tham số UTM", "UTM Tracking Automation")}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {t(
                    "Tự động trích lọc các tham số utm_source, utm_medium, utm_campaign, utm_term từ thanh địa chỉ trình duyệt của người dùng để lưu vết nguồn lữ khách chính xác.",
                    "Extracts URL query structures instantly on click. Prefills parameters for campaign tracking, ensuring source origins remain intact."
                  )}
                </p>
                <div className="bg-slate-900 text-emerald-400 font-mono text-[9px] p-2.5 rounded-lg border border-slate-800">
                  const campaign = urlParams.get('utm_campaign') || defaultCampaign;
                </div>
              </div>

              <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <span className="bg-[#FF9100] text-white text-[9px] font-black font-mono tracking-wider px-2 py-0.5 rounded uppercase">
                  Google Analytics 4 Enhanced
                </span>
                <p className="text-slate-950 font-bold text-xs">{t("Đo lường nâng cao GA4", "GA4 Outbound Event Architecture")}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {t(
                    "Sử dụng lệnh gtag('event') chuẩn hóa để đẩy lượng click điều hướng đối tác trực tiếp vào Google Analytics thời gian thực dưới tên sự kiện 'partner_click'.",
                    "Dispatches real-time outbound analytics to Google Analytics 4 dashboards. Keeps tracking of all external brand clicks perfectly visual."
                  )}
                </p>
                <div className="bg-slate-900 text-orange-400 font-mono text-[9px] p-2.5 rounded-lg border border-slate-800">
                  gtag('event', 'partner_click', &#123; provider: clk.provider &#125;);
                </div>
              </div>

            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-slate-500 text-[11px]">
                {t(
                  "Hệ thống điều hướng đối tác và liên kết (Partner Navigation Engine) hoàn toàn sẵn sàng bàn giao cho các chiến dịch phát triển quy mô di sản tiếp theo.",
                  "Master tracker is thoroughly built and optimized for next-generation multi-platform viral campaigns."
                )}
              </span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
