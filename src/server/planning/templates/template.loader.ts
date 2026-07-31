import { existsSync, readFileSync } from "fs";
import { join } from "path";

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

        const candidates = [

            join(process.cwd(), "data", "planning-templates.json"),

            join(process.cwd(), "src", "server", "planning", "templates", "planning-templates.json")

        ];

        for (const file of candidates) {

            try {

                if (!existsSync(file)) {

                    continue;

                }

                const raw = readFileSync(file, "utf8");

                const json = JSON.parse(raw);

                if (Array.isArray(json)) {

                    return json as PlanningTemplate[];

                }

                if (Array.isArray(json.templates)) {

                    return json.templates as PlanningTemplate[];

                }

            }

            catch (error) {

                console.warn(

                    `[TemplateLoader] Cannot load template file: ${file}`,

                    error

                );

            }

        }

        return [];

    }

}