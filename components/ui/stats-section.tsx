"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "./animated-counter"
import { Users, Heart, Calendar, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 2000,
    suffix: "+",
    label: "Active Members",
    color: "text-blue-600",
  },
  {
    icon: Heart,
    value: 500,
    suffix: "+",
    label: "Families Served",
    color: "text-red-600",
  },
  {
    icon: Calendar,
    value: 150,
    suffix: "+",
    label: "Events This Year",
    color: "text-green-600",
  },
  {
    icon: Globe,
    value: 5,
    label: "Community Programs",
    color: "text-purple-600",
  },
]

export function StatsSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className="text-center hover-lift hover-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className={`inline-flex p-3 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
