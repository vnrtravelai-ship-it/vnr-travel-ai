import { PlanningContext }
from "../../planning/models/planning-context.model";

import { ScheduleSlot }
from "../models/schedule-slot.model";

export class TrainArrivalRule {

    apply(

        context: PlanningContext,

        schedule: ScheduleSlot[]

    ): ScheduleSlot[] {

        if (!context.railway) {

            return schedule;

        }

        const railway =
            context.railway;

        const arrivalTime =
            railway.arrivalTime;

        schedule.push({

            id: "train-arrival",

            day: 1,

            type: "TRAIN",

            title:
                `Đến ga ${railway.arrivalStation}`,

            description:

                `${railway.trainCode}: ${railway.departureStation} → ${railway.arrivalStation}`,

            startTime:
                arrivalTime,

            endTime:
                arrivalTime,

            durationMinutes: 0,

            location:
                railway.arrivalStation,

            estimatedCost:
                railway.estimatedPrice,

            order: 1,

            locked: true,

            metadata: {

                trainCode:
                    railway.trainCode,

                departureStation:
                    railway.departureStation,

                arrivalStation:
                    railway.arrivalStation,

                departureTime:
                    railway.departureTime,

                arrivalTime:
                    railway.arrivalTime,

                seatType:
                    railway.seatType,

                distanceKm:
                    railway.distanceKm,

                duration:
                    railway.duration

            }

        });

        return schedule;

    }

}