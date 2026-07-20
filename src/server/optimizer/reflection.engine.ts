import { PlanningContext }
    from "../planning/models/planning-context.model";

import { ConstraintResult }
    from "./models/constraint-result.model";

import { ConflictGroup }
    from "./conflict.detector";

export interface ReflectionSuggestion {

    /**
     * Conflict source.
     */
    source: string;

    /**
     * Suggested action.
     */
    action: string;

    /**
     * Explanation.
     */
    reason: string;

    /**
     * Priority.
     */
    priority: number;

}

export class ReflectionEngine {

    reflect(

        context: PlanningContext,

        validation: ConstraintResult,

        conflicts: ConflictGroup[]

    ): ReflectionSuggestion[] {

        const suggestions: ReflectionSuggestion[] = [];

        for (const conflict of conflicts) {

            switch (conflict.source) {

                case "BUDGET":

                    suggestions.push({

                        source: "BUDGET",

                        action:
                            "Reduce itinerary cost.",

                        reason:
                            "Total budget exceeds the user's limit.",

                        priority: 100

                    });

                    break;

                case "HOTEL":

                    suggestions.push({

                        source: "HOTEL",

                        action:
                            "Search for another hotel or adjust check-in time.",

                        reason:
                            "Hotel schedule is incompatible with railway arrival.",

                        priority: 90

                    });

                    break;

                case "TRANSFER":

                    suggestions.push({

                        source: "TRANSFER",

                        action:
                            "Reorder activities or increase transfer time.",

                        reason:
                            "Transfer between activities is impossible.",

                        priority: 80

                    });

                    break;

                case "SCHEDULE":

                    suggestions.push({

                        source: "SCHEDULE",

                        action:
                            "Rebuild itinerary timeline.",

                        reason:
                            "Activities overlap.",

                        priority: 70

                    });

                    break;

                case "RAILWAY":

                    suggestions.push({

                        source: "RAILWAY",

                        action:
                            "Select another train or rebuild railway plan.",

                        reason:
                            "Railway information is inconsistent.",

                        priority: 95

                    });

                    break;

                case "DUPLICATE":

                    suggestions.push({

                        source: "DUPLICATE",

                        action:
                            "Remove duplicated activity.",

                        reason:
                            "Duplicate activities detected.",

                        priority: 50

                    });

                    break;

                default:

                    suggestions.push({

                        source: conflict.source,

                        action:
                            "Manual review required.",

                        reason:
                            "Unknown conflict.",

                        priority: 10

                    });

            }

        }

        return suggestions.sort(

            (a, b) =>

                b.priority - a.priority

        );

    }

}