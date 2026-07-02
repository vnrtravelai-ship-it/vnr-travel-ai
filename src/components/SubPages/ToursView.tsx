import React from "react";
import { Compass, Clock, Star, MapPin, CheckCircle, ExternalLink } from "lucide-react";

interface ToursViewProps {
  lang: "vi" | "en";
  trackAffiliateClick: (
    provider: string, 
    targetUrl: string, 
    camp?: string,
    serviceType?: string,
    route?: string
  ) => void;
}

export default function ToursView({ lang, trackAffiliateClick }: ToursViewProps) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const tours = [
    {
      id: "t1",
      name: t("Tour Xe Uaz / Jeep Vượt Đèo Hải Vân", "Military Jeep Overpass: Hai Van Scenic Tour"),
      duration: "4 - 5 " + t("tiếng", "hours"),
      rating: "4.9",
      price: "650,000",
      location: t("Đà Nẵng / Huế", "Danang / Hue"),
      highlights: [t("Ngồi xe Jeep mui trần ngắm rặng đèo", "Open-air 4x4 classic Jeep ride"), t("Check-in đỉnh Hải Vân Quan cổ cổ", "Stop at historical gateway fort"), t("Được tặng chè gừng muối sủi bọt", "Complementary hot sea salt tea drink")],
      imgUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400",
      link: "https://12go.asia/en?z=15761336"
    },
    {
      id: "t2",
      name: t("Food Tour Xích Lô Cố Đô Huế Đêm Khuya", "Royal Cyclo Food Tour: Late-Night Hue Cuisine"),
      duration: "3 " + t("tiếng", "hours"),
      rating: "4.8",
      price: "420,000",
      location: t("Huế", "Hue city"),
      highlights: [t("Xích lô thong dong rẽ bóng kinh thành", "Scenic traditional cyclo driver across fortress"), t("Nếm thử 5 loại bánh bèo nậm lọc nóng hổi", "Savor 5 hot steamed rice flour cake variants"), t("Uống bia Huda sảng khoái vỉa hè", "Enjoy ice-cold local Huda craft beers")],
      imgUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400",
      link: "https://website.beacons.ai/vnrailway"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Header section */}
      <div>
        <span className="text-[#01411C] font-extrabold text-[10px] uppercase font-mono tracking-widest block">
          {t("Klook & Local Tour Partners", "Curated Local Tour Alliances")}
        </span>
        <h3 className="text-lg font-bold text-slate-900 mt-1">{t("Trải Nghiệm Độc Đáo Tại Điểm Đến", "Unique Historical Tour Activities")}</h3>
        <p className="text-xs text-slate-400">{t("Khám phá phong cảnh, ẩm thực, chắp nối bởi hướng dẫn viên bản địa chuyên sâu hàng đầu.", "Unlock local insights with trusted local guides.")}</p>
      </div>

      {/* Grid of Tours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tours.map((tr) => (
          <div key={tr.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-green-400/50 transition-all flex flex-col md:flex-row">
            
            {/* Image banner left on desktop */}
            <div className="h-48 md:h-auto md:w-44 shrink-0 overflow-hidden relative">
              <img src={tr.imgUrl} alt={tr.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <span className="absolute bottom-2 left-2 bg-yellow-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
                ★ {tr.rating} Verified
              </span>
            </div>

            {/* Tour info right side */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                  <span className="flex items-center gap-0.5"><Clock className="w-3" /> {tr.duration}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><MapPin className="w-3" /> {tr.location}</span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 leading-tight">{tr.name}</h4>
              </div>

              {/* Highlights bullets */}
              <div className="space-y-1.5">
                {tr.highlights.map((hl, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start text-[11px] text-slate-500 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Booking conversion row */}
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-mono font-bold">{t("Đồng giá từ", "Rates from")}</span>
                  <span className="text-sm font-black text-[#01411C] font-mono">{tr.price}đ <span className="text-[10px] font-normal text-slate-400">/ khách</span></span>
                </div>

                <button
                  onClick={() => trackAffiliateClick("klook", tr.link, `tours_page_${tr.id}`)}
                  className="bg-[#01411C] hover:bg-green-800 text-white text-[10px] font-black py-2 px-3.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {t("Đặt Tour", "Book Activity")} <ExternalLink className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
