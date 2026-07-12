import { Request, Response } from "express";
import { addClick, getAllClicks } from "../services/clicks.service";

export function getClicks(req: Request, res: Response) {
  res.json({
    clicks: getAllClicks(),
  });
}

export function createClick(req: Request, res: Response) {
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
    utm_campaign,
  } = req.body;

  if (!provider || !targetUrl) {
    return res.status(400).json({
      error: "Provider and target URL are required",
    });
  }

  const click = addClick({
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
    createdAt: new Date().toISOString(),
  });

  res.status(201).json({
    success: true,
    click,
  });
}