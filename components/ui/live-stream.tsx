"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Users, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react"

interface LiveStreamProps {
  isLive?: boolean
  viewerCount?: number
  title?: string
}

export function LiveStream({ isLive = false, viewerCount = 0, title = "Sunday Service" }: LiveStreamProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [showChat, setShowChat] = useState(false)

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-gray-900">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isLive ? (
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                <Play className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg font-semibold">Live Stream Active</p>
            </div>
          ) : (
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Play className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg font-semibold">Stream Offline</p>
              <p className="text-sm opacity-75">Next service: Sunday 10:30 AM</p>
            </div>
          )}
        </div>

        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-600 animate-pulse">🔴 LIVE</Badge>
          </div>
        )}

        {/* Viewer count */}
        {isLive && (
          <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            {viewerCount.toLocaleString()} watching
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsMuted(!isMuted)}
              className="bg-black/60 hover:bg-black/80 text-white border-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowChat(!showChat)}
              className="bg-black/60 hover:bg-black/80 text-white border-0"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-black/60 hover:bg-black/80 text-white border-0">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          {isLive && <Badge variant="destructive">Live Now</Badge>}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">
            {isLive
              ? "Join us live for worship, teaching, and fellowship from anywhere in the world."
              : "Our next live service will be Sunday at 10:30 AM. Set a reminder to join us!"}
          </p>

          <div className="flex gap-2">
            {isLive ? (
              <Button className="flex-1">Join Live Stream</Button>
            ) : (
              <Button variant="outline" className="flex-1 bg-transparent">
                Set Reminder
              </Button>
            )}
            <Button variant="outline">View Schedule</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
