import { PlanningContext } from "../planning/models/planning-context.model";

import { ScheduleSlot } from "./models/schedule-slot.model";

import { TrainArrivalRule } from "./rules/train-arrival.rule";

import { HotelCheckinRule } from "./rules/hotel-checkin.rule";

import { MealRule } from "./rules/meal.rule";

import { OpenHourRule } from "./rules/open-hour.rule";

import { DistanceRule } from "./rules/distance.rule";

export class SchedulerEngine {

    private readonly trainRule =
        new TrainArrivalRule();

    private readonly hotelRule =
        new HotelCheckinRule();

    private readonly mealRule =
        new MealRule();

    private readonly openHourRule =
        new OpenHourRule();

    private readonly distanceRule =
        new DistanceRule();

    build(
        context: PlanningContext
    ): ScheduleSlot[] {

        const numberOfDays =
            Math.max(
                1,
                Math.floor(
                    context.request.numberOfDays || 1
                )
            );

        let schedule: ScheduleSlot[] = [];

        /*
         * =====================================
         * 1. TRAIN
         * =====================================
         */

        schedule =
            this.trainRule.apply(
                context,
                schedule
            );

        /*
         * =====================================
         * 2. HOTEL
         * =====================================
         */

        schedule =
            this.hotelRule.apply(
                context,
                schedule
            );

        /*
         * =====================================
         * 3. MEALS
         *
         * MealRule is the source of meal slots.
         * Do not blindly duplicate them.
         * =====================================
         */

        const meals =
            this.prepareMeals(
                this.mealRule.apply(
                    context,
                    []
                ),
                numberOfDays
            );

        schedule.push(
            ...meals
        );

        /*
         * =====================================
         * 4. TOURS
         * =====================================
         */

        const tours =
            this.openHourRule.apply(
                context,
                []
            );

        schedule.push(
            ...this.distributeTours(
                tours,
                schedule,
                numberOfDays
            )
        );

        /*
         * =====================================
         * 5. REMOVE DUPLICATES
         * =====================================
         */

        schedule =
            this.removeDuplicates(
                schedule
            );

        /*
         * =====================================
         * 6. NORMALIZE
         * =====================================
         */

        schedule =
            this.rebuildOrders(
                schedule
            );

        /*
         * =====================================
         * 7. DISTANCE
         * =====================================
         */

        schedule =
            this.optimizeByDay(
                schedule
            );

        /*
         * =====================================
         * 8. FINAL NORMALIZATION
         * =====================================
         */

        return this.rebuildOrders(
            this.removeDuplicates(
                schedule
            )
        );
    }

    // =====================================
    // MEALS
    // =====================================

    private prepareMeals(
        meals: ScheduleSlot[],
        numberOfDays: number
    ): ScheduleSlot[] {

        if (meals.length === 0) {
            return [];
        }

        /*
         * Remove duplicate meal records first.
         */

        const uniqueMeals =
            this.removeDuplicates(
                meals
            );

        /*
         * Check whether MealRule already
         * generated multiple days.
         */

        const days =
            new Set(
                uniqueMeals.map(
                    meal => meal.day
                )
            );

        /*
         * If MealRule already generated
         * one record for each day,
         * preserve that result.
         */

        if (
            days.size > 1 ||
            uniqueMeals.some(
                meal =>
                    meal.day > 1
            )
        ) {

            return uniqueMeals
                .filter(
                    meal =>
                        meal.day >= 1 &&
                        meal.day <= numberOfDays
                )
                .map(
                    meal => ({
                        ...meal,

                        locked: false,

                        metadata: {

                            ...(meal.metadata ?? {}),

                            generatedDay:
                                meal.day

                        }

                    })
                );
        }

        /*
         * Otherwise MealRule generated
         * day 1 only.
         *
         * Then distribute one copy per day.
         */

        const result: ScheduleSlot[] = [];

        for (
            let day = 1;
            day <= numberOfDays;
            day++
        ) {

            for (const meal of uniqueMeals) {

                result.push({

                    ...meal,

                    id:
                        `${meal.id}-day-${day}`,

                    day,

                    locked: false,

                    metadata: {

                        ...(meal.metadata ?? {}),

                        sourceMealId:
                            meal.id,

                        generatedDay:
                            day

                    }

                });
            }
        }

        return result;
    }

    // =====================================
    // TOURS
    // =====================================

    private distributeTours(
        tours: ScheduleSlot[],
        existingSchedule: ScheduleSlot[],
        numberOfDays: number
    ): ScheduleSlot[] {

        if (tours.length === 0) {
            return [];
        }

        const result: ScheduleSlot[] = [];

        for (const tour of tours) {

            let placed = false;

            for (
                let day = 1;
                day <= numberOfDays;
                day++
            ) {

                const daySchedule = [

                    ...existingSchedule.filter(
                        slot =>
                            slot.day === day
                    ),

                    ...result.filter(
                        slot =>
                            slot.day === day
                    )

                ];

                const startTime =
                    this.findTourStart(
                        tour,
                        day,
                        daySchedule
                    );

                if (!startTime) {
                    continue;
                }

                const endTime =
                    this.addMinutes(
                        startTime,
                        tour.durationMinutes
                    );

                result.push({

                    ...tour,

                    id:
                        `${tour.id}-day-${day}`,

                    day,

                    startTime,

                    endTime,

                    order:
                        result.length + 1,

                    locked: false,

                    metadata: {

                        ...(tour.metadata ?? {}),

                        sourceTourId:
                            tour.id,

                        generatedDay:
                            day

                    }

                });

                placed = true;

                break;
            }

            /*
             * Do not force a tour outside
             * its opening hours.
             *
             * If there is no valid slot,
             * it remains unscheduled instead
             * of generating an invalid itinerary.
             */

            if (!placed) {

                console.warn(
                    `[SchedulerEngine] Unable to place tour: ${tour.title}`
                );
            }
        }

        return result;
    }

    // =====================================
    // FIND TOUR START
    // =====================================

    private findTourStart(
        tour: ScheduleSlot,
        day: number,
        daySchedule: ScheduleSlot[]
    ): string | undefined {

        let earliest =
            this.parseTime(
                tour.startTime
            );

        /*
         * Day 1 must wait until train arrival.
         */

        if (
            day === 1 &&
            tour.type === "TOUR"
        ) {

            const train =
                daySchedule.find(
                    slot =>
                        slot.type === "TRAIN" &&
                        slot.day === 1
                );

            if (train) {

                const arrival =
                    this.parseTime(
                        train.endTime
                    );

                earliest =
                    Math.max(
                        earliest,
                        arrival + 2
                    );
            }
        }

        /*
         * Respect meal / hotel / railway
         * activities already occupying time.
         */

        const duration =
            Math.max(
                1,
                tour.durationMinutes
            );

        /*
         * Read opening hours from metadata.
         */

        const openingHours =
            typeof tour.metadata?.openingHours === "string"
                ? tour.metadata.openingHours
                : "";

        const closingTime =
            this.getClosingTime(
                openingHours
            );

        const latestStart =
            Math.min(
                closingTime - duration,
                21 * 60 - duration
            );

        if (
            earliest >
            latestStart
        ) {

            return undefined;
        }

        /*
         * Try every 30 minutes.
         */

        for (
            let candidate = earliest;
            candidate <= latestStart;
            candidate += 30
        ) {

            const candidateEnd =
                candidate + duration;

            if (
                this.isSlotAvailable(
                    candidate,
                    candidateEnd,
                    daySchedule
                )
            ) {

                return this.formatTime(
                    candidate
                );
            }
        }

        return undefined;
    }

    // =====================================
    // OPENING HOURS
    // =====================================

    private getClosingTime(
        openingHours: string
    ): number {

        if (!openingHours) {
            return 18 * 60;
        }

        const match =
            openingHours.match(
                /(?:-|–|to)\s*(\d{1,2})(?::(\d{2}))?/
            );

        if (!match) {
            return 18 * 60;
        }

        const hour =
            Number(match[1]);

        const minute =
            Number(match[2] ?? "00");

        if (
            Number.isNaN(hour) ||
            Number.isNaN(minute) ||
            hour < 0 ||
            hour > 23 ||
            minute < 0 ||
            minute > 59
        ) {

            return 18 * 60;
        }

        return (
            hour * 60 +
            minute
        );
    }

    // =====================================
    // SLOT CHECK
    // =====================================

    private isSlotAvailable(
        start: number,
        end: number,
        schedule: ScheduleSlot[]
    ): boolean {

        for (const slot of schedule) {

            const slotStart =
                this.parseTime(
                    slot.startTime
                );

            const slotEnd =
                this.parseTime(
                    slot.endTime
                );

            if (
                end <= slotStart ||
                start >= slotEnd
            ) {

                continue;
            }

            return false;
        }

        return true;
    }

    // =====================================
    // REMOVE DUPLICATES
    // =====================================

    private removeDuplicates(
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        const seen =
            new Set<string>();

        const result: ScheduleSlot[] = [];

        for (const slot of schedule) {

            const key =
                [
                    slot.day,
                    slot.type,
                    slot.title,
                    slot.startTime,
                    slot.endTime
                ].join("|");

            if (seen.has(key)) {
                continue;
            }

            seen.add(key);

            result.push(slot);
        }

        return result;
    }

    // =====================================
    // REBUILD ORDERS
    // =====================================

    private rebuildOrders(
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        const grouped =
            new Map<number, ScheduleSlot[]>();

        for (const slot of schedule) {

            if (!grouped.has(slot.day)) {

                grouped.set(
                    slot.day,
                    []
                );
            }

            grouped
                .get(slot.day)!
                .push(slot);
        }

        const result: ScheduleSlot[] = [];

        const days =
            [...grouped.keys()]
                .sort(
                    (a, b) => a - b
                );

        for (const day of days) {

            const slots =
                grouped.get(day)!;

            slots.sort(
                (a, b) => {

                    const timeComparison =
                        a.startTime.localeCompare(
                            b.startTime
                        );

                    if (
                        timeComparison !== 0
                    ) {

                        return timeComparison;
                    }

                    if (
                        a.locked !==
                        b.locked
                    ) {

                        return a.locked
                            ? -1
                            : 1;
                    }

                    return a.order -
                        b.order;
                }
            );

            slots.forEach(
                (slot, index) => {

                    slot.order =
                        index + 1;
                }
            );

            result.push(
                ...slots
            );
        }

        return result;
    }

    // =====================================
    // DISTANCE OPTIMIZATION
    // =====================================

    private optimizeByDay(
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        const grouped =
            new Map<number, ScheduleSlot[]>();

        for (const slot of schedule) {

            if (!grouped.has(slot.day)) {

                grouped.set(
                    slot.day,
                    []
                );
            }

            grouped
                .get(slot.day)!
                .push(slot);
        }

        const result: ScheduleSlot[] = [];

        const days =
            [...grouped.keys()]
                .sort(
                    (a, b) => a - b
                );

        for (const day of days) {

            const slots =
                grouped.get(day)!;

            const optimized =
                this.distanceRule.optimize(
                    slots
                );

            result.push(
                ...optimized.map(
                    slot => ({
                        ...slot,
                        day
                    })
                )
            );
        }

        return result;
    }

    // =====================================
    // TIME
    // =====================================

    private parseTime(
        time: string
    ): number {

        const parts =
            time
                .split(":")
                .map(Number);

        const hour =
            Number.isNaN(parts[0])
                ? 0
                : parts[0];

        const minute =
            Number.isNaN(parts[1])
                ? 0
                : parts[1];

        return (
            hour * 60 +
            minute
        );
    }

    private addMinutes(
        time: string,
        minutes: number
    ): string {

        return this.formatTime(
            this.parseTime(time) +
            minutes
        );
    }

    private formatTime(
        totalMinutes: number
    ): string {

        const normalized =
            (
                totalMinutes %
                1440 +
                1440
            ) % 1440;

        const hour =
            Math.floor(
                normalized / 60
            );

        const minute =
            normalized % 60;

        return `${hour
            .toString()
            .padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
    }
}