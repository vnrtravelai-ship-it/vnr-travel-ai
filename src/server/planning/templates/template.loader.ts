import { PlanningTemplate } from "./template.types";

export class TemplateLoader {

    private static instance: TemplateLoader;

    private templates: PlanningTemplate[] = [];

    private constructor() {

        this.templates = this.loadTemplates();

    }

    static getInstance(): TemplateLoader {

        if (!TemplateLoader.instance) {

            TemplateLoader.instance =
                new TemplateLoader();

        }

        return TemplateLoader.instance;

    }

    getTemplates(): PlanningTemplate[] {

        return this.templates;

    }

    private loadTemplates(): PlanningTemplate[] {

        /*
         * GIỮ NGUYÊN toàn bộ code hiện tại của bạn
         * đang đọc file JSON tại đây.
         *
         * Chỉ đổi:
         *
         * load()
         *
         * thành
         *
         * loadTemplates()
         */

        return [];

    }

}