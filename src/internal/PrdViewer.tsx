import React, { useState } from "react";
import { prdSections, PrdSection } from "../data/prdContent";
import { 
  BookOpen, Compass, ShieldCheck, TrendingUp, Users, 
  Layers, ChevronRight, HelpCircle, User, MessageSquare, CheckCircle
} from "lucide-react";
import { motion } from "motion/react";

export default function PrdViewer() {
  const [selectedSectionId, setSelectedSectionId] = useState("vision");
  const [activeExpert, setActiveExpert] = useState<"pm" | "architect" | "security" | "growth">("pm");

  const currentSection = prdSections.find(s => s.id === selectedSectionId) || prdSections[0];

  // Simulated conversations from experts explaining concepts conversational style for non-technical founders
  const expertAdvice = {
    pm: {
      name: "Nguyên Minh Anh",
      role: "Trưởng phòng Quản lý Sản phẩm (PM)",
      avatarColor: "bg-emerald-600",
      quote: "Chào anh/chị founder! Đừng lo lắng về code. Bản PRD này được viết theo cách hiểu đơn giản nhất. Trọng tâm của chúng ta là làm sao biến video triệu view trên Tiktok thành khách đặt vé tàu thực sự, biến một lượt xem tò mò thành doanh thu cho công ty của mình.",
      qa: [
        {
          q: "Tại sao lại chọn xây dựng website du lịch bằng tàu hoả mà không phải xe bay hay lữ hành thông thường?",
          a: "Đường sắt đang cực kì hot ở Việt Nam nhờ dòng tàu di sản nâng cao chất lượng dịch vụ dộc bản. Tuy nhiên, website mua vé nhà nước rất khó lên lịch trình trọn gói. VNR Travel AI chính là mảnh ghép lấp đầy khoảng trống đó, vừa dẫn đầu công nghệ lập lịch trình tự động vừa là phễu gom hoa hồng không rủi ro vận tải."
        },
        {
          q: "Có thật sự không cần mua đoàn tàu hay phòng vé vật lý nào không?",
          a: "Chắc chắn rồi ạ! Chúng ta hoạt động theo nguyên lý tiếp thị lữ hành số. Khách thiết kế lịch trình tại trang chúng ta, nhưng thanh toán vé thực tế tại Ga đối tác (Baolau, 12Go). Chúng ta hưởng % hoa hồng thuần túy trên mỗi đơn, không gánh mệt mỏi nhân sự vận hành hay duy trì đầu toa xe."
        }
      ]
    },
    architect: {
      name: "Trần Tuấn Kiệt",
      role: "Kiến trúc sư Trưởng giải pháp (Software Architect)",
      avatarColor: "bg-blue-600",
      quote: "Công nghệ cốt lõi của chúng ta kết hợp cấu trúc NodeJS siêu nhẹ và trí tuệ nhân tạo Gemini của Google. Tôi đã thiết lập một bộ khung tinh giản từ đầu, đảm bảo trang web của anh gánh tới cả vạn traffic từ Tiktok đổ bộ cùng lúc mà máy chủ hoạt động vẫn mượt mà, siêu mát mẻ.",
      qa: [
        {
          q: "Người lập trình của tôi cần thành thạo những gì để tiếp quản mã nguồn này?",
          a: "Chỉ cần React thạo Tailwind CSS và NodeJS cơ bản. Hệ thống được viết cực kì chuẩn sạch bằng TypeScript, cấu trúc chia nhỏ rõ ràng, không gộp rườm rà một đống file lớn nên bảo trì hay lắp ráp tính năng mới cực kì dễ dàng."
        },
        {
          q: "Khả năng co giãn (Scalability) hoạt động như thế nào khi video lên xu hướng (viral)?",
          a: "Hệ thống triển khai công nghệ Containerized Docker hóa, đẩy lên nền tảng đám mây tự động co giãn. Khi traffic ít, máy chủ tự thu hẹp để tiết kiệm tiền điện. Khi bùng nổ, máy chủ tự đẻ thêm luồng gánh tải và tự động xẹp lại sau đó."
        }
      ]
    },
    security: {
      name: "Lê Hoàng Nam",
      role: "Kỹ sư Trưởng An ninh thông tin (Cybersecurity)",
      avatarColor: "bg-red-600",
      quote: "Bảo mật là tấm giáp giữ an toàn cho tiền của anh. Tôi cam kết thiết kế của website này loại trừ hoàn toàn việc rò rỉ mã khóa API của Google bằng cơ chế ẩn danh sau lớp rào cản Máy chủ. Hacker hoàn toàn mù thông tin trước tài sản bảo mật của anh.",
      qa: [
        {
          q: "Khóa API Key của tôi cấu hình trên AI Studio có an toàn trước mắt hacker không?",
          a: "Cực kì an toàn. Khóa bí mật API nằm vững chắc ở bộ nhớ cấu hình đám mây của máy chủ do Google quản lý, trình duyệt khách hàng hoàn toàn không thể dòm ngó được. Mọi giao dịch gọi AI đều đi đường vòng bảo mật."
        },
        {
          q: "Chúng ta có bị rủi ro thu thập thông tin cá nhân khách lữ hành không?",
          a: "Không hề. Chúng ta chỉ thu thập Họ tên, SĐT, Email để làm phễu marketing không thu thập dữ liệu nhạy cảm hay thông tin ngân hàng thanh toán trực tiếp nên anh hoàn toàn yên tâm về trách nhiệm pháp lý lữ hành."
        }
      ]
    },
    growth: {
      name: "Vũ Hoàng Sơn",
      role: "Chuyên gia Tăng trưởng & Chuyển đổi (Growth PM)",
      avatarColor: "bg-amber-600",
      quote: "Traffic Tiktok là mỏ vàng có sẵn. Beacons.ai đóng vai trò là chiếc phễu sơ cấp định vị, còn VNR Travel AI là cỗ máy tạo chuyển đổi nén thông minh. Tôi cam kết mô hình lặp doanh thu thụ động này sẽ nhanh chóng đạt điểm hòa vốn chỉ sau 1 tháng khởi chạy liên kết chính thức.",
      qa: [
        {
          q: "Làm sao để người xem Tiktok bấm vào link và mua vé tàu, đặt khách sạn?",
          a: "Chìa khóa nằm ở tính cá nhân hóa lịch trình tự động. Khi xem video người ta thích cảnh đẹp nhưng không biết bắt đầu từ đâu. AI của chúng ta vẽ hộ cả sơ đồ hành trình trong tích tắc, đồng thời hiển thị sẵn nút liên kết mua ngay đúng vé tàu, đúng phòng khách sạn đó. Sự thuận tiện đỉnh cao này chính là ngòi nổ chuyển đổi lữ hành."
        },
        {
          q: "Chúng ta thu thập Leads bằng cách nào để biến họ thành khách trung thành?",
          a: "Chúng ta tặng một cẩm nang bỏ túi 'Sổ tay tàu hỏa Việt Nam PDF' tuyệt đẹp dạng lộc tri ân cho bất kì ai đăng kí tham gia cộng đồng. Họ đồng ý để lại Email, SĐT và sẽ liên tục nhận được tin nhắn khuyến mãi, tạo thói quen đặt vé qua cổng của chúng ta mỗi kỳ nghỉ lễ."
        }
      ]
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Product Manager":
        return <Compass className="w-4 h-4 text-emerald-600" />;
      case "Software Architect":
        return <Layers className="w-4 h-4 text-blue-600" />;
      case "Security Engineer":
        return <ShieldCheck className="w-4 h-4 text-red-600" />;
      case "Growth PM":
        return <TrendingUp className="w-4 h-4 text-amber-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Product Manager":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Software Architect":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Security Engineer":
        return "bg-red-50 text-red-700 border-red-200";
      case "Growth PM":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: NAVIGATION LIST AND EXPERT Q&A */}
      <div className="lg:col-span-4 space-y-6">
        {/* Navigation Section Cards */}
        <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
            12 Mục PRD Tiêu Chuẩn Quốc Tế:
          </h3>
          <div className="space-y-1">
            {prdSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-xs font-bold ${
                  selectedSectionId === section.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-slate-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${selectedSectionId === section.id ? "bg-slate-800 text-white" : "bg-slate-100"}`}>
                    {getRoleIcon(section.role)}
                  </div>
                  <span className="truncate">{section.title}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-all ${selectedSectionId === section.id ? "translate-x-1" : "text-gray-300"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Co-working Team Advice Panel */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-400" />
            <h4 className="font-bold text-sm tracking-tight font-mono text-white">Góc Giải Thích Của Chuyên Gia</h4>
          </div>
          
          {/* Expert Tabs */}
          <div className="grid grid-cols-4 gap-1 border-b border-slate-800 pb-2">
            {(["pm", "architect", "security", "growth"] as const).map((expId) => {
              const isActive = activeExpert === expId;
              return (
                <button
                  key={expId}
                  onClick={() => setActiveExpert(expId)}
                  className={`text-[9px] font-bold py-1.5 rounded uppercase tracking-wider transition-all ${
                    isActive ? "bg-green-700 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {expId}
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <div className={`w-8 h-8 rounded-full ${expertAdvice[activeExpert].avatarColor} shrink-0 text-white flex items-center justify-center font-bold text-xs uppercase shadow`}>
                {activeExpert === "pm" && "MA"}
                {activeExpert === "architect" && "TK"}
                {activeExpert === "security" && "HN"}
                {activeExpert === "growth" && "HS"}
              </div>
              <div>
                <span className="font-bold text-xs block text-white">{expertAdvice[activeExpert].name}</span>
                <span className="text-[9px] text-[#FFD700] block">{expertAdvice[activeExpert].role}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              &ldquo;{expertAdvice[activeExpert].quote}&rdquo;
            </p>

            <div className="space-y-3 pt-1 border-t border-slate-800/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-green-400" /> Câu hỏi sáng lập thường gặp:
              </span>
              <div className="space-y-3">
                {expertAdvice[activeExpert].qa.map((qaItem, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-xs font-extrabold text-blue-400">❖ {qaItem.q}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed pl-1.5 border-l border-slate-700">
                      {qaItem.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: CORE DOCUMENT DISPLAY */}
      <div className="lg:col-span-8 bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden min-h-[600px] flex flex-col">
        {/* Document Header */}
        <div className="bg-[#FAFBFD] border-b border-gray-100 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border tracking-wider uppercase ${getRoleBadgeColor(currentSection.role)}`}>
              Người biên soạn: {currentSection.roleTitle}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">Phiên bản: PRD v1.0.0</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{currentSection.title}</h2>
          <p className="text-xs text-gray-500 mt-2 bg-blue-50/50 p-3 rounded-lg border border-blue-100/40">
            <strong>Tóm lược định hướng sáng lập:</strong> {currentSection.summary}
          </p>
        </div>

        {/* Document Body */}
        <div className="p-6 md:p-8 flex-1 prose prose-sm max-w-none prose-slate">
          {/* Key Takeaways Section */}
          <div className="bg-[#EFFFFA] border border-[#B3F4DC] rounded-xl p-4 mb-6">
            <h4 className="text-xs font-bold text-[#0A5C2D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> 3 Bài Học Thu Hoạch Từ Mục Này:
            </h4>
            <ul className="space-y-1.5 list-none m-0 p-0">
              {currentSection.keyTakeaways.map((k, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex gap-2 items-start">
                  <span className="text-[#0A5C2D] font-bold">{idx + 1}.</span>
                  <span className="text-[11px] leading-relaxed font-semibold">{k}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Render markdown style raw content cleanly */}
          <div className="space-y-6 text-xs md:text-sm text-gray-700 leading-relaxed font-sans mt-4">
            {currentSection.content.split("\n\n").map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-sm font-extrabold text-slate-900 uppercase tracking-tight border-b border-gray-100 pb-1 mt-6">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("#### ")) {
                return (
                  <h4 key={idx} className="text-xs font-bold text-green-700 uppercase tracking-widest mt-4">
                    {block.replace("#### ", "")}
                  </h4>
                );
              }
              if (block.includes("- **")) {
                const lines = block.split("\n");
                return (
                  <ul key={idx} className="space-y-1.5 pl-4 list-disc">
                    {lines.map((line, lIdx) => {
                      const cleanLine = line.replace("- ", "");
                      return (
                        <li key={lIdx} className="text-xs">
                          {cleanLine.includes("**") ? (
                            <>
                              <strong className="text-gray-900">{cleanLine.split("**")[1]}</strong>
                              {cleanLine.split("**")[2]}
                            </>
                          ) : (
                            cleanLine
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              if (block.startsWith("- ")) {
                const lines = block.split("\n");
                return (
                  <ul key={idx} className="space-y-1 pl-4 list-disc">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx} className="text-xs">{line.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              if (block.startsWith("```")) {
                const cleanBlock = block.replace(/```/g, "");
                return (
                  <pre key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-[11px] overflow-x-auto text-slate-800 leading-relaxed shadow-inner">
                    {cleanBlock}
                  </pre>
                );
              }
              return (
                <p key={idx} className="text-xs leading-relaxed text-gray-600">
                  {block}
                </p>
              );
            })}
          </div>
        </div>

        {/* Document Footer Navigation */}
        <div className="border-t border-gray-100 bg-[#FAFBFD] p-4 flex justify-between items-center text-xs">
          <button
            disabled={prdSections.indexOf(currentSection) === 0}
            onClick={() => {
              const prevIdx = prdSections.indexOf(currentSection) - 1;
              if (prevIdx >= 0) setSelectedSectionId(prdSections[prevIdx].id);
            }}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all text-gray-600 disabled:opacity-40"
          >
            ← Mục trước
          </button>
          <span className="font-mono text-gray-400 font-bold">
            Trang {prdSections.indexOf(currentSection) + 1} / {prdSections.length}
          </span>
          <button
            disabled={prdSections.indexOf(currentSection) === prdSections.length - 1}
            onClick={() => {
              const nextIdx = prdSections.indexOf(currentSection) + 1;
              if (nextIdx < prdSections.length) setSelectedSectionId(prdSections[nextIdx].id);
            }}
            className="px-4 py-2 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-all disabled:opacity-40"
          >
            Mục tiếp theo →
          </button>
        </div>
      </div>
    </div>
  );
}
