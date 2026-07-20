import { AIProvider }
    from "./ai-provider.interface";

import { OpenAIProvider }
    from "./openai.provider";

import { GeminiProvider }
    from "./gemini.provider";

export class AIProviderFactory {

    static create(): AIProvider {

        const provider =

            (

                process.env.AI_PROVIDER

                ?? "openai"

            )

            .toLowerCase();

        switch (provider) {

            case "gemini":

                return new GeminiProvider();

            case "openai":

                return new OpenAIProvider();

            default:

                throw new Error(

                    `Unsupported AI Provider: ${provider}`

                );

        }

    }

}