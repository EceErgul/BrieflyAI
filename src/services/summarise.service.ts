import { IAIProvider } from "@/core/ports/ai-provider.port";
import {SummaryRequestSchema, SummaryResponse } from "@/core/entities/summary.entity";
import { ValidationError } from "@/core/errors/app-error";

export class SummarizeService {
  constructor(private aiProvider: IAIProvider) {}

  async execute(rawText: string): Promise<SummaryResponse> {
    const validationResult = SummaryRequestSchema.safeParse({ text: rawText });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues[0]?.message || "Invalid text input.";
      throw new ValidationError(errorMessage);
    }

    const sanitizedText = rawText.trim();
    const result = await this.aiProvider.generateSummary(sanitizedText);

    return result;
  }
}