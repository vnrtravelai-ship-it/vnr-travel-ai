import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Calendar, User, ArrowRight, Eye, CheckCircle, Clock } from "lucide-react";

interface GuidesViewProps {
  lang: "vi" | "en";
}

export default function GuidesView({ lang }: GuidesViewProps) {
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const guides = [
    {
      id: "g1",
      title: t("Cẩm Nang Săn Ảnh Toa Độc: Vượt Đèo Hải Vân", "Landscape Photography Pro Guide: Hai Van Curve"),
      summary: t("Hướng dẫn chọn tọa độ góc ngồi ngắm cảnh biển và căn giờ vàng khi toa tàu SE19 rẽ sóng qua đèo núi.", "How to find the pristine left-side window seats and watch dawn break as train SE19 negotiates coastal curves."),
      author: "Hoàng Minh (VNR Local Enthusiast)",
      date: "12-06-2026",
      readTime: "4 " + t("phút đọc", "mins"),
      theme: "border-[#01411C]",
      imageUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=600",
      content: t(
        "Đèo Hải Vân là cung đường sắt di sản lừng lẫy nhất Việt Nam. Để săn những bức ảnh lọt top thịnh hành trên TikTok, hành khách cần lưu ý:\n\n1. **Góc Ngồi Vị Trí Vàng**: Khi tàu xuất phát từ ga Huế đi Đà Nẵng, hãy chọn dãy ghế bên TRÁI. Khi đi từ Đà Nẵng ra Huế, hãy chọn dãy ghế bên PHẢI để hướng mắt ngắm trọn vẹn thềm biển xanh.\n2. **Tốc độ di chuyển**: Tàu qua đèo chạy siêu chậm (chỉ khoảng 25-30km/h), cho bạn tha hồ bấm máy.\n3. **Căn Toạ Độ Lăng Cô**: Hãy chuẩn bị sẵn điện thoại trước khi tàu đi vào hầm số 14, cửa hầm mở ra chính là hồ Lăng Cô xanh ngát mọc vách đá.\n4. **Mẹo Ánh Sáng**: Giờ chạy của tàu HD1 (khoảng 08:00 sáng) mang lại luồng nắng ban mai rót dọc ô kính thơ mộng nhất.",
        "Hai Van Pass is the crown jewel of Vietnam Railways. For perfect social media captions:\n\n1. **Right side seats**: Going from Da Nang to Hue, book right-side compartments. From Hue to Da Nang, pick Left-side seats to overlook beaches.\n2. **Slow Speeds**: The train crawls at 30km/h over cliffs, providing 30 mins of scenic photography opportunities.\n3. **Lang Co Gate**: Hold your camera steady before coming out of Tunnel 14. The pristine blue bay emerges from mountain gaps immediately.\n4. **Timings**: Morning routes HD1/HD3 capture majestic slanting gold rays perfect for vintage portraits."
      )
    },
    {
      id: "g2",
      title: t("Bản Đồ Ẩm Thực Ga Huế: Cháo Bò & Chè Hẻm", "Station Food Tour: Cháo Bò & Chè Hẻm near Hue Terminus"),
      summary: t("Check-in các món ăn cứu rỗi chiếc bụng đói ngay tại hiên ga Huế cổ kính, mở bán đêm khuya ấm cúng.", "Delicious late-night comfort foods located right by the colonial platforms of Hue station."),
      author: "Trần Uyên (Food Blogger)",
      date: "14-06-2026",
      readTime: "3 " + t("phút đọc", "mins"),
      theme: "border-amber-500",
      imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600",
      content: t(
        "Đối với hành khách đi tàu đêm SE1, SE19, việc tàu dừng nghỉ tại ga Huế lúc nửa đêm hay rạng sáng luôn là cơ hội thưởng thức tinh hoa ẩm thực địa phương:\n\n1. **Cháo bò ga Huế**: Ngay trước cổng ga có 2 hàng cháo bò nóng hổi mở đến 2 giờ sáng. Cháo ninh nhừ, thịt bò mềm ngọt gối kèm quẩy giòn tẩm ớt chưng cay nồng.\n2. **Chè hẻm Huế**: Cách ga khoảng 500m di bộ, quán chè mở phục vụ tối muộn với 20 loại màu sắc ngọt thanh dệt thắt lòng người.\n3. **Bánh lọc gói lá chuối**: Bạn có thể gọi người bán hàng ở ga đưa bánh nóng hổi bọc lá chuối trực tiếp qua ô cửa sổ toa tàu với mức giá cực hạt dẻ chỉ 30k/chục.",
        "For passengers of midnight sleeper trains, the lengthy operational stop at Hue station is a delicious culinary pilgrimage:\n\n1. **Beef Congee (Cháo Bò Ga Huế)**: Two small vendors outside the courtyard serve rich, steaming beef soup with crispy dough sticks until 2 AM.\n2. **Boutique Che-Hem (Alley Desserts)**: 500m walk from terminal corridor, hosting 20 types of traditional sweet bean puddings.\n3. **Bánh Lọc Leaf Parcels**: Local sellers push portable steamers near platforms. You can purchase fresh tapioca cake parcels directly through train windows for only 35k VND per pack."
      )
    },
    {
      id: "g3",
      title: t("Review Toa Tàu Đêm Giường Nằm Sapa Hạng Hoàng Gia", "Grand Royal Sleeper Cabin: Sapa Overnighter Review"),
      summary: t("Kiểm chứng dịch vụ Toa tàu gỗ Fansipan sang trọng kết nối từ Hà Nội lên thung lũng Sapa mù sương.", "Comprehensive assessment of the cladded wooden luxury cabins ferry travellers to the northern fogs."),
      author: "Alex Johnson (Foreign Traveler)",
      date: "09-06-2026",
      readTime: "5 " + t("phút đọc", "mins"),
      theme: "border-blue-500",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600",
      content: t(
        "Khi lên Tây Bắc (Lào Cai - Sapa), tôi khuyên bạn nên đặt các mác tàu đêm chất lượng cao SP1/SP3. Dưới đây là trải nghiệm thực tế giường cabin hoàng gia Chapa / Fansipan:\n\n1. **Nội Thất Gỗ Cổ Điển**: Toàn bộ vách ngăn cabin được bọc gỗ thông tự nhiên tỏa hương thơm nhè nhẹ, thảm len rải sàn dệt thắt họa tiết hoa văn thổ cẩm Sapa độc đáo.\n2. **Tiện Nghi Cao Cấp**: Mỗi cabin chỉ có 4 giường rộng rãi, nệm êm ái đàn hồi tốt, trang bị nước suối thanh khiết, dép bông thêu hình xe lửa và sô-cô-la đón mừng.\n3. **Hệ thống cách âm**: Độ ồn giảm đến 60% so với toa sắt thông dụng, bánh sắt bọc cao su nén giúp giảm rung lắc khi tàu qua cầu đèo Yên Bái.\n4. **Tiết Kiệm Thời Gian**: Ngủ một giấc ngon từ 22:00, 06:00 sáng tỉnh dậy đón bình minh lạnh sương ngay ga Lào Cai, sẵn sàng bắt xe bus leo núi Sapa ăn sáng.",
        "Heading to the northwestern highlands (Lao Cai/Sapa), overnight train SP1/SP3 is highly recommended. Here is a review of the Fansipan/Chapa wood cladded cabins:\n\n1. **Aromatic Pine interiors**: Cabins are fully cladded in real organic pine emitting subtle notes, complete with handwoven ethnic sapa rugs.\n2. **Premium Amneties**: 4-berth clean layout with private reading lights, soft cotton slippers, bottled spring waters, and complimentary welcoming dark chocolate.\n3. **Soundproofing upgrade**: Noise is reduced by 60% with rubberized pneumatic wheel tracks over Yen Bai valleys.\n4. **Smart Travel Hack**: Depart Hanoi at 10 PM, sleep through the night, and wake up amidst mountain mist at Lao Cai at 6 AM ready to conquer Fansipan peak."
      )
    }
  ];

  const currentGuide = guides.find(g => g.id === selectedGuideId);

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Page Header */}
      <div>
        <span className="text-[#01411C] font-extrabold text-[10px] uppercase font-mono tracking-widest block">
          {t("Cẩm nang lữ hành hữu ích", "Curated Travel Guides")}
        </span>
        <h3 className="text-lg font-bold text-slate-900 mt-1">{t("Cẩm Nang Đường Tàu Di Sản", "Heritage Train Travel Handbooks")}</h3>
        <p className="text-xs text-slate-400">{t("Kinh nghiệm bỏ túi, tọa độ chụp ảnh, ẩm thực ga tàu từ các chuyên gia bản địa.", "Pocket hacks, photography spots, and terminal foodie walkthroughs compiled by train enthusiasts.")}</p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((g) => (
          <div key={g.id} className={`bg-white border-t-4 ${g.theme} border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}>
            
            {/* Image header */}
            <div className="h-44 overflow-hidden relative">
              <img 
                src={g.imageUrl} 
                alt={g.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                {g.readTime}
              </span>
            </div>

            {/* Title and summary */}
            <div className="p-4 space-y-2 flex-1">
              <span className="text-[10px] text-slate-400 font-bold block">{g.date} • {g.author}</span>
              <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 hover:text-green-700 leading-snug cursor-pointer" onClick={() => setSelectedGuideId(g.id)}>
                {g.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {g.summary}
              </p>
            </div>

            {/* Read action */}
            <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex justify-end">
              <button
                onClick={() => setSelectedGuideId(g.id)}
                className="text-xs text-green-700 hover:text-green-800 font-extrabold flex items-center gap-1 cursor-pointer"
              >
                {t("Đọc Cẩm Nang", "Read Article")} <ArrowRight className="w-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Lightbox details modal */}
      <AnimatePresence>
        {selectedGuideId && currentGuide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200"
            >
              
              {/* Modal Banner Image */}
              <div className="h-56 overflow-hidden relative">
                <img src={currentGuide.imageUrl} alt={currentGuide.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] text-[#FFD700] uppercase font-bold tracking-widest font-mono">VNR DI SẢN CẨM NANG</span>
                  <h4 className="text-base md:text-lg font-bold leading-snug mt-1">{currentGuide.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedGuideId(null)}
                  className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center border border-white/20 text-xs font-black"
                >
                  ✕
                </button>
              </div>

              {/* Modal Article Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold border-b border-slate-100 pb-3">
                  <span className="flex items-center gap-1"><User className="w-3" /> {currentGuide.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3" /> {currentGuide.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3" /> {currentGuide.readTime}</span>
                </div>

                <div className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap space-y-2">
                  {currentGuide.content}
                </div>

                {/* Secure footer checkout */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t("Khuyên dùng cho chuyến tàu tiếp theo.", "Highly recommended for your upcoming railway voyage.")}</span>
                  </div>
                  <button
                    onClick={() => setSelectedGuideId(null)}
                    className="bg-slate-900 hover:bg-black text-white text-xs font-bold py-1.5 px-4 rounded-xl cursor-pointer"
                  >
                    {t("Đóng Lại", "Close handbook")}
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
