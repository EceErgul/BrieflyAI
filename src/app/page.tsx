"use client";

import { useState } from "react";
import { SummaryResponse } from "@/core/entities/summary.entity";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SummaryResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "An error occurred.");
      }

      setResult(data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to analyze the text.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "POSITIVE":
        return "bg-green-100 text-green-800 border-green-300";
      case "NEGATIVE":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-indigo-600 dark:text-indigo-400">
            BrieflyAI
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Transform long articles and text into actionable summaries, tags, and insights instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Source Text
            </label>
            <textarea
              id="content"
              rows={6}
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-sm resize-none"
              placeholder="Paste your long text or article here (min 50 characters)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Min 50 characters required</span>
              <span>{text.length} characters</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || text.length < 50}
            className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-medium shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <span>Summarize & Analyze</span>
            )}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-sm">
            🚨 {error}
          </div>
        )}

        {result && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getSentimentBadge(result.sentiment)}`}>
                  {result.sentiment}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ⏱️ Read Time: {result.estimatedTimeToRead}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {result.title}
              </h2>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Key Takeaways
              </h3>
              <ul className="space-y-2">
                {result.summary.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}