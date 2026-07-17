import { PlanningContext }
from "../../planning/models/planning-context.model";

import { ScheduleSlot }
from "../models/schedule-slot.model";

export class HotelCheckinRule {

    apply(

        context: PlanningContext,

        schedule: ScheduleSlot[]

    ): ScheduleSlot[] {

        if (!context.hotel) {

            return schedule;

        }

        const hotel =
            context.hotel.selectedHotel ??
            context.hotel.recommendedHotels[0];

        if (!hotel) {

            return schedule;

        }

        // =====================================
        // Default Check-in
        // =====================================

        let checkinTime = "14:00";

        // =====================================
        // Train Arrival
        // =====================================

        const arrival =
            context.railway?.arrivalTime;

        if (arrival) {

            const hour =
                Number(arrival.split(":")[0]);

            // nếu tàu đến sau 14h
            // check-in ngay sau khi đến

            if (hour >= 14) {

                checkinTime =
                    arrival;

            }

        }

        schedule.push({

            id: "hotel-checkin",

            day: 1,

            type: "HOTEL",

            title:
                `Nhận phòng ${hotel.name}`,

            description:
                `${hotel.address}`,

            startTime:
                checkinTime,

            endTime:
                checkinTime,

            durationMinutes: 30,

            location:
                hotel.address,

            latitude:
                hotel.latitude,

            longitude:
                hotel.longitude,

            estimatedCost:
                hotel.priceFrom,

            order: 2,

            locked: true,

            metadata: {

                hotelId:
                    hotel.id,

                hotelName:
                    hotel.name,

                stars:
                    hotel.stars,

                affiliateProvider:
                    hotel.affiliateProvider,

                affiliateUrl:
                    hotel.affiliateUrl

            }

        });

        return schedule;

    }

}