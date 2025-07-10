"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, TrendingUp, Eye, Clock, Smartphone, Monitor, Download, RefreshCw } from "lucide-react"

interface AnalyticsData {
  overview: {
    totalVisitors: number
    totalPageViews: number
    averageSessionDuration: string
    bounceRate: number
    newVisitors: number
    returningVisitors: number
  }
  traffic: {
    organic: number
    direct: number
    social: number
    referral: number
  }
  devices: {
    mobile: number
    desktop: number
    tablet: number
  }
  topPages: Array<{
    page: string
    views: number
    uniqueViews: number
  }>
  events: Array<{
    name: string
    registrations: number
    attendance: number
    conversionRate: number
  }>
  giving: {
    totalAmount: number
    totalDonations: number
    averageDonation: number
    topFunds: Array<{
      fund: string
      amount: number
      percentage: number
    }>
  }
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setLoading(true)

    // Simulate API call - in production, this would fetch real analytics data
    setTimeout(() => {
      setData({
        overview: {
          totalVisitors: 12450,
          totalPageViews: 45230,
          averageSessionDuration: "3m 24s",
          bounceRate: 32.5,
          newVisitors: 8920,
          returningVisitors: 3530,
        },
        traffic: {
          organic: 45,
          direct: 30,
          social: 15,
          referral: 10,
        },
        devices: {
          mobile: 68,
          desktop: 25,
          tablet: 7,
        },
        topPages: [
          { page: "/sermons", views: 8450, uniqueViews: 6230 },
          { page: "/events", views: 6780, uniqueViews: 5120 },
          { page: "/giving", views: 4560, uniqueViews: 3890 },
          { page: "/about", views: 3240, uniqueViews: 2890 },
          { page: "/contact", views: 2890, uniqueViews: 2340 },
        ],
        events: [
          { name: "Youth Conference 2024", registrations: 245, attendance: 220, conversionRate: 89.8 },
          { name: "Community Outreach", registrations: 180, attendance: 165, conversionRate: 91.7 },
          { name: "Leadership Training", registrations: 95, attendance: 88, conversionRate: 92.6 },
          { name: "Women's Conference", registrations: 320, attendance: 298, conversionRate: 93.1 },
        ],
        giving: {
          totalAmount: 2450000,
          totalDonations: 1240,
          averageDonation: 1975,
          topFunds: [
            { fund: "General Fund", amount: 1200000, percentage: 49 },
            { fund: "Building Fund", amount: 735000, percentage: 30 },
            { fund: "Missions", amount: 294000, percentage: 12 },
            { fund: "Youth Ministry", amount: 147000, percentage: 6 },
            { fund: "Outreach", amount: 74000, percentage: 3 },
          ],
        },
      })
      setLoading(false)
    }, 1000)
  }

  if (loading || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Website performance and engagement insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={loadAnalyticsData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Visitors</p>
                <p className="text-2xl font-bold">{data.overview.totalVisitors.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+12.5%</span>
              <span className="text-gray-600 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Page Views</p>
                <p className="text-2xl font-bold">{data.overview.totalPageViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+8.3%</span>
              <span className="text-gray-600 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Session</p>
                <p className="text-2xl font-bold">{data.overview.averageSessionDuration}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+15.2%</span>
              <span className="text-gray-600 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bounce Rate</p>
                <p className="text-2xl font-bold">{data.overview.bounceRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600">-5.1%</span>
              <span className="text-gray-600 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="giving">Giving</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(data.traffic).map(([source, percentage]) => (
                    <div key={source} className="flex items-center justify-between">
                      <span className="capitalize">{source}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Types */}
            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${data.devices.mobile}%` }} />
                      </div>
                      <span className="text-sm font-medium">{data.devices.mobile}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <span>Desktop</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${data.devices.desktop}%` }} />
                      </div>
                      <span className="text-sm font-medium">{data.devices.desktop}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <span>Tablet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${data.devices.tablet}%` }} />
                      </div>
                      <span className="text-sm font-medium">{data.devices.tablet}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{page.page}</p>
                      <p className="text-sm text-gray-600">{page.uniqueViews.toLocaleString()} unique views</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{page.views.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">total views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.events.map((event, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{event.name}</h3>
                      <span className="text-sm text-green-600 font-medium">
                        {event.conversionRate}% attendance rate
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Registrations</p>
                        <p className="font-bold">{event.registrations}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Attendance</p>
                        <p className="font-bold">{event.attendance}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">No-shows</p>
                        <p className="font-bold">{event.registrations - event.attendance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="giving">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Giving Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Amount</span>
                    <span className="font-bold text-lg">₦{data.giving.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Donations</span>
                    <span className="font-bold">{data.giving.totalDonations.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Donation</span>
                    <span className="font-bold">₦{data.giving.averageDonation.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.giving.topFunds.map((fund, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{fund.fund}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${fund.percentage}%` }} />
                        </div>
                        <span className="text-sm font-medium">₦{fund.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
