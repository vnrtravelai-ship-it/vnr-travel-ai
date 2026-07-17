import {
    AffiliatePlan
}
from "../planning/models/planning-context.model";

export class AffiliateRepository {

    buildLinks(): AffiliatePlan {

        return {

            railway:
                "https://baolau.com/?ref=vnrtravel",

            hotel:
                "https://traveloka.com/",

            flight:
                "https://traveloka.com/",

            bus:
                "https://12go.asia/",

            tour:
                ""

        };

    }

}