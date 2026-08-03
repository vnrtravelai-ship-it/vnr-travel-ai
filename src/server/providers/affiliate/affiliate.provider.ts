import { BaseProvider }
from "../shared/base.provider";

import {
    AffiliatePlan
}
from "../../planning/models/planning-context.model";

export class AffiliateProvider
extends BaseProvider<AffiliatePlan> {

    private readonly defaults: AffiliatePlan[] = [

        {

            railway:
                "https://www.baolau.com/?source=vnrailway",

            hotel: undefined,

            tour: undefined,

            flight: undefined,

            bus: undefined,

            insurance: undefined

        }

    ];

    /**
     * AffiliateProvider hiện sử dụng dữ liệu mặc định.
     * Sprint tiếp theo sẽ đọc từ Database/JSON/API.
     */
    async load(): Promise<AffiliatePlan[]> {

        return this.defaults;

    }

    /**
     * Affiliate mặc định.
     */
    getDefaultAffiliate(): AffiliatePlan {

        return this.defaults[0];

    }

}