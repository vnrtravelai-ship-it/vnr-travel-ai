import { ConstraintResult }

    from "../models/constraint-result.model";

import { ReflectionSuggestion }

    from "./reflection.types";

import { ReflectionBuilder }

    from "./reflection.builder";

export class ReflectionEngine {

    private readonly builder =

        new ReflectionBuilder();

    generate(

        validation:

        ConstraintResult

    ): ReflectionSuggestion[] {

        if (

            validation.valid

        ) {

            return [];

        }

        return validation.errors.map(

            error =>

                this.builder.build(

                    error

                )

        );

    }

}