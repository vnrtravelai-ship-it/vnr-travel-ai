export type RetryReason =
    | "TIMEOUT"
    | "NETWORK_ERROR"
    | "RATE_LIMIT"
    | "SERVER_ERROR"
    | "INVALID_JSON"
    | "UNKNOWN";

export interface RetryDecision {

    retry: boolean;

    reason: RetryReason;

    delayMs: number;

}

export interface RetryAttempt {

    attempt: number;

    reason: RetryReason;

    error: unknown;

    timestamp: Date;

}

export interface RetryResult<T> {

    success: boolean;

    result?: T;

    attempts: RetryAttempt[];

}