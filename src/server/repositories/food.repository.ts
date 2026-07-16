import fs from "fs";
import path from "path";

export interface FoodData {

    city: string;

    breakfast: string;

    lunch: string;

    dinner: string;

    coffee: string;

    specialties: string[];

}

export class FoodRepository {

    private foods: FoodData[];

    constructor() {

        const filePath = path.join(
            process.cwd(),
            "src/server/planning/data/foods.json"
        );

        const json = fs.readFileSync(
            filePath,
            "utf8"
        );

        this.foods = JSON.parse(json);

    }

    findByCity(
        city: string
    ): FoodData | undefined {

        return this.foods.find(
            food => food.city === city
        );

    }

    getAll(): FoodData[] {

        return this.foods;

    }

}