import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Target, Eye } from "lucide-react"
import Image from "next/image"
import { InteractiveTimeline } from "@/components/ui/interactive-timeline"
import { ParallaxSection } from "@/components/ui/parallax-section"

export default function AboutPage() {
  const timelineEvents = [
    {
      year: "2010",
      title: "Church Founded",
      description: "Started with 20 members in a rented hall with a vision to transform lives and build communities.",
    },
    {
      year: "2013",
      title: "First Building",
      description: "Acquired our first permanent building and expanded to 200 members.",
    },
    {
      year: "2016",
      title: "Greatness Centre Launch",
      description: "Launched community development programs and leadership training initiatives.",
    },
    {
      year: "2019",
      title: "Major Expansion",
      description: "Built new auditorium and reached 1,000+ members with multiple service times.",
    },
    {
      year: "2022",
      title: "Community Impact",
      description: "Launched major outreach programs serving over 500 families annually.",
    },
    {
      year: "2024",
      title: "Digital Ministry",
      description: "Expanded online presence and launched digital discipleship programs.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image src="/placeholder.svg?height=500&width=1200" alt="Church building" fill className="object-cover" />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white animate-fadeInUp">
            <h1 className="text-5xl font-bold mb-4">About Dominion City</h1>
            <p className="text-2xl opacity-90 mb-6">
              Discover our story, mission, and the heart behind Greatness Centre
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 hover-lift">
                Our Leadership
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 glass-effect bg-transparent"
              >
                Our Impact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Dominion City Works Layout was founded in 2010 with a vision to create a community where people could
                  experience God's love, discover their purpose, and make a meaningful impact in the world.
                </p>
                <p>
                  What started as a small gathering of 20 people in a rented hall has grown into a thriving community of
                  over 2,000 members. Our journey has been marked by God's faithfulness and the dedication of countless
                  individuals who have contributed to building this great work.
                </p>
                <p>
                  The Greatness Centre represents our commitment to developing leaders, empowering communities, and
                  creating lasting change through practical Christianity and community development programs.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">14+</div>
                  <div className="text-sm text-gray-600">Years of Ministry</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">2000+</div>
                  <div className="text-sm text-gray-600">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">500+</div>
                  <div className="text-sm text-gray-600">Families Served</div>
                </div>
              </div>
            </div>
            <div className="animate-slideInRight">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Church history"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl hover-lift"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl animate-float">
                  Est. 2010
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the key milestones in our church's growth and impact over the years
            </p>
          </div>
          <InteractiveTimeline events={timelineEvents} />
        </div>
      </section>

      {/* Enhanced Mission, Vision, Values */}
      <ParallaxSection speed={0.3}>
        <section
          className="py-20 parallax-bg relative"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          }}
        >
          <div className="absolute inset-0 bg-blue-900/90"></div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">Our Foundation</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                These core principles guide everything we do and shape our approach to ministry and community building.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center glass-effect border-white/20 hover-lift hover-glow">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 leading-relaxed">
                    To transform lives through the power of God's love, equip believers for effective service, and
                    impact communities through practical Christianity and sustainable development programs.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center glass-effect border-white/20 hover-lift hover-glow">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 leading-relaxed">
                    To be a leading center of excellence that raises godly leaders, builds strong communities, and
                    demonstrates the kingdom of God through love, service, and transformational impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center glass-effect border-white/20 hover-lift hover-glow">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white/90 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Faith in God</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Excellence in Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Integrity & Transparency</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ParallaxSection>
    </div>
  )
}
