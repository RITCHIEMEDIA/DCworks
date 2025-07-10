"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, ArrowRight, Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { adminStorage, type BlogPost } from "@/lib/admin-storage"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const data = adminStorage.getData()
    // Add some sample blog posts if none exist
    if (data.blogPosts.length === 0) {
      const samplePosts: BlogPost[] = [
        {
          id: "1",
          title: "Building Strong Communities Through Faith",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          excerpt:
            "Discover how our church is making a difference in the local community through various outreach programs and initiatives.",
          author: "Pastor John Adebayo",
          date: "2024-03-15",
          category: "Community",
          image: "/placeholder.svg?height=300&width=500",
          featured: true,
          tags: ["community", "outreach", "faith"],
        },
        {
          id: "2",
          title: "Youth Ministry: Empowering the Next Generation",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          excerpt:
            "Learn about our dynamic youth programs and how we are preparing young people for leadership and service.",
          author: "Pastor David Okafor",
          date: "2024-03-12",
          category: "Youth",
          image: "/placeholder.svg?height=300&width=500",
          featured: false,
          tags: ["youth", "leadership", "ministry"],
        },
        {
          id: "3",
          title: "The Power of Prayer in Daily Life",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          excerpt:
            "Explore practical ways to incorporate prayer into your daily routine and experience its transformative power.",
          author: "Pastor Grace Adebayo",
          date: "2024-03-10",
          category: "Spiritual Growth",
          image: "/placeholder.svg?height=300&width=500",
          featured: false,
          tags: ["prayer", "spiritual growth", "daily life"],
        },
      ]

      samplePosts.forEach((post) => adminStorage.addBlogPost(post))
      setPosts(samplePosts)
    } else {
      setPosts(data.blogPosts)
    }
  }, [])

  const categories = ["all", "Community", "Youth", "Spiritual Growth", "Events", "Leadership"]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Church Blog & News</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Stay connected with the latest news, insights, and stories from our church community
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
            <Card className="overflow-hidden hover-lift hover-glow transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-600">Featured</Badge>
                </div>
                <div className="p-8">
                  <Badge variant="outline" className="mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.id}`}>
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <div className="flex items-center gap-4 text-gray-500">
                      <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">24</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">8</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover-lift hover-glow transition-all duration-500 group">
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge variant="secondary" className="absolute top-4 left-4 bg-white/90 text-gray-700">
                  {post.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                  <div className="flex items-center gap-3 text-gray-500">
                    <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">12</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">5</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <section className="mt-16 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter and never miss important updates from our church family
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              placeholder="Enter your email"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
