"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Play, Users, Heart, Phone } from "lucide-react"

export function MobileNavigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/events", icon: Calendar, label: "Events" },
    { href: "/sermons", icon: Play, label: "Sermons" },
    { href: "/ministries", icon: Users, label: "Ministries" },
    { href: "/giving", icon: Heart, label: "Give" },
  ]

  const handleCallClick = () => {
    window.location.href = "tel:+2348031234567"
  }

  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""} transition-transform`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}

        <button
          onClick={handleCallClick}
          className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs font-medium">Call</span>
        </button>
      </div>
    </nav>
  )
}
