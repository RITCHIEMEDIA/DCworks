"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Heart, BookOpen, Play, ArrowRight, Star, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"
import { StatsSection } from "@/components/ui/stats-section"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const heroSlides = [
    {
      image: "/images/bg.jpg",
      title: "Welcome to Dominion City Works Layout",
      subtitle: "Greatness Centre",
      description:
        "A place where lives are transformed, communities are built, and greatness is cultivated through faith, love, and service.",
    },
    {
      image: "/images/bg2.jpg",
      title: "Building Strong Communities",
      subtitle: "Together We Rise",
      description:
        "Join us in creating lasting impact through our community development programs and outreach initiatives.",
    },
    {
      image: "/images/bg3.jpg",
      title: "Developing Leaders",
      subtitle: "Leadership Excellence",
      description:
        "Discover your potential and develop the skills needed to make a difference in your community and beyond.",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Mario",
      role: "Youth",
      content:
        "Dominion City has been a blessing to our family. The love and support we've received here is incredible.",
      image: "/images/mario.jpg",
    },
    {
      id: 2,
      name: "wisdom ugochukwu",
      role: "Youth Drummer",
      content: "The youth programs here have helped me discover my purpose and develop my leadership skills.",
      image: "/images/wisdom.jpg",
    },
    {
      id: 3,
      name: "Min E berry Akalonu",
      role: "Women's Ministry",
      content: "The women's ministry has been instrumental in my spiritual growth and personal development.",
      image: "/images/maeberry.jpeg",
    },
  ]

  // Touch handlers for hero slider
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }
  }

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const handleCallClick = () => {
    window.location.href = "tel:+2348031234567"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:info@dominioncity.org"
  }

  const handleDirectionsClick = () => {
    const address = "97 Works Layout, Owerri Municipal, Owerri, Imo State, Nigeria"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, "_blank")
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Mobile-First Hero Section */}
      <section
        className="relative h-screen overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          </div>
        ))}

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className={`max-w-4xl text-white ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              {heroSlides[currentSlide].subtitle}
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90 leading-relaxed max-w-2xl">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
                asChild
              >
                <Link href="/services">
                  <Users className="w-5 h-5 mr-2" />
                  Plan Your Visit
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm"
                asChild
              >
                <Link href="/live">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Live
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Slide indicators with touch-friendly size */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe indicator for mobile */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/70 text-sm sm:hidden">
          Swipe to navigate
        </div>
      </section>

      {/* Quick Contact Actions - Mobile Optimized */}
      <section className="py-4 bg-blue-600 text-white lg:hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handleCallClick}
              className="flex flex-col items-center justify-center py-3 px-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
            >
              <Phone className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Call Us</span>
            </button>
            <button
              onClick={handleDirectionsClick}
              className="flex flex-col items-center justify-center py-3 px-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
            >
              <MapPin className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Directions</span>
            </button>
            <button
              onClick={handleEmailClick}
              className="flex flex-col items-center justify-center py-3 px-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
            >
              <Mail className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Email</span>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Links - Mobile First */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Connect With Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the many ways you can be part of our thriving community
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center hover:shadow-xl transition-all duration-500 group border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl">Service Times</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 sm:mb-6">Join us for inspiring worship every Sunday</p>
                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-sm sm:text-base">First Service</span>
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      7:30 AM
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-sm sm:text-base">Main Service</span>
                    <Badge className="bg-blue-600 text-xs sm:text-sm">10:00 AM</Badge>
                  </div>
                </div>
                <Button className="w-full group-hover:bg-blue-700 transition-colors touch-manipulation" asChild>
                  <Link href="/services">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-500 group border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">Get Connected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 sm:mb-6">Find your place in our vibrant community</p>
                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="p-3 bg-green-50 rounded-lg text-left">
                    <div className="font-semibold text-sm sm:text-base">Small Groups</div>
                    <div className="text-xs sm:text-sm text-gray-600">Weekly fellowship & Bible study</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-left">
                    <div className="font-semibold text-sm sm:text-base">Ministry Teams</div>
                    <div className="text-xs sm:text-sm text-gray-600">Serve using your gifts</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-left">
                    <div className="font-semibold text-sm sm:text-base">Volunteer Opportunities</div>
                    <div className="text-xs sm:text-sm text-gray-600">Make a difference</div>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors touch-manipulation" asChild>
                  <Link href="/ministries">
                    Explore Ministries <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-500 group border-0 shadow-lg bg-white/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">Give Online</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 sm:mb-6">Support our mission and ministry</p>
                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm">Secure & Convenient</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm">One-time or Recurring</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm">Multiple Payment Options</span>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 transition-colors touch-manipulation" asChild>
                  <Link href="/giving">
                    Give Now <Heart className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section with Mobile Optimization */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              See how God is working through our community to transform lives and build His kingdom
            </p>
          </div>
          <StatsSection />
        </div>
      </section>

      {/* Enhanced Upcoming Events - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for these exciting events and be part of our growing community
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
              title: "Movie Night",
              date: "july 10, 2025",
              time: "5:00 PM - 9:00 PM",
              location: "Main Auditorium",
              category: "Social",
              image: "/images/movienight.jpg",
              description: "Join us for a fun-filled evening with friends and family as we watch an inspiring movie together. Snacks and drinks will be provided. All are welcome!",
              featured: true,
              attendees: 150,
              },
              {
              title: "Supernatural Advancements",
              date: "All Tuesdays In july",
              time: "4:00 PM - 8:30 PM",
              location: "Jesus Arena, PH Road, Owerri, Imo state",
              category: "training",
              image: "/images/tuesday.jpg",
              description: "Join us as we impact knowledge about the Divine Nature to you. Experience powerful teachings, worship, and impartation every Tuesday this July.",
              attendees: 500,
              },
              {
              title: "Mid Year Thanksgiving",
              date: "july 13, 2025",
              time: "8:00 AM - 12:00 PM",
              location: "Church Auditorium",
              category: "Thanksgiving service",
              image: "/images/bg3.jpg",
              description: "Come celebrate God's faithfulness with us at our Mid Year Thanksgiving service. Let's give thanks together for all He has done so far this year.",
              attendees: 600,
              },
            ].map((event, index) => (
              <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-500 group border-0 shadow-lg"
              >
              <div className="relative">
                <Image
                src={event.image || "/images/bg.jpg"}
                alt={event.title}
                width={400}
                height={250}
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {event.featured && <Badge className="absolute top-4 left-4 bg-red-600 animate-pulse">Featured</Badge>}
                <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attending</span>
                </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                <CardTitle className="text-lg sm:text-xl group-hover:text-blue-600 transition-colors">
                  {event.title}
                </CardTitle>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                  {event.category}
                </Badge>
                </div>
                <CardDescription className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>{event.time}</span>
                </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">{event.description}</p>
                <Button className="w-full group-hover:bg-blue-700 transition-colors touch-manipulation">
                Register Now
                </Button>
              </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button
              variant="outline"
              size="lg"
              className="hover:shadow-lg transition-all bg-transparent touch-manipulation"
              asChild
            >
              <Link href="/events">
                View All Events <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Latest Sermons - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Latest Sermons</h2>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
              Be encouraged and challenged by God's Word through our recent messages
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {[
              {
                title: "Walking in Your Purpose",
                speaker: "Pastor John Adebayo",
                date: "March 10, 2024",
                duration: "45 min",
                series: "Discovering God's Plan",
                description:
                  "Discover how to identify and walk confidently in the purpose God has designed for your life.",
                image: "/placeholder.svg?height=200&width=300",
                views: "2.1K",
              },
              {
                title: "The Power of Community",
                speaker: "Pastor Grace Adebayo",
                date: "March 3, 2024",
                duration: "38 min",
                series: "Building Relationships",
                description: "Learn about the importance of Christian community and how we can support one another.",
                image: "/placeholder.svg?height=200&width=300",
                views: "1.8K",
              },
            ].map((sermon, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="relative">
                  <Image
                    src={sermon.image || "/placeholder.svg"}
                    alt={sermon.title}
                    width={600}
                    height={200}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                    <Button size="lg" className="rounded-full w-12 h-12 sm:w-16 sm:h-16 p-0 shadow-xl">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8" />
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-xs">{sermon.series}</Badge>
                  <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-xs sm:text-sm">
                    {sermon.views} views
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors text-lg sm:text-xl">
                    {sermon.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    <div className="flex items-center justify-between text-sm">
                      <span>{sermon.speaker}</span>
                      <span>{sermon.date}</span>
                    </div>
                    <div className="mt-1 text-sm">{sermon.duration}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-6 leading-relaxed text-sm sm:text-base">{sermon.description}</p>
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 touch-manipulation">
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white hover:text-gray-900 bg-transparent touch-manipulation"
                    >
                      Listen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 hover:shadow-lg transition-all bg-transparent touch-manipulation"
              asChild
            >
              <Link href="/sermons">
                View All Sermons <BookOpen className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What People Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our community members about their experience at Dominion City
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Enhanced Call to Action - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full animate-float"></div>
          <div
            className="absolute top-32 right-20 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to Take Your Next Step?</h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Whether you're new to faith or looking to grow deeper, we're here to help you on your journey of discovering
            God's amazing plan for your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 touch-manipulation"
              asChild
            >
              <Link href="/services">
                <Users className="w-5 h-5 mr-2" />
                Plan Your Visit
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 touch-manipulation"
              asChild
            >
              <Link href="/contact">
                <Heart className="w-5 h-5 mr-2" />
                Connect With Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom padding for mobile navigation */}
      <div className="h-16 lg:hidden"></div>
    </div>
  )
}
