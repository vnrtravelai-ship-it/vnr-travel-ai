import { PlanningContext } from "../../planning/models/planning-context.model";
import { ScheduleSlot } from "../models/schedule-slot.model";

export class OpenHourRule {

    apply(
        context: PlanningContext,
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        let order =
            schedule.length + 1;

        for (const tour of context.tours) {

            schedule.push({

                id: `tour-${tour.id}`,

                day: 1,

                type: "TOUR",

                title: tour.name,

                description:
                    `${tour.category} • ${tour.openingHours}`,

                startTime:
                    this.suggestStartTime(tour),

                endTime:
                    this.suggestEndTime(tour),

                durationMinutes:
                    this.getDuration(tour.duration),

                location:
                    tour.address,

                latitude:
                    tour.latitude,

                longitude:
                    tour.longitude,

                estimatedCost:
                    tour.estimatedPrice,

                order: order++,

                locked: false,

                metadata: {

                    city: tour.city,

                    category: tour.category,

                    openingHours: tour.openingHours,

                    affiliateProvider:
                        tour.affiliateProvider,

                    affiliateUrl:
                        tour.affiliateUrl

                }

            });

        }

        return schedule;

    }

    private suggestStartTime(
        tour: PlanningContext["tours"][number]
    ): string {

        if (
            tour.openingHours.includes("08")
        ) {

            return "09:00";

        }

        if (
            tour.openingHours.includes("09")
        ) {

            return "10:00";

        }

        return "09:00";

    }

    private suggestEndTime(
        tour: PlanningContext["tours"][number]
    ): string {

        const duration =
            this.getDuration(tour.duration);

        const [h, m] =
            this.suggestStartTime(tour)
                .split(":")
                .map(Number);

        const total =
            h * 60 + m + duration;

        const hh =
            Math.floor(total / 60);

        const mm =
            total % 60;

        return `${hh.toString().padStart(2, "0")}:${mm
            .toString()
            .padStart(2, "0")}`;

    }

    private getDuration(
        duration: string
    ): number {

        const hours =
            Number.parseInt(duration);

        if (Number.isNaN(hours)) {

            return 120;

        }

        return hours * 60;

    }

}