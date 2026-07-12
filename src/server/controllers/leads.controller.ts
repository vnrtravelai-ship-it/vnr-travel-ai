import { Request, Response } from "express";
import { addLead, getAllLeads } from "../services/leads.service";

export function getLeads(req: Request, res: Response) {
  res.json({
    leads: getAllLeads(),
  });
}

export function createLead(req: Request, res: Response) {
  const {
    fullName,
    email,
    phoneNumber,
    travelFrequency,
    preferredRegions,
    notes,
  } = req.body;

  if (!fullName || !email || !phoneNumber) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  const lead = addLead({
    fullName,
    email,
    phoneNumber,
    travelFrequency: travelFrequency || "Thỉnh thoảng",
    preferredRegions: preferredRegions || [],
    notes,
  });

  res.status(201).json({
    success: true,
    lead,
  });
}