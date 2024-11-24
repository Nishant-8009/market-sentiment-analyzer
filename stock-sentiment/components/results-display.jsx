"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import SentimentChart from "./sentiment-chart"
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function ResultsDisplay({ result, loading }) {
  if (loading) {
    return <LoadingState />
  }

  if (!result) {
    return <EmptyState />
  }

  const { sentiment, score, keyPoints, stockImpact, summary } = result

  // Determine sentiment color and icon
  const sentimentConfig = {
    positive: {
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      icon: <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />,
      label: "Bullish",
    },
    negative: {
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      icon: <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />,
      label: "Bearish",
    },
    neutral: {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      icon: <Minus className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
      label: "Neutral",
    },
  }

  const currentSentiment = sentimentConfig[sentiment]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Analysis Results</h2>
        <Badge className={`text-sm px-3 py-1 ${currentSentiment.color} flex items-center gap-2`}>
          {currentSentiment.icon}
          {currentSentiment.label} Sentiment
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Sentiment Score</h3>
            <div className="h-[200px]">
              <SentimentChart score={score} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">Key Points</h3>
            <ul className="space-y-2 mt-4">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">Market Impact</h3>
          <div className="mt-4 space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">{summary}</p>
            </div>

            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Potential Stock Impact:</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{stockImpact}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-5 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <Clock className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No Analysis Yet</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        Enter a financial news article URL or text on the left to analyze its sentiment and potential impact on the
        stock market.
      </p>
    </div>
  )
}

