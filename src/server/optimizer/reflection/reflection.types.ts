export type ReflectionPriority =

    | "LOW"

    | "MEDIUM"

    | "HIGH"

    | "CRITICAL";

export interface ReflectionSuggestion {

    code: string;

    title: string;

    description: string;

    instruction: string;

    priority: ReflectionPriority;

}