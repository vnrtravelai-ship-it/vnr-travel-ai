import { PlanningContext }
    from "../planning/models/planning-context.model";

export interface Recommendation<T> {

    /**
     * Original candidate
     */
    item: T;

    /**
     * Final score
     */
    score: number;

    /**
     * Why this recommendation received the score
     */
    reasons: string[];

}

export class RecommendationRanker {

    /**
     * Generic ranking algorithm.
     *
     * scorer must return:
     *  - score
     *  - reasons
     */
    rank<T>(

        candidates: T[],

        context: PlanningContext,

        scorer: (

            item: T,

            context: PlanningContext

        ) => {

            score: number;

            reasons: string[];

        }

    ): Recommendation<T>[] {

        return candidates

            .map(candidate => {

                const result =

                    scorer(

                        candidate,

                        context

                    );

                return {

                    item: candidate,

                    score: result.score,

                    reasons: result.reasons

                };

            })

            .sort(

                (a, b) =>

                    b.score - a.score

            );

    }

}