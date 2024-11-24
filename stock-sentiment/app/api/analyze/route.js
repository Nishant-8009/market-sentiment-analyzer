import { NextResponse } from "next/server"
import { extractContent } from "@/lib/extract-content"
import { analyzeSentiment } from "@/lib/analyze-sentiment"

export async function POST(request) {
  try {
    const { type, content } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    let textToAnalyze = content

    // If URL is provided, extract content from the webpage
    if (type === "url") {
      try {
        textToAnalyze = await extractContent(content)
      } catch (error) {
        console.error("Error extracting content:", error)
        return NextResponse.json({ error: "Failed to extract content from URL" }, { status: 400 })
      }
    }

    // Analyze the content
    const result = await analyzeSentiment(textToAnalyze)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

