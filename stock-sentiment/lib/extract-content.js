import * as cheerio from "cheerio"

export async function extractContent(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Remove script and style elements
    $("script, style, nav, footer, header, aside").remove()

    // Extract article content - this is a simple implementation
    // Real-world usage might need more sophisticated extraction
    let content = ""

    // Try to find article content
    const article = $("article").first()
    if (article.length) {
      content = article.text()
    } else {
      // Fallback to main content
      const main = $("main").first()
      if (main.length) {
        content = main.text()
      } else {
        // Fallback to body content
        content = $("body").text()
      }
    }

    // Clean up the text
    content = content.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim()

    return content
  } catch (error) {
    console.error("Error extracting content:", error)
    throw new Error("Failed to extract content from URL")
  }
}

