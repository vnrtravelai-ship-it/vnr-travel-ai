import { PlanningContext } from "../../planning/models/planning-context.model";
import { ScheduleSlot } from "../models/schedule-slot.model";

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

        const arrival =
            context.railway?.arrivalTime;

        const checkinTime =
            this.resolveCheckinTime(arrival);

        const endTime =
            this.addMinutes(
                checkinTime,
                30
            );

        schedule.push({
            id: "hotel-checkin",
            day: 1,
            type: "HOTEL",
            title:
                `Nhận phòng ${hotel.name}`,
            description:
                hotel.address,
            startTime:
                checkinTime,
            endTime,
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

    private resolveCheckinTime(
        arrival?: string
    ): string {
        const defaultTime =
            "14:00";

        if (!arrival) {
            return defaultTime;
        }

        const parts =
            arrival.split(":");

        if (parts.length < 2) {
            return defaultTime;
        }

        const hour =
            Number(parts[0]);

        const minute =
            Number(parts[1]);

        if (
            Number.isNaN(hour) ||
            Number.isNaN(minute) ||
            hour < 0 ||
            hour > 23 ||
            minute < 0 ||
            minute > 59
        ) {
            return defaultTime;
        }

        if (hour >= 14) {
            return this.normalizeTime(
                hour,
                minute
            );
        }

        return defaultTime;
    }

    private addMinutes(
        time: string,
        minutes: number
    ): string {
        const parts =
            time.split(":");

        const hour =
            Number(parts[0]);

        const minute =
            Number(parts[1]);

        const total =
            hour * 60 +
            minute +
            minutes;

        const normalized =
            total % (24 * 60);

        const resultHour =
            Math.floor(
                normalized / 60
            );

        const resultMinute =
            normalized % 60;

        return this.normalizeTime(
            resultHour,
            resultMinute
        );
    }

    private normalizeTime(
        hour: number,
        minute: number
    ): string {
        return `${hour
            .toString()
            .padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
    }
}