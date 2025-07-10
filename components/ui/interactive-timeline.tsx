"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimelineEvent {
  year: string
  title: string
  description: string
  image?: string
}

interface InteractiveTimelineProps {
  events: TimelineEvent[]
}

export function InteractiveTimeline({ events }: InteractiveTimelineProps) {
  const [activeEvent, setActiveEvent] = useState(0)

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>

      {/* Timeline events */}
      <div className="space-y-12">
        {events.map((event, index) => (
          <div
            key={index}
            className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white cursor-pointer transition-all duration-300 z-10 ${
                activeEvent === index ? "bg-blue-600 scale-125 animate-pulse-glow" : "bg-gray-300 hover:bg-blue-400"
              }`}
              onClick={() => setActiveEvent(index)}
            />

            {/* Event card */}
            <Card
              className={`w-5/12 hover-lift cursor-pointer transition-all duration-300 ${
                activeEvent === index ? "ring-2 ring-blue-500 shadow-xl" : ""
              }`}
              onClick={() => setActiveEvent(index)}
            >
              <CardContent className="p-6">
                <Badge className="mb-2">{event.year}</Badge>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
