import React, { useState } from "react";
import { ShieldCheck, Layers, FolderTree, Code, Package, Landmark, CheckSquare, Sparkles, BookOpen } from "lucide-react";

interface TechHubViewProps {
  lang: "vi" | "en";
}

export default function TechHubView({ lang }: TechHubViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<"arch" | "folders" | "rules" | "sequence" | "checklist">("arch");
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  // Checklist interactive state
  const [checklistItems, setChecklistItems] = useState([
    { id: "c1", text: "Cấu hình GEMINI_API_KEY bên trong Settings Secrets", checked: true },
    { id: "c2", text: "Thiết lập Firebase Project vnr-travel-ai và kích hoạt Authentication", checked: true },
    { id: "c3", text: "Bật cơ chế Firestore Database với Region asia-southeast1 (Thành phố Hồ CHÍ Minh)", checked: true },
    { id: "c4", text: "Deploy tệp firestore.rules bằng lệnh Firebase CLI", checked: false },
    { id: "c5", text: "Nạp dữ liệu hạt giống (Seed Data) các ga tàu lớn Bắc Nam", checked: false },
    { id: "c6", text: "Tích hợp gài mã Affiliate ID 'vnrailway' vào các link Agoda & Baolau", checked: true },
    { id: "c7", text: "Kiểm tra cơ chế cách ly thông tin cá nhân PII của lữ khách", checked: true },
  ]);

  const handleToggleCheck = (id: string) => {
    setChecklistItems(checklistItems.map(item => {
      if (item.id === id) return { ...item, checked: !item.checked };
      return item;
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Header section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <span className="bg-yellow-400 text-slate-950 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase inline-block">
          {t("🛠️ PHÂN TÍCH KIẾN TRÚC DOANH NGHIỆP", "🛠️ ENTERPRISE ARCHITECTURE DESIGNS")}
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mt-2">
          {t("Cẩm Nang Kỹ Thuật Cho Nhà Sáng Lập Phil Kỹ Thuật", "VNR Technology Blueprints for the Non-Technical Founder")}
        </h3>
        <p className="text-xs text-slate-350 mt-1 max-w-2xl leading-relaxed">
          {t(
            "Phân tích hệ thống bằng ngôn từ phổ thông, trực quan hóa cách cơ bắp AI xử lý và bảo mật dữ liệu vận hành an toàn.",
            "Plain-language explanation of our technology stacks. Learn how the Gemini AI models and Firestore rules protect your operational data."
          )}
        </p>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-t border-slate-700/60 pt-4 mt-4 text-[10px] font-black uppercase tracking-wider">
          <button
            onClick={() => setActiveSubTab("arch")}
            className={`py-1.5 px-3 rounded-lg border focus:outline-none transition-all ${
              activeSubTab === "arch" 
                ? "bg-yellow-400 border-yellow-400 text-slate-950" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            📐 {t("Kiến Trúc Bán Hàng", "Marketing Funnel Architecture")}
          </button>
          <button
            onClick={() => setActiveSubTab("folders")}
            className={`py-1.5 px-3 rounded-lg border focus:outline-none transition-all ${
              activeSubTab === "folders" 
                ? "bg-yellow-400 border-yellow-400 text-slate-950" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            📁 {t("Sơ đồ Thư Mục", "Folder Structures")}
          </button>
          <button
            onClick={() => setActiveSubTab("rules")}
            className={`py-1.5 px-3 rounded-lg border focus:outline-none transition-all ${
              activeSubTab === "rules" 
                ? "bg-yellow-400 border-yellow-400 text-slate-950" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            🛡️ {t("Quy Tắc Bảo Mật", "Firestore Rules Explained")}
          </button>
          <button
            onClick={() => setActiveSubTab("sequence")}
            className={`py-1.5 px-3 rounded-lg border focus:outline-none transition-all ${
              activeSubTab === "sequence" 
                ? "bg-yellow-400 border-yellow-400 text-slate-950" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            ⚙️ {t("Tạo Collection", "Database Rollout Step")}
          </button>
          <button
            onClick={() => setActiveSubTab("checklist")}
            className={`py-1.5 px-3 rounded-lg border focus:outline-none transition-all ${
              activeSubTab === "checklist" 
                ? "bg-yellow-400 border-yellow-400 text-slate-950" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            ✓ {t("Bảng Kiểm Tra Sản Xuất", "Production Checklist")}
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[350px]">
        
        {/* Panel 1: Project Funnel Architecture */}
        {activeSubTab === "arch" && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h4 className="font-extrabold text-[#01411C] text-sm">📐 Sơ Đồ Vận Hành Sinh Lợi Nhuận Thụ Động (Passive Revenue Funnel Architecture)</h4>
              <p className="text-xs text-slate-400">{t("Cách dòng tiền và dữ liệu chảy mượt mà từ video TikTok qua bộ óc AI ra tiền mặt:", "How attention and campaign variables navigate seamlessly through our technical layers:")}</p>
            </div>

            {/* Visual Flow diagram as SVG */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
              <svg width="600" height="120" viewBox="0 0 600 120" className="mx-auto min-w-[550px]">
                {/* Nodes with custom text */}
                
                {/* Node 1: TikTok */}
                <rect x="5" y="35" width="95" height="50" rx="10" fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
                <text x="52" y="58" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">TikTok Video</text>
                <text x="52" y="73" fill="#D97706" fontSize="7" fontWeight="bold" textAnchor="middle">(Traffic Hub)</text>

                {/* Arrow 1 */}
                <line x1="100" y1="60" x2="120" y2="60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3,3" />
                <polygon points="120,60 115,56 115,64" fill="#94A3B8" />

                {/* Node 2: Beacons */}
                <rect x="125" y="35" width="95" height="50" rx="10" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />
                <text x="172" y="58" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Beacons.ai/vnrailway</text>
                <text x="172" y="73" fill="#A5B4FC" fontSize="7" fontWeight="bold" textAnchor="middle">(Link-in-Bio Redirect)</text>

                {/* Arrow 2 */}
                <line x1="220" y1="60" x2="240" y2="60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3,3" />
                <polygon points="240,60 235,56 235,64" fill="#94A3B8" />

                {/* Node 3: Express Server with AI */}
                <rect x="245" y="35" width="110" height="50" rx="10" fill="#01411C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="300" y="55" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">VNR Travel AI Webapp</text>
                <text x="300" y="67" fill="#FFD700" fontSize="7" fontWeight="bold" textAnchor="middle">(Express + Gemini Core)</text>
                <text x="300" y="77" fill="#86EFAC" fontSize="6" fontWeight="bold" textAnchor="middle">(Secure Secrets Keep)</text>

                {/* Arrow 3 */}
                <line x1="355" y1="60" x2="375" y2="60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3,3" />
                <polygon points="375,60 370,56 370,64" fill="#94A3B8" />

                {/* Node 4: Database logging */}
                <rect x="380" y="35" width="95" height="50" rx="10" fill="#334155" stroke="#FFFFFF" strokeWidth="2" />
                <text x="427" y="58" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Firestore Rules</text>
                <text x="427" y="73" fill="#A8A29E" fontSize="7" fontWeight="bold" textAnchor="middle">(PII Splitting Safe)</text>

                {/* Arrow 4 */}
                <line x1="475" y1="60" x2="495" y2="60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3,3" />
                <polygon points="495,60 490,56 490,64" fill="#94A3B8" />

                {/* Node 5: Affiliate Checkout */}
                <rect x="500" y="35" width="95" height="50" rx="10" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
                <text x="547" y="58" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Partners Booking</text>
                <text x="547" y="73" fill="#FDE68A" fontSize="7" fontWeight="bold" textAnchor="middle">(Agoda / Baolau 12Go)</text>
              </svg>
            </div>

            {/* Explanation paragraph for general builders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
              <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                <span className="font-bold text-[#01411C] block">🛡️ Bảo mật API Key tối thượng</span>
                <p>
                  {t(
                    "Một sai lầm của các lập trình viên non tay là nhúng trực tiếp API Key của trí tuệ nhân tạo (Gemini API Key) vào trình duyệt của khách hàng. Việc này khiến hacker dễ dàng siphoning nợ cước của anh chị. Chúng em cấu hình an toàn ghim API Key giấu kỹ trên luồng máy chủ bảo mật Cloud Run (Server-Side Architecture). Không ai có thể dòm ngó thấy.",
                    "Many builders leak sensitive keys on client bundles. We proxy all Gemini API requests through secure server routes, shielding client eyes entirely."
                  )}
                </p>
              </div>

              <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                <span className="font-bold text-[#01411C] block">🤝 Liên kết đối tác lữ hành như thế nào?</span>
                <p>
                  {t(
                    "Khi lữ khách duyệt lịch trình do AI tạo ra, hệ thống hỗ trợ kết nối trực tiếp đến các đối tác lữ hành uy tín (Baolau, 12Go, Agoda). Lữ khách có thể tiến hành đặt mua vé, đặt phòng khách sạn và dịch vụ ngay lập tức với sự hỗ trợ đồng bộ thông tin hành trình trọn vẹn và an toàn.",
                    "Whenever visitors view itineraries, each external checkout redirects to primary booking platforms (Baolau, 12Go, Agoda) with pre-filled travel details, guaranteeing simple and fully synchronized booking."
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Panel 2: Folder Tree layout */}
        {activeSubTab === "folders" && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div className="space-y-1">
              <h4 className="font-extrabold text-[#01411C] text-sm">📁 Sơ Đồ Thiết Kế Thư Mục Ứng Dụng (Standard Boilerplate Layout)</h4>
              <p className="text-xs text-slate-400">{t("Mô hình thư mục chuẩn của toàn hệ thống Web hoàn chỉnh, phục vụ bảo trì dễ mở rộng hướng tương lai:", "Industry standard repository file layout built ready for long term modular expansions:")}</p>
            </div>

            <div className="bg-slate-900 text-green-400 p-5 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner">
              <p className="text-slate-500">// Bảng phân bổ thư mục gốc VNR Travel AI</p>
              <p>vnr-travel-ai/</p>
              <p>├── .env.example <span className="text-slate-500">(Khai báo các biến môi trường cấu hình)</span></p>
              <p>├── firestore.rules <span className="text-slate-500">(Quy tắc bảo mật tường lửa dữ liệu)</span></p>
              <p>├── firebase-blueprint.json <span className="text-slate-500">(Sơ đồ mô phỏng thực thể dữ liệu)</span></p>
              <p>├── server.ts <span className="text-slate-400 font-bold">(Khởi tạo Express API & dệt Gemini AI server-side)</span></p>
              <p>├── package.json <span className="text-slate-500">(Mô tả mã nguồn thư viện liên kết)</span></p>
              <p>├── src/</p>
              <p>│   ├── main.tsx <span className="text-slate-500">(Entry-point chính của React app)</span></p>
              <p>│   ├── App.tsx <span className="text-slate-400 font-bold">(Bộ điều hướng tổng, chuyển tiếp tab)</span></p>
              <p>│   ├── types.ts <span className="text-slate-500">(Định nghĩa các kiểu dữ liệu của hệ thống)</span></p>
              <p>│   ├── index.css <span className="text-slate-500">(Cấu hình phong cách thiết kế Tailwind CSS)</span></p>
              <p>│   └── components/</p>
              <p>│       ├── ArchitectureViewer.tsx <span className="text-slate-500">(Visualizer kiểm thử Hackers thử nghiệm)</span></p>
              <p>│       ├── PrdViewer.tsx <span className="text-slate-500">(Bản dịch chi tiết PRD dự án)</span></p>
              <p>│       └── SubPages/ <span className="text-slate-400 font-bold">(Phân mảnh 10 phân hệ giao diện bọc di sản)</span></p>
              <p>│           ├── HomeView.tsx, PlannerView.tsx, RoutesView.tsx ...</p>
            </div>
          </div>
        )}

        {/* Panel 3: Firebase Security Rules */}
        {activeSubTab === "rules" && (
          <div className="space-y-6 animate-fade-in text-xs leading-relaxed text-slate-600">
            <div className="space-y-1">
              <h4 className="font-extrabold text-[#01411C] text-sm">🛡️ Quy Tắc Bảo Mật Tường Lửa Firestore (Firestore Security Rules Explained)</h4>
              <p className="text-xs text-slate-400">{t("Chúng tôi bảo mật cơ sở dữ liệu trên cloud bằng chính sách Rules chặn tuyệt đối mọi hành vi xạo trá của tin tặc:", "How our customized security policies withstand common attack vectors dynamically:")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-150">
                <span className="font-bold text-slate-800 block">🔒 Luật 1: Cách ly thông tin mật (PII isolation)</span>
                <p className="text-[11px] leading-relaxed">
                  {t(
                    "Theo luật an toàn dữ liệu GDPR, số điện thoại, email của khách hàng không được phép rò rỉ công khai. Chúng tôi cô lập chúng vào phân vùng /users/{userId}/private/info. Chỉ chủ nhân có UID trùng khớp tuyệt đối mới đọc được dữ liệu của chính mình thông qua quy tắc rule: match /private/info { allow read, write: if request.auth.uid == userId; }",
                    "PII information is sandboxed privately under /users/{userId}/private/info sub-collections, allowing reads only if target token matches request credentials."
                  )}
                </p>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-150">
                <span className="font-bold text-slate-800 block">🛑 Luật 2: Chặn spam dội click giả định</span>
                <p className="text-[11px] leading-relaxed">
                  {t(
                    "Tin tặc có thể dùng công cụ tự động dội hàng triệu yêu cầu click ảo để phá hủy tài chính của bạn. Chúng tôi dán nhãn quy định mỗi click lưu lại thành công bắt buộc phải có thuộc tính clickId hợp lệ, có mốc thời gian chính xác ở hiện tại trùng khớp đồng hồ vệ tinh của Firebase.",
                    "Our affiliate trackers contain strictly validated timestamp rules, blocking programmatic replay attacks or arbitrary mock logs."
                  )}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              {t(
                "*Chú thích: Nhà sáng lập hoàn toàn yên tâm vì mọi quy tắc này được ghim trực tiếp vào lõi đám mây Firebase. Dù hacker có viết mã phá hoại dội thẳng vào API cũng bị chặn từ tuyến ngoài, bảo hộ trọn vẹn tệp khách hàng của anh/chị.",
                "*Note: These database triggers operate directly inside Firebase Cloud runtime, ignoring all malicious local client manipulations."
              )}
            </p>
          </div>
        )}

        {/* Panel 4: Collection Sequence order */}
        {activeSubTab === "sequence" && (
          <div className="space-y-6 animate-fade-in text-xs leading-relaxed text-slate-650">
            <div className="space-y-1">
              <h4 className="font-extrabold text-[#01411C] text-sm">⚙️ Thứ Tự Khởi Tạo Cơ Sở Dữ Liệu Lộ Trình (Collection Creation Order)</h4>
              <p className="text-xs text-slate-400">{t("Quá trình thiết đặt ban đầu cho hệ thống kho dữ liệu lữ hành bao gồm 4 bước vàng bản chất:", "Chronological sequence recommended to launch secure Cloud database instances:")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-50 text-[#01411C] font-extrabold flex items-center justify-center shrink-0 border border-green-200">1</div>
                <div>
                  <span className="font-extrabold text-slate-900 block">{t("Bộ cấu hình cốt lõi & Hạt giống (Metadata Seed Collections)", "Operational Static Collections")}</span>
                  <p className="text-[11px] text-slate-450 mt-0.5">{t("Chạy Scripts nạp dữ liệu cố định vào các bộ: /stations (Danh sách ga tàu Việt Nam dán nhãn định dạng tọa độ) và /train_routes (Giờ khởi hành, cự ly và mác tàu chạy SE, HD di sản).", "Nourish static tables first: populate station listings mapped with geographical metrics, with train codes SP, SE and HD heritage timetables.")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-50 text-[#01411C] font-extrabold flex items-center justify-center shrink-0 border border-green-200">2</div>
                <div>
                  <span className="font-extrabold text-slate-900 block">{t("Tài khoản thành viên (User profiles and PII separation sub-collections)", "Authentication profile nodes setup")}</span>
                  <p className="text-[11px] text-slate-450 mt-0.5">{t("Kích hoạt Google Sign-In & Email Auth bên trong Firebase Console. Khi thành viên đăng nhập, thiết lập tự tạo profile /users/{userId} và bảng cách ly /private/info.", "Kicks store triggers on Auth logins. Generates public profile blocks paired with matching isolated PII compartments.")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-50 text-[#01411C] font-extrabold flex items-center justify-center shrink-0 border border-green-200">3</div>
                <div>
                  <span className="font-extrabold text-slate-900 block">{t("Bộ lưu trữ hành trình & phản hồi (Dynamic logged collections)", "Transactional clickstream tables")}</span>
                  <p className="text-[11px] text-slate-450 mt-0.5">{t("Kho lưu giữ chặng bay phân dệt: /itineraries (kế hoạch do Gemini phản hồi) và /affiliate_clicks (nhật ký ghi nhớ thông tin liên kết để đồng bộ lịch trình).", "Mount collections responsible for recording dynamic outputs: itineraries dived out from Gemini, and click loggers capturing partner transitions.")}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Panel 5: Product Production checklist */}
        {activeSubTab === "checklist" && (
          <div className="space-y-6 animate-fade-in text-xs text-slate-650">
            <div className="space-y-1">
              <h4 className="font-extrabold text-[#01411C] text-sm">✓ Bảng Kiểm Định Vận Hành Sẵn Sàng Bán Hàng (Live Production Go-Live Checklist)</h4>
              <p className="text-xs text-slate-400">{t("Kéo chuột bấm chọn hộp kiểm soát để tự lập kế toán vận hành hoàn thiện của dự án:", "Interact and slide checkmarks to simulate launch operational audits:")}</p>
            </div>

            <div className="space-y-3.5 bg-slate-50 p-5 rounded-2xl border border-slate-150">
              {checklistItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleToggleCheck(item.id)}
                  className="flex items-start gap-3 cursor-pointer select-none group text-xs font-semibold"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}} // Handled by div onClick
                    className="w-4 h-4 rounded text-green-700 bg-white border-slate-200 focus:ring-green-708 focus:ring-offset-0 mt-0.5 shrink-0"
                  />
                  <span className={`${item.checked ? "line-through text-slate-400 font-normal" : "text-slate-800"} group-hover:text-green-701 transition-colors leading-tight`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-green-50/50 border border-green-200/55 rounded-xl text-[11px] text-green-905 font-medium leading-relaxed">
              {t(
                "✓ Mọi khâu dập mã bọc nguồn đều xây trên cơ cấu TypeScript tự giải và chuyển thể an toàn. Cung cấp cho nhà sáng lập giải pháp chìa khóa trao tay hoàn thiện.",
                "✓ Turnkey solutions built cleanly. Fully engineered using responsive TypeScript, keeping your startup optimized and scalable."
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
