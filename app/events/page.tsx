import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Filter } from "lucide-react"
import Image from "next/image"

export default function EventsPage() {
  const events = [
   {
    id: 1,
              title: "Movie Night",
              date: "july 10, 2025",
              time: "5:00 PM - 9:00 PM",
              location: "Main Auditorium",
              category: "Social",
              image: "/images/movienight.jpg",
              description: "Join us for a fun-filled evening with friends and family as we watch an inspiring movie together. Snacks and drinks will be provided. All are welcome!",
              featured: true,
              },
    {
      id: 2,
title: "Supernatural Advancements",
              date: "All Tuesdays In july",
              time: "4:00 PM - 8:30 PM",
              location: "Jesus Arena, PH Road, Owerri, Imo state",
              category: "training",
              image: "/images/tuesday.jpg",
              description: "Join us as we impact knowledge about the Divine Nature to you. Experience powerful teachings, worship, and impartation every Tuesday this July.",
    },
    {
      id: 3,
              title: "Mid Year Thanksgiving",
              date: "july 13, 2025",
              time: "8:00 AM - 12:00 PM",
              location: "Church Auditorium",
              category: "Thanksgiving service",
              image: "/images/bg3.jpg",
              description: "Come celebrate God's faithfulness with us at our Mid Year Thanksgiving service. Let's give thanks together for all He has done so far this year.",
              featured: true,
    },
    
    //   id: 4,
    //   title: "Women's Conference",
    //   date: "April 5-6, 2024",
    //   time: "7:00 PM - 9:00 PM",
    //   location: "Main Auditorium",
    //   category: "Women",
    //   image: "/placeholder.svg?height=200&width=400",
    //   description: "Empowering women to walk in their God-given purpose and destiny.",
    // },
    // {
    //   id: 5,
    //   title: "Men's Breakfast",
    //   date: "April 12, 2024",
    //   time: "8:00 AM - 10:00 AM",
    //   location: "Fellowship Hall",
    //   category: "Men",
    //   image: "/placeholder.svg?height=200&width=400",
    //   description: "Monthly fellowship and encouragement for men of all ages.",
    // },
    // {
    //   id: 6,
    //   title: "Easter Celebration",
    //   date: "March 31, 2024",
    //   time: "8:00 AM, 10:30 AM, 6:00 PM",
    //   location: "Main Auditorium",
    //   category: "Special",
    //   image: "/placeholder.svg?height=200&width=400",
    //   description: "Celebrate the resurrection of Jesus Christ with special services and activities.",
    //   featured: true,
    // },
  ]

  const categories = ["All", "Youth", "Women", "Men", "Outreach", "Training", "Special"]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Stay connected with what's happening at Dominion City. Join us for these exciting events and activities.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm" className="hover:bg-blue-600 hover:text-white">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Events</h2>
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {events
              .filter((event) => event.featured)
              .map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={600}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-red-600">Featured</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                          </div>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{event.location}</span>
                    </div>
                    <Button className="w-full">Register Now</Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">All Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                  <CardDescription>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Register
                    </Button>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Event Calendar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View all our events in calendar format to better plan your participation.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">March 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interactive Calendar Component</p>
              </div>
              <div className="mt-4 text-center">
                <Button>View Full Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter to receive updates about upcoming events and activities.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
            <Button className="bg-white text-blue-900 hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
