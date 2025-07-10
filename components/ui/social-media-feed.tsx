"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, ExternalLink } from "lucide-react"
import Image from "next/image"

interface SocialPost {
  id: string
  platform: "facebook" | "instagram" | "twitter"
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  url: string
}

export function SocialMediaFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([])

  useEffect(() => {
    // Mock social media posts - in real app, this would come from social media APIs
    const mockPosts: SocialPost[] = [
      {
        id: "1",
        platform: "facebook",
        content:
          'Join us this Sunday for an inspiring message on "Walking in Your Purpose". Service starts at 10:30 AM! 🙏 #DominionCity #SundayService',
        image: "/placeholder.svg?height=300&width=500",
        likes: 45,
        comments: 12,
        shares: 8,
        timestamp: "2024-03-15T10:00:00Z",
        url: "https://facebook.com/dominioncity",
      },
      {
        id: "2",
        platform: "instagram",
        content:
          "Amazing turnout at our Youth Conference! 🎉 So proud of our young leaders stepping into their destiny. #YouthConference #NextGeneration",
        image: "/placeholder.svg?height=300&width=500",
        likes: 78,
        comments: 23,
        shares: 15,
        timestamp: "2024-03-14T16:30:00Z",
        url: "https://instagram.com/dominioncity",
      },
      {
        id: "3",
        platform: "twitter",
        content:
          "Prayer changes everything! Join our Wednesday evening prayer meeting at 7 PM. Together we can move mountains! 🏔️ #Prayer #Faith",
        likes: 32,
        comments: 8,
        shares: 12,
        timestamp: "2024-03-13T14:15:00Z",
        url: "https://twitter.com/dominioncity",
      },
    ]
    setPosts(mockPosts)
  }, [])

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "bg-blue-600"
      case "instagram":
        return "bg-gradient-to-r from-purple-600 to-pink-600"
      case "twitter":
        return "bg-sky-500"
      default:
        return "bg-gray-600"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "f"
      case "instagram":
        return "ig"
      case "twitter":
        return "t"
      default:
        return "?"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Follow Us on Social Media</h2>
        <p className="text-gray-600">Stay connected with our latest updates and community highlights</p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover-lift transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getPlatformColor(post.platform)}`}
                  >
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div>
                    <p className="font-semibold">Dominion City Works</p>
                    <p className="text-sm text-gray-600 capitalize">{post.platform}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">{post.content}</p>

              {post.image && (
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Social media post"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{post.shares}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <a href="https://facebook.com/dominioncity" target="_blank" rel="noopener noreferrer">
              Follow on Facebook
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://instagram.com/dominioncity" target="_blank" rel="noopener noreferrer">
              Follow on Instagram
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://twitter.com/dominioncity" target="_blank" rel="noopener noreferrer">
              Follow on Twitter
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
