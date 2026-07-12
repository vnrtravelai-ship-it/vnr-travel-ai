export interface AffiliateClick {
  id: string;
  clickId?: string;
  userId: string;
  campaign?: string;
  provider: string;
  serviceType?: string;
  route?: string;
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
}

const affiliateClicks: AffiliateClick[] = [
  {
    id: "clk-1",
    userId: "guest",
    provider: "baolau",
    serviceType: "train_ticket",
    route: "Hà Nội ➔ Huế",
    targetUrl:
      "https://www.baolau.com/vi/transportation/vietnam/trains?source=vnrailway",
    affiliateIdUsed: "vnrailway",
    utmSource: "tiktok",
    utmMedium: "bio",
    utmCampaign: "heritage_hue",
    deviceType: "Mobile (iPhone/TikTok Browser)",
    country: "Vietnam",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
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
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
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
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
];

export function getAllClicks(): AffiliateClick[] {
  return affiliateClicks;
}

export function addClick(click: AffiliateClick): AffiliateClick {
  affiliateClicks.unshift(click);
  return click;
}