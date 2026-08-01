import { SummaryResponse } from "../entities/summary.entity";

export interface IAIProvider {
    generateSummary(text: string): Promise<SummaryResponse>;
}