export interface Activity {

    startTime: string;

    endTime: string;

    title: string;

    description: string;

    category:
        | "railway"
        | "hotel"
        | "food"
        | "tour"
        | "transport"
        | "free";

    location?: string;

    estimatedCost?: number;

}