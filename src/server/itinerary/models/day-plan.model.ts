import { Activity }
from "./activity.model";

export interface DayPlan {

    /**
     * Thứ tự ngày trong hành trình.
     */
    day: number;

    /**
     * Tiêu đề của ngày.
     */
    title: string;

    /**
     * Danh sách hoạt động trong ngày.
     */
    activities: Activity[];

}