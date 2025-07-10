import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Play, Download, Search, Calendar, User } from "lucide-react"
import Image from "next/image"

export default function SermonsPage() {
  const sermons = [
    {
      id: 1,
      title: "Walking in Your Purpose",
      speaker: "Pastor John Adebayo",
      date: "March 10, 2024",
      series: "Discovering God's Plan",
      duration: "45 min",
      description: "Discover how to identify and walk confidently in the purpose God has designed for your life.",
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
    {
      id: 2,
      title: "The Power of Community",
      speaker: "Pastor Grace Adebayo",
      date: "March 3, 2024",
      series: "Building Relationships",
      duration: "38 min",
      description: "Learn about the importance of Christian community and how we can support one another.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Faith Over Fear",
      speaker: "Pastor John Adebayo",
      date: "February 25, 2024",
      series: "Overcoming Challenges",
      duration: "42 min",
      description: "How to overcome fear and anxiety by trusting in God's promises and faithfulness.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "The Heart of Worship",
      speaker: "Pastor David Okafor",
      date: "February 18, 2024",
      series: "Worship Series",
      duration: "35 min",
      description: "Understanding what it means to worship God in spirit and in truth.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Generosity and Blessing",
      speaker: "Pastor John Adebayo",
      date: "February 11, 2024",
      series: "Kingdom Principles",
      duration: "40 min",
      description: "Exploring the biblical principles of giving and how God blesses generous hearts.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Prayer That Changes Things",
      speaker: "Pastor Grace Adebayo",
      date: "February 4, 2024",
      series: "Prayer Series",
      duration: "43 min",
      description: "Learning how to pray effectively and see God move in powerful ways.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const series = [
    { name: "Discovering God's Plan", count: 4 },
    { name: "Building Relationships", count: 3 },
    { name: "Overcoming Challenges", count: 5 },
    { name: "Worship Series", count: 6 },
    { name: "Kingdom Principles", count: 4 },
    { name: "Prayer Series", count: 3 },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sermons</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be encouraged and challenged by God's Word through our sermon archive. Listen anytime, anywhere.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search sermons by title, speaker, or topic..." className="pl-10 pr-4 py-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sermon */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Sermon</h2>
          {sermons
            .filter((sermon) => sermon.featured)
            .map((sermon) => (
              <Card key={sermon.id} className="max-w-4xl mx-auto overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <Image
                      src={sermon.image || "/placeholder.svg"}
                      alt={sermon.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16 p-0">
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-red-600">Latest</Badge>
                  </div>
                  <div className="p-8">
                    <Badge variant="outline" className="mb-4">
                      {sermon.series}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-4">{sermon.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {sermon.speaker}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {sermon.date}
                      </div>
                      <span>{sermon.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{sermon.description}</p>
                    <div className="flex gap-3">
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Watch
                      </Button>
                      <Button variant="outline">Listen</Button>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Sermon Archive */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Sermon Series</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {series.map((s) => (
                      <div key={s.name} className="flex justify-between items-center">
                        <span className="text-sm">{s.name}</span>
                        <Badge variant="secondary">{s.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Speakers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">Pastor John Adebayo</div>
                    <div className="text-sm">Pastor Grace Adebayo</div>
                    <div className="text-sm">Pastor David Okafor</div>
                    <div className="text-sm">Guest Speakers</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sermon Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {sermons.map((sermon) => (
                  <Card key={sermon.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={sermon.image || "/placeholder.svg"}
                        alt={sermon.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-lg">
                        <Button size="sm" className="rounded-full">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <Badge variant="outline" className="w-fit">
                        {sermon.series}
                      </Badge>
                      <CardTitle className="text-lg">{sermon.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-3 text-sm">
                          <span>{sermon.speaker}</span>
                          <span>•</span>
                          <span>{sermon.date}</span>
                          <span>•</span>
                          <span>{sermon.duration}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{sermon.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <Play className="w-3 h-3 mr-1" />
                          Watch
                        </Button>
                        <Button size="sm" variant="outline">
                          Listen
                        </Button>
                        <Button size="sm" variant="outline" className="px-2">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline">Load More Sermons</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Listen on the Go</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our podcast to automatically receive new sermons and never miss a message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Subscribe on Apple Podcasts</Button>
            <Button variant="outline">Subscribe on Spotify</Button>
            <Button variant="outline">RSS Feed</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
