import { PlanningContext }
    from "../../planning/models/planning-context.model";

import { ConstraintResult }
    from "../models/constraint-result.model";

import { ReflectionSuggestion }
    from "../reflection/reflection.types";

import {

    RepairInstruction,

    RepairPayload

}
    from "./repair.types";

export class RepairBuilder {

    build(

        planningContext: PlanningContext,

        validation: ConstraintResult,

        suggestions: ReflectionSuggestion[]

    ): RepairPayload {

        return {

            planningContext,

            validation,

            suggestions,

            instructions:

                this.buildInstructions(

                    suggestions

                )

        };

    }

    private buildInstructions(

        suggestions: ReflectionSuggestion[]

    ): RepairInstruction[] {

        return suggestions.map(

            suggestion => ({

                code:

                    suggestion.code,

                instruction:

                    suggestion.instruction,

                priority:

                    this.normalizePriority(

                        suggestion.priority

                    )

            })

        );

    }

    /**
     * Reflection có thể trả về:
     * LOW
     * MEDIUM
     * HIGH
     * CRITICAL
     *
     * Repair chỉ dùng:
     * LOW
     * MEDIUM
     * HIGH
     */

    private normalizePriority(

        priority: ReflectionSuggestion["priority"]

    ): RepairInstruction["priority"] {

        switch (priority) {

            case "CRITICAL":

            case "HIGH":

                return "HIGH";

            case "MEDIUM":

                return "MEDIUM";

            case "LOW":

            default:

                return "LOW";

        }

    }

}