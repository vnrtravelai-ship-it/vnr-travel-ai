/* ============================================================
 * VNR Travel AI
 * Template Data Source
 * ------------------------------------------------------------
 * Single source of truth for Planning Templates.
 * Sprint 5.2
 * ============================================================
 */

import {
    PlanningTemplate
}
from "../planning/templates/template.types";

import {
    planningTemplates
}
from "../planning/templates/template.index";

export class TemplateDataSource {

    private static instance: TemplateDataSource;

    private readonly templates: PlanningTemplate[];

    private constructor() {

        this.templates = planningTemplates;

    }

    static getInstance(): TemplateDataSource {

        if (!TemplateDataSource.instance) {

            TemplateDataSource.instance =
                new TemplateDataSource();

        }

        return TemplateDataSource.instance;

    }

    /**
     * Toàn bộ template.
     */
    getAll(): PlanningTemplate[] {

        return this.templates;

    }

    /**
     * Tìm theo id.
     */
    findById(
        id: string
    ): PlanningTemplate | undefined {

        return this.templates.find(

            template =>

                template.id === id

        );

    }

    /**
     * Tìm template phù hợp request.
     */
    findTemplate(

        departure: string,

        destination: string,

        days: number,

        budgetLevel: string,

        travelStyle: string

    ): PlanningTemplate | undefined {

        return this.templates.find(

            template =>

                template.departure === departure &&

                template.destination === destination &&

                template.days === days &&

                template.budgetLevel === budgetLevel &&

                String(template.travelStyle) ===
                travelStyle

        );

    }

}