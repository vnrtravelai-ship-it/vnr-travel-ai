export interface PrdSection {
  id: string;
  title: string;
  role: "Product Manager" | "Software Architect" | "Security Engineer" | "Growth PM" | "All";
  roleTitle: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
}

export const prdSections: PrdSection[] = [
  {
    id: "vision",
    title: "1. Tầm nhìn Sản phẩm (Product Vision)",
    role: "Product Manager",
    roleTitle: "Trưởng phòng Quản lý Sản phẩm (Senior PM)",
    summary: "Định vị VNR Travel AI trở thành siêu ứng dụng du lịch bằng tàu hỏa số 1 Việt Nam, kết nối di sản văn hóa với công nghệ định hình tương lai.",
    content: `### Tầm nhìn Toàn cảnh & Sứ mệnh
Chào nhà Sáng lập! Với tư cách là Trưởng phòng Sản phẩm, tôi đánh giá **VNR Travel AI** không chỉ là một trang web thông thường, mà là một **Nền tảng Trải nghiệm Hành trình** (Journey Experience Platform) chuyên biệt đầu tiên dành cho Đường sắt Việt Nam (VNR).

Đường sắt Việt Nam đang chứng kiến một cuộc phục hưng kỳ diệu với các mác tàu du lịch cao cấp (Tàu kết nối di sản Huế - Đà Nẵng, tàu đêm chất lượng cao Hà Nội - Đà Nẵng SE19/SE20, tàu Đà Lạt cổ kính). Tuy nhiên, khách hàng hiện tại đang đối mặt với trải nghiệm bị phân mảnh: Mua vé một nơi (dễ hết vé giường nằm đẹp), đặt khách sạn tại một kênh khác, tìm hiểu lịch trình trên hội nhóm Facebook, và coi nội dung truyền cảm hứng trên TikTok mà không chuyển đổi trực tiếp thành hành trình được.

**VNR Travel AI giải quyết vấn đề cốt lõi bằng cách:**
1. **Tinh giản hóa kết nối**: Sử dụng Trí tuệ Nhân tạo (Gemini) để tự động hóa việc lên kế hoạch du lịch bằng tàu hỏa dựa trên nhu cầu thực tế của từng nhóm hành khách.
2. **Kinh tế hóa Lưu lượng**: Chuyển đổi lượng khán giả khổng lồ từ video TikTok (triệu view về đèo Hải Vân, vịnh lăng cô) thành dòng tiền thực tế qua hệ thống tiếp thị liên kết (Affiliate API) thông với các hệ sinh thái lớn như Baolau, 12Go, Klook và Agoda.
3. **Giá trị lâu dài**: Tạo dựng cộng đồng đam mê đi tàu để xây dựng cơ sở dữ liệu người dùng trung thành (First-party Database) – tài sản vô giá để gọi vốn hoặc tự vận hành công ty lữ hành độc lập trong tương lai.`,
    keyTakeaways: [
      "Giải quyết sự phân mảnh giữa nội dung cảm hứng (TikTok) và hành động đặt mua (Booking).",
      "Sử dụng AI cá nhân hóa lịch trình đi tàu thực tế, gợi ý chi tiết mác tàu và khung cảnh đẹp nhất.",
      "Tập trung thúc đẩy dòng doanh thu thụ động từ dịch vụ đi kèm: Vé tàu + Khách sạn + Tour trải nghiệm."
    ]
  },
  {
    id: "personas",
    title: "2. Chân dung Người dùng (User Personas)",
    role: "Product Manager",
    roleTitle: "Trưởng phòng Quản lý Sản phẩm (Senior PM)",
    summary: "Xác định 4 nhóm đối tượng khách hàng mục tiêu cốt lõi để tối ưu giao diện và chức năng phù hợp.",
    content: `### Phân tích sâu 4 nhóm đối tượng mục tiêu:

#### Nhóm 1: Khách du lịch nội địa (Vietnamese Family & Solo Travelers)
- **Đặc trưng**: Thích tiện lợi nhưng muốn sự an toàn và chi phí hợp lý. Thích tự lên kế hoạch nhưng ngần ngại tìm hiểu thủ tục ga tàu.
- **Nỗi đau (Painpoints)**: Sợ mua phải vé khoang ghế cứng ê mông, không biết khoang giường nằm nào sạch sẽ, lo ngại đồ ăn trên tàu không hợp khẩu vị.
- **VNR Travel AI giải quyết**: AI gợi ý chính xác loại khoang khuyên dùng cho mỗi hành trình (Ví dụ: Khoang 4 giường nằm chất lượng cao của tàu SE3 cho gia đình có con nhỏ, đặt đồ ăn online trước ở các ga dừng).

#### Nhóm 2: Khách du lịch quốc tế (Foreign Backpackers & Flashpackers)
- **Đặc trưng**: Thích trải nghiệm văn hóa địa phương sâu sắc. Cực kỳ đam mê cung đường biển vượt đèo Hải Vân hoặc tuyến xe lửa qua thung lũng Mường Hoa.
- **Nỗi đau (Painpoints)**: Rào cản ngôn ngữ trên trang web nhà nước, không hiểu hệ thống đổi trả vé ga tàu, khó tìm thấy thông tin điểm trung chuyển bằng taxi hoặc xe máy ở ga đến.
- **VNR Travel AI giải quyết**: Giao diện Tiếng Anh cao cấp, tích hợp hướng dẫn thông tin di sản tàu hỏa thời gian thực, cầu nối tiếp thị liên kết hoàn toàn tự động trực quan hóa vé tàu bằng ngôn ngữ bản địa thông qua cổng quốc tế 12Go.

#### Nhóm 3: Thế hệ trẻ Gen Z & Người dùng TikTok (TikTok-driven Travelers)
- **Đặc trưng**: Quyết định đi du lịch bộc phát sau khi xem clip xu hướng (“chữa lành”, “nhạc lo-fi ngơi nghỉ trên toa tàu hoàng hôn”).
- **Nỗi đau (Painpoints)**: Thấy clip tàu đẹp nhưng không biết làm sao để đi đúng toa đó, giờ giấc chạy thế nào, chi phí bao nhiêu.
- **VNR Travel AI giải quyết**: Tính năng \"Nhập link TikTok hoặc tìm kiếm cung đường Hot\", sinh lịch trình chuẩn khớp y hệt video xu hướng đó trong 3 giây để kích hoạt quyết định mua tức thời.

#### Nhóm 4: Hội cuồng xe lửa (Railway Enthusiasts)
- **Đặc trưng**: Thích săn các mác tàu cổ, đầu máy diesel xưa cũ, quan tâm sâu sắc tới kỹ thuật đường ray, lịch sử các ga Hàng Cỏ, Đà Lạt, Đà Nẵng.
- **Nỗi đau (Painpoints)**: Thiếu không gian chia sẻ có hệ thống, thông tin tản mát trên các diễn đàn cũ lỗi thời.
- **VNR Travel AI giải quyết**: Chuyên mục Cộng Đồng kết nối giao lưu, chia sẻ bài đánh giá chuyên sâu chân thực đóng góp vào kho tàng cơ sở dữ liệu hành trình.`,
    keyTakeaways: [
      "Khách Việt: Cần thông tin chuẩn về khoang tàu, giường nằm và gia đình thoải mái.",
      "Khách Tây: Cần kết nối mượt mà bằng tiếng Anh, tích hợp xe trung chuyển và hướng dẫn bản địa.",
      "Khách trẻ TikTok: Thích tính chuyển đổi tức thì từ video cảm hứng sang vé tàu thực tế."
    ]
  },
  {
    id: "journeys",
    title: "3. Bản đồ Hành trình Người dùng (User Journeys)",
    role: "Product Manager",
    roleTitle: "Trưởng phòng Quản lý Sản phẩm (Senior PM)",
    summary: "Mô tả đường đi mượt mà từ khi khách xem video TikTok cho đến khi hoàn thành đặt vé và đóng góp ý kiến cộng đồng.",
    content: `### Hành trình chuyển đổi số khép kín:

#### Giai đoạn 1: Tiếp cận & Truyền cảm hứng (TikTok & Link-in-Bio)
1. Người dùng xe clip hoang dã vượt đèo Hải Vân cực hot của VNR trên TikTok.
2. Click vào liên kết tại tiểu sử Bio (Liên kết Beacons: beacons.ai/vnrailway).
3. Beacons điều hướng mượt mà sang **VNR Travel AI** với tiêu đề chào mừng nhiệt liệt.

#### Giai đoạn 2: Lập lịch trình tức thì bằng AI (AI Generation)
1. Người dùng sử dụng Trình cấu hình AI hành trình để nhập: Điểm đi (ví dụ: Hà Nội), Điểm đến (Huế), Số ngày (3 ngày 2 đêm), Phong cách (Tiết kiệm/Di bản trải nghiệm).
2. AI (Gemini 3.5 Flash) xử lý nhanh chóng trên máy chủ và xuất ra lịch trình trực quan tuyệt đẹp.
3. Người dùng thấy rõ hành trình từng ngày: mác tàu SE19 sang trọng nhất, khung giờ hoàng hôn vượt sông Hương, khách sạn Boutique lãng mạn gần ga Huế.

#### Giai đoạn 3: Mua sắm dịch vụ (Affiliate Checkout)
1. Người dùng bấm chọn nút \"Đặt vé tàu này qua Baolau\" hoặc \"Đặt qua 12Go\", hệ thống tự động gắn mã tiếp thị liên kết \`?source=vnrailway\`.
2. Người dùng tiếp tục bấm đặt khách sạn gợi ý trên Agoda/Booking và Tour phiêu lưu di sản trên Klook ngay trên giao diện một cách tự nhiên.
3. Nhà founder nhận hoa hồng thụ động (Affiliate Commission) được cập nhật thẳng vào ví quản lý đối tác.

#### Giai đoạn 4: Lưu trữ tệp KH & Giữ chân (Database & Community)
1. Ứng dụng khéo léo mời người dùng: \"Tham gia Cộng đồng đường sắt Việt Nam để nhận cẩm nang bỏ túi độc quyền và cảnh báo vé rẻ\".
2. Người dùng cung cấp Họ tên, Số điện thoại và Email để gia nhập tệp dữ liệu khách hàng chất lượng cao của bạn.
3. Hệ thống gửi email tự động chăm sóc và hướng dẫn, tạo điểm chạm gắn kết vô hạn.`,
    keyTakeaways: [
      "Tiếp cận từ TikTok -> Chuyển đổi qua AI -> Tạo doanh thu qua Affiliate -> Giữ chân bằng Đăng ký Cộng đồng.",
      "Tối giản số bước thao tác để tỷ lệ rơi rụng (drop-off rate) ở mức thấp nhất dưới 15%.",
      "Khách hàng cảm thấy được chăm sóc chu đáo thay vì có cảm giác bị 'bán hàng thúc ép'."
    ]
  },
  {
    id: "revenue",
    title: "4. Mô hình Doanh thu (Revenue Model Cashflow)",
    role: "Growth PM",
    roleTitle: "Chuyên gia Tăng trưởng & Tài chính (Senior Growth PM)",
    summary: "Bảng phân tích dòng tiền thực tế và công cụ dự toán tài chính hoa hồng giúp nhà sáng lập tối ưu điểm sinh lời.",
    content: `### Cơ chế Tạo Doanh thu Thực tế (Không cần sở hữu đoàn tàu hay phòng vé vật lý)

#### 1. Dịch vụ Tiếp thị liên kết Vé Tàu (Train Ticket Affiliate)
- **Đối tác chính**: Baolau (phần trăm phân chia hoa hồng trên mỗi giao dịch vé thành công thường giao động từ 1.5% - 3.5% thị giá vé hoặc phí dịch vụ cố định).
- **Cơ chế**: VNR Travel AI chuyển hướng lưu lượng người dùng đến liên kết đối tác đặc biệt ví dụ: \`https://www.baolau.com/vi/transportation/vietnam/trains?source=vnrailway\`. Khi họ thanh toán vé thành công, Baolau sẽ ghi nhận tự động.
- **Giá trị vé trung bình**: 800.000 VND/vé chặng dài giường nằm tàu SE. Hoa hồng ước tính đạt từ 15.000 – 30.000 VND / vé.

#### 2. Tiếp thị liên kết Khách sạn (Hotel Booking Affiliate)
- **Đối tác chính**: Agoda, Booking.com, Traveloka thông qua mạng lưới tiếp thị liên kết của Accesstrade hoặc Agoda Partners.
- **Mức hoa hồng**: Rất lớn, thường đạt **4% - 8%** giá trị phòng đặt thành công.
- **Ví dụ**: Mỗi tour khách đi tàu sẽ lưu trú 2 đêm, tổng tiền phòng 1.500.000 VND. Bạn thu được từ **60.000 – 120.000 VND** dòng tiền thuần túy trên mỗi hóa đơn phòng.

#### 3. Tiếp thị liên kết Tour trải nghiệm & Vé vui chơi (Local Experiences Tours)
- **Đối tác chính**: Klook (đại lý vé lớn nhất Đông Nam Á), các đối tác tour bản địa tại Sapa, Huế, Hội An, Quy Nhơn, Nha Trang.
- **Mức hoa hồng**: Siêu lợi nhuận, dao động từ **5% - 12%** giá trị tour.
- **Ví dụ**: Tour đi xe jeep nửa ngày trải nghiệm đèo Hải Vân giá trị 800.000 VND/khách -> Hoa hồng đạt **80.000 VND**.

---

### Mô tả Dòng Tiền & Công thức Tăng trưởng:
\`\`\`
Doanh thu tháng = Lượng Truy cập (TikTok/Google) x Tỷ lệ chuyển đổi xây lịch trình (15%) x Tỷ lệ click tải Affiliate (5%) x Hoa hồng trung bình mỗi lượt (Vé+Phòng+Tour ~ 150.000 VND)
\`\`\`
*Dưới đây tôi đã xây dựng hẳn một Bộ máy tính toán Dự báo Tài chính thực tế trong Tab bên cạnh để bạn tự kéo mở mô phỏng khả năng sinh lời theo quy mô tăng trưởng thương hiệu!*`,
    keyTakeaways: [
      "Doanh thu không đến từ việc bán vé trực tiếp, mà đến từ phí hoa hồng lữ hành liên kết không rủi ro vận hành.",
      "Tập trung kết nối vé tàu với khách sạn và tour - vì khách sạn và tour đem lại biên lợi nhuận hoa hồng cao gấp 5 lần vé tàu hỏa thuần túy.",
      "Lưu trữ mã số tiếp thị (Affiliate ID) đồng nhất để tránh mất mát dữ liệu chuyển đổi."
    ]
  },
  {
    id: "functional",
    title: "5. Yêu cầu Chức năng (Functional Requirements)",
    role: "Software Architect",
    roleTitle: "Kiến trúc sư Trưởng Phần mềm (Senior Architect)",
    summary: "Các mô-đun kỹ thuật cụ thể cấu thành nên xương sống của hệ thống phần mềm VNR Travel AI chất lượng cao.",
    content: `### Chi tiết Thiết kế Kiến trúc Hệ thống & Chức năng

#### Mô-đun 1: Trình Sinh Lịch Trình Tự Động Bằng AI (AI Planner Engine)
- **Đầu vào khách hàng**: Điểm đi, điểm đến, số ngày, mức ngân sách, tệp đi cùng, gu lữ hành.
- **Xử lý phía máy chủ (Backend)**: Nhận yêu cầu, gọi API Gemini của Google bảo mật, ép cấu trúc JSON chi tiết, chuyển đổi dữ liệu không bị lỗi định dạng.
- **Đầu ra giao diện (Frontend)**: Hiển thị đẹp mắt dạng lịch trình dòng thời gian (timeline), phân chia ca sáng/trưa/chiều/tối rõ ràng, có biểu tượng chỉ dẫn trực quan.

#### Mô-đun 2: Hệ thống Chuyển hướng Tiếp thị Liên kết (Smart Affiliate Redirector)
- **Tạo nút thông minh**: Mỗi chặng hành trình có nút đặt vé khớp thương hiệu (Baolau, 12Go).
- **Thuật toán tạo Link động**: Tự động ghép nối ga đi, ga đến, ngày khởi hành sang tham số URL của nhà cung cấp.
- **Tránh mất hoa hồng**: Sử dụng các phương thức xử lý chuyển hướng URL an toàn để đảm bảo Cookies tiếp thị liên kết bám giữ trên trình duyệt người dùng đến 30 ngày.

#### Mô-đun 3: Trạm Thu thập & Quản trị Lead Khách hàng (Database Lead Capture & Admin Dashboard)
- **Form đăng ký mượt mà**: Thiết kế trường thông tin tối giản (Họ tên, SĐT, Email).
- **Hộp thoại chúc mừng**: Tặng cẩm nang PDF hành trình tàu hỏa để tăng kích thích đăng ký.
- **Bảng điều khiển nội bộ (Admin)**: Khu vực bảo mật dành riêng cho nhà founder xem toàn bộ danh sách khách hàng đăng ký, sắp xếp thời gian tiện hành trình, xuất Excel gửi chiến dịch email marketing gối đầu.`,
    keyTakeaways: [
      "Kiến trúc tích hợp chặt chẽ: Frontend React nhẹ nhàng phản hồi cực nhanh, Backend Express xử lý Gemini tối mật.",
      "Affiliate links được tạo tự động động lực hóa dựa trên ga đi xuôi ngược thực tế.",
      "Admin Panel thu nhận data người dùng trực tiếp trên website mà không cần sử dụng cổng lưu trữ trung gian mất phí."
    ]
  },
  {
    id: "nonfunctional",
    title: "6. Yêu cầu Phi chức năng (Non-functional Requirements)",
    role: "Software Architect",
    roleTitle: "Kiến trúc sư Trưởng Phần mềm (Senior Architect)",
    summary: "Các tiêu chuẩn chất lượng kỹ thuật đảm bảo trang web chạy ổn định, nhanh chóng khi có lượng người dùng lớn.",
    content: `### Các chỉ số kỹ thuật đạt chuẩn sản phẩm lớn:

#### 1. Hiệu năng & Tốc độ Tải trang (Performance & Core Web Vitals)
- **Tốc độ phản hồi ban đầu**: Toàn bộ trang web phải tải dưới **1.5 giây** trên mạng 4G thông thường tại Việt Nam để tránh tỷ lệ thoát trang lớn do khách không kiên nhẫn.
- **Thời gian phản hồi của AI**: Gemini 3.5 Flash xử lý nhanh chóng trong vòng **2.5 - 4 giây** cho một lịch trình cực dài. Hệ thống cần hiển thị hiệu ứng bập bùng chuyển động nhẹ nhàng (loading skeletons) báo hiệu giúp giảm tải cảm giác sốt ruột cho khách hàng.

#### 2. Thiết kế Tương thích Mượt mà trên Di động (Mobile-First Responsive Layout)
- **Sự thật**: Trên **90%** khách hàng từ TikTok click liên kết sẽ truy cập bằng phiên bản trình duyệt nhúng của app TikTok (TikTok In-App Browser) trên điện thoại iPhone/Android. Giao diện buộc phải tối ưu hóa hoàn hảo cho giao diện dọc, các nút bấm to dễ ấn bằng ngón cái, khoảng cách đệm (padding) thoáng đãng, tuyệt đối không bị lỗi vỡ font chữ trên màn hình nhỏ.

#### 3. Khả năng chịu tải đồng thời (Scalability / High Concurrency)
- **Kịch bản**: Khi một video TikTok của bạn đột ngột lên xu hướng hàng chục vạn view (\"virall\"), số lượng truy cập đồng thời tại một thời điểm có thể vọt lên **1,000+ người cùng lúc**.
- **Giải quyết**: Sử dụng máy chủ chạy Docker trên Cloud Run của Google tự động co giãn dòng xử lý (Auto-scaling), kết hợp bộ nhớ cache lưu giữ để giữ cho nền tảng của bạn vững vàng không bao giờ sập sạt.`,
    keyTakeaways: [
      "Quá 90% truy cập từ điện thoại di động thông qua trình duyệt TikTok -> Tối ưu phản hồi dọc là sống còn.",
      "Tốc độ tải dưới 1.5 giây, AI trả kết quả trong dưới 4 giây kèm hiệu ứng chờ hấp dẫn.",
      "Kiến trúc Cloud Run có khả năng tự co giãn tự động, gánh tệp truy cập bùng nổ không bị nghẽn mạng."
    ]
  },
  {
    id: "security",
    title: "7. Yêu cầu An ninh & Bảo mật thương hiệu (Cybersecurity)",
    role: "Security Engineer",
    roleTitle: "Kỹ sư trưởng An ninh Thông tin giải pháp (Senior Security)",
    summary: "Chiến lược phòng chống rò rỉ dữ liệu, giả mạo và bảo vệ tài sản doanh nghiệp cốt lõi tuyệt đối an toàn.",
    content: `### Bảo mật Sản phẩm & An toàn Dữ liệu khách hàng
Chào nhà Sáng lập! Là kỹ sư an ninh mạng, nhiệm vụ của tôi là đảm bảo doanh nghiệp khởi nghiệp của bạn không gặp rủi ro pháp lý và danh tiếng. Đây là cách tôi bảo vệ dự án **VNR Travel AI** của bạn một cách tối ưu nhất:

#### 1. Bảo vệ API Key Tuyệt mật (Secure Token Management)
- **Nguy cơ**: Nếu sử dụng mã API Key của OpenAI hoặc Google Gemini trực tiếp tại trình duyệt client, bất kỳ ai rành một chút về công nghệ cũng có thể dùng công cụ xem mã để quét và đánh cắp mã khóa của bạn, dùng tiêu tốn hết tiền trong thẻ tín dụng của bạn.
- **Giải quyết của VNR Travel AI**: Toàn bộ thao tác kết cấu AI đều được xử lý ẩn hoàn toàn tại Máy chủ độc lập (Server-side API proxy). API key được cấu hình dưới dạng tham số môi trường bí mật trên máy chủ đám mây. Trình duyệt người dùng không bao giờ nhìn thấy hay chạm được vào các khóa bảo mật này.

#### 2. Chống Tấn công Spam API (Rate Limiting)
- **Nguy cơ**: Kẻ xấu hoặc robot spam gửi liên tục hàng nghìn yêu cầu lập lịch trình AI mỗi phút làm tăng vọt tiền phí Google Cloud của bạn hoặc làm nghẽn máy chủ.
- **Giải quyết**: Thiết lập giới hạn chặn tần suất (Rate Limiting). Ví dụ: Mỗi địa chỉ IP internet chỉ được tạo tối đa 5 lịch trình AI trong vòng 15 phút. Nếu vượt quá, hệ thống sẽ yêu cầu chờ đợi nhẹ nhàng.

#### 3. Mã hóa Dữ liệu Lead (Encryption)
- Cơ sở dữ liệu danh khách hàng được bảo vệ bằng mật khẩu quản trị ngẫu nhiên, truyền nhận thông tin qua chuẩn HTTPS an toàn tuyệt mật cấp độ cao của Google Cloud.`,
    keyTakeaways: [
      "API Key được giữ kín 100% sau lớp màn máy chủ Express, triệt tiêu nguy cơ rò rỉ.",
      "Rate limits chặn robot spam tạo yêu cầu AI liên tục bảo vệ túi tiền của founder.",
      "Không bao giờ thu thập thông tin nhạy cảm của người dùng (như mật khẩu cá nhân hay số thẻ tín dụng)."
    ]
  },
  {
    id: "analytics",
    title: "8. Yêu cầu Đo lường & Sự kiện Chuyển đổi (Analytics)",
    role: "Growth PM",
    roleTitle: "Chuyên gia Tăng trưởng & Tài chính (Senior Growth PM)",
    summary: "Xây dựng các mắt lưới đo lường khoa học, ghi dấu chân của hành khách để cải tiến quy trình bán hàng hiệu quả.",
    content: `### Đo lường để Tăng trưởng (Data-Driven Decisions)
Bạn không thể tăng trưởng những gì bạn không thể đo lường! Để hỗ trợ vị thế điều hành của nhà founder, chúng ta sẽ cấu hình hệ thống đo lường hành vi siêu chi tiết (Event-Based Analytics):

#### 1. Các phễu đo lường cốt lõi (Core Funnel):
- **Phễu Lập kế hoạch**: Số người đặt chân tới web -> Số người điền Form chọn cung đường -> Số người tạo lịch trình AI thành công. (Đo lường hiệu quả chuyển đổi sản phẩm).
- **Phễu Doanh thu (Affiliate Clicks)**: Số người xem lịch trình -> Số lượt bấm vào nút \"Đặt vé trên Baolau / 12Go\" -> Số lượt đặt phòng Agoda -> Số lượt đặt tour Klook. (Giúp tìm ra chặng tàu nào đang \"hái ra tiền\" nhiều nhất).
- **Phễu Cơ sở dữ liệu**: Số khách hàng nhìn thấy hộp thoại Cộng đồng -> Số khách thực sự để lại thông tin số điện thoại/email đăng ký. (Tỷ lệ chuyển đổi thu thập Lead).

#### 2. Theo dấu dòng lưu lượng từ TikTok (UTM Tracking)
- Cấu hình thẻ tiếp thị đặc thù trên link bio ví dụ: \`https://vnrtravelai.app/?utm_source=tiktok&utm_medium=bio\`.
- Cho phép bạn nhận diện rạch ròi 100% nguồn khách hàng đến từ video nào của bạn để tập trung nhân bản nội dung tương tự.`,
    keyTakeaways: [
      "Cài đặt theo vết sự kiện click nút liên kết Baolau/12Go để nắm dòng tiền hoa hồng.",
      "Tích hợp thẻ UTM định vị chính xác video TikTok nào đem lại nhiều đơn hàng vé nhất.",
      "Cung cấp báo cáo trực quan tỉ lệ chuyển đổi tại bảng điều khiển quản trị."
    ]
  },
  {
    id: "admin",
    title: "9. Chức năng Ban Quản trị (Admin Requirements Hub)",
    role: "All",
    roleTitle: "Toàn bộ Toán kỹ sư (Sản phẩm - Kiến trúc - Tăng trưởng)",
    summary: "Bảng điều khiển trung tâm giúp nhà sáng lập kiểm soát dòng tiền, quản lý khách hàng tiềm năng và tối ưu hóa hệ sinh thái liên kết.",
    content: `### Trung tâm Kiểm soát Quốc gia của VNR Travel AI
Là một nhà sáng lập không chuyên kỹ thuật, bạn cần một bộ công cụ tối mật trực quan để theo dõi mọi diễn tiến kinh doanh chỉ trên một cửa sổ duy nhất:

#### 1. Quản lý Cơ sở dữ liệu Lead (CRM Lite):
- Hiển thị danh sách đầy đủ tất cả những người đăng ký tham gia cộng đồng đi tàu hỏa di sản của bạn.
- Hiển thị Họ tên, Email, Số điện thoại, Tần suất di chuyển và Luồng ưu tiên du lịch của họ ở vùng nào (Bắc, Trung, hay Nam).
- Khả năng xuất dữ liệu nhanh chóng để nhập sang các phần mềm gửi email hàng loạt tự động (ví dụ Mailchimp, GetResponse) hoặc gọi điện tư vấn.

#### 2. Giám sát Liên kết Tiếp thị (Affiliate Monitor):
- Lưu giữ trực quan hóa danh mục tham chiếu của các đối tác chính như Baolau, 12Go giúp bạn sẵn sàng truy cập nhanh để kiểm tra số dư hoa hồng quý.
- Nơi để nhà sáng lập quản lý và tùy chỉnh nhanh mã số ID liên kết mà không cần sửa đổi bất kỳ đoạn code máy chủ phức tạp nào.`,
    keyTakeaways: [
      "Quản lý danh sách thành viên cộng đồng lữ hành theo thời gian thực.",
      "Hỗ trợ phân nhóm tệp khách hàng theo miền ưa thích dễ dàng chăm sóc.",
      "Toàn quyền kiểm soát cấu hình tham số liên kết hoa hồng đối tác lữ hành."
    ]
  },
  {
    id: "growth",
    title: "10. Lộ trình Tăng trưởng Thần tốc (Growth Roadmap)",
    role: "Growth PM",
    roleTitle: "Chuyên gia Tăng trưởng & Tài chính (Senior Growth PM)",
    summary: "Kế hoạch 3 bước từng bước khởi đầu và nhân rộng ứng dụng chiếm lĩnh thị trường lữ hành đường sắt Việt Nam.",
    content: `### Chiến lược Tăng trưởng của VNR Travel AI

#### Giai đoạn 1: Khởi động Lạnh & Tạo sóng (Tháng 1 - Tháng 2)
- **Trọng tâm**: Xây dựng nền tảng vững vàng, phát hành phiên bản trải nghiệm lập lịch trình tàu hỏa AI.
- **Kênh tiếp thị**: Đẩy mạnh sản xuất 3 video ngắn mỗi tuần trên kênh TikTok chính chủ. Nội dung tập trung khám phá: \"Tổng chi phí du lịch bằng tàu đêm giường nằm SE19 Hà Nội - Đà Nẵng bao nhiêu?\", \"Review Toa tàu kết nối di sản Huế - Đà Nẵng siêu chill\".
- **Hành động chuyển đổi**: Đặt liên kết VNR Travel AI trong Bio. Cài đặt tặng cẩm nang du lịch xe lửa độc quyền cho 1,000 người đăng ký đầu tiên.

#### Giai đoạn 2: Trải khai Đồng bộ & Kích hoạt Hoa hồng (Tháng 3 - Tháng 4)
- **Trọng tâm**: Tối ưu hóa phễu kiếm tiền từ Affiliate.
- **Chiến thuật**: Phối hợp cùng các nhà sáng tạo nội dung du lịch nhỏ (KOLs/KOCs lữ hành) tặng họ link rút gọn riêng của VNR Travel AI để họ chia sẻ cho người hâm mộ của họ. Hoa hồng sẽ chia sẻ lại theo tỷ lệ 50-50 lộc trời cho.
- **Sản phẩm**: AI được cập nhật dự đoán chi tiết giá theo từng mùa lễ hội miền Tây, Sapa, lễ tết.

#### Giai đoạn 3: Siêu ứng dụng Cộng đồng & Gọi vốn (Tháng 5 trở đi)
- **Trọng tâm**: Vận dụng dữ liệu danh sách khách hàng tích lũy được trong các tháng trước (Data-driven monetization).
- **Hành động**: Chào bán các gói tài trợ truyền thông cho các chuỗi khách sạn boutique dọc cung đường sắt (Huế, Đà Nẵng, Nha Trang, Quy Nhơn), bán dịch vụ chăm sóc tour tự trị của riêng VNR hoặc cung ứng nguồn leads chất lượng cho các cơ quan lữ hành nhà nước thu phí hàng tháng.`,
    keyTakeaways: [
      "Sản xuất nội dung review trải nghiệm thực tế tàu hỏa đèo Hải Vân chất lượng phát hành lên TikTok dấn lưu lượng.",
      "Thiết lập mạng lưới chia sẻ hoa hồng liên kết cùng KOCs để tăng độ phủ sóng.",
      "Sử dụng tệp khách hàng có sẵn tạo đòn bẩy chào bán hợp đồng quảng bá du lịch cao cấp."
    ]
  },
  {
    id: "production",
    title: "11. Danh sách Kiểm tra Khởi chạy (Production Checklist)",
    role: "All",
    roleTitle: "Toàn bộ Toán kỹ sư (Sản phẩm - Kiến trúc - Tăng trưởng)",
    summary: "Bảng kiểm soát chi tiết đảm bảo không có bất kỳ sai sót nào phát sinh trước khi công bố phần mềm ra thị trường.",
    content: `### Danh sách Việc cần hoành tất trước ngày mở cổng thương mại:

- [ ] **Kết nối API Google Gemini an toàn**: Đảm bảo \`GEMINI_API_KEY\` đã được cấu hình chặt chẽ an toàn tại bí mật máy chủ và kiểm thử tạo lập lịch trình phản hồi chính xác dưới 5 giây.
- [ ] **Tích hợp Affiliate IDs thành công**: Kiểm tra từng liên kết click đối tác (Baolau, 12Go, Agoda, Klook) đảm bảo đã đi kèm đúng các chuỗi nhận diện hoa hồng đối tác hoạt động ổn định.
- [ ] **Màng lọc chống Spam chạy tốt**: Xác minh cơ chế rate limiting hoạt động chuẩn chỉ, chặn đứng robot gửi yêu cầu liên tục làm tăng chi phí API.
- [ ] **Kiểm thử Mobile và Trình duyệt TikTok nhúng**: Sử dụng thiết bị di động truy cập chạy thử tất cả các tính năng xem giao diện cuộn mượt mà có bị giật đứng hay tràn lề chữ không.
- [ ] **Đảm bảo cơ chế lưu trữ leads không gián đoạn**: Nhập thử dữ liệu form tham gia cộng đồng và kiểm tra tại Admin Dashboard xem thông tin hiển thị đã chính xác và cập nhật chưa.`,
    keyTakeaways: [
      "Rà soát tính nguyên vẹn của dòng chuỗi khóa API bảo mật.",
      "Chạy thử trải nghiệm người dùng nhúng thẳng góc nhìn TikTok in-app browser.",
      "Chốt đầu cổng nhận dán hoa hồng tiếp thị liên kết khớp hoạt động mượt mà."
    ]
  },
  {
    id: "maintenance",
    title: "12. Cẩm nang Bảo trì Hệ thống (Maintenance Manual)",
    role: "Security Engineer",
    roleTitle: "Kỹ sư trưởng An ninh Thông tin giải pháp (Senior Security)",
    summary: "Hướng dẫn bảo dưỡng hệ thống an toàn, tối thiểu hóa chi phí hạ tầng hàng tháng cho nhà sáng lập.",
    content: `### Chi phí và Hướng dẫn bảo dưỡng Website VNR Travel AI:

#### 1. Kiểm soát giá vốn hàng tháng bảo trì (Ước lượng vận hành)
Chào nhà Sáng lập! Điểm tuyệt vời nhất của kiến trúc đám mây hiện đại chúng tôi thiết kế cho **VNR Travel AI** là: **Hầu như bằng 0 đồng nếu khởi điểm thấp!**
- **Hosting (Cloud Run + Đám mây)**: Free tier (Giao dịch bậc miễn phí của Cloud Run) hoàn toàn đủ gánh tới 10,000 lượt truy cập nhẹ mỗi tháng mà hầu như không mất đồng xu nào của bạn.
- **Phí API Google Gemini**: Mỗi lượt tạo lịch trình tinh xảo bằng Gemini 3.5 Flash chỉ tiêu tốn của bạn khoảng **0.00015 USD** (~ 4 đồng Việt Nam). Nghĩa là 10.000 khách hỏi thăm tạo lịch trình chỉ ngốn hết của bạn vẻn vẹn chưa tới **1 USD** (~ 25.000 VND). Đây là mức hiệu suất kinh tế phá kỷ lục trong lịch sử công nghệ!

#### 2. Kế hoạch chăm sóc định kỳ (Hàng tháng)
- **Tổng soát Link liên kết**: Định kỳ 30 ngày một lần, truy cập Ga đối tác Baolau hoặc Agoda check xem họ có thay đổi định dạng cấu trúc liên kết hay không để cập nhật nhẹ nhàng tham số URL của hệ thống.
- **Tập hợp và khai thác tệp Leads**: Xuất tệp cơ sở dữ liệu tích tụ hàng tuần từ Admin Panel, sao lưu dự phòng sang Google Drive để đảm bảo tài sản tuyệt đối phân quyền an toàn cao nhất của bạn.`,
    keyTakeaways: [
      "Chi phí vận hành đạt mức tối thiểu đột phá nhờ chính sách tối ưu tài nguyên đám mây và Gemini 3.5 Flash.",
      "Tổng soát các cổng đối tiếp tiếp thị định kỳ để bảo toàn quyền nhận hoa hồng không suy sụt.",
      "Khai phóng sao lưu tệp leads quý giá hàng tuần để tối lưu hóa hoạt động marketing chăm sóc cá nhân hóa."
    ]
  }
];
