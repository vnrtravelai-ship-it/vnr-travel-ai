import {
    RetryDecision,
    RetryReason
} from "./retry.types";

export class RetryPolicy {

    readonly maxAttempts = 3;

    readonly baseDelayMs = 1000;

    readonly backoffMultiplier = 2;

    shouldRetry(

        error: unknown,

        attempt: number

    ): RetryDecision {

        if (

            attempt >= this.maxAttempts

        ) {

            return {

                retry: false,

                reason: "UNKNOWN",

                delayMs: 0

            };

        }

        const message =

            String(error).toLowerCase();

        let reason: RetryReason =
            "UNKNOWN";

        if (

            message.includes("timeout")

        ) {

            reason = "TIMEOUT";

        }

        else if (

            message.includes("429")

        ) {

            reason = "RATE_LIMIT";

        }

        else if (

            message.includes("network")

        ) {

            reason = "NETWORK_ERROR";

        }

        else if (

            message.includes("500")

            ||

            message.includes("502")

            ||

            message.includes("503")

        ) {

            reason = "SERVER_ERROR";

        }

        else if (

            message.includes("json")

        ) {

            reason = "INVALID_JSON";

        }

        const retryable =

            [

                "TIMEOUT",

                "RATE_LIMIT",

                "NETWORK_ERROR",

                "SERVER_ERROR",

                "INVALID_JSON"

            ].includes(reason);

        return {

            retry: retryable,

            reason,

            delayMs:

                this.baseDelayMs *

                Math.pow(

                    this.backoffMultiplier,

                    attempt - 1

                )

        };

    }

}