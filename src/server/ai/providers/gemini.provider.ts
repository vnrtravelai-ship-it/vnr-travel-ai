import {
    GoogleGenAI
}
from "@google/genai";

import {
    AIProvider,
    AIResponse
}
from "./ai-provider.interface";

export class GeminiProvider
    implements AIProvider {

    readonly name = "Gemini";

    readonly model =
        process.env.GEMINI_MODEL
        ?? "gemini-2.5-pro";

    private readonly client =
        new GoogleGenAI({

            apiKey:
                process.env.GEMINI_API_KEY

        });

    async generate(

        prompt: string

    ): Promise<AIResponse> {

        const response =
            await this.client.models.generateContent({

                model:
                    this.model,

                contents:
                    prompt

            });

        const raw =
            response.text ?? "";

        let parsed: unknown;

        try {

            parsed =
                JSON.parse(raw);

        }

        catch {

            parsed = raw;

        }

        return {

            raw,

            result: parsed,

            provider:
                this.name,

            model:
                this.model

        };

    }

}