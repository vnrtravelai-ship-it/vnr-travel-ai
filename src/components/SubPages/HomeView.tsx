import React from "react";
import { Train, ArrowRight, Share2, Heart, MessageCircle, ExternalLink, Sparkles, Smartphone, Play, Compass, Award } from "lucide-react";

interface HomeViewProps {
  lang: "vi" | "en";
  setSubPage: (page: string) => void;
  setPlannerPresets: (from: string, to: string) => void;
  trackAffiliateClick: (
    provider: string, 
    targetUrl: string, 
    camp?: string, 
    serviceType?: string, 
    route?: string
  ) => void;
}

export default function HomeView({ lang, setSubPage, setPlannerPresets, trackAffiliateClick }: HomeViewProps) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const stats = [
    { label: t("Nhà Ga Kết Nối", "Connected Stations"), value: "24+", color: "text-green-700 bg-green-50" },
    { label: t("Đại Lý Liên Kết", "Affiliate Agencies"), value: "5+", color: "text-blue-700 bg-blue-50" },
    { label: t("Kỷ Lục Điểm Trạm", "Travel Attractions"), value: "150+", color: "text-amber-700 bg-amber-50" },
    { label: t("Thành Viên Câu Lạc Bộ", "Community Members"), value: "1.2k+", color: "text-purple-700 bg-purple-50" }
  ];

  const ticketCardMarkup = (
    <div 
      onClick={() => setSubPage("planner")}
      className="relative rounded-2xl p-5 shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 border-2 border-[#D4AF37] overflow-hidden min-h-[380px] flex flex-col justify-between w-full max-w-[360px] sm:max-w-md mx-auto"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Premium vintage papyrus and golden-ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF0]/92 via-[#FFFBF0]/95 to-[#FBF3D5]/98 mix-blend-normal z-0" />
      
      {/* Golden classical inner frame */}
      <div className="absolute inset-2.5 border border-[#D4AF37]/50 rounded-xl pointer-events-none z-10" />
      <div className="absolute top-4.5 left-4.5 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-10" />
      <div className="absolute top-4.5 right-4.5 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-10" />
      <div className="absolute bottom-4.5 left-4.5 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-10" />
      <div className="absolute bottom-4.5 right-4.5 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-10" />

      {/* Ticket Top-Bottom Classical Punch Half-Circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#01411C] rounded-full border border-[#D4AF37]/45 z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-[#01411C] rounded-full border border-[#D4AF37]/45 z-10" />

      {/* Decorative side stamp */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 transform -rotate-90 origin-center text-[7px] font-mono tracking-[0.3em] text-[#01411C]/35 font-bold uppercase select-none z-10">
        ★ VIETNAM HERITAGE RAILWAY ★
      </div>

      {/* Ticket Header Area */}
      <div className="relative z-10 text-center border-b-2 border-dashed border-[#D4AF37]/40 pb-2.5">
        <div className="flex items-center justify-center gap-1">
          <span className="text-[#D4AF37]">⚜️</span>
          <span className="text-[10px] font-black tracking-widest text-[#01411C] uppercase font-sans">
            {t("VÉ HÀNH TRÌNH DI SẢN", "HERITAGE PASSENGER TICKET")}
          </span>
          <span className="text-[#D4AF37]">⚜️</span>
        </div>
        <div className="flex justify-between items-center mt-1.5 px-2 text-[9px] font-mono text-amber-900 font-black">
          <span>EST. 1881</span>
          <span className="bg-amber-100 text-amber-950 px-2 py-0.5 rounded border border-[#D4AF37]/30">
            No. VNR-1881
          </span>
        </div>
      </div>

      {/* Route Segment (Hanoi to Saigon) */}
      <div className="relative z-10 py-4 flex justify-between items-center text-center px-1">
        <div className="w-[30%]">
          <span className="text-[9px] text-amber-950/60 font-extrabold block tracking-tight uppercase">{t("Khởi hành", "From")}</span>
          <span className="text-sm font-black text-[#01411C] block tracking-tight">{t("GA HÀ NỘI", "HANOI STATION")}</span>
          <span className="text-[9px] font-mono text-amber-800 font-extrabold block">HAN (Km 0)</span>
        </div>
        
        <div className="w-[40%] flex flex-col items-center px-1 text-center">
          <span className="text-[8px] font-black text-amber-900 tracking-tight leading-normal block max-w-[120px] mx-auto hyphens-none">
            {t("Đường sắt Việt Nam", "Vietnam Railways")}
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37] to-[#D4AF37]/10 relative flex items-center justify-center my-1.5">
            <Train className="w-4 h-4 text-amber-800 bg-[#FFFDF4] p-0.5 rounded-full border border-[#D4AF37]/30 absolute animate-pulse" />
          </div>
          <span className="text-[8px] font-serif text-slate-600 font-semibold leading-tight block">
            {t("Hành trình kết nối di sản", "Connecting world heritages")}
          </span>
        </div>

        <div className="w-[30%]">
          <span className="text-[9px] text-amber-950/60 font-extrabold block tracking-tight uppercase">{t("Điểm đến", "To")}</span>
          <span className="text-sm font-black text-[#01411C] block tracking-tight">{t("GA SÀI GÒN", "SAIGON STATION")}</span>
          <span className="text-[9px] font-mono text-amber-800 font-extrabold block">SGN (Km 1726)</span>
        </div>
      </div>

      {/* Premium Historical Connection Banner */}
      <div className="relative z-10 mx-auto w-full max-w-[240px] text-center bg-amber-50/70 border border-dashed border-[#D4AF37]/45 rounded-lg py-1.5 px-2 mb-3.5">
        <p className="text-[9px] font-bold text-[#01411C] leading-snug">
          ✨ {t("Đường sắt Việt Nam, Hành trình kết nối các điểm du lịch nổi tiếng", "Vietnam Railways, Connecting iconic heritage tourist destinations")} ✨
        </p>
      </div>

      {/* Ticket Details */}
      <div className="relative z-10 bg-amber-50/85 rounded-xl p-3 border border-[#D4AF37]/30 space-y-2 text-[10px] leading-tight shadow-inner">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-serif">{t("Hạng Toa / Ghế:", "Class / Seat:")}</span>
          <span className="font-extrabold text-white bg-[#01411C] px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider border border-[#D4AF37]/40 shadow-sm">
            {t("Toa Thượng Hạng (VIP-01)", "First Class (VIP-01)")}
          </span>
        </div>
        <div className="flex justify-between items-center border-t border-amber-200/50 pt-1.5">
          <span className="text-slate-500 font-serif">{t("Hành khách:", "Passenger:")}</span>
          <span className="font-black text-slate-800 uppercase font-mono tracking-wide">{t("Người Khám Phá Di Sản", "Heritage Explorer")}</span>
        </div>
        <div className="flex justify-between items-center border-t border-amber-200/50 pt-1.5">
          <span className="text-slate-500 font-serif">{t("Trạng thái vé:", "Ticket Status:")}</span>
          <span className="font-extrabold text-amber-800 font-mono flex items-center gap-1 animate-pulse">
            🟢 {t("ĐÃ SẴN SÀNG KHỞI HÀNH", "READY FOR EXPLORING")}
          </span>
        </div>
      </div>

      {/* Barcode representation with Retro Vintage Dashed Lines */}
      <div className="relative z-10 pt-3.5 border-t-2 border-dashed border-[#D4AF37]/40 flex flex-col items-center justify-center space-y-1.5">
        <div className="flex gap-1 h-6 items-center overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
          {[2, 4, 1, 3, 2, 5, 1, 2, 4, 2, 3, 1, 5, 2, 3, 1, 4, 2].map((w, idx) => (
            <div 
              key={idx} 
              className="bg-[#01411C] rounded-[1px] border-t-2 border-b-2 border-dashed border-[#FFFDF4]" 
              style={{ width: `${w}px`, height: '100%' }} 
            />
          ))}
        </div>
        <span className="text-[8px] font-mono text-amber-950/70 font-extrabold tracking-[0.25em] text-center uppercase block">
          * 1881-2026 HERITAGE PASS *
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* 1. HERO MAIN WELCOME - HERITAGE RAILWAY ARCHITECTURE */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#012d14] via-[#01411C] to-[#0d5c2d] text-white shadow-2xl border-4 border-double border-[#D4AF37]/30 p-1">
        {/* Vintage Frame Inset and Bracket Corners */}
        <div className="absolute inset-1.5 border border-[#D4AF37]/20 rounded-[18px] pointer-events-none z-10" />
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/50 pointer-events-none z-10" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/50 pointer-events-none z-10" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/50 pointer-events-none z-10" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/50 pointer-events-none z-10" />

        {/* Ambient atmospheric lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle vintage train route watermark */}
        <div className="absolute -right-20 -bottom-16 opacity-10 select-none pointer-events-none transform rotate-12 transition-all duration-1000 hover:rotate-6">
          <svg className="w-[450px] h-[300px]" fill="none" stroke="currentColor" viewBox="0 0 100 100" strokeWidth="0.5">
            <path d="M 10 90 L 90 10 M 15 95 L 95 15 M 10 90 Q 50 10 90 90 M 15 95 Q 50 15 95 95" strokeDasharray="1,2" />
            <circle cx="50" cy="50" r="30" strokeDasharray="2,3" />
            <circle cx="50" cy="50" r="15" strokeDasharray="1,1" />
          </svg>
        </div>

        <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heritage storytelling & controls */}
          <div className="md:col-span-7 lg:col-span-8 space-y-5 text-left flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#D4AF37]/90 text-slate-950 text-[9px] sm:text-[10px] font-black tracking-widest px-3 py-1.5 rounded-md uppercase inline-block shadow-lg border border-[#fff]/40 font-mono">
                {t("🚄 HỆ SINH THÁI GA TÀU DI SẢN", "🚄 VIETNAM RAILWAY HERITAGE")}
              </span>
              <span className="border border-emerald-400/30 text-emerald-300 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase bg-emerald-950/40">
                {t("Di Sản 1881", "Est. 1881")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-200">
              {t("Khám Phá Việt Nam Bằng Tàu Hỏa Cùng AI", "Explore Vietnam by Train with AI")}
            </h2>

            {/* ON MOBILE: Render the Ticket card BEFORE the long paragraph */}
            <div className="block md:hidden w-full my-4">
              {ticketCardMarkup}
            </div>

            {/* Vintage Heritage Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
              <div className="text-[#D4AF37] text-xs font-serif flex items-center gap-1 bg-[#01411C]/60 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20">
                <span>⚜️</span>
                <Train className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>⚜️</span>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
            </div>

            <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed max-w-xl text-pretty font-serif">
              {t(
                "Lập kế hoạch hành trình đường sắt khó quên trên khắp Việt Nam với lịch trình tàu thời gian thực, khách sạn cổ điển, trải nghiệm văn hóa bản địa độc đáo và các đối tác đáng tin cậy lâu đời.",
                "Embark on nostalgic, romantic train journeys traversing historical passes and scenic coastal routes with real-time timetables, classic heritage hotels, local delicacies, and premium partners."
              )}
            </p>

            {/* Premium action buttons with vintage flair */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => setSubPage("planner")}
                className="bg-gradient-to-r from-[#FFD700] via-[#F3C010] to-[#E5A900] hover:from-[#F3C010] hover:to-[#C69000] text-slate-950 font-black px-6 h-12 rounded-xl transition-all duration-300 shadow-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer border border-[#FFF]/40 hover:shadow-yellow-500/20 min-h-[48px]"
              >
                {t("Vẽ Lịch Trình AI Ngay", "Generate AI Trip Now")} 
                <Sparkles className="w-4 h-4 animate-pulse text-slate-950" />
              </button>
              
              <button
                onClick={() => setSubPage("community")}
                className="bg-white/10 hover:bg-white/15 text-white font-extrabold px-6 h-12 rounded-xl transition-all duration-300 text-xs border border-[#D4AF37]/30 flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer min-h-[48px]"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                {t("Tham Gia Cộng Đồng", "Join Our Community")}
              </button>
            </div>
          </div>

          {/* Right Column: Exquisite Retro Train Ticket Stub (Interactive Showcase on Tablet/Desktop) */}
          <div className="hidden md:block md:col-span-5 lg:col-span-4 w-full">
            {ticketCardMarkup}
          </div>

        </div>
      </div>

      {/* 2. STATS DISPLAY PANELS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => (
          <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${st.color}`}>
              {st.value}
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block leading-tight">{st.label}</span>
              <span className="text-xs font-semibold text-slate-500 font-mono">Verified</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. KEY PARTNERS DIRECT AFFILIATES PORTALS */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div>
          <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest block font-mono">
            {t("Đối tác Du lịch Chính thức", "Official Travel Partners")}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-bold">
          {/* Baolau (Vietnamese) */}
          <button
            onClick={() => trackAffiliateClick("baolau", "https://www.baolau.com/vi/transportation/vietnam/trains?source=vnrailway", "direct_home_vi", "train_ticket")}
            className="p-3.5 border border-slate-150 rounded-xl hover:border-green-600 hover:bg-green-50/20 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div>
              <span className="text-slate-900 block font-bold">1. Baolau Rail Vietnam</span>
              <span className="text-[10px] text-green-700 font-semibold mt-0.5 block font-mono">
                🎟️ Train Tickets • Baolau
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-350 group-hover:text-green-700 transition-all shrink-0" />
          </button>

          {/* Baolau (English) */}
          <button
            onClick={() => trackAffiliateClick("baolau", "https://www.baolau.com/en/transportation/vietnam/trains?source=vnrailway", "direct_home_en", "train_ticket")}
            className="p-3.5 border border-slate-150 rounded-xl hover:border-green-600 hover:bg-green-50/20 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div>
              <span className="text-slate-900 block font-bold">1. Baolau Rail International</span>
              <span className="text-[10px] text-green-700 font-semibold mt-0.5 block font-mono">
                🎟️ Train Tickets • Baolau
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-350 group-hover:text-green-700 transition-all shrink-0" />
          </button>

          {/* 12Go */}
          <button
            onClick={() => trackAffiliateClick("12go", "https://12go.asia/en?z=15761336", "direct_home", "transport")}
            className="p-3.5 border border-slate-150 rounded-xl hover:border-blue-600 hover:bg-blue-50/20 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div>
              <span className="text-slate-900 block font-bold">2. 12Go Asia</span>
              <span className="text-[10px] text-blue-700 font-semibold mt-0.5 block font-mono">
                ✈️ Transportation • 12Go
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-350 group-hover:text-blue-700 transition-all shrink-0" />
          </button>

          {/* Traveloka */}
          <button
            onClick={() => trackAffiliateClick("traveloka", "https://shorten.asia/QbYFPjrn", "direct_home", "hotel_flight")}
            className="p-3.5 border border-slate-150 rounded-xl hover:border-sky-600 hover:bg-sky-50/20 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div>
              <span className="text-slate-900 block font-bold">3. Traveloka</span>
              <span className="text-[10px] text-sky-700 font-semibold mt-0.5 block font-mono">
                🏨 Hotels & Flights • Traveloka
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-350 group-hover:text-sky-700 transition-all shrink-0" />
          </button>

          {/* Trip.com */}
          <button
            onClick={() => trackAffiliateClick("trip", "https://shorten.asia/F4t8GkG7", "direct_home", "hotel_flight")}
            className="p-3.5 border border-slate-150 rounded-xl hover:border-indigo-600 hover:bg-indigo-50/20 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div>
              <span className="text-slate-900 block font-bold">4. Trip.com</span>
              <span className="text-[10px] text-indigo-700 font-semibold mt-0.5 block font-mono">
                🏨 Hotels & Flights • Trip.com
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-350 group-hover:text-indigo-700 transition-all shrink-0" />
          </button>

          {/* VeXeRe */}
          <button
            onClick={() => trackAffiliateClick("vexere", "https://shorten.asia/dWPYmeKv", "direct_home", "bus_ticket")}
            className="p-3.5 border border-slate-150 rounded-xl hover:border-orange-600 hover:bg-orange-50/20 transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div>
              <span className="text-slate-900 block font-bold">5. VeXeRe</span>
              <span className="text-[10px] text-orange-700 font-semibold mt-0.5 block font-mono">
                🚌 Bus Tickets • VeXeRe
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-350 group-hover:text-orange-700 transition-all shrink-0" />
          </button>
        </div>
      </div>

    </div>
  );
}
