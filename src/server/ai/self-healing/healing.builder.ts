import { RepairPayload }

    from "../../optimizer/repair/repair.types";

import {

    HealingRequest

}
    from "./healing.types";

/**
 * =====================================================
 * Healing Builder
 * Sprint 4.8
 * =====================================================
 */

export class HealingBuilder {

    build(

        rawResponse: string,

        errors: string[],

        repair: RepairPayload

    ): HealingRequest {

        return {

            rawResponse,

            errors,

            repair

        };

    }

}