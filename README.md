# BrieflyAI - AI-Powered Text Summarizer & Insights Engine

BrieflyAI is a production-ready Web application built with Next.js 15, TypeScript, and Google Gemini API. It transforms long texts, articles, and documents into key summaries, structured tags, reading time estimates, and sentiment analysis.

Designed with **Clean Architecture** principles (Domain-Driven Design), strict TypeScript standards, and complete unit test coverage using Jest.

---

## 🏗️ Architecture & Project Structure

The project follows Clean Architecture / Port-Adapter patterns to decouple domain business logic from framework specific details and external APIs:

```text
src/
├── core/                   # Enterprise Domain & Core Business Rules
│   ├── entities/           # TypeScript Domain Models & Types
│   ├── errors/             # Custom Error Definitions (AppError, ValidationError, etc.)
│   └── ports/              # Interfaces / Contracts for external systems (AI Provider)
│
├── infrastructure/         # External System Implementations (Adapters)
│   └── ai/                 # Gemini API Provider & Mock Provider implementations
│
├── services/               # Application Use Cases / Business Logic
│   └── summarize.service.ts
│
└── app/                    # Presentation Layer (Next.js App Router)
    ├── api/                # REST Controllers / Route Handlers
    └── page.tsx            # Interactive Client Interface
```
---

## ✨ Features

- **Key Takeaways:** Clean bullet-point summarization.
- **Metadata Extraction:** Sentiment detection (POSITIVE, NEUTRAL, NEGATIVE), reading time estimation, and automated content tagging.
- **SOLID Principles:** Decoupled AI implementations via Dependency Injection (Easy to switch to OpenAI/Claude).
- **Production-Grade Error Handling:** Centralized custom exception tree (ValidationError, AIServiceError).
- **Comprehensive Unit Tests:** Full test suite for use cases using Mock Providers.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn
- Gemini API Key

### Installation

1. Clone the repository:
    ```bash
   git clone https://github.com/your-username/briefly-ai.git
   ```
   cd briefly-ai

2. Install dependencies:
    ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a .env.local file in the root directory:
   GEMINI_API_KEY=your_actual_gemini_api_key_here

4. Run the development server:
    ```bash
   npm run dev
   ```

   Open http://localhost:3000 with your browser to test the app.

---

## 🧪 Running Tests

Run the Jest test suite:
```bash
npm run test
```
---

## 🛠️ Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript (Strict Mode)
- Styling: Tailwind CSS
- AI Integration: @google/genai (Gemini API)
- Testing: Jest, ts-jest