import { ConstraintResult }
    from "./models/constraint-result.model";

import { ConstraintError }
    from "./models/constraint-error.model";

export interface ConflictGroup {

    source: string;

    errors: ConstraintError[];

}

export class ConflictDetector {

    detect(
        result: ConstraintResult
    ): ConflictGroup[] {

        const groups =
            new Map<string, ConstraintError[]>();

        for (const error of result.errors) {

            const key =
                error.source;

            if (!groups.has(key)) {

                groups.set(key, []);

            }

            groups.get(key)!.push(error);

        }

        return Array.from(groups.entries())

            .map(

                ([source, errors]) => ({

                    source,

                    errors

                })

            );

    }

}