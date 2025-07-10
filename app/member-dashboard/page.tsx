"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Heart, BookOpen, Award, Bell, Settings, LogOut } from "lucide-react"
import { InteractiveQuiz } from "@/components/ui/interactive-quiz"
import { LiveStream } from "@/components/ui/live-stream"

interface MemberData {
  name: string
  email: string
  memberSince: string
  totalGiving: number
  eventsAttended: number
  quizzesCompleted: number
  currentStreak: number
}

export default function MemberDashboard() {
  const [memberData, setMemberData] = useState<MemberData>({
    name: "John Doe",
    email: "john.doe@email.com",
    memberSince: "2022-01-15",
    totalGiving: 25000,
    eventsAttended: 24,
    quizzesCompleted: 8,
    currentStreak: 12,
  })

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication - in real app, this would be proper auth
    const auth = localStorage.getItem("member-auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem("member-auth", "true")
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("member-auth")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Member Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Please log in to access your member dashboard.</p>
            <Button onClick={handleLogin} className="w-full">
              Demo Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const quizQuestions = [
    {
      id: "1",
      question: "What is the main theme of this month's sermon series?",
      options: ["Faith and Works", "Love and Forgiveness", "Hope and Healing", "Grace and Truth"],
      correctAnswer: 0,
      explanation: "This month we are focusing on the relationship between faith and works in Christian living.",
    },
    {
      id: "2",
      question: "When was Dominion City Works Layout founded?",
      options: ["2008", "2010", "2012", "2015"],
      correctAnswer: 1,
      explanation:
        "Dominion City Works Layout was founded in 2010 with a vision to transform lives and build communities.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {memberData.name}!</h1>
            <p className="text-gray-600">Member since {new Date(memberData.memberSince).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">₦{memberData.totalGiving.toLocaleString()}</div>
              <p className="text-gray-600 text-sm">Total Giving</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{memberData.eventsAttended}</div>
              <p className="text-gray-600 text-sm">Events Attended</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{memberData.quizzesCompleted}</div>
              <p className="text-gray-600 text-sm">Quizzes Completed</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{memberData.currentStreak}</div>
              <p className="text-gray-600 text-sm">Week Streak</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="giving">Giving</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="live">Live Stream</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Donation Made</p>
                      <p className="text-sm text-gray-600">₦5,000 to Building Fund - March 15, 2024</p>
                    </div>
                    <Badge>Recent</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Event Attended</p>
                      <p className="text-sm text-gray-600">Youth Conference 2024 - March 12, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Quiz Completed</p>
                      <p className="text-sm text-gray-600">Bible Knowledge Quiz - March 10, 2024</p>
                    </div>
                    <Badge variant="secondary">100%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Your Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">Community Outreach</p>
                      <p className="text-sm text-gray-600">March 22, 2024 • 9:00 AM</p>
                    </div>
                    <Badge className="bg-green-600">Registered</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">Leadership Training</p>
                      <p className="text-sm text-gray-600">March 29, 2024 • 10:00 AM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="giving">
            <GivingHistory memberData={memberData} />
          </TabsContent>

          <TabsContent value="events">
            <EventsHistory memberData={memberData} />
          </TabsContent>

          <TabsContent value="learning">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Bible Study Progress</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Leadership Course</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <InteractiveQuiz
                title="Weekly Bible Quiz"
                questions={quizQuestions}
                onComplete={(score) => {
                  alert(`Great job! You scored ${score}/${quizQuestions.length}`)
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="live">
            <LiveStream isLive={true} viewerCount={234} title="Sunday Morning Service" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function GivingHistory({ memberData }: { memberData: MemberData }) {
  const givingHistory = [
    { date: "2024-03-15", amount: 5000, fund: "Building Fund", method: "Online" },
    { date: "2024-03-08", amount: 3000, fund: "General Fund", method: "Online" },
    { date: "2024-03-01", amount: 2000, fund: "Missions", method: "Cash" },
    { date: "2024-02-25", amount: 4000, fund: "General Fund", method: "Online" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Giving History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {givingHistory.map((gift, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">₦{gift.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  {gift.fund} • {gift.method}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{new Date(gift.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Total This Year:</strong> ₦{memberData.totalGiving.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function EventsHistory({ memberData }: { memberData: MemberData }) {
  const eventsHistory = [
    { name: "Youth Conference 2024", date: "2024-03-12", status: "Attended", type: "Conference" },
    { name: "Community Outreach", date: "2024-03-05", status: "Attended", type: "Outreach" },
    { name: "Leadership Training", date: "2024-02-28", status: "Attended", type: "Training" },
    { name: "Women's Conference", date: "2024-02-20", status: "Registered", type: "Conference" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {eventsHistory.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">{event.name}</p>
                <p className="text-sm text-gray-600">
                  {event.type} • {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <Badge variant={event.status === "Attended" ? "default" : "secondary"}>{event.status}</Badge>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Events Attended This Year:</strong> {memberData.eventsAttended}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
