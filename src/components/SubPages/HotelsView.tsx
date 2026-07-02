import React from "react";
import { Hotel, Star, MapPin, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";

interface HotelsViewProps {
  lang: "vi" | "en";
  trackAffiliateClick: (
    provider: string, 
    targetUrl: string, 
    camp?: string,
    serviceType?: string,
    route?: string
  ) => void;
}

export default function HotelsView({ lang, trackAffiliateClick }: HotelsViewProps) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const hotels = [
    {
      id: "h1",
      name: t("ÊMM Hotel Huế (Gần Ga Huế)", "ÊMM Hotel Hue (5 mins from Hue Platform)"),
      location: t("15 Lý Thường Kiệt, Vĩnh Ninh, Thành phố Huế", "15 Ly Thuong Kiet St, Hue City Center"),
      stars: 4,
      rating: 8.9,
      price: "950,000",
      description: t("Thiết kế thanh tao phong cách hoàng gia tân cổ điển, cách ga Huế chỉ 3 phút taxi, tiện lợi nhảy tàu đêm.", "Vibrant royal boutique fusion. Extremely close to rails, convenient for midnight SE19 sleeper boarding."),
      imgUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400",
      link: "https://website.beacons.ai/vnrailway"
    },
    {
      id: "h2",
      name: t("Vanda Hotel Đà Nẵng (Gần Ga Đà Nẵng)", "Vanda Hotel Danang (Convenient center access)"),
      location: t("3 Nguyễn Văn Linh, Bình Hiên, Hải Châu, Đà Nẵng", "3 Nguyen Van Linh Highway, Hai Chau, Danang"),
      stars: 4,
      rating: 9.1,
      price: "1,200,000",
      description: t("Nhìn trực diện Cầu Rồng phun lửa thần sầu, dịch vụ massage chân phục hồi sau chuyến hành trình vượt đèo mệt mỏi.", "Overlooking the famous golden Dragon Bridge. Features post-railway leg spa reflexology services."),
      imgUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4db85b?q=80&w=400",
      link: "https://website.beacons.ai/vnrailway"
    },
    {
      id: "h3",
      name: t("Sapa Jade Hill Resort (Gần Ga Cáp Treo Fansipan)", "Sapa Jade Hill Resort (Highland Retreat)"),
      location: t("Mường Hoa, Lao Chải, Sa Pa, Lào Cai", "Muong Hoa valley, Sapa highlands, Lao Cai"),
      stars: 5,
      rating: 9.4,
      price: "2,450,000",
      description: t("Bungalow bằng gỗ pơ-mu giữa mây ngàn thung lũng, phù hợp cho cặp đôi đi tàu hỏa hò hẹn chữa lành lãng mạn.", "Luxury eco-cottages tucked in pine clouds. Perfect for couples embarking on the sleeper midnight romantic train ride."),
      imgUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400",
      link: "https://12go.asia/en?z=15761336"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Header section */}
      <div>
        <span className="text-[#01411C] font-extrabold text-[10px] uppercase font-mono tracking-widest block">
          {t("Khách sạn đối tác lưu trú", "Heritage Hotel Partners")}
        </span>
        <h3 className="text-lg font-bold text-slate-900 mt-1">{t("Khách Sạn Nổi Bật Gần Ga Tàu", "Boutique Hotels Near Primary Terminals")}</h3>
        <p className="text-xs text-slate-400">{t("Gối đầu êm ái, giảm mệt mỏi sau chuyến đi tàu dài. Đặt phòng lưu trú Agoda / Booking chất lượng.", "Settle in luxury retreats near stations. Booking via trusted partner portals with ease.")}</p>
      </div>

      {/* Grid of Hotels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map((h) => (
          <div key={h.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-green-400/50 transition-all flex flex-col justify-between">
            
            <div className="h-44 overflow-hidden relative">
              <img src={h.imgUrl} alt={h.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 left-2 bg-[#01411C]/90 text-white text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
                <span>{h.rating} / 10 Excellent</span>
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1">
              <div className="flex justify-between items-center">
                <div className="flex text-amber-500">
                  {"★".repeat(h.stars)}
                </div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wide font-bold">📍 Station Partner</span>
              </div>

              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-green-700 leading-tight">
                {h.name}
              </h4>

              <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                <span className="truncate">{h.location}</span>
              </p>

              <p className="text-xs text-slate-500 leading-normal line-clamp-3">
                {h.description}
              </p>
            </div>

            {/* Price section and Affiliate link trigger */}
            <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex justify-between items-center">
              <div>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-mono font-bold">{t("Giá từ", "Rates from")}</span>
                <span className="text-sm font-black text-[#01411C] font-mono">{h.price}đ <span className="text-[10px] font-normal text-slate-400">/ đợt</span></span>
              </div>

              <button
                onClick={() => trackAffiliateClick("agoda", h.link, `hotels_page_${h.id}`)}
                className="bg-[#01411C] hover:bg-green-800 text-white text-[10px] font-black py-2 px-3 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                {t("Agoda Ưu Đãi", "Book Room")} <ExternalLink className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Trust banner */}
      <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-center gap-3 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{t("Hệ sinh thái liên minh Agoda, Booking giúp người dùng tích lũy dặm tàu bay và nhận nhiều ưu đãi khi hoàn tất giao dịch.", "Our robust network guarantees standard cashback benefits and simple bookings.")}</span>
      </div>

    </div>
  );
}
