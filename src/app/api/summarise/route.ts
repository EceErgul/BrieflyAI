import { NextResponse } from "next/server";
import { SummarizeService } from "@/services/summarise.service";
import { GeminiProvider } from "@/infrastructure/ai/gemini-provider";
import { AppError } from "@/core/errors/app-error";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    const geminiProvider = new GeminiProvider();
    const summarizeService = new SummarizeService(geminiProvider);
    const result = await summarizeService.execute(text);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.message,
            code: error.code,
          },
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Beklenmeyen bir sunucu hatası oluştu.",
          code: "INTERNAL_SERVER_ERROR",
        },
      },
      { status: 500 }
    );
  }
}