/* ============================================================
 * VNR Travel AI
 * Food Data Source
 * ------------------------------------------------------------
 * Single source of truth for food JSON data.
 * Sprint 5.2
 * ============================================================
 */

import fs from "fs";
import path from "path";

import {
    FoodPlan
} from "../planning/models/planning-context.model";

export class FoodDataSource {

    private static instance: FoodDataSource;

    private foods: FoodPlan[] = [];

    private constructor() {

        this.foods = this.loadFoods();

    }

    static getInstance(): FoodDataSource {

        if (!FoodDataSource.instance) {

            FoodDataSource.instance =
                new FoodDataSource();

        }

        return FoodDataSource.instance;

    }

    /**
     * Đọc dữ liệu từ foods.json
     */
    private loadFoods(): FoodPlan[] {

        try {

            const filePath =
                path.join(

                    process.cwd(),

                    "src/server/planning/data/foods.json"

                );

            if (!fs.existsSync(filePath)) {

                console.warn(
                    "[FoodDataSource] foods.json not found."
                );

                return [];

            }

            const json =
                fs.readFileSync(

                    filePath,

                    "utf8"

                );

            return JSON.parse(json) as FoodPlan[];

        }

        catch (error) {

            console.error(
                "[FoodDataSource] Failed to load foods:",
                error
            );

            return [];

        }

    }

    /**
     * Toàn bộ dữ liệu.
     */
    getAll(): FoodPlan[] {

        return this.foods;

    }

    /**
     * Reload dữ liệu.
     */
    reload(): void {

        this.foods = this.loadFoods();

    }

}