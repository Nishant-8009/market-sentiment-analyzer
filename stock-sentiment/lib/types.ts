export interface AnalysisResult {
  sentiment: "positive" | "negative" | "neutral"
  score: number
  keyPoints: string[]
  stockImpact: string
  summary: string
}

