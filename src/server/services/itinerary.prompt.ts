import { ItineraryRequest } from "./itinerary.service";

export function buildItineraryPrompt(request: ItineraryRequest): string {
  const {
    departure,
    arrival,
    daysCount,
    budgetLevel,
    travelStyle,
    companion,
  } = request;

  const duration = daysCount || 3;
  const budget = budgetLevel || "Tiết kiệm";
  const style = travelStyle || "Trải nghiệm văn hóa";
  const companionText = companion || "Một mình";

  return `
Lập lịch trình du lịch đường sắt Việt Nam bằng tiếng Việt chi tiết từ ${departure} đi ${arrival} trong vòng ${duration} ngày.

Yêu cầu cụ thể:

- Phong cách du lịch: ${style}
- Ngân sách: ${budget}
- Bạn đồng hành: ${companionText}

Lịch trình phải tập trung tuyệt đối vào trải nghiệm di chuyển bằng tàu hỏa.

Yêu cầu AI:

- Ưu tiên các đoàn tàu thực tế của Đường sắt Việt Nam.
- Có thể sử dụng các mác tàu như:
  - SE1
  - SE2
  - SE3
  - SE4
  - SE5
  - SE6
  - SE7
  - SE8
  - SE19
  - SE20
  - HD1
  - HD2
  - Các đoàn tàu địa phương nếu phù hợp.

Đối với mỗi chặng tàu cần đề xuất:

- Mã tàu
- Ga đi
- Ga đến
- Khung giờ phù hợp
- Loại chỗ nên đặt
- Giá vé ước tính
- Kênh đặt vé (Baolau hoặc 12Go)

Ngoài di chuyển bằng tàu cần đề xuất:

- Khách sạn phù hợp
- Tour địa phương
- Địa điểm tham quan
- Ẩm thực địa phương
- Đặc sản nổi bật
- Mẹo trải nghiệm đường sắt
- Mẹo săn ảnh đẹp
- Mẹo ngắm cảnh trên tàu
- Các lưu ý khi di chuyển

Nếu cần kết hợp phương tiện khác:

- ưu tiên tối ưu thời gian
- tối ưu chi phí
- ưu tiên tàu chạy ban đêm để tiết kiệm chi phí lưu trú

Toàn bộ kết quả phải đúng với responseSchema.

Không giải thích.

Không thêm markdown.

Chỉ trả về JSON hợp lệ.
`;
}