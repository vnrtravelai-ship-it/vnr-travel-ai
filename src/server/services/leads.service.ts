export interface CommunityLead {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  travelFrequency: string;
  preferredRegions: string[];
  notes?: string;
  createdAt: string;
}

const communityLeads: CommunityLead[] = [
  {
    id: "lead-1",
    fullName: "Nguyễn Văn Hùng",
    email: "hung.nv@gmail.com",
    phoneNumber: "0912345678",
    travelFrequency: "Thường xuyên (Hàng tháng)",
    preferredRegions: ["Miền Trung", "Miền Bắc"],
    notes: "Rất thích cung đường tàu di sản Huế - Đà Nẵng",
    createdAt: new Date().toISOString(),
  },
];

export function getAllLeads(): CommunityLead[] {
  return communityLeads;
}

export function addLead(
  lead: Omit<CommunityLead, "id" | "createdAt">
): CommunityLead {
  const newLead: CommunityLead = {
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...lead,
  };

  communityLeads.push(newLead);

  return newLead;
}