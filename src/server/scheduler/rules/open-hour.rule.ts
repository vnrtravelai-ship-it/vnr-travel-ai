import { PlanningContext } from "../../planning/models/planning-context.model";

import { ScheduleSlot } from "../models/schedule-slot.model";

export class OpenHourRule {

    apply(
        context: PlanningContext,
        schedule: ScheduleSlot[]
    ): ScheduleSlot[] {

        const numberOfDays =
            Math.max(
                1,
                Math.floor(
                    context.request.numberOfDays || 1
                )
            );

        if (
            !context.tours ||
            context.tours.length === 0
        ) {
            return schedule;
        }

        const result: ScheduleSlot[] = [
            ...schedule
        ];

        const tours =
            [...context.tours]
                .sort(
                    (a, b) =>
                        this.getDuration(b.duration) -
                        this.getDuration(a.duration)
                );

        const tourCountByDay =
            new Map<number, number>();

        const tourMinutesByDay =
            new Map<number, number>();

        for (
            let day = 1;
            day <= numberOfDays;
            day++
        ) {
            tourCountByDay.set(day, 0);
            tourMinutesByDay.set(day, 0);
        }

        for (const tour of tours) {

            const durationMinutes =
                this.getDuration(
                    tour.duration
                );

            const placement =
                this.findBestPlacement(
                    tour,
                    durationMinutes,
                    result,
                    numberOfDays,
                    tourCountByDay,
                    tourMinutesByDay
                );

            if (!placement) {
                continue;
            }

            const order =
                result.filter(
                    slot =>
                        slot.day === placement.day
                ).length + 1;

            const slot: ScheduleSlot = {

                id:
                    `tour-${tour.id}`,

                day:
                    placement.day,

                type:
                    "TOUR",

                title:
                    tour.name,

                description:
                    `${tour.category} • ${tour.openingHours}`,

                startTime:
                    placement.startTime,

                endTime:
                    placement.endTime,

                durationMinutes,

                location:
                    tour.address,

                latitude:
                    tour.latitude,

                longitude:
                    tour.longitude,

                estimatedCost:
                    tour.estimatedPrice,

                order,

                locked:
                    false,

                metadata: {

                    city:
                        tour.city,

                    category:
                        tour.category,

                    openingHours:
                        tour.openingHours,

                    tags:
                        tour.tags,

                    affiliateProvider:
                        tour.affiliateProvider,

                    affiliateUrl:
                        tour.affiliateUrl,

                    generatedDay:
                        placement.day

                }

            };

            result.push(slot);

            tourCountByDay.set(
                placement.day,
                (
                    tourCountByDay.get(
                        placement.day
                    ) ?? 0
                ) + 1
            );

            tourMinutesByDay.set(
                placement.day,
                (
                    tourMinutesByDay.get(
                        placement.day
                    ) ?? 0
                ) + durationMinutes
            );
        }

        return result;
    }

    private findBestPlacement(
        tour: PlanningContext["tours"][number],
        durationMinutes: number,
        schedule: ScheduleSlot[],
        numberOfDays: number,
        tourCountByDay: Map<number, number>,
        tourMinutesByDay: Map<number, number>
    ): {
        day: number;
        startTime: string;
        endTime: string;
    } | undefined {

        const candidates: {
            day: number;
            startTime: string;
            endTime: string;
            score: number;
        }[] = [];

        const opening =
            this.parseOpeningHours(
                tour.openingHours
            );

        for (
            let day = 1;
            day <= numberOfDays;
            day++
        ) {

            const daySchedule =
                schedule.filter(
                    slot =>
                        slot.day === day
                );

            const windows =
                this.findFreeWindows(
                    daySchedule,
                    opening.start,
                    opening.end
                );

            for (const window of windows) {

                if (
                    window.endMinutes -
                    window.startMinutes <
                    durationMinutes
                ) {
                    continue;
                }

                const startMinutes =
                    this.alignStartTime(
                        window.startMinutes
                    );

                const endMinutes =
                    startMinutes +
                    durationMinutes;

                if (
                    endMinutes >
                    window.endMinutes
                ) {
                    continue;
                }

                const startTime =
                    this.minutesToTime(
                        startMinutes
                    );

                const endTime =
                    this.minutesToTime(
                        endMinutes
                    );

                const count =
                    tourCountByDay.get(day) ?? 0;

                const usedMinutes =
                    tourMinutesByDay.get(day) ?? 0;

                const distanceFromOpening =
                    Math.abs(
                        startMinutes -
                        opening.start
                    );

                const score =
                    count * 10000 +
                    usedMinutes * 10 +
                    distanceFromOpening +
                    day * 0.1;

                candidates.push({

                    day,

                    startTime,

                    endTime,

                    score

                });
            }
        }

        if (candidates.length === 0) {
            return undefined;
        }

        candidates.sort(
            (a, b) =>
                a.score - b.score
        );

        const best =
            candidates[0];

        return {

            day:
                best.day,

            startTime:
                best.startTime,

            endTime:
                best.endTime

        };
    }

    private findFreeWindows(
        schedule: ScheduleSlot[],
        openingStart: number,
        openingEnd: number
    ): {
        startMinutes: number;
        endMinutes: number;
    }[] {

        const occupied: {
            start: number;
            end: number;
        }[] = [];

        for (const slot of schedule) {

            const start =
                this.timeToMinutes(
                    slot.startTime
                );

            const end =
                this.timeToMinutes(
                    slot.endTime
                );

            /*
             * Important:
             *
             * A zero-duration slot such as
             * 10:28 -> 10:28 is still a
             * blocking point.
             *
             * We therefore add a 1-minute
             * blocking interval so a tour
             * cannot start before the event
             * has occurred.
             */
            if (start === end) {

                occupied.push({

                    start:
                        Math.max(
                            openingStart,
                            start
                        ),

                    end:
                        Math.min(
                            openingEnd,
                            start + 1
                        )

                });

                continue;
            }

            occupied.push({

                start:
                    Math.max(
                        openingStart,
                        start
                    ),

                end:
                    Math.min(
                        openingEnd,
                        end
                    )

            });
        }

        const validOccupied =
            occupied
                .filter(
                    interval =>
                        interval.end >
                        interval.start
                )
                .sort(
                    (a, b) =>
                        a.start -
                        b.start
                );

        const merged: {
            start: number;
            end: number;
        }[] = [];

        for (
            const interval
            of validOccupied
        ) {

            const previous =
                merged[
                    merged.length - 1
                ];

            if (
                previous &&
                interval.start <=
                previous.end
            ) {

                previous.end =
                    Math.max(
                        previous.end,
                        interval.end
                    );

            } else {

                merged.push({

                    start:
                        interval.start,

                    end:
                        interval.end

                });
            }
        }

        const windows: {
            startMinutes: number;
            endMinutes: number;
        }[] = [];

        let cursor =
            openingStart;

        for (const interval of merged) {

            if (
                interval.start >
                cursor
            ) {

                windows.push({

                    startMinutes:
                        cursor,

                    endMinutes:
                        interval.start

                });
            }

            cursor =
                Math.max(
                    cursor,
                    interval.end
                );

            if (
                cursor >=
                openingEnd
            ) {
                break;
            }
        }

        if (
            cursor <
            openingEnd
        ) {

            windows.push({

                startMinutes:
                    cursor,

                endMinutes:
                    openingEnd

            });
        }

        return windows;
    }

    private parseOpeningHours(
        openingHours?: string
    ): {
        start: number;
        end: number;
    } {

        const defaultStart =
            7 * 60;

        const defaultEnd =
            18 * 60;

        const value =
            (openingHours ?? "")
                .trim();

        const match =
            value.match(
                /(\d{1,2})(?::(\d{2}))?\s*[-–—]\s*(\d{1,2})(?::(\d{2}))?/
            );

        if (!match) {

            return {

                start:
                    defaultStart,

                end:
                    defaultEnd

            };
        }

        const startHour =
            Number(match[1]);

        const startMinute =
            Number(
                match[2] ?? "00"
            );

        const endHour =
            Number(match[3]);

        const endMinute =
            Number(
                match[4] ?? "00"
            );

        if (
            !this.isValidTime(
                startHour,
                startMinute
            ) ||
            !this.isValidTime(
                endHour,
                endMinute
            )
        ) {

            return {

                start:
                    defaultStart,

                end:
                    defaultEnd

            };
        }

        const start =
            startHour * 60 +
            startMinute;

        const end =
            endHour * 60 +
            endMinute;

        if (
            end <= start
        ) {

            return {

                start:
                    defaultStart,

                end:
                    defaultEnd

            };
        }

        return {

            start,

            end

        };
    }

    private getDuration(
        duration?: string
    ): number {

        const value =
            (duration ?? "")
                .trim()
                .toLowerCase();

        if (!value) {
            return 120;
        }

        const hourMatch =
            value.match(
                /(\d+(?:[.,]\d+)?)\s*(?:h|hr|hrs|hour|hours|giờ)/
            );

        const minuteMatch =
            value.match(
                /(\d+)\s*(?:m|min|mins|minute|minutes|phút)/
            );

        let totalMinutes = 0;

        if (hourMatch) {

            const hours =
                Number(
                    hourMatch[1]
                        .replace(",", ".")
                );

            if (
                !Number.isNaN(hours)
            ) {

                totalMinutes +=
                    Math.round(
                        hours * 60
                    );
            }
        }

        if (minuteMatch) {

            const minutes =
                Number(
                    minuteMatch[1]
                );

            if (
                !Number.isNaN(minutes)
            ) {

                totalMinutes +=
                    minutes;
            }
        }

        if (
            totalMinutes > 0
        ) {

            return totalMinutes;
        }

        const numeric =
            Number(value);

        if (
            !Number.isNaN(numeric) &&
            numeric > 0
        ) {

            return Math.round(
                numeric * 60
            );
        }

        return 120;
    }

    private alignStartTime(
        minutes: number
    ): number {

        const remainder =
            minutes % 30;

        if (
            remainder === 0
        ) {
            return minutes;
        }

        return (
            minutes +
            (
                30 -
                remainder
            )
        );
    }

    private timeToMinutes(
        time?: string
    ): number {

        if (!time) {
            return 0;
        }

        const parts =
            time.split(":");

        if (
            parts.length < 2
        ) {
            return 0;
        }

        const hour =
            Number(parts[0]);

        const minute =
            Number(parts[1]);

        if (
            !this.isValidTime(
                hour,
                minute
            )
        ) {
            return 0;
        }

        return (
            hour * 60 +
            minute
        );
    }

    private minutesToTime(
        minutes: number
    ): string {

        const normalized =
            (
                (
                    minutes %
                    1440
                ) +
                1440
            ) %
            1440;

        const hour =
            Math.floor(
                normalized / 60
            );

        const minute =
            normalized % 60;

        return this.normalizeTime(
            hour,
            minute
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

    private isValidTime(
        hour: number,
        minute: number
    ): boolean {

        return (
            Number.isInteger(hour) &&
            Number.isInteger(minute) &&
            hour >= 0 &&
            hour <= 23 &&
            minute >= 0 &&
            minute <= 59
        );
    }
}