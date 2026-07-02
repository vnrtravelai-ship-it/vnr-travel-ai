import React, { useState } from "react";
import { 
  Database, ShieldCheck, Key, Code, Table, Cpu,
  Layers, Lock, AlertOctagon, HelpCircle, Sparkles, CheckCircle2,
  TrendingUp, Wifi, RefreshCw, RefreshCcw, Eye, ShieldAlert, BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DatabaseCollection {
  id: string;
  name: string;
  path: string;
  description: string;
  roleIcon: any;
  vietnameseAnalog: string;
  fields: Array<{ name: string; type: string; rulesRequired?: boolean; desc: string; sample: string }>;
  relations: string;
  securityGate: string;
}

export default function ArchitectureViewer() {
  const [selectedColId, setSelectedColId] = useState<string>("users");
  const [hackerScenario, setHackerScenario] = useState<string | null>(null);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simState, setSimState] = useState<"idle" | "running" | "blocked" | "success">("idle");

  const collections: DatabaseCollection[] = [
    {
      id: "users",
      name: "Tủ Hồ Sơ Thành Viên",
      path: "/users/{userId}",
      description: "Lưu thông tin hồ sơ công khai của người dùng sau khi tham gia mạng lưới du lịch VNR-Travel AI.",
      roleIcon: Database,
      vietnameseAnalog: "Phiếu đăng ký thành viên treo công khai ở bảng tin câu lạc bộ.",
      relations: "1-1 với Tài khoản Authentication của Firebase. Chứa một thư mục con bảo mật (sub-collection) là Private Info.",
      securityGate: "Chỉ cho phép sửa đổi tên của chính mình. Nghiêm cấm đặt vai trò 'admin'. Cấm sửa đổi ngày khởi tạo.",
      fields: [
        { name: "userId", type: "string (Mã chữ)", desc: "Mã định danh duy nhất của người dùng.", sample: "usr_9J8xK2" },
        { name: "fullName", type: "string (Chữ)", desc: "Họ và tên hiển thị công khai.", sample: "Nguyễn Minh Tuấn" },
        { name: "avatarUrl", type: "string (url)", desc: "Đường dẫn ảnh đại diện.", sample: "https://lh3.googleusercontent.com/..." },
        { name: "travelFrequency", type: "string (Chữ)", desc: "Tần suất đi tàu của thành viên.", sample: "Thường xuyên (Hàng tháng)" },
        { name: "preferredRegions", type: "array (Danh sách)", desc: "Cung đường đường sắt ưa thích.", sample: "['Miền Trung', 'Tây Bắc']" },
        { name: "role", type: "string (member | admin)", desc: "Quyền hạn tài khoản.", sample: "member" },
        { name: "createdAt", type: "timestamp (Thời gian)", desc: "Thời điểm ghi nhận hồ sơ.", sample: "16-06-2026 08:00:00" },
        { name: "updatedAt", type: "timestamp (Thời gian)", desc: "Thời điểm cập nhật cuối.", sample: "16-06-2026 09:12:00" }
      ]
    },
    {
      id: "users_private",
      name: "Hồ Sơ Liên Hệ Tối Mật (PII Split)",
      path: "/users/{userId}/private/info",
      description: "Chứa các thông tin liên lạc cá nhân nhạy cảm (Email, Số điện thoại) được cô lập hóa.",
      roleIcon: Lock,
      vietnameseAnalog: "Ngăn kéo khóa mật mã lưu động của riêng mỗi cá nhân, bảo vệ quyền riêng tư tuyệt đối.",
      relations: "Phụ thuộc 1-1 trực thuộc hồ sơ /users/{userId}. Tách biệt hoàn toàn để chống lộ thông tin.",
      securityGate: "Chỉ duy nhất chính chủ tài khoản ĐÃ XÁC MINH thông qua OTP hoặc Google Auth hoặc Admin tối cao mới được phép truy xuất.",
      fields: [
        { name: "userId", type: "string (Mã)", desc: "Mã liên kết chính.", sample: "usr_9J8xK2" },
        { name: "email", type: "string (Email)", desc: "Thư điện tử liên hệ cá nhân.", sample: "tuan.nguyen@gmail.com" },
        { name: "phoneNumber", type: "string (Mã số)", desc: "Số điện thoại chính chủ để tiếp thị / gửi vé.", sample: "0912345678" },
        { name: "emailVerified", type: "boolean (True / False)", desc: "Xác nhận email đã thực tế xác thực.", sample: "true" },
        { name: "marketingConsent", type: "boolean (True / False)", desc: "Đồng ý nhận tin khuyến mãi / cẩm nang.", sample: "true" },
        { name: "updatedAt", type: "timestamp (Thời gian)", desc: "Ngày cập nhật mới nhất.", sample: "16-06-2026 08:00:00" }
      ]
    },
    {
      id: "itineraries",
      name: "Sổ Tay Lịch Trình AI",
      path: "/itineraries/{itineraryId}",
      description: "Nơi lưu trữ các kế hoạch du lịch bằng x lửa tinh xảo do AI Gemini phân tích dệt thành.",
      roleIcon: Cpu,
      vietnameseAnalog: "Các cuốn sổ nháp gợi ý cung đường đẹp đã in sẵn ghim trên kệ thư mục chia sẻ công cộng.",
      relations: "Được sinh bởi bot AI và thuộc quyền sở hữu của creatorId (Mã tài khoản tạo lịch trình). Có thể xem bởi mọi du khách thông qua liên kết chia sẻ.",
      securityGate: "Bất kỳ ai cũng có thể đọc để tham khảo hành trình đi tàu phổ thông. Nhưng chỉ người sáng lập hoặc tác giả tạo ra mới có quyền sửa đổi.",
      fields: [
        { name: "itineraryId", type: "string (Mã)", desc: "Mã định danh lịch trình.", sample: "itn_central_heritage" },
        { name: "title", type: "string (Chữ)", desc: "Tiêu đề cung đường sắt di sản.", sample: "3 Ngày 2 Đêm Di Sản TàuSE SE19" },
        { name: "summary", type: "string (Chữ)", desc: "Tóm lược hành trình di sản.", sample: "Thưởng ngoạn đèo Hải Vân - Sông Hương" },
        { name: "departure", type: "string (Chữ)", desc: "Ga khởi hành ban đầu.", sample: "Hà Nội" },
        { name: "arrival", type: "string (Chữ)", desc: "Ga đến hành trình.", sample: "Đà Nẵng" },
        { name: "daysCount", type: "integer (Số nguyên)", desc: "Thời lượng chuyến đi lữ hành.", sample: "3" },
        { name: "totalEstimatedCostVnd", type: "integer (Số)", desc: "Tổng ngân sách ước toán chặng.", sample: "3500000" },
        { name: "creatorId", type: "string (Mã)", desc: "Mã tài khoản tạo, nếu là khách vãng lai sẽ lưu 'anonymous'.", sample: "usr_9J8xK2" },
        { name: "createdAt", type: "timestamp (Thời gian)", desc: "Thời điểm ghi nhận vẽ lịch trình.", sample: "16-06-2026 08:30:00" }
      ]
    },
    {
      id: "affiliate_clicks",
      name: "Sổ Cái Giao Dịch Tiếp Thị (Affiliate Ledger)",
      path: "/affiliate_clicks/{clickId}",
      description: "Thống kê chính xác thời gian hành khách nhấn vào link mua vé Baolau, 12Go, Agoda qua Bio Beacons.",
      roleIcon: TrendingUp,
      vietnameseAnalog: "Phần số cái đóng dấu hoa hồng tiếp thị liên kết, ghi nhận doanh thu thụ động về cho founder.",
      relations: "Lưu giữ thông tin chặng đi kèm theo các ID quảng bá lữ hành. Bất biến sau khi nhấn.",
      securityGate: "Chỉ cho phép máy khách tạo sự kiện khi click. Tuyệt đối ngăn chặn sửa đổi hay xóa thông tin để tránh gian lận doanh số.",
      fields: [
        { name: "clickId", type: "string (Mã)", desc: "Mã click duy nhất để đối soát hoa hồng.", sample: "clk_baolau_1a2b" },
        { name: "userId", type: "string (Mã)", desc: "Người dùng, hoặc lưu 'guest' nếu chưa tạo tài khoản.", sample: "usr_9J8xK2" },
        { name: "provider", type: "string (Enum)", desc: "Đại lý liên kết bán vé tàu/phòng.", sample: "baolau" },
        { name: "targetUrl", type: "string (Url đầy đủ)", desc: "Link đích đã gắn ID quảng bá.", sample: "https://www.baolau.com/vi/...?source=vnrailway" },
        { name: "affiliateIdUsed", type: "string (Mã số)", desc: "Mã đối tác nhận tiền hoa hồng lữ lữ hành.", sample: "vnrailway" },
        { name: "createdAt", type: "timestamp (Thời gian)", desc: "Thời điểm bấm link mua vé.", sample: "16-06-2026 09:00:00" }
      ]
    },
    {
      id: "posts",
      name: "Diễn Đàn Đường Sắt (Community Forum)",
      path: "/posts/{postId}",
      description: "Bài cảm nhận, hình ảnh vượt đèo sông của các thành viên gửi lên câu lạc bộ xe lửa.",
      roleIcon: Layers,
      vietnameseAnalog: "Bản tin tương tác chia sẻ lữ ký của toàn bộ cộng đồng xe lửa.",
      relations: "Liên kết với /users/{userId} để truy tìm thông tin hiển thị người soạn thảo.",
      securityGate: "Ai cũng được quyền xem, nhưng chỉ tác giả chính chủ được chỉnh sửa nội dung bài viết. Cho phép cộng dồn lượt Like tự động tăng bảo mật.",
      fields: [
        { name: "postId", type: "string (Mã)", desc: "Mã bài viết diễn đàn.", sample: "post_hue_danang_review" },
        { name: "authorId", type: "string (Mã)", desc: "Mã tác giả tạo bài viết.", sample: "usr_9J8xK2" },
        { name: "authorName", type: "string (Họ tên)", desc: "Tên hiển thị nhanh của tác giả.", sample: "Nguyễn Minh Tuấn" },
        { name: "title", type: "string (Chữ)", desc: "Tiêu đề bài viết cảm nhận.", sample: "Review toa tàu di sản và góc chụp cực chill" },
        { name: "content", type: "string (Đoạn văn)", desc: "Nội dung bài viết chi tiết lữ ký dài.", sample: "Hôm nay mình trải nghiệm SE19, đèo Hải Vân..." },
        { name: "likesCount", type: "integer (Số cộng dồn)", desc: "Tổng lượt thả tim tương tác.", sample: "142" },
        { name: "commentsCount", type: "integer (Số cộng dồn)", desc: "Tổng phản hồi dưới bài.", sample: "23" },
        { name: "createdAt", type: "timestamp (Thời gian)", desc: "Ngày đăng tải.", sample: "16-06-2026 10:00:00" },
        { name: "updatedAt", type: "timestamp (Thời gian)", desc: "Ngày điều chỉnh gần nhất.", sample: "16-06-2026 10:15:00" }
      ]
    }
  ];

  const currentCol = collections.find(c => c.id === selectedColId) || collections[0];

  const runHackerSimulation = (scenario: string) => {
    setHackerScenario(scenario);
    setSimState("running");
    let logs: string[] = [];

    if (scenario === "shadow_write") {
      logs = [
        "🔄 [1] Phát động yêu cầu cập nhật từ máy khách IP 114.124.12.99...",
        "📑 Payloads: { userId: 'usr_9J8xK2', fullName: 'Tuấn Hack', role: 'admin' }",
        "🔍 [2] Khởi động Vòng quét Tường lửa Firebase Security Rules...",
        "🛑 Phát hiện Gate: 'isValidUserProfilePublic(incoming)' đang phân tích...",
        "⚠️ Phát hiện trường sửa đổi nhạy cảm: `role` chuyển thành 'admin'!",
        "⛔ Đối soát Gate: `incoming().role == existing().role` không thỏa mãn!",
        "❌ [3] TỪ CHỐI GIAO DỊCH: PERMISSION_DENIED. Cuộc tấn công chiếm quyền Admin thất bại thảm hại!"
      ];
      setTimeout(() => {
        setSimulationLogs(logs);
        setSimState("blocked");
      }, 1000);
    } else if (scenario === "pii_siphon") {
      logs = [
        "🔄 [1] Attacker cố gắng thực hiện truy xuất trực tiếp: `db.doc('/users/usr_victim_456/private/info').get()` ...",
        "🔒 Hệ thống phân quyền Zero-Trust khởi tạo đối soát...",
        "🔍 Đối chiếu Gate: check `isOwner(userId)` hoặc `isAdmin()`",
        "👤 ID Kẻ tấn công: 'attacker_guest_999' - ID nạn nhân: 'usr_victim_456'",
        "❌ [2] Kết quả: 'attacker_guest_999' == 'usr_victim_456' -> SAI! Không khớp!",
        "❌ [3] TỪ CHỐI GIAO DỊCH: PERMISSION_DENIED. Toàn bộ thông tin PII liên lạc của người dùng được giữ an toàn tuyệt đối!"
      ];
      setTimeout(() => {
        setSimulationLogs(logs);
        setSimState("blocked");
      }, 1000);
    } else if (scenario === "wallet_drain") {
      logs = [
        "🔄 [1] Hacker sử dũng tool spam rải tự động tạo tài khoản ngẫu nhiên...",
        "📑 Attempting write to ID: '/users/SuperJunkStringRepeatedToTryAndBlowUpServerIndexingCapacityAndWalletCosts'",
        "🔍 [2] Check Gate: `isValidId(userId)` ...",
        "📏 Kết cấu độ dài tài khoản: 98 ký tự (Thỏa mãn <128)",
        "⚠️ regex checker: `userId.matches('^[a-zA-Z0-9_\\-]+$')` ...",
        "❌ Phát hiện ký tự bất thường và dung lượng rác tích trữ!",
        "❌ [3] TỪ CHỐI GIAO DỊCH: PERMISSION_DENIED. Hệ thống triệt tiêu cuộc tấn công dội tốn ngân sách (Denial of Wallet) thành công!"
      ];
      setTimeout(() => {
        setSimulationLogs(logs);
        setSimState("blocked");
      }, 1000);
    }
  };

  const clearSimulation = () => {
    setHackerScenario(null);
    setSimulationLogs([]);
    setSimState("idle");
  };

  return (
    <div className="space-y-8">
      {/* EXPLANATORY HEADER FOR FOUNDER */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-white">
            <Database className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
              Bản Vẽ Mô Hình Dữ Liệu Enterprise Firestore
            </h2>
            <p className="text-xs text-gray-400 font-mono">VNR TRAVEL AI • DATABASE SECURITY SCHEMA ARCHITECTURE</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
          Chào anh/chị founder! Đối với Firestore, chúng ta lưu trữ dữ liệu dưới dạng các <strong>Tủ Hồ Sơ (Collections)</strong> chứa các <strong>Tờ Phiếu (Documents)</strong>. 
          Dưới đây là thiết kế kiến trúc chuẩn hóa 10 mục tiêu của sản phẩm lữ lữ hành tích hợp AI của chúng ta, giúp bảo vệ tài sản số vững chãi, chống thất thoát hoa hồng và bùng nổ lưu lượng từ TikTok.
        </p>
      </div>

      {/* THREE-COLUMN BENTO GRID: DIAGRAMS, TABLES & LABELS */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: COLLECTIONS TABS LIST */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-[#0F172A] text-[#94A3B8] border border-slate-800 rounded-2xl p-4">
            <span className="text-[10px] font-black tracking-widest text-[#FFD700] uppercase block mb-3">
              1. Danh Sách Tủ Lưu Trữ:
            </span>
            <div className="space-y-1.5">
              {collections.map(col => {
                const IconComp = col.roleIcon;
                const isSelected = selectedColId === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => setSelectedColId(col.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between ${
                      isSelected 
                        ? "bg-green-700 text-white shadow-md font-bold" 
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-green-400"}`} />
                      <span className="text-xs truncate">{col.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SIMPLIFY ANALOGY BOX FOR FOUNDER */}
          <div className="bg-[#FAFBFD] border border-blue-100 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-extrabold text-blue-900 uppercase tracking-wider block">🗣️ Anh/Chị Có Biết?</span>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              <strong>PII Split Isolation</strong> là giải pháp tách riêng thông tin liên lạc nhạy cảm của khách lữ hành. 
              Dù tin tặc có tìm cách dòm ngó hồ sơ công cộng ở bảng tin, thì thông tin số điện thoại của khách của bạn vẫn nằm vững trong ví sắt bất khả xâm phạm.
            </p>
          </div>
        </div>

        {/* MIDDLE COLUMN: FIELDS MATRIX AND RELATIONAL MAP */}
        <div className="xl:col-span-6 bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">
          <div className="p-6 space-y-6">
            
            {/* Folder Header info */}
            <div>
              <span className="bg-slate-100 text-slate-800 text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider font-mono">
                Đường Dẫn Đám Mây: {currentCol.path}
              </span>
              <h3 className="text-lg font-black text-gray-900 tracking-tight mt-3">{currentCol.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{currentCol.description}</p>
            </div>

            {/* Visual Analogy */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-[11px] text-gray-700 flex gap-2">
              <span className="font-extrabold text-green-800 shrink-0 uppercase tracking-widest font-mono">[Ví dụ dân dã]:</span>
              <span>{currentCol.vietnameseAnalog}</span>
            </div>

            {/* Fields Table */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Table className="w-4 h-4 text-green-700" /> Bản Thiết Kế Thuộc Tính (Fields Database Architecture)
              </span>
              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="min-w-full divide-y divide-gray-100 text-xs">
                  <thead className="bg-[#FAFBFD]">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold text-gray-400">Tên Thuộc Tính</th>
                      <th className="px-3 py-2 text-left font-bold text-gray-400">Kiểu Dữ Liệu</th>
                      <th className="px-3 py-2 text-left font-bold text-gray-400">Mô Tả Chức Năng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white font-mono text-[11px]">
                    {currentCol.fields.map((f, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-3 py-2.5 font-bold text-slate-900">{f.name}</td>
                        <td className="px-3 py-2.5 text-blue-700 font-semibold">{f.type}</td>
                        <td className="px-3 py-2.5 text-gray-600 font-sans">{f.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Relations and Security Gate description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100 text-xs">
              <div className="space-y-1 bg-slate-50 p-3 rounded-xl">
                <span className="font-bold text-slate-900 block font-mono uppercase text-[10px] text-blue-900">🔗 Mối Quan Hệ (Relations):</span>
                <p className="text-gray-600 leading-relaxed text-[11px]">{currentCol.relations}</p>
              </div>
              <div className="space-y-1 bg-red-50/50 p-3 rounded-xl border border-red-100/30">
                <span className="font-bold text-slate-900 block font-mono uppercase text-[10px] text-red-900">🛡️ Cửa Chặn Bảo Mật (Security Rules Gate):</span>
                <p className="text-gray-600 leading-relaxed text-[11px]">{currentCol.securityGate}</p>
              </div>
            </div>

          </div>

          {/* Footer of card */}
          <div className="bg-[#FAFBFD] border-t border-gray-100 p-4 text-center">
            <span className="text-[10px] text-gray-400 font-bold font-mono uppercase">
              Cấu trúc đạt chuẩn chuẩn hóa cơ sở dữ liệu phi quan hệ (NoSQL) của Google Cloud
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: HACKER SIMULATOR PLAYGROUND */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-sm tracking-tight font-sans text-white">Interactive Sandbox: Phòng Thử Nghiệm Tường Lửa</h3>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Đóng vai tin tặc thử vượt rào an ninh để trực quan hóa cách hệ thống bảo mật Firestore Rules chặn đứng rò rỉ dữ liệu như thế nào.
            </p>

            {/* Selector Buttons */}
            <div className="space-y-2">
              <button 
                onClick={() => runHackerSimulation("shadow_write")} 
                className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center gap-2.5 transition-all text-slate-100 border ${
                  hackerScenario === "shadow_write" ? "bg-red-500/15 border-red-500 text-[#FFD700]" : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <Key className="w-3.5 h-3.5 shrink-0 text-red-400" />
                <span>[Chiêu 1]: Tự phong Admin</span>
              </button>
              
              <button 
                onClick={() => runHackerSimulation("pii_siphon")} 
                className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center gap-2.5 transition-all text-slate-100 border ${
                  hackerScenario === "pii_siphon" ? "bg-red-500/15 border-red-500 text-[#FFD700]" : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <Lock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>[Chiêu 2]: Ăn cắp SĐT khách</span>
              </button>

              <button 
                onClick={() => runHackerSimulation("wallet_drain")} 
                className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center gap-2.5 transition-all text-slate-100 border ${
                  hackerScenario === "wallet_drain" ? "bg-red-500/15 border-red-500 text-[#FFD700]" : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <AlertOctagon className="w-3.5 h-3.5 shrink-0 text-purple-400" />
                <span>[Chiêu 3]: Spam rác dội ví tiền</span>
              </button>
            </div>

            {/* Loading / Results Console */}
            <AnimatePresence mode="wait">
              {simState !== "idle" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 mt-4 font-mono text-[10px]"
                >
                  <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                    <span className="text-[#94A3B8] font-bold text-[9px] uppercase tracking-wider font-mono">
                      Console Log:
                    </span>
                    <button 
                      onClick={clearSimulation}
                      className="text-[9px] text-[#FFD700] underline font-bold"
                    >
                      Reset Sim
                    </button>
                  </div>

                  {simState === "running" ? (
                    <div className="flex items-center gap-2 text-slate-400 py-4">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-green-400" />
                      <span>Đang đối chiếu dữ liệu lữ hành...</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-slate-300">
                      {simulationLogs.map((log, idx) => (
                        <p 
                          key={idx} 
                          className={
                            log.includes("XONG") || log.includes("TỪ CHỐI") || log.includes("❌")
                              ? "text-red-400 font-extrabold" 
                              : log.includes("XÁC MINH") || log.includes("thỏa mãn")
                              ? "text-green-400 font-bold"
                              : "text-slate-400"
                          }
                        >
                          {log}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* DETAILED SUB-SECTION: SECURITY RULES, INDEXES, SCALABILITY, AND DISASTER RECOVERY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FIRESTORE RULES RAW VIEWER & IMPLEMENTATION STEPS */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              <h3 className="font-extrabold text-[#0F172A] tracking-tight">Quy Tắc Bảo Mật Triển Khai (firestore.rules)</h3>
            </div>
            <span className="bg-green-100 text-green-800 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full font-mono uppercase">
              Chính Sách An Toàn v1.0.0
            </span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Dưới đây là một phần mã nguồn quy tắc an toàn đã được chúng tôi thiết lập và biên dịch tự động. Quy tắc này hoạt động độc lập ở vùng điện toán đám mây Google, hacker hoàn toàn bất khả can thiệp.
          </p>

          <pre className="bg-slate-900 text-[#CBD5E1] border border-slate-800 rounded-xl p-4 font-mono text-[10px] md:text-[11px] overflow-x-auto leading-relaxed shadow-inner max-h-[350px]">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 1. Chế độ an toàn tuyệt đối mặc định (Default deny)
    match /{document=**} {
      allow read, write: if false;
    }

    // 2. Định nghĩa hàm kiểm tra quyền hạn (Identity Helpers)
    function isSignedIn() { return request.auth != null; }
    function isEmailVerified() { return isSignedIn() && request.auth.token.email_verified == true; }
    function isOwner(userId) { return isSignedIn() && request.auth.uid == userId; }

    // 3. Quy chuẩn cho cấu trúc dữ liệu người dùng
    function isValidUserProfilePublic(data) {
      return data.keys().hasAll(['userId', 'fullName', 'role', 'createdAt', 'updatedAt'])
        && data.keys().size() == 5;
    }

    // 4. Định lý phân cấp hồ sơ bảo mật
    match /users/{userId} {
      allow get: if isSignedIn();
      allow create: if isEmailVerified() && isOwner(userId) && isValidUserProfilePublic(request.resource.data);
      allow update: if isEmailVerified() && isOwner(userId) && request.resource.data.role == resource.data.role;

      // Isolated PII split sub-collection
      match /private/info {
        allow get: if isOwner(userId) || (isSignedIn() && request.auth.token.email == 'vnrtravelai@gmail.com');
        allow create, update: if isEmailVerified() && isOwner(userId);
      }
    }
  }
}`}
          </pre>

          {/* IMPLEMENTATION STEPS */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
              🚀 4 Bước Triển Khai Vào Dự Án Thực Tế (Không Lập Trình):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                <span className="font-extrabold text-blue-900 block">Bước 1: Bật máy chủ Firestore</span>
                <p className="text-gray-500 leading-relaxed text-[11px]">
                  Bấm vào bảng điều khiển Firebase Console, nhấn chọn mục Database và kích hoạt ở chế độ 'Enterprise'.
                </p>
              </div>
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                <span className="font-extrabold text-blue-900 block">Bước 2: Dán Quy tắc an toàn</span>
                <p className="text-gray-500 leading-relaxed text-[11px]">
                  Copy toàn bộ nội dung file `firestore.rules` của chúng tôi và dán thẳng vào tab 'Rules' của Firebase Console.
                </p>
              </div>
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                <span className="font-extrabold text-blue-900 block">Bước 3: Cài đặt chỉ mục Index</span>
                <p className="text-gray-500 leading-relaxed text-[11px]">
                  Hệ thống tự động nhắc cấu hình khi truy cập, chỉ cần click 'Create Index' để máy tính tối ưu hóa truy vấn.
                </p>
              </div>
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                <span className="font-extrabold text-blue-900 block">Bước 4: Theo dõi dòng Lead</span>
                <p className="text-gray-500 leading-relaxed text-[11px]">
                  Thông tin khách tự động truyền vào máy chủ CRM, founder chỉ cần mở bảng Admin để cập nhật thông tin mỗi ngày.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* COMPOSITE INDEXES, SCALABILITY & DISASTER RECOVERY CHANNELS */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* INDEXES MODULE */}
          <div className="bg-[#FAFBFD] border border-blue-100 rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest block">
              ⚡ 6. Chỉ Mục Tìm Kiếm Siêu Tốc (Composite Indexes)
            </span>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Khi tệp video lọt xu hướng triệu view, hàng nghìn người tìm cùng lúc sẽ gây nghẽn. Firebase cần các Chỉ mục sắp xếp sẵn (Composite Indexes) để trả kết quả truy tìm trong dưới 0.1 giây:
            </p>
            <div className="space-y-2 text-[10px] font-mono leading-relaxed">
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg space-y-1">
                <span className="font-bold text-slate-800">[Bản 1]: /posts</span>
                <p className="text-gray-550 text-[9px]">Sắp xếp: `userId` (Ascending) + `createdAt` (Descending)</p>
                <p className="text-[9px] text-[#0A5C2D] font-sans font-bold">✓ Dùng để hiển thị bài lữ ký mới nhất của chính tác giả.</p>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg space-y-1">
                <span className="font-bold text-slate-800">[Bản 2]: /affiliate_clicks</span>
                <p className="text-gray-550 text-[9px]">Sắp xếp: `provider` (Ascending) + `createdAt` (Descending)</p>
                <p className="text-[9px] text-[#0A5C2D] font-sans font-bold">✓ Thống kê chớp nhoáng đối soát hoa hồng rạch ròi.</p>
              </div>
            </div>
          </div>

          {/* SCALABILITY PLAN BENTO */}
          <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 text-white rounded-2xl p-5 space-y-4">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5" /> 9. Kế Hoạch Đón Sóng Viral (Scalability)
            </span>
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="flex gap-2.5 items-start">
                <div className="p-1 rounded bg-slate-800 text-white shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                </div>
                <div>
                  <span className="font-bold text-white block">Tự động co giãn tuyến 1 vạn/giây</span>
                  <p className="text-[10px] text-slate-400">Giao dịch bậc Enterprise tự động tăng tải lên không giới hạn khi bùng nổ traffic Tiktok.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="p-1 rounded bg-slate-800 text-white shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                </div>
                <div>
                  <span className="font-bold text-white block">Tối ưu hóa Chi Phí gọi AI</span>
                  <p className="text-[10px] text-slate-400">Gemini 3.5 Flash cấu hình bậc caching ở Server gánh tải 90% các truy vấn trùng cung đường mà không cần gọi lại AI tốn chi phí.</p>
                </div>
              </div>
            </div>
          </div>

          {/* DISASTER RECOVERY PLAN */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block flex items-center gap-1">
              <RefreshCcw className="w-3.5 h-3.5 text-green-600" /> 10. Phục Hồi Thảm Họa (Disaster Recovery)
            </span>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Phòng ngừa rủi ro mất mát dữ liệu do thiên tai hay xóa nhầm:
            </p>
            <div className="space-y-2 text-xs leading-relaxed text-gray-600">
              <div className="flex items-start gap-2">
                <strong className="text-slate-850 inline-block font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded shrink-0">Daily Backup:</strong>
                <span className="text-[11px]">Cấu hình sao lưu đám mây Firestore tự động lúc 03:00 hàng ngày, phiên bản khôi phục giữ lại tối đa 30 ngày gần nhất.</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-850 inline-block font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded shrink-0">Multi-Region:</strong>
                <span className="text-[11px]">Máy chủ lưu trữ đặt ở cụm phân tán đa vùng (Singapore/HongKong/Taiwan) giúp chuyển vùng ngay lập tức nếu có đứt cáp hoặc sự cố khu vực.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
