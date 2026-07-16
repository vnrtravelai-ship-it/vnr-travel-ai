import fs from "fs";
import path from "path";

import { BaseProvider } from "../shared/base.provider";

import {
    RailwayRoute
} from "../../repositories/railway.repository";

export class RailwayProvider
    extends BaseProvider<RailwayRoute> {

    private routes: RailwayRoute[] = [];

    constructor() {

        super();

        const filePath =
            path.join(
                process.cwd(),
                "src/server/planning/data/railway-data.json"
            );

        const json =
            fs.readFileSync(
                filePath,
                "utf8"
            );

        this.routes =
            JSON.parse(json);

    }

    async load(): Promise<RailwayRoute[]> {

        return this.routes;

    }

    findRoute(

        departure: string,

        arrival: string

    ): RailwayRoute | undefined {

        return this.routes.find(route =>

            route.departure === departure &&

            route.arrival === arrival

        );

    }

}