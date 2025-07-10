"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, MessageSquare, Calendar, Heart, Settings } from "lucide-react"

interface NotificationPreference {
  id: string
  title: string
  description: string
  email: boolean
  sms: boolean
  push: boolean
  icon: any
}

export default function NotificationsPage() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: "events",
      title: "Event Reminders",
      description: "Get notified about upcoming events and registration deadlines",
      email: true,
      sms: true,
      push: true,
      icon: Calendar,
    },
    {
      id: "sermons",
      title: "New Sermons",
      description: "Be the first to know when new sermons are available",
      email: true,
      sms: false,
      push: true,
      icon: MessageSquare,
    },
    {
      id: "giving",
      title: "Giving Receipts",
      description: "Receive receipts and giving summaries",
      email: true,
      sms: false,
      push: false,
      icon: Heart,
    },
    {
      id: "prayer",
      title: "Prayer Requests",
      description: "Updates on prayer requests and answered prayers",
      email: false,
      sms: true,
      push: true,
      icon: Bell,
    },
    {
      id: "newsletter",
      title: "Weekly Newsletter",
      description: "Church news, updates, and community highlights",
      email: true,
      sms: false,
      push: false,
      icon: Mail,
    },
  ])

  const updatePreference = (id: string, type: "email" | "sms" | "push", value: boolean) => {
    setPreferences((prev) => prev.map((pref) => (pref.id === id ? { ...pref, [type]: value } : pref)))
  }

  const savePreferences = () => {
    // Save to localStorage or API
    localStorage.setItem("notification_preferences", JSON.stringify(preferences))
    alert("Notification preferences saved!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notification Preferences</h1>
          <p className="text-gray-600">Choose how you'd like to receive updates from Dominion City Works Layout</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {preferences.map((pref) => {
                const IconComponent = pref.icon
                return (
                  <div key={pref.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{pref.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{pref.description}</p>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${pref.id}-email`} className="text-sm">
                              Email
                            </Label>
                            <Switch
                              id={`${pref.id}-email`}
                              checked={pref.email}
                              onCheckedChange={(checked) => updatePreference(pref.id, "email", checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${pref.id}-sms`} className="text-sm">
                              SMS
                            </Label>
                            <Switch
                              id={`${pref.id}-sms`}
                              checked={pref.sms}
                              onCheckedChange={(checked) => updatePreference(pref.id, "sms", checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${pref.id}-push`} className="text-sm">
                              Push
                            </Label>
                            <Switch
                              id={`${pref.id}-push`}
                              checked={pref.push}
                              onCheckedChange={(checked) => updatePreference(pref.id, "push", checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button onClick={savePreferences} className="w-full">
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Youth Conference Registration Open",
                  message: "Register now for the upcoming Youth Conference 2024",
                  time: "2 hours ago",
                  type: "event",
                  read: false,
                },
                {
                  title: "New Sermon Available",
                  message: "Walking in Your Purpose - Pastor John Adebayo",
                  time: "1 day ago",
                  type: "sermon",
                  read: true,
                },
                {
                  title: "Donation Receipt",
                  message: "Thank you for your donation of ₦5,000 to Building Fund",
                  time: "3 days ago",
                  type: "giving",
                  read: true,
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{notification.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    {!notification.read && <Badge className="bg-blue-600">New</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
