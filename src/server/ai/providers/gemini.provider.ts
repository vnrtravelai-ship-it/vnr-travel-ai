import {

    GoogleGenAI

}
from "@google/genai";

import {

    AIProvider,

    AIResponse

}
from "./ai-provider.interface";

import {

    PromptPayload

}
from "../../optimizer/prompt.builder";

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

        payload: PromptPayload

    ): Promise<AIResponse> {

        const response =

            await this.client.models.generateContent({

                model:

                    this.model,

                contents:

                    JSON.stringify({

                        planningContext:

                            payload.planningContext,

                        validation:

                            payload.validation,

                        suggestions:

                            payload.suggestions

                    }),

                config: {

                    systemInstruction:

                        payload.systemPrompt

                }

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