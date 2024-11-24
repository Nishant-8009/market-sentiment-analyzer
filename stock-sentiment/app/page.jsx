"use client"

import { useState } from "react"
import NewsForm from "@/components/news-form"
import ResultsDisplay from "@/components/results-display"
import { Sparkles } from "lucide-react"

export default function Home() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            Stock Market Sentiment Analyzer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Analyze financial news articles to extract sentiment and key points that may affect stock trends
          </p>
          <div className="flex items-center justify-center mt-4">
            <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Powered by AI sentiment analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
              <NewsForm setResult={setResult} setLoading={setLoading} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 h-full">
              <ResultsDisplay result={result} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

