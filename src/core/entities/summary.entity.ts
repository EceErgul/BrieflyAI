import { z } from 'zod';

export const SummaryRequestSchema = z.object({
    text: z
    .string()
    .min(50, { message: 'Text must be at least 50 characters long' })
    .max(10000, { message: 'Text must be at most 10000 characters long' }),
});

export type SummaryResponseSchema = z.infer<typeof SummaryRequestSchema>;

export const SummaryResponseSchema = z.object({
    title: z.string().describe("A short and eye-catching title for the text"),
    summary: z.array(z.string()).describe("A summary of the text in the 3–4 most important points"),
    tags: z.array(z.string()).describe("3–5 keywords/tags related to the text"),
    sentiment: z
    .enum(["POSITIVE", "NEUTRAL", "NEGATIVE"])
    .describe("The overall emotional tone of the text"),
    estimatedTimeToRead: z
    .string()
    .describe("Estimated reading time of the original text (e.g., '2 min')"),
});

export type SummaryResponse = z.infer<typeof SummaryResponseSchema>;