import OpenAI
    from "openai";

import {

    AIProvider,

    AIResponse

}
from "./ai-provider.interface";

import {

    PromptPayload

}
from "../../optimizer/prompt.builder";

export class OpenAIProvider
    implements AIProvider {

    readonly name = "OpenAI";

    readonly model =

        process.env.OPENAI_MODEL

        ?? "gpt-5.5";

    private readonly client =
        new OpenAI({

            apiKey:

                process.env.OPENAI_API_KEY

        });

    async generate(

        payload: PromptPayload

    ): Promise<AIResponse> {

        const completion =

            await this.client.responses.create({

                model:

                    this.model,

                input: [

                    {

                        role: "system",

                        content:

                            payload.systemPrompt

                    },

                    {

                        role: "user",

                        content:

                            JSON.stringify({

                                planningContext:

                                    payload.planningContext,

                                validation:

                                    payload.validation,

                                suggestions:

                                    payload.suggestions

                            })

                    }

                ]

            });

        const raw =

            completion.output_text ?? "";

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

                this.model,

            usage: {

                promptTokens:

                    completion.usage?.input_tokens ?? 0,

                completionTokens:

                    completion.usage?.output_tokens ?? 0,

                totalTokens:

                    completion.usage?.total_tokens ?? 0

            }

        };

    }

}