import { ItineraryRequest } from "./itinerary.service";

import {
    PlanningContext
} from "../planning/models/planning-context.model";

export function buildItineraryPrompt(
    request: ItineraryRequest,
    context: PlanningContext
): string {

    const {
        departure,
        arrival,
        daysCount,
        budgetLevel,
        travelStyle,
        companion
    } = request;

    const duration =
        daysCount || context.request.numberOfDays || 3;

    const budget =
        budgetLevel ||
        context.request.budgetLevel ||
        "MEDIUM";

    const style =
        travelStyle ||
        context.request.travelStyle ||
        "EXPLORE";

    const companionText =
        companion ||
        context.request.companion ||
        "Một mình";

    const planningData = {

        railway:
            context.railway ?? null,

        hotel:
            context.hotel ?? null,

        food:
            context.food ?? null,

        tours:
            context.tours ?? [],

        itinerary:
            context.itinerary ?? [],

        budget:
            context.budget ?? null,

        affiliate:
            context.affiliate ?? null,

        metadata:
            context.metadata ?? null

    };

    return `
Bạn là lớp AI trình bày của hệ thống VNR Travel AI.

PlanningEngine và SchedulerEngine đã hoàn tất việc lập kế hoạch cơ sở.

Nhiệm vụ của bạn là chuyển PlanningContext bên dưới thành nội dung
lịch trình du lịch tiếng Việt theo đúng responseSchema.

THÔNG TIN YÊU CẦU:

- Điểm đi: ${departure}
- Điểm đến: ${arrival}
- Số ngày: ${duration}
- Ngân sách: ${budget}
- Phong cách: ${style}
- Bạn đồng hành: ${companionText}

NGUYÊN TẮC QUAN TRỌNG:

1. PlanningContext là nguồn dữ liệu chính.

2. Không tự ý thay đổi:
- số ngày;
- thứ tự ngày;
- giờ bắt đầu;
- giờ kết thúc;
- tàu;
- khách sạn;
- tour;
- chi phí;
nếu các thông tin này đã có trong PlanningContext.

3. Đặc biệt, context.itinerary là lịch trình đã được
SchedulerEngine tính toán. Hãy sử dụng lịch trình này làm
khung thời gian chính cho trường "days".

4. Không tự tạo một lịch trình hoàn toàn mới.

5. Có thể diễn giải lại tiêu đề, mô tả và chi tiết hoạt động
để nội dung tự nhiên, hấp dẫn và dễ đọc hơn nhưng không được
làm sai dữ liệu PlanningContext.

6. Nếu một thông tin không có trong PlanningContext thì không
được khẳng định như một dữ kiện chắc chắn. Có thể bỏ qua hoặc
diễn đạt dưới dạng đề xuất.

7. Không bịa mã tàu, giờ tàu, giá vé, khách sạn hoặc tour.

8. Các hoạt động trong từng ngày phải phản ánh đúng
context.itinerary.

9. Chi phí tổng thể phải dựa trên context.budget khi dữ liệu
này có sẵn.

10. Các thông tin affiliate chỉ sử dụng khi có trong
context.affiliate hoặc dữ liệu tương ứng trong PlanningContext.

PLANNING CONTEXT:

${JSON.stringify(
    planningData,
    null,
    2
)}

YÊU CẦU OUTPUT:

- Viết bằng tiếng Việt.
- Chỉ trả về JSON.
- Không Markdown.
- Không giải thích ngoài JSON.
- Tuân thủ tuyệt đối responseSchema.
- Không thêm trường ngoài schema.
`;
}