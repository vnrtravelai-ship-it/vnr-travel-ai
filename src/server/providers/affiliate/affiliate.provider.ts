import { BaseProvider }
from "../shared/base.provider";

import {
    AffiliatePlan
}
from "../../planning/models/planning-context.model";

export class AffiliateProvider
extends BaseProvider<AffiliatePlan> {

    async load(): Promise<AffiliatePlan[]> {

        return [];

    }

}