import express from "express";
import path from "path";
import dotenv from "dotenv";
import { Type } from "@google/genai";
import { getAiClient } from "./src/server/providers/gemini.provider";
import leadsRoutes from "./src/server/routes/leads.routes";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", leadsRoutes);
const PORT = 3000;

// Shared user leads/community database in-memory for the demo.
const communityLeads: Array<{
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  travelFrequency: string;
  preferredRegions: string[];
  notes?: string;
  createdAt: string;
}> = [
  {
    id: "lead-1",
    fullName: "Nguyễn Văn Hùng",
    email: "hung.nv@gmail.com",
    phoneNumber: "0912345678",
    travelFrequency: "Thường xuyên (Hàng tháng)",
    preferredRegions: ["Miền Trung", "Miền Bắc"],
    notes: "Rất thích cung đường tàu di sản Huế - Đà Nẵng",
    createdAt: new Date().toISOString(),
  }
];

// Shared affiliate click database in-memory for live demo reporting
const affiliateClicks: Array<{
  id: string;
  clickId?: string;
  userId: string;
  campaign?: string;
  provider: string; // e.g. baolau, 12go, traveloka, trip, vexere, agoda, klook
  serviceType?: string; // train_ticket, transport, hotel_flight, bus_ticket
  route?: string; // e.g. Hà Nội ➔ Huế
  source?: string;
  targetUrl: string;
  referrer?: string;
  device?: string;
  platform?: string;
  country: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  affiliateIdUsed?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType?: string;
  createdAt: string;
}> = [
  {
    id: "clk-1",
    userId: "guest",
    provider: "baolau",
    serviceType: "train_ticket",
    route: "Hà Nội ➔ Huế",
    targetUrl: "https://www.baolau.com/vi/transportation/vietnam/trains?source=vnrailway",
    affiliateIdUsed: "vnrailway",
    utmSource: "tiktok",
    utmMedium: "bio",
    utmCampaign: "heritage_hue",
    deviceType: "Mobile (iPhone/TikTok Browser)",
    country: "Vietnam",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45m ago
  },
  {
    id: "clk-2",
    userId: "lead-1",
    provider: "agoda",
    serviceType: "hotel_flight",
    route: "Đà Nẵng ➔ Hội An",
    targetUrl: "https://website.beacons.ai/vnrailway",
    affiliateIdUsed: "vnrailway",
    utmSource: "tiktok",
    utmMedium: "bio",
    utmCampaign: "sapa_fansipan_luxury",
    deviceType: "Mobile (Android/TikTok Browser)",
    country: "Vietnam",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hrs ago
  },
  {
    id: "clk-3",
    userId: "guest",
    provider: "klook",
    serviceType: "transport",
    route: "Hà Nội ➔ Sa Pa",
    targetUrl: "https://12go.asia/en?z=15761336",
    affiliateIdUsed: "15761336",
    utmSource: "facebook",
    utmMedium: "group",
    utmCampaign: "danang_jeep_hailvan",
    deviceType: "Desktop (Windows/Chrome)",
    country: "USA",
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hrs ago
  }
];

// API endpoint to submit a lead / join community



// API endpoint to track affiliate click conversions
app.post("/api/clicks", (req, res) => {
  const { 
    clickId, 
    userId, 
    campaign, 
    provider, 
    serviceType,
    route,
    source,
    targetUrl, 
    referrer, 
    device, 
    platform, 
    country, 
    utm_source, 
    utm_medium, 
    utm_campaign 
  } = req.body;
  
  if (!provider || !targetUrl) {
    return res.status(400).json({ error: "Provider and target URL are required" });
  }

  const newClick = {
    id: clickId || `clk-${Date.now()}`,
    clickId: clickId || `clk-${Date.now()}`,
    userId: userId || "guest",
    campaign: campaign || "none",
    provider,
    serviceType: serviceType || "transport",
    route: route || "Hà Nội ➔ Đà Nẵng",
    source: source || utm_source || "none",
    targetUrl,
    referrer: referrer || "Direct",
    device: device || "Desktop",
    platform: platform || "Unknown",
    country: country || "Vietnam",
    utm_source: utm_source || source || "none",
    utm_medium: utm_medium || "none",
    utm_campaign: utm_campaign || campaign || "none",
    createdAt: new Date().toISOString()
  };

  affiliateClicks.unshift(newClick); // Newer clicks first
  res.status(201).json({ success: true, click: newClick });
});

// API endpoint to fetch all affiliate click logs
app.get("/api/clicks", (req, res) => {
  res.json({ clicks: affiliateClicks });
});

// API endpoint to generate high-quality AI travel railway itinerary in Vietnam
app.post("/api/itinerary", async (req, res) => {
  try {
    const { departure, arrival, daysCount, budgetLevel, travelStyle, companion } = req.body;

    if (!departure || !arrival) {
      return res.status(400).json({ error: "Điểm khởi hành và điểm đến không được để trống." });
    }

    const duration = daysCount || 3;
    const budget = budgetLevel || "Tiết kiệm";
    const style = travelStyle || "Trải nghiệm văn hóa";
    const companionText = companion || "Một mình";

    const prompt = `Lập lịch trình du lịch đường sắt Việt Nam bằng tiếng Việt chi tiết từ ${departure} đi ${arrival} trong vòng ${duration} ngày.
Yêu cầu cụ thể:
- Phong cách du lịch: ${style}
- Ngân sách lý tính: ${budget}
- Bạn đồng hành: ${companionText}

Lịch trình phải tập trung tuyệt đối vào trải nghiệm di chuyển bằng tàu hỏa (bao gồm thông tin mã tàu thực tế của Đường sắt Việt Nam như SE1, SE2, SE3, SE4, SE19, SE20, Tàu kết nối di sản HD1/HD2, Tàu Trực tiếp kết nối di sản du lịch, v.v.), đề xuất khách sạn thực tế có liên kết đối tác, và các hoạt động tour địa phương.`;

    const systemInstruction = `Bạn là chuyên gia thiết kế hành trình du lịch đường sắt cao cấp của Đường sắt Việt Nam (Vietnam Railways). 
Nhiệm vụ của bạn là lập lịch trình du lịch chân thực, định dạng JSON chính xác. Các đề xuất phải sử dụng thông tin ga tàu, mã tàu thực tế, danh lam thắng cảnh và có tính thực tế cao nhất.`;

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Tiêu đề hấp dẫn cho hành trình du lịch đường sắt di sản.",
            },
            summary: {
              type: Type.STRING,
              description: "Tóm tắt ngắn gọn trải nghiệm và lý do tại sao chuyến đi này tuyệt vời.",
            },
            totalEstimatedCostVnd: {
              type: Type.INTEGER,
              description: "Tổng chi phí ước tính trung bình cho cả chuyến đi bằng đồng Việt Nam (VND).",
            },
            days: {
              type: Type.ARRAY,
              description: "Danh sách lịch trình từng ngày của chuyến đi.",
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING, description: "Tiêu đề của ngày đó (ví dụ: 'Ngày 1: Vượt đèo Hải Vân hùng vĩ - Đến cố đô')" },
                  description: { type: Type.STRING, description: "Mô tả tổng quát hoạt động, nhịp điệu của ngày." },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING, description: "Thời gian (ví dụ: '08:00' hoặc 'Buổi chiều')" },
                        title: { type: Type.STRING },
                        location: { type: Type.STRING },
                        details: { type: Type.STRING, description: "Chi tiết hấp dẫn, tập trung vào mẹo ngắm cảnh đường tàu hoặc trải nghiệm." },
                        costEstimateVnd: { type: Type.INTEGER, description: "Chi phí ước tính cá nhân bằng VND." },
                      },
                      required: ["time", "title", "details"],
                    },
                  },
                  recommendedTrains: {
                    type: Type.ARRAY,
                    description: "Các mác tàu Đường sắt Việt Nam khuyên dùng cho chặng của ngày này.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        trainCode: { type: Type.STRING, description: "Mã tàu thực tế ví dụ SE3, HD2, v.v." },
                        departure: { type: Type.STRING },
                        arrival: { type: Type.STRING },
                        timeRange: { type: Type.STRING, description: "Khung giờ chạy thực tế ước lượng, ví dụ '08:00 - 11:30'" },
                        seatTypeRecommended: { type: Type.STRING, description: "Khuyên dùng ví dụ: Ghế mềm điều hòa, Khoang 4 giường nằm cao cấp" },
                        estimatedPriceVnd: { type: Type.INTEGER },
                        bookingAffiliate: { type: Type.STRING, description: "Kênh đối tác: Baolau hoặc 12Go" },
                      },
                      required: ["trainCode", "departure", "arrival", "timeRange"],
                    },
                  },
                },
                required: ["dayNumber", "title", "description", "activities"],
              },
            },
            recommendedHotels: {
              type: Type.ARRAY,
              description: "Các khách sạn thực tế tại điểm đến nên đặt, có thể kiếm hoa hồng liên kết.",
              items: {
                type: Type.OBJECT,
                properties: {
                  hotelName: { type: Type.STRING },
                  location: { type: Type.STRING },
                  starRating: { type: Type.INTEGER },
                  pricePerNightVnd: { type: Type.INTEGER },
                  whyRecommended: { type: Type.STRING, description: "Lý do lựa chọn, ưu điểm vị trí gần ga tàu hoặc tiện ích." },
                },
                required: ["hotelName", "location", "pricePerNightVnd", "whyRecommended"],
              },
            },
            recommendedTours: {
              type: Type.ARRAY,
              description: "Các tour trải nghiệm địa phương của đối tác liên kết.",
              items: {
                type: Type.OBJECT,
                properties: {
                  tourName: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  highlights: { type: Type.STRING },
                  priceVnd: { type: Type.INTEGER },
                  platform: { type: Type.STRING, description: "Klook hoặc VNR Local Tour Partner" },
                },
                required: ["tourName", "highlights", "priceVnd"],
              },
            },
            survivalTips: {
              type: Type.ARRAY,
              description: "Lời khuyên 'sống sót' khi đi tàu tại Việt Nam (chuẩn bị đồ ăn, vệ sinh, sạc pin, vị trí ngồi đẹp nhất trên cung đường núi/biển).",
              items: { type: Type.STRING },
            },
          },
          required: ["title", "summary", "totalEstimatedCostVnd", "days", "recommendedHotels", "recommendedTours", "survivalTips"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({
      error: "Không thể tạo lịch trình bằng AI. Vui lòng kiểm tra lại cấu hình API Key.",
      details: error.message,
    });
  }
});

// API endpoint for interactive AI Railway Travel Assistant chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAiClient();
    
    // Format conversation history for Gemini
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const systemInstruction = `Bạn là "Đại sứ Đường sắt VNR" - trợ lý AI cao cấp thông thái của VNR Travel AI. 
Nhiệm vụ của bạn là hỗ trợ, giải đáp mọi thắc mắc của hành khách về hành trình du lịch đường sắt di sản Việt Nam (từ các mác tàu cao cấp SE1/SE2/SE19/SE20, tàu di sản Kết nối di sản miền Trung HD1/HD2, đến các ga tàu cổ kính như Ga Hà Nội, Ga Hải Phòng, Ga Huế, Ga Đà Nẵng, Ga Đà Lạt).
Hãy đưa ra những gợi ý hữu ích nhất về:
- Các mác tàu, giờ chạy, cách đặt vé qua các đại lý uy tín (Baolau, 12go).
- Các món ăn ngon đặc sản xung quanh ga tàu (Bánh mì cay Hải Phòng, Bánh bột lọc ga Huế, Mì Quảng ga Đà Nẵng, v.v.).
- Các điểm lưu trú, homestay phong cách Indochine gần ga.
- Mẹo ngắm cảnh tuyệt hảo (ví dụ: ngồi bên trái khi đi từ Huế vào Đà Nẵng qua đèo Hải Vân để ôm trọn cảnh biển Lăng Cô kỳ vĩ).

Giao tiếp bằng giọng văn lịch sự, tinh tế, sang trọng, giàu cảm xúc di sản nhưng ngắn gọn, súc tích (dưới 150 từ mỗi câu trả lời) để phù hợp với màn hình chatbot di động. Tránh các thông tin kỹ thuật rườm rà.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500
      }
    });

    res.json({ text: result.text || "Tôi có thể giúp gì thêm cho chuyến hành trình di sản của bạn?" });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({
      error: "Không thể kết nối với Trợ lý AI lúc này.",
      details: error.message
    });
  }
});

// Configure Vite or Static delivery
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[VNR Travel AI Server] running on http://localhost:${PORT}`);
  });
}

startServer();
