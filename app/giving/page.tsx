"use client"
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Shield, CreditCard, Repeat } from "lucide-react"

const PAYSTACK_PUBLIC_KEY = "pk_live_b05f0719d9db42e8fa558bf037ba2bad032be964"

export default function GivingPage() {
  const [amount, setAmount] = useState("")
  const [frequency, setFrequency] = useState("one-time")
  const [fund, setFund] = useState("general")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Load Paystack script if not already loaded
  React.useEffect(() => {
    if (!document.getElementById("paystack-js")) {
      const script = document.createElement("script")
      script.id = "paystack-js"
      script.src = "https://js.paystack.co/v1/inline.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const numericAmount = Number.parseFloat(amount.replace(/[^\d]/g, ""))
    if (!amount || numericAmount < 100) {
      alert("Minimum donation amount is ₦100")
      return
    }
    if (!name || !email || !phone) {
      alert("Please fill all donor details")
      return
    }

    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: numericAmount * 100, // Paystack expects amount in kobo
      currency: "NGN",
      ref: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      metadata: {
        custom_fields: [
          { display_name: "Donor Name", variable_name: "donor_name", value: name },
          { display_name: "Phone", variable_name: "donor_phone", value: phone },
          { display_name: "Fund", variable_name: "fund", value: fund },
          { display_name: "Frequency", variable_name: "frequency", value: frequency },
        ],
      },
      callback: function (response: any) {
        alert("Payment complete! Reference: " + response.reference)

        // Example call after Paystack callback
        fetch("/api/verify-paystack-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: response.reference }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // Show thank you, save to DB, etc.
            } else {
              // Handle error
            }
          })
      },
      onClose: function () {
        alert("Payment window closed")
      },
    })
    handler.openIframe()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Give Online</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Your generosity helps us fulfill our mission of transforming lives and building communities. Thank you for
            partnering with us.
          </p>
        </div>
      </section>

      {/* Giving Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  Make a Donation
                </CardTitle>
                <CardDescription>Choose your donation amount and frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Donor Information */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="donor-name">Full Name</Label>
                      <Input
                        id="donor-name"
                        placeholder="Enter your full name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="donor-email">Email Address</Label>
                      <Input
                        id="donor-email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="donor-phone">Phone Number</Label>
                    <Input
                      id="donor-phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <Label className="text-base font-semibold">Donation Amount</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2 mb-4">
                      {["5000", "10000", "25000", "50000", "100000", "Other"].map((preset) => (
                        <Button
                          key={preset}
                          type="button"
                          variant={amount === preset ? "default" : "outline"}
                          onClick={() => setAmount(preset === "Other" ? "" : preset)}
                          className="text-sm"
                        >
                          {preset === "Other" ? "Other" : `₦${Number(preset).toLocaleString()}`}
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min={100}
                    />
                  </div>

                  {/* Frequency */}
                  <div>
                    <Label className="text-base font-semibold">Frequency</Label>
                    <RadioGroup value={frequency} onValueChange={setFrequency} className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time">One-time donation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly recurring</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly">Weekly recurring</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Fund Selection */}
                  <div>
                    <Label htmlFor="fund" className="text-base font-semibold">
                      Choose Fund
                    </Label>
                    <Select value={fund} onValueChange={setFund}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a fund" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Fund</SelectItem>
                        <SelectItem value="building">Building Fund</SelectItem>
                        <SelectItem value="missions">Missions</SelectItem>
                        <SelectItem value="youth">Youth Ministry</SelectItem>
                        <SelectItem value="outreach">Community Outreach</SelectItem>
                        <SelectItem value="greatness">Greatness Centre Programs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Secure & Safe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your donation is processed through secure, encrypted channels. We use industry-standard security
                    measures to protect your personal and financial information.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">PCI Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Bank-level Security</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why Give?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Your generous giving enables us to:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Support weekly worship services and programs</li>
                    <li>• Fund community outreach and development projects</li>
                    <li>• Maintain and improve our facilities</li>
                    <li>• Support missions and church planting</li>
                    <li>• Provide scholarships and educational programs</li>
                    <li>• Care for those in need in our community</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Repeat className="w-5 h-5 text-blue-600" />
                    Recurring Giving
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Set up recurring donations to make giving convenient and consistent. You can modify or cancel your
                    recurring gift at any time through your donor portal.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Other Ways to Give</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer multiple convenient ways for you to support our ministry and mission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Bank Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Bank:</strong> United Bank Of Africa
                  </p>
                  <p>
                    <strong>Account Name:</strong> Dominion City Works Layout
                  </p>
                  <p>
                    <strong>Account Number:</strong> 2326825992
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="text-center">
              <CardHeader>
                <CardTitle>Mobile Money</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>MTN Mobile Money:</strong> 0803-123-4567
                  </p>
                  <p>
                    <strong>Airtel Money:</strong> 0802-123-4567
                  </p>
                  <p>
                    <strong>Name:</strong> Dominion City Church
                  </p>
                </div>
              </CardContent>
            </Card> */}

            <Card className="text-center">
              <CardHeader>
                <CardTitle>In-Person</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Give during any of our worship services</p>
                  <p>Visit our church office during business hours</p>
                  <p>
                    <strong>Office Hours:</strong> Mon-Fri, 8AM-5PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how your generous giving is making a difference in our community and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Community Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Last year, your donations helped us provide food packages to over 500 families, sponsor 50 children's
                  education, and conduct free medical outreaches that served 1,000+ people.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">50+</div>
                    <div className="text-sm text-gray-600">Families Fed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">10</div>
                    <div className="text-sm text-gray-600">Scholarships</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">100+</div>
                    <div className="text-sm text-gray-600">Medical Checkups</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ministry Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Your faithful giving has enabled us to expand our ministries, launch new programs, and reach more
                  people with the gospel message throughout our region.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-sm text-gray-600">New Programs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">100+</div>
                    <div className="text-sm text-gray-600">Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-600">3</div>
                    <div className="text-sm text-gray-600">Fellowship Cell Plants</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
