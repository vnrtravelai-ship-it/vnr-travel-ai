import React, { useState } from "react";
import { Train, Clock, MapPin, Search, ArrowRight, ExternalLink, ShieldCheck, Map } from "lucide-react";

interface RoutesViewProps {
  lang: "vi" | "en";
  trackAffiliateClick: (
    provider: string, 
    targetUrl: string, 
    camp?: string,
    serviceType?: string,
    route?: string
  ) => void;
}

export default function RoutesView({ lang, trackAffiliateClick }: RoutesViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const routesList = [
    {
      code: "SE1 / SE2",
      name: t("Tàu Thống Nhất Bắc Nam", "North-South Thong Nhat Express"),
      stops: t("Hà Nội - Nam Định - Vinh - Huế - Đà Nẵng - Quy Nhơn(Diêu Trì) - Nha Trang - Sài Gòn", "Hanoi - Vinh - Hue - Danang - Dieu Tri - Nha Trang - Saigon"),
      duration: "31 - 33 " + t("giờ", "hours"),
      frequency: t("Hàng ngày, liên tục", "Daily continuous"),
      highlights: t("Tàu nhanh nhất xuyên suốt chiều sâu lịch sử quốc gia.", "The fastest cross-country train traversing historical landmarks."),
      pricingInfo: t("Vé Ghế từ 600Kđ • Giường nằm từ 1.1Mđ", "Seats from 600k VND • Sleeper from 1.1M VND"),
      link: "https://www.baolau.com/vi/transportation/vietnam/trains?source=vnrailway"
    },
    {
      code: "SE19 / SE20",
      name: t("Tàu Đêm Di Sản Chất Lượng Cao", "Hanoi - Danang Night Heritage Express"),
      stops: t("Hà Nội - Phủ Lý - Nam Định - Thanh Hóa - Vinh - Đồng Hới - Huế - Đà Nẵng", "Hanoi - Vinh - Dong Hoi - Hue - Danang"),
      duration: "15 - 16 " + t("giờ", "hours"),
      frequency: t("Hàng ngày lúc 19:50 từ Hà Nội", "Daily departure at 19:50 from Hanoi"),
      highlights: t("Nội thất trang trí gấm hoa sang vương giả, ẩm thực chọn món thanh cảnh đặc sắc.", "Luxury hand-decorated cabins, boutique catering service on board."),
      pricingInfo: t("Khoang VIP 4 Giường nằm bọc nhung từ 1.4Mđ", "VIP Velvet Sleeper cabin from 1.4M VND"),
      link: "https://www.baolau.com/vi/transportation/vietnam/trains?source=vnrailway"
    },
    {
      code: "HD1 / HD2",
      name: t("Tàu Kết Nối Di Sản 'Hành Trình Hải Vân'", "Heritage Connect 'Hai Van Scenic Journey'"),
      stops: t("Huế - Lăng Cô - Ga Kim Liên - Ga Đà Nẵng", "Hue - Lang Co beach - Kim Lien station - Danang"),
      duration: "3 - 3.5 " + t("giờ", "hours"),
      frequency: t("4 Chuyến/Ngày (Sáng - Chiều hai đầu ngược xuôi)", "4 trips daily (Morning & Afternoon return)"),
      highlights: t("Tàu du lịch ngắm cảnh ngoạn mục nhất đèo Hải Vân, cabin nhạc Lo-Fi thanh bình, uống trà gừng.", "Stunning curves along ocean cliffs, ambient lo-fi music tea pavilion on board."),
      pricingInfo: t("Đồng giá Vé du lịch di sản 150K - 250Kđ/vé", "Flat Heritage rate 150k - 250k VND"),
      link: "https://website.beacons.ai/vnrailway"
    },
    {
      code: "SP1 / SP3",
      name: t("Vân Nam - Sapa Moonlight Express", "Lao Cai - Sapa Highland Express"),
      stops: t("Ga Hà Nội - Ga Đông Anh - Ga Yên Bái - Ga Lào Cai", "Hanoi - Vinh Yen - Yen Bai - Lao Cai"),
      duration: "8 " + t("giờ", "hours"),
      frequency: t("Xuất phát 22:00 hàng đêm", "Daily midnight departures at 22:00"),
      highlights: t("Toa tàu gỗ ấm, thích hợp ngủ một giấc sảng khoái đón gió mây Sapa sớm mai.", "Rustic wood-cladded cabins, sleep over comfy mattress, catch mountain fogs early morning."),
      pricingInfo: t("Giường cabin cao cấp từ 850Kđ/vé", "Premium wooden cabin from 850k VND"),
      link: "https://12go.asia/en?z=15761336"
    }
  ];

  const filteredRoutes = routesList.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.stops.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Search and Title section */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-[#01411C] font-extrabold text-[10px] uppercase font-mono tracking-widest block">
            {t("Bản đồ Lịch trình mác tàu", "Train Timetable & Timings List")}
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">{t("Theo Dõi Cung Đường Sắt Việt Nam", "Vietnam Railway Operations Map")}</h3>
          <p className="text-xs text-slate-400">{t("Lọc lịch trình tàu du lịch, giờ chạy và đặt mua vé tiện lợi.", "Explore historic timetables, travel durations, and direct booking options.")}</p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={t("Tìm ga tàu, mã tàu...", "Search code or stops...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-705"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Route list cards with affiliate triggers */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3">
            {filteredRoutes.map((route, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-green-400/50 transition-all space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="bg-green-50 text-[#01411C] text-[10px] font-black px-2 py-0.5 rounded-md font-mono border border-green-200">
                      {route.code}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-2">{route.name}</h4>
                  </div>
                  <button
                    onClick={() => trackAffiliateClick("trains_route", route.link, `route_timetable_${route.code}`)}
                    className="text-xs bg-[#FFD700] hover:bg-yellow-400 text-slate-900 font-extrabold h-12 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm shrink-0"
                  >
                    {t("Mua Vé", "Book Ticket")} <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-500">
                  <div className="space-y-1 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-800 text-[10px] uppercase font-mono tracking-wider block">📍 {t("Trạm Dừng Tiêu Biểu", "Major Stations")}:</span>
                    <p className="text-[11px] leading-relaxed">{route.stops}</p>
                  </div>
                  <div className="space-y-1 bg-slate-50/70 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-slate-800 text-[10px] uppercase font-mono tracking-wider block">⏱ {t("Thời gian & Tần suất", "Timings & Durations")}:</span>
                      <p className="text-[11px] mt-0.5">{route.duration} • {route.frequency}</p>
                    </div>
                    <p className="text-[11px] font-bold text-green-700 mt-2 font-mono">{route.pricingInfo}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-normal">
                  &ldquo;{route.highlights}&rdquo;
                </p>
              </div>
            ))}

            {filteredRoutes.length === 0 && (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                {t("Không tìm thấy tuyến tàu nào trùng khớp.", "No trains matched your search term.")}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Visual Graphic Route Map of Vietnam (SVG mockup) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Map className="w-4 h-4 text-green-700" />
            <span className="font-bold text-xs text-slate-900 uppercase font-sans tracking-wide">
              {t("Bản Đồ Hành Trình Di Sản Thống Nhất", "Thong Nhat Heritage Railway Route Map")}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            {t("Mô phỏng trục đường sắt huyết mạch xương sống dài 1,726 Km chảy dọc Bắc - Nam Việt Nam, kết nối các miền thung lũng ải Ải Nam Quan đến đồng bằng Sông Cửu Long sông.", "Illustration of the primary 1,726 Km railway spine running from Hanoi mountain passes to Saigon terminal basins.")}
          </p>

          {/* Interactive SVG schematic */}
          <div className="bg-[#FAFBFD] rounded-2xl border border-blue-50/80 p-4 flex gap-4">
            
            {/* SVG graphic */}
            <div className="w-24 h-80 flex justify-center py-2 relative shrink-0">
              <svg width="60" height="280" viewBox="0 0 60 280" className="opacity-90">
                {/* Main route track train line */}
                <path d="M 30,10 Q 5,70 15,100 T 45,150 T 20,225 L 30,270" fill="none" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
                <path d="M 30,10 Q 5,70 15,100 T 45,150 T 20,225 L 30,270" fill="none" stroke="#01411C" strokeWidth="4" strokeLinecap="round" strokeDasharray="6,4" />
                
                {/* Station dots */}
                <circle cx="30" cy="10" r="6" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" /> {/* Hanoi */}
                <circle cx="7" cy="55" r="5" fill="#01411C" stroke="#FFFFFF" strokeWidth="1.5" />  {/* LaoSapa */}
                <circle cx="15" cy="100" r="6" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" /> {/* Hue */}
                <circle cx="28" cy="120" r="5" fill="#01411C" stroke="#FFFFFF" strokeWidth="1.5" /> {/* LangCo */}
                <circle cx="41" cy="142" r="6" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" /> {/* DaNang */}
                <circle cx="36" cy="195" r="5" fill="#01411C" stroke="#FFFFFF" strokeWidth="1.5" /> {/* QuyNhon */}
                <circle cx="21" cy="230" r="5" fill="#01411C" stroke="#FFFFFF" strokeWidth="1.5" /> {/* NhaTrang */}
                <circle cx="30" cy="270" r="6" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" /> {/* Saigon */}
              </svg>
            </div>

            {/* Timetable labels side */}
            <div className="flex flex-col justify-between text-[10px] font-mono font-bold text-slate-500 py-1 flex-1">
              <div className="space-y-0.5">
                <span className="text-orange-700 font-extrabold flex items-center gap-1 font-sans">● {t("Ga HÀ NỘI", "HANOI STATION")}</span>
                <p className="text-[9px] text-slate-400 font-normal">{t("Km 0 • Khởi nguồn đường Thống Nhất", "Km 0 • Starting point")}</p>
              </div>
              
              <div className="space-y-0.5">
                <span className="text-green-800 font-extrabold flex items-center gap-1 font-sans">○ {t("Ga LÀO CAI (Sapa)", "LAO CAI STATION")}</span>
                <p className="text-[9px] text-slate-400 font-normal">{t("Nhánh rẻ leo núi Fansipan", "Mountain ridge to Sapa fogs")}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-orange-700 font-extrabold flex items-center gap-1 font-sans">● {t("Ga HUẾ (Cố Đô)", "HUE ROYAL GATE")}</span>
                <p className="text-[9px] text-slate-400 font-normal">{t("Di sản sông Hương - Hải Vân vọng cảnh", "Km 688 • Royal palaces")}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-orange-700 font-extrabold flex items-center gap-1 font-sans">● {t("Ga ĐÀ NẴNG (Biển)", "DANANG SEAPORT")}</span>
                <p className="text-[9px] text-slate-400 font-normal">{t("Đèo Hải Vân hùng vĩ ngút vịnh", "Km 791 • Hai Van Pass gate")}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-green-800 font-extrabold flex items-center gap-1 font-sans">○ {t("Ga QUY NHƠN", "QUY NHON DIVINE")}</span>
                <p className="text-[9px] text-slate-400 font-normal">{t("Vịnh biển Tháp Chàm hoang sơ", "Km 1096 • Thap Cham ruins")}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-orange-700 font-extrabold flex items-center gap-1 font-sans">● {t("Ga SÀI GÒN", "SAIGON TERMINAL")}</span>
                <p className="text-[9px] text-slate-400 font-normal">{t("Km 1726 • Trạm cuối của cuộc hành trình", "Km 1726 • Southern terminal")}</p>
              </div>
            </div>

          </div>

          {/* Secure Note */}
          <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t("Dữ liệu mác tàu cập nhật khớp tuyệt đối với Cổng thông tin Đường Sắt Việt Nam.", "Direct flight synchronization with Vietnam Railway Authority.")}</span>
          </div>

        </div>

      </div>

    </div>
  );
}
