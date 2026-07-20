import { PromptPayload }
    from "../../optimizer/prompt.builder";

export interface AIResponse {

    /**
     * Raw response returned by AI provider.
     */
    raw: string;

    /**
     * Parsed JSON result.
     */
    result: unknown;

    /**
     * AI provider name.
     */
    provider: string;

    /**
     * Model name.
     */
    model: string;

    /**
     * Token usage.
     */
    usage?: {

        promptTokens: number;

        completionTokens: number;

        totalTokens: number;

    };

}

export interface AIProvider {

    /**
     * Provider name.
     */
    readonly name: string;

    /**
     * Model name.
     */
    readonly model: string;

    /**
     * Execute AI generation.
     */
    generate(

        payload: PromptPayload

    ): Promise<AIResponse>;

}