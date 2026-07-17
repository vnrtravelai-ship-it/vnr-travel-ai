export type ScheduleType =

    | "TRAIN"

    | "HOTEL"

    | "BREAKFAST"

    | "LUNCH"

    | "DINNER"

    | "COFFEE"

    | "TOUR"

    | "TRANSPORT"

    | "FREE_TIME";

export interface ScheduleSlot {

    id: string;

    day: number;

    type: ScheduleType;

    title: string;

    description?: string;

    startTime: string;

    endTime: string;

    durationMinutes: number;

    location?: string;

    latitude?: number;

    longitude?: number;

    estimatedCost?: number;

    order: number;

    locked?: boolean;

    metadata?: Record<string, unknown>;

}