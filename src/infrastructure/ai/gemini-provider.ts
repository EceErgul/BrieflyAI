import { GoogleGenAI, Type } from "@google/genai";
import { IAIProvider } from "@/core/ports/ai-provider.port";
import { SummaryResponse } from "@/core/entities/summary.entity";
import { AIServiceError } from "@/core/errors/app-error";

export class GeminiProvider implements IAIProvider {
  private ai: GoogleGenAI;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined.");
    }
    this.ai = new GoogleGenAI({ apiKey: key });
  }

  async generateSummary(text: string): Promise<SummaryResponse> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
          "Analyze the provided text and generate a professional summary in the requested JSON format:",
          text,
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "Short and catchy title for the text",
              },
              summary: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A summary of the 3–4 most important points",
              },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3-5 key terms",
              },
              sentiment: {
                type: Type.STRING,
                enum: ["POSITIVE", "NEUTRAL", "NEGATIVE"],
              },
              estimatedReadTime: {
                type: Type.STRING,
                description: "Estimated reading time (e.g., '3 min')",
              },
            },
            required: ["title", "summary", "tags", "sentiment", "estimatedReadTime"],
          },
        },
      });

      if (!response.text) {
        throw new AIServiceError("Gemini returned an empty response.");
      }

      const parsedData: SummaryResponse = JSON.parse(response.text);
      return parsedData;
      } catch (error: unknown) {
        let errorMessage = "Gemini API ile iletişim kurulurken bir hata oluştu.";

        if (error instanceof Error) {
          errorMessage = error.message;
          console.error("=== GEMINI GERÇEK HATA DETAYI ===");
          console.error(error.message);
          console.error("=================================");
        } else {
          console.error("Unknown error:", error);
        }

        throw new AIServiceError(errorMessage);
      }
  }
}