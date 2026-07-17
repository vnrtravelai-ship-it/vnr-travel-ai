import { PlanningContext } from "../../planning/models/planning-context.model";
import { ScheduleSlot } from "../models/schedule-slot.model";

export class TrainArrivalRule {

    apply(
        context: PlanningContext,
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        if (!context.railway) {

            return schedule;

        }

        schedule.push({

            id: "train-arrival",

            day: 1,

            type: "TRAIN",

            title: `${context.railway.trainCode}`,

            description:
                `${context.railway.departureStation} → ${context.railway.arrivalStation}`,

            startTime:
                context.railway.arrivalTime,

            endTime:
                context.railway.arrivalTime,

            durationMinutes: 0,

            location:
                context.railway.arrivalStation,

            estimatedCost:
                context.railway.estimatedPrice,

            order: 1,

            locked: true,

            metadata: {

                trainCode:
                    context.railway.trainCode,

                departureStation:
                    context.railway.departureStation,

                arrivalStation:
                    context.railway.arrivalStation,

                distanceKm:
                    context.railway.distanceKm,

                duration:
                    context.railway.duration

            }

        });

        return schedule;

    }

}