import React from "react";
import { Sparkles, Award } from "lucide-react";

interface FounderDashboardProps {
  onNavigate: (path: string) => void;
}

export default function FounderDashboard({ onNavigate }: FounderDashboardProps) {
  return (
    <section className="w-full">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-md">
        {/* Background decoration lines */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl -z-10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFD700] animate-pulse" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFD700]">
                Bàn làm việc của Nhà Sáng Lập
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-white leading-tight">
              Chào mừng anh/chị tham gia không gian phát triển VNR Travel AI
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Để hỗ trợ một nhà sáng lập phi kỹ thuật, toàn bộ quy trình phát triển sản phẩm đã được số hóa thành hai khu vực:{" "}
              <strong className="text-white font-bold">Trình xem tài liệu PRD chuyên nghiệp</strong> do 4 Senior biên tập, giải thích cặn kẽ từng dòng chữ, và{" "}
              <strong className="text-[#FFD700] font-bold">Cổng trải nghiệm thông minh (Interactive Portal)</strong> giúp trải nghiệm trực tiếp hệ thống AI, theo dõi Database CRM leads, và tinh chỉnh cơ cấu thu nhập lữ hành lặp lại.
            </p>
          </div>

          {/* Founder Checklist Action Card */}
          <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 shrink-0 h-full flex flex-col justify-between">
            <span className="text-[10px] text-[#FFD700] uppercase font-bold tracking-wider block">
              Gợi ý lộ trình xem:
            </span>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate("/internal")} 
                className="w-full text-left bg-white/5 hover:bg-white/10 p-2.5 rounded-lg text-xs flex justify-between items-center text-slate-100 group transition-all cursor-pointer"
              >
                <span>1. Đọc Chiến Lược & 12 Mục PRD</span>
                <span className="text-xs bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded font-bold font-mono">Xong</span>
              </button>
              <button 
                onClick={() => onNavigate("/internal/dashboard")} 
                className="w-full text-left bg-white/5 hover:bg-white/10 p-2.5 rounded-lg text-xs flex justify-between items-center text-slate-100 group transition-all cursor-pointer"
              >
                <span>2. Chạy thử Smart Railway Travel Platform</span>
                <span className="text-xs bg-yellow-500/15 text-[#FFD700] px-1.5 py-0.5 rounded font-bold font-mono">Live</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
