"use client"

import { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function SentimentChart({ score }) {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  })

  useEffect(() => {
    // Normalize score to 0-100 range
    const normalizedScore = ((score + 1) / 2) * 100

    // Determine color based on score
    let color
    if (normalizedScore > 60) {
      color = "#22c55e" // green for positive
    } else if (normalizedScore < 40) {
      color = "#ef4444" // red for negative
    } else {
      color = "#f59e0b" // amber for neutral
    }

    setChartData({
      datasets: [
        {
          data: [normalizedScore, 100 - normalizedScore],
          backgroundColor: [color, "#e5e7eb"],
          borderWidth: 0,
          cutout: "80%",
        },
      ],
    })
  }, [score])

  return (
    <div className="relative h-full flex items-center justify-center">
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {Math.round(((score + 1) / 2) * 100)}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Sentiment Score</span>
      </div>
    </div>
  )
}

