import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Users, Music, Heart, BookOpen } from "lucide-react"
import Image from "next/image"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <Image src="/images/bg.jpg?height=400&width=1200" alt="Worship service" fill className="object-cover" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Worship Services</h1>
            <p className="text-xl opacity-90">
              Join us for inspiring worship, powerful teaching, and meaningful fellowship
            </p>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Schedule</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We have multiple services throughout the week to accommodate different schedules and preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Sunday First Service</CardTitle>
                <CardDescription>8:00 AM - 9:30 AM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Traditional worship service with hymns, choir, and expository preaching. Perfect for those who prefer
                  a more formal worship style.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>Average 300 attendees</span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 bg-blue-50">
              <CardHeader>
                <Clock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Sunday Main Service</CardTitle>
                <CardDescription>10:30 AM - 12:30 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Contemporary worship with live band, dynamic teaching, and children's programs. Our largest and most
                  vibrant service.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Average 800 attendees</span>
                </div>
                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">Most Popular</span>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Sunday Evening Service</CardTitle>
                <CardDescription>6:00 PM - 7:30 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Intimate worship and prayer service focused on spiritual growth and community building. Great for
                  deeper fellowship.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>Average 200 attendees</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What to Expect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether it's your first time or you're a regular attendee, here's what you can expect during our services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Music className="w-10 h-10 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg">Worship & Music</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Contemporary and traditional songs led by our talented worship team and choir.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BookOpen className="w-10 h-10 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">Biblical Teaching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Practical, life-changing messages from God's Word that you can apply to your daily life.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="w-10 h-10 mx-auto text-red-600 mb-2" />
                <CardTitle className="text-lg">Prayer & Ministry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Opportunities for prayer, healing, and personal ministry from our trained prayer team.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-10 h-10 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-lg">Fellowship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Warm community atmosphere where you can connect with others and build lasting friendships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plan Your Visit */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Plan Your Visit</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">What to Wear</h3>
                  <p className="text-gray-600">
                    Come as you are! We welcome people in casual or formal attire. The most important thing is that
                    you're comfortable.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Parking & Arrival</h3>
                  <p className="text-gray-600">
                    Free parking is available on-site. We recommend arriving 15-20 minutes early to find parking and get
                    settled.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Children's Programs</h3>
                  <p className="text-gray-600">
                    We offer age-appropriate programs for children from nursery through high school during our main
                    service.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">First-Time Visitors</h3>
                  <p className="text-gray-600">
                    Stop by our Welcome Center after the service to receive a welcome gift and learn more about our
                    church family.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location & Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">

 cradle Hotel, works layout, Owerri municipal                       <br />
                      Imo State, Nigeria

                      cradle Hotel, works layout, Owerri municipal 
                      <br />
                      IMO State, Nigeria
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+234 123 456 7890</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">info@dominioncity.org</p>
                  </div>
                  <Button className="w-full">Get Directions</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Online Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Make It In Person?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us online for live streaming of our services. You can participate in worship from anywhere in the
            world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Watch Live</Button>
            <Button size="lg" variant="outline">
              View Past Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
