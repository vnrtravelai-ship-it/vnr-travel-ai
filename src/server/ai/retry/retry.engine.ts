import { RetryPolicy }
    from "./retry-policy";

import {

    RetryAttempt,

    RetryResult

} from "./retry.types";

export class RetryEngine {

    private readonly policy =
        new RetryPolicy();

    async execute<T>(

        operation: () => Promise<T>

    ): Promise<RetryResult<T>> {

        const attempts:
            RetryAttempt[] = [];

        let attempt = 1;

        while (true) {

            try {

                const result =
                    await operation();

                return {

                    success: true,

                    result,

                    attempts

                };

            }

            catch (error) {

                const decision =

                    this.policy.shouldRetry(

                        error,

                        attempt

                    );

                attempts.push({

                    attempt,

                    reason:

                        decision.reason,

                    error,

                    timestamp:

                        new Date()

                });

                if (

                    !decision.retry

                ) {

                    return {

                        success: false,

                        attempts

                    };

                }

                await new Promise(

                    resolve =>

                        setTimeout(

                            resolve,

                            decision.delayMs

                        )

                );

                attempt++;

            }

        }

    }

}