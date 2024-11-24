import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function analyzeSentiment(text) {
  try {
    // Truncate text if it's too long
    const truncatedText = text.length > 8000 ? text.substring(0, 8000) + "..." : text

    const prompt = `
      You are a financial analyst specializing in stock market sentiment analysis.
      Analyze the following financial news article and provide:
      
      1. Overall sentiment (positive, negative, or neutral)
      2. Sentiment score (-1 to 1, where -1 is very negative, 0 is neutral, and 1 is very positive)
      3. Key points that affect stock trends (3-5 bullet points)
      4. Potential impact on related stocks
      5. A brief summary of the market implications
      
      Format your response as JSON with the following structure:
      {
        "sentiment": "positive|negative|neutral",
        "score": number,
        "keyPoints": ["point1", "point2", "point3"],
        "stockImpact": "description of potential impact",
        "summary": "brief summary"
      }
      
      Here's the article:
      ${truncatedText}
    `

    const { text: analysisText } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.2,
      maxTokens: 1000,
    })

    // Extract JSON from the response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse analysis result")
    }

    const result = JSON.parse(jsonMatch[0])

    return result
  } catch (error) {
    console.error("Error analyzing sentiment:", error)

    // Return fallback data in case of error
    return {
      sentiment: "neutral",
      score: 0,
      keyPoints: ["Could not analyze the provided content"],
      stockImpact: "Unknown due to analysis failure",
      summary: "The system was unable to analyze the provided content. Please try again with different content.",
    }
  }
}

