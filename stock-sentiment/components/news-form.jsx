"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, FileText, ArrowRight } from "lucide-react"

export default function NewsForm({ setResult, setLoading }) {
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [activeTab, setActiveTab] = useState("url")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ((activeTab === "url" && !url) || (activeTab === "text" && !text)) {
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: activeTab,
          content: activeTab === "url" ? url : text,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze content")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error analyzing content:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Enter Financial News</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            URL
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              News Article URL
            </label>
            <Input
              id="url"
              placeholder="https://finance.example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Enter the URL of a financial news article to analyze its sentiment
          </p>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              News Article Text
            </label>
            <Textarea
              id="text"
              placeholder="Paste the financial news article text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] w-full"
            />
          </div>
        </TabsContent>
      </Tabs>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        Analyze Sentiment
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

