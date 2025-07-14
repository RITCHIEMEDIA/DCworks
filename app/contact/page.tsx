"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, Navigation, Copy, Check } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const churchLocation = {
    lat: 5.484,
    lng: 7.0351,
    address: "cradle hotel works layout, Owerri Municipal, Owerri, Imo State, Nigeria",
  }

  useEffect(() => {
    // Get user's location for distance calculation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied:", error)
        },
      )
    }
  }, [])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in kilometers
    return Math.round(d * 10) / 10
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCallClick = () => {
    window.location.href = "tel:+2348125119785"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:dominioncityworkslayout@gmail.com"
  }

  const handleDirectionsClick = () => {
    const encodedAddress = encodeURIComponent(churchLocation.address)

    // Try to open in Google Maps app first, fallback to web
    const googleMapsApp = `comgooglemaps://?q=${encodedAddress}`
    const googleMapsWeb = `https://maps.google.com/maps?q=${encodedAddress}`

    // For mobile devices, try to open the app first
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = googleMapsApp
      setTimeout(() => {
        window.open(googleMapsWeb, "_blank")
      }, 500)
    } else {
      window.open(googleMapsWeb, "_blank")
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const distance = userLocation
    ? calculateDistance(userLocation.lat, userLocation.lng, churchLocation.lat, churchLocation.lng)
    : null

  return (
    <div className="min-h-screen">
      {/* Mobile-First Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with us for any questions, prayer requests, or to learn more about
            our church family.
          </p>
        </div>
      </section>

      {/* Quick Contact Actions - Mobile Optimized */}
      <section className="py-6 bg-white border-b lg:hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handleCallClick}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-xl bg-green-50 hover:bg-green-100 transition-colors touch-manipulation"
            >
              <Phone className="w-8 h-8 mb-2 text-green-600" />
              <span className="text-sm font-medium text-green-700">Call Now</span>
            </button>
            <button
              onClick={handleDirectionsClick}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors touch-manipulation"
            >
              <Navigation className="w-8 h-8 mb-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Directions</span>
              {distance && <span className="text-xs text-gray-600">{distance} km away</span>}
            </button>
            <button
              onClick={handleEmailClick}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors touch-manipulation"
            >
              <Mail className="w-8 h-8 mb-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Email</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Information - Mobile First */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <MapPin className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg">Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Cradle Hotel, Works Layout
                  <br />
                  Owerri Municipal, Owerri
                  <br />
                  Imo State, Nigeria
                </p>
                <div className="flex flex-col gap-2">
                  <Button size="sm" onClick={handleDirectionsClick} className="w-full touch-manipulation">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(churchLocation.address, "address")}
                    className="w-full touch-manipulation"
                  >
                    {copied === "address" ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Address
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Phone className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600 mb-4">
                  <p>
                    <strong>Main:</strong> +234 803 123 4567
                  </p>
                  <p>
                    <strong>Prayer Line:</strong> +234 803 123 4568
                  </p>
                  <p>
                    <strong>Emergency:</strong> +234 803 123 4569
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={handleCallClick}
                    className="w-full bg-green-600 hover:bg-green-700 touch-manipulation"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard("+2348125119785", "phone")}
                    className="w-full touch-manipulation"
                  >
                    {copied === "phone" ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Number
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Mail className="w-8 h-8 mx-auto text-red-600 mb-2" />
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600 mb-4">
                  <p>
                    <strong>General:</strong> dominioncityworkslayout@gmail.com
                  </p>
                  <p>
                    <strong>Pastor:</strong> pastor@dominioncity.org
                  </p>
                  <p>
                    <strong>Prayer:</strong> prayer@dominioncity.org
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={handleEmailClick}
                    className="w-full bg-red-600 hover:bg-red-700 touch-manipulation"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard("info@dominioncity.org", "email")}
                    className="w-full touch-manipulation"
                  >
                    {copied === "email" ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Email
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Clock className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-lg">Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Monday - Friday</strong>
                    <br />
                    9:00 AM - 5:00 PM
                  </p>
                  <p>
                    <strong>Saturday</strong>
                    <br />
                    10:00 AM - 2:00 PM
                  </p>
                  <p>
                    <strong>Sunday</strong>
                    <br />
                    Service Days Only
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form and Map - Mobile Optimized */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="order-2 lg:order-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Message Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select message type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="prayer">Prayer Request</SelectItem>
                        <SelectItem value="pastoral">Pastoral Care</SelectItem>
                        <SelectItem value="ministry">Ministry Information</SelectItem>
                        <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                        <SelectItem value="event">Event Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                      className="mt-1 resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full touch-manipulation">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Additional Info */}
            <div className="space-y-6 order-1 lg:order-2">
              <Card>
                <CardHeader>
                  <CardTitle>Find Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d${churchLocation.lng}!3d${churchLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjknMDIuNCJOIDfCsDAyJzA2LjQiRQ!5e0!3m2!1sen!2sng!4v1635959385!5m2!1sen!2sng`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Dominion City Works Layout Location"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="flex-1 touch-manipulation" onClick={handleDirectionsClick}>
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    {distance && (
                      <div className="flex items-center justify-center px-3 py-2 bg-blue-50 rounded-lg text-sm text-blue-700 font-medium">
                        {distance} km away
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prayer Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    We believe in the power of prayer. If you have a prayer request, please don't hesitate to share it
                    with us. Our prayer team meets regularly to pray for all submitted requests.
                  </p>
                  <Button variant="outline" className="w-full touch-manipulation bg-transparent">
                    Submit Prayer Request
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    For pastoral emergencies outside of office hours, please call our emergency line. A pastor or
                    trained counselor will respond as soon as possible.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-4 h-4 text-red-600" />
                    <span className="font-semibold">+234 803 123 4569</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 touch-manipulation bg-transparent"
                    onClick={() => (window.location.href = "tel:+2348031234569")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Directory - Mobile Optimized */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Staff Directory</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect directly with our ministry leaders and staff members.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Pastor Uzone   Akalonu",
                title: "Senior Pastor",
                email: "pastor@dominioncity.org",
                phone: "+234 803 123 4570",
                hours: "Tue-Thu, 10AM-4PM",
              },
              {
                name: "Pastor E-Berry Akalonu",
                title: "Associate Pastor",
                email: "grace@dominioncity.org",
                phone: "+234 803 123 4571",
                hours: "Mon, Wed, Fri, 9AM-3PM",
              },
              {
                name: "Pastor Elijah",
                title: "Youth Pastor",
                email: "youth@dominioncity.org",
                phone: "+234 803 123 4572",
                hours: "Mon-Fri, 2PM-6PM",
              },
              {
                name: "Mrs. Divine",
                title: "Church Administrator",
                email: "admin@dominioncity.org",
                phone: "+234 803 123 4573",
                hours: "Mon-Fri, 9AM-5PM",
              },
              {
                name: "MIN Precious",
                title: "Worship Leader",
                email: "worship@dominioncity.org",
                phone: "+234 803 123 4574",
                hours: "Wed-Sun, 10AM-2PM",
              },
              {
                name: "EL Shiphra",
                title: "Children's Director",
                email: "children@dominioncity.org",
                phone: "+234 803 123 4575",
                hours: "Tue-Sat, 10AM-3PM",
              },
            ].map((staff, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{staff.name}</CardTitle>
                  <CardDescription>{staff.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => (window.location.href = `mailto:${staff.email}`)}
                        className="h-auto p-1 text-blue-600 hover:text-blue-800"
                      >
                        {staff.email}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => (window.location.href = `tel:${staff.phone}`)}
                        className="h-auto p-1 text-green-600 hover:text-green-800"
                      >
                        {staff.phone}
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Office Hours:</strong> {staff.hours}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom padding for mobile navigation */}
      <div className="h-16 lg:hidden"></div>
    </div>
  )
}
