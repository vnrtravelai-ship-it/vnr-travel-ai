import { PlanningContext } from "../models/planning-context.model";

export class PlanningRules {

    static validateContext(
        context: PlanningContext
    ): boolean {

        return !!(

            context.request &&

            context.request.departure &&

            context.request.destination &&

            context.request.numberOfDays > 0

        );

    }

    static hasRailway(
        context: PlanningContext
    ): boolean {

        return !!context.railway;

    }

    static hasHotel(
        context: PlanningContext
    ): boolean {

        return !!context.hotel?.selectedHotel;

    }

    static hasFood(
        context: PlanningContext
    ): boolean {

        return !!context.food;

    }

    static hasTours(
        context: PlanningContext
    ): boolean {

        return context.tours.length > 0;

    }

    static hasItinerary(
        context: PlanningContext
    ): boolean {

        return context.itinerary.length > 0;

    }

    static hasBudget(
        context: PlanningContext
    ): boolean {

        return !!context.budget;

    }

    static hasAffiliate(
        context: PlanningContext
    ): boolean {

        return !!context.affiliate;

    }

    static hasMetadata(
        context: PlanningContext
    ): boolean {

        return !!(

            context.metadata &&

            context.metadata.locale &&

            context.metadata.currency

        );

    }

    static missingModules(
        context: PlanningContext
    ): string[] {

        const missing: string[] = [];

        if (!this.hasRailway(context))
            missing.push("railway");

        if (!this.hasHotel(context))
            missing.push("hotel");

        if (!this.hasFood(context))
            missing.push("food");

        if (!this.hasTours(context))
            missing.push("tours");

        if (!this.hasItinerary(context))
            missing.push("itinerary");

        if (!this.hasBudget(context))
            missing.push("budget");

        if (!this.hasMetadata(context))
            missing.push("metadata");

        return missing;

    }

    static isCompleted(
        context: PlanningContext
    ): boolean {

        return (

            this.validateContext(context) &&

            this.missingModules(context).length === 0

        );

    }

    static canContinueToAI(
        context: PlanningContext
    ): boolean {

        return this.isCompleted(context);

    }

}