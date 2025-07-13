import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, BookOpen, Music, Handshake, Globe } from "lucide-react"
import Image from "next/image"

export default function MinistriesPage() {
  const ministries = [
    {
      id: 1,
      title: "Children's Ministry",
      description: "Nurturing the next generation with age-appropriate programs, Bible stories, and fun activities.",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      image: "/placeholder.svg?height=200&width=400",
      ageGroup: "Ages 0-12",
      meetingTime: "Sundays 10:30 AM",
      leader: "Isaac Shiphra",
    },
    {
      id: 2,
      title: "Youth Ministry",
      description: "Empowering teenagers to discover their identity in Christ and develop leadership skills.",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      image: "/placeholder.svg?height=200&width=400",
      ageGroup: "Ages 13-18",
      meetingTime: "Sundays 6:00 PM",
      leader: "Pastor David Okafor",
    },
    {
      id: 3,
      title: "Young Adults",
      description: "Building community among young professionals and college students navigating life transitions.",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      image: "/placeholder.svg?height=200&width=400",
      ageGroup: "Ages 19-35",
      meetingTime: "Fridays 7:00 PM",
      leader: "Pastor Michael Adeyemi",
    },
    {
      id: 4,
      title: "Women's Ministry",
      description: "Encouraging women to grow in faith, build relationships, and serve their communities.",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      image: "/placeholder.svg?height=200&width=400",
      ageGroup: "All Women",
      meetingTime: "Saturdays 10:00 AM",
      leader: "Pastor Grace Adebayo",
    },
    {
      id: 5,
      title: "Men's Ministry",
      description: "Equipping men to be godly leaders in their homes, workplaces, and communities.",
      icon: Handshake,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      image: "/placeholder.svg?height=200&width=400",
      ageGroup: "All Men",
      meetingTime: "2nd Saturday 8:00 AM",
      leader: "Elder James Okoro",
    },
    {
      id: 6,
      title: "Worship Ministry",
      description: "Leading the congregation in meaningful worship through music, arts, and creative expression.",
      icon: Music,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      image: "/placeholder.svg?height=200&width=400",
      ageGroup: "All Ages",
      meetingTime: "Wednesdays 7:00 PM",
      leader: "Michael Thompson",
    },
    {
      id: 7,
      title: "Outreach Ministry",
      description: "Serving our local community through various outreach programs and social initiatives.",
      icon: Globe,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      image: "/placeholder.svg?height=200&width=400",
      ageGroup: "All Ages",
      meetingTime: "Saturdays 9:00 AM",
      leader: "Mrs. Blessing Eze",
    },
    {
      id: 8,
      title: "Seniors Ministry",
      description: "Providing fellowship, care, and meaningful activities for our senior members.",
      icon: Heart,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      image: "/placeholder.svg?height=200&width=400",
      ageGroup: "Ages 60+",
      meetingTime: "Thursdays 2:00 PM",
      leader: "Elder Mary Okafor",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Ministries</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find your place in our church family through our various ministries designed to help you grow, serve, and
            connect.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry) => {
              const IconComponent = ministry.icon
              return (
                <Card key={ministry.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={ministry.image || "/placeholder.svg"}
                      alt={ministry.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className={`absolute top-4 left-4 p-2 rounded-full ${ministry.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${ministry.color}`} />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{ministry.title}</CardTitle>
                    <CardDescription>{ministry.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div>
                        <strong>Age Group:</strong> {ministry.ageGroup}
                      </div>
                      <div>
                        <strong>Meeting Time:</strong> {ministry.meetingTime}
                      </div>
                      <div>
                        <strong>Leader:</strong> {ministry.leader}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Join Ministry
                      </Button>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Volunteer Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Use your gifts and talents to serve others. There are many ways to get involved and make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Ushering Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Welcome guests and help create a warm, inviting atmosphere for worship services.
                </p>
                <Button size="sm" variant="outline">
                  Volunteer
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Technical Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Operate sound, lighting, and video equipment to support our worship services.
                </p>
                <Button size="sm" variant="outline">
                  Volunteer
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Prayer Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Pray for church members, visitors, and community needs during services and events.
                </p>
                <Button size="sm" variant="outline">
                  Volunteer
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">Hospitality Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Serve refreshments and help coordinate fellowship events and gatherings.
                </p>
                <Button size="sm" variant="outline">
                  Volunteer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ministry Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ministry Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet some of the dedicated leaders who oversee our various ministries and programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Ministry Leader"
                  width={150}
                  height={150}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-lg">Mrs. Ruth Okonkwo</CardTitle>
                <CardDescription>Children's Ministry Director</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Leading our children's programs with passion and creativity for over 8 years.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Ministry Leader"
                  width={150}
                  height={150}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-lg">Pastor David Okafor</CardTitle>
                <CardDescription>Youth Pastor</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Mentoring and empowering young people to discover their God-given potential.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Ministry Leader"
                  width={150}
                  height={150}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-lg">Michael Thompson</CardTitle>
                <CardDescription>Worship Leader</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Leading our congregation in meaningful worship through music and arts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Ministry Leader"
                  width={150}
                  height={150}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-lg">Mrs. Blessing Eze</CardTitle>
                <CardDescription>Outreach Coordinator</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Coordinating community outreach programs and social initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Involved?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join a ministry that matches your interests and gifts. There's a place for everyone in our church family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Find Your Ministry
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              Volunteer Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
