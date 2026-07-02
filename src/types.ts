export interface Activity {
  time: string;
  title: string;
  location?: string;
  details: string;
  costEstimateVnd?: number;
}

export interface RecommendedTrain {
  trainCode: string;
  departure: string;
  arrival: string;
  timeRange: string;
  seatTypeRecommended: string;
  estimatedPriceVnd: number;
  bookingAffiliate: string;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  description: string;
  activities: Activity[];
  recommendedTrains?: RecommendedTrain[];
}

export interface RecommendedHotel {
  hotelName: string;
  location: string;
  starRating: number;
  pricePerNightVnd: number;
  whyRecommended: string;
}

export interface RecommendedTour {
  tourName: string;
  duration: string;
  highlights: string;
  priceVnd: number;
  platform: string;
}

export interface ItineraryResult {
  itineraryId?: string;
  departure?: string;
  arrival?: string;
  destination?: string;
  daysCount?: number;
  title: string;
  summary: string;
  totalEstimatedCostVnd: number;
  days: DayPlan[];
  recommendedHotels: RecommendedHotel[];
  recommendedTours: RecommendedTour[];
  survivalTips: Array<string>;
  departureDate?: string;
  passengers?: string;
  status?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  travelFrequency: string;
  preferredRegions: string[];
  notes?: string;
  createdAt: string;
}
