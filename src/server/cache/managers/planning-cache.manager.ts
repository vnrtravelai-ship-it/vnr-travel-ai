import { PlanningContext } from "../../planning/models/planning-context.model";
import { PlanningRequest } from "../../planning/models/planning-request.model";

import { PlanningCache } from "../planning.cache";

import { buildPlanningSignature }
from "../../planning/utils/planning-signature";

export class PlanningCacheManager {

    private cache =
        PlanningCache.getInstance();

    get(
        request: PlanningRequest
    ): PlanningContext | undefined {

        const key =
            buildPlanningSignature(request);

        return this.cache.get<PlanningContext>(key);

    }

    save(
        request: PlanningRequest,
        context: PlanningContext
    ) {

        const key =
            buildPlanningSignature(request);

        this.cache.set(
            key,
            context
        );

    }

    clear() {

        this.cache.clear();

    }

}