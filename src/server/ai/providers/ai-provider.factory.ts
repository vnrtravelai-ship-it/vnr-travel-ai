import { AIProvider } from "./ai-provider.interface";
import { OpenAIProvider } from "./openai.provider";
import { GeminiProvider } from "./gemini.provider";

/**
 * ==========================================================
 * AI Provider Factory
 * ==========================================================
 *
 * Chịu trách nhiệm tạo AI Provider theo cấu hình.
 *
 * Hỗ trợ:
 * - OpenAI
 * - Gemini
 *
 * ==========================================================
 */

export class AIProviderFactory {

    static create(): AIProvider {

        const provider = (
            process.env.AI_PROVIDER ??
            "openai"
        ).toLowerCase();

        switch (provider) {

            case "gemini":
                return new GeminiProvider();

            case "openai":
                return new OpenAIProvider();

            default:
                throw new Error(
                    `Unsupported AI provider: ${provider}`
                );

        }

    }

}