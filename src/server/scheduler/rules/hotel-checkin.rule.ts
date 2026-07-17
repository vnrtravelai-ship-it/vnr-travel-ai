import { PlanningContext } from "../../planning/models/planning-context.model";
import { ScheduleSlot } from "../models/schedule-slot.model";

export class HotelCheckinRule {

    apply(
        context: PlanningContext,
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        const hotel =
            context.hotel?.selectedHotel ??
            context.hotel?.recommendedHotels?.[0];

        if (!hotel) {

            return schedule;

        }

        schedule.push({

            id: "hotel-checkin",

            day: 1,

            type: "HOTEL",

            title: `Check-in ${hotel.name}`,

            description: hotel.address,

            startTime: "14:00",

            endTime: "15:00",

            durationMinutes: 60,

            location: hotel.address,

            latitude: hotel.latitude,

            longitude: hotel.longitude,

            estimatedCost: hotel.priceFrom,

            order: 2,

            locked: true,

            metadata: {

                hotelId: hotel.id,

                stars: hotel.stars,

                affiliateProvider:
                    hotel.affiliateProvider,

                affiliateUrl:
                    hotel.affiliateUrl

            }

        });

        return schedule;

    }

}