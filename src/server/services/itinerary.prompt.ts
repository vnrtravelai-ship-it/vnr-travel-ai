import { ItineraryRequest } from "./itinerary.service";

export function buildItineraryPrompt(request: ItineraryRequest): string {
  const duration = request.daysCount || 3;
  const budget = request.budgetLevel || "Tiết kiệm";
  const style = request.travelStyle || "Trải nghiệm văn hóa";
  const companion = request.companion || "Một mình";

  return `
Lập lịch trình du lịch đường sắt từ ${request.departure} đến ${request.arrival}.

Yêu cầu:

- Thời gian: ${duration} ngày
- Ngân sách: ${budget}
- Phong cách: ${style}
- Đồng hành: ${companion}

Ưu tiên tuyệt đối trải nghiệm đường sắt.

Nếu cần kết hợp phương tiện khác thì:
- tối ưu thời gian
- tối ưu chi phí
- ưu tiên tàu chạy ban đêm để thay thế lưu trú
- đề xuất khách sạn
- đề xuất trải nghiệm
- đề xuất đặc sản địa phương
- đề xuất đối tác đặt dịch vụ.

Kết quả trả về phải đúng JSON.
`;
}