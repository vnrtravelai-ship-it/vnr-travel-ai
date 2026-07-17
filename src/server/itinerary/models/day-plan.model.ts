import { Activity } from "./activity.model";

export interface DayPlan {

    day: number;

    title: string;

    activities: Activity[];

}