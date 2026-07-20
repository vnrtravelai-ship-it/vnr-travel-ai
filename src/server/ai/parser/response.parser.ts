import { AIResponse }
    from "../providers/ai-provider.interface";

export class ResponseParser {

    parse<T>(

        response: AIResponse

    ): T {

        if (response.result) {

            return response.result as T;

        }

        try {

            return JSON.parse(

                response.raw

            ) as T;

        }

        catch {

            throw new Error(

                "AI response is not valid JSON."

            );

        }

    }

}