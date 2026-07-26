import { PlanningContext } from "../models/planning-context.model";

export class PlanningRules {

    /**
     * Kiểm tra dữ liệu đầu vào tối thiểu
     */

    static validateContext(
        context: PlanningContext
    ): boolean {

        return !!(

            context.request &&

            context.request.departure &&

            context.request.destination

        );

    }

    /**
     * Kiểm tra đã có dữ liệu đường sắt
     */

    static hasRailway(
        context: PlanningContext
    ): boolean {

        return !!context.railway;

    }

    /**
     * Kiểm tra đã chọn khách sạn
     */

    static hasHotel(
        context: PlanningContext
    ): boolean {

        return !!context.hotel?.selectedHotel;

    }

    /**
     * Kiểm tra có lịch trình
     */

    static hasItinerary(
        context: PlanningContext
    ): boolean {

        return context.itinerary.length > 0;

    }

    /**
     * Kiểm tra có tour
     */

    static hasTours(
        context: PlanningContext
    ): boolean {

        return context.tours.length > 0;

    }

    /**
     * Kiểm tra có ngân sách
     */

    static hasBudget(
        context: PlanningContext
    ): boolean {

        return !!context.budget;

    }

    /**
     * Kiểm tra có Affiliate
     */

    static hasAffiliate(
        context: PlanningContext
    ): boolean {

        return !!context.affiliate;

    }

    /**
     * Planning Context hoàn chỉnh
     */

    static isCompleted(
        context: PlanningContext
    ): boolean {

        return (

            this.validateContext(context) &&

            this.hasRailway(context) &&

            this.hasHotel(context) &&

            this.hasItinerary(context) &&

            this.hasBudget(context)

        );

    }

}