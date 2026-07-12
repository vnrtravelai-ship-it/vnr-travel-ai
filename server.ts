import express from "express";
import path from "path";
import dotenv from "dotenv";
import { Type } from "@google/genai";
import { getAiClient } from "./src/server/providers/gemini.provider";
import leadsRoutes from "./src/server/routes/leads.routes";
import clicksRoutes from "./src/server/routes/clicks.routes";
import itineraryRoutes from "./src/server/routes/itinerary.routes";
dotenv.config();
console.log(process.env.GEMINI_API_KEY);
const app = express();
app.use(express.json());
app.use("/api/itinerary", itineraryRoutes);
app.use("/api", leadsRoutes);
app.use("/api", clicksRoutes);
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
