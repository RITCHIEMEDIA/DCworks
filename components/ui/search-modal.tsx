"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, Calendar, BookOpen, Users, Heart } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  type: "sermon" | "event" | "ministry" | "blog"
  url: string
  description: string
  date?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock search data - in real app, this would come from API/database
  const searchData: SearchResult[] = [
    {
      id: "1",
      title: "Walking in Your Purpose",
      type: "sermon",
      url: "/sermons/walking-in-your-purpose",
      description: "Discover how to identify and walk confidently in the purpose God has designed for your life.",
      date: "March 10, 2024",
    },
    {
      id: "2",
      title: "Youth Conference 2024",
      type: "event",
      url: "/events/youth-conference-2024",
      description: "A transformative weekend for young people to encounter God and discover their purpose.",
      date: "March 15-17, 2024",
    },
    {
      id: "3",
      title: "Children's Ministry",
      type: "ministry",
      url: "/ministries/children",
      description: "Nurturing the next generation with age-appropriate programs, Bible stories, and fun activities.",
    },
    {
      id: "4",
      title: "Building Strong Communities",
      type: "blog",
      url: "/blog/building-strong-communities",
      description: "How our church is making a difference in the local community through various outreach programs.",
      date: "March 8, 2024",
    },
  ]

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const getIcon = (type: string) => {
    switch (type) {
      case "sermon":
        return <BookOpen className="w-4 h-4" />
      case "event":
        return <Calendar className="w-4 h-4" />
      case "ministry":
        return <Users className="w-4 h-4" />
      case "blog":
        return <Heart className="w-4 h-4" />
      default:
        return <Search className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sermon":
        return "text-blue-600 bg-blue-50"
      case "event":
        return "text-green-600 bg-green-50"
      case "ministry":
        return "text-purple-600 bg-purple-50"
      case "blog":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Dominion City
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search sermons, events, ministries, and more..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Searching...</div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    onClick={onClose}
                    className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getTypeColor(result.type)}`}>{getIcon(result.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{result.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                        {result.date && <p className="text-xs text-gray-500 mt-2">{result.date}</p>}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(result.type)} capitalize`}>
                        {result.type}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="text-center py-8 text-gray-500">No results found for "{query}"</div>
            ) : (
              <div className="text-center py-8 text-gray-500">Start typing to search...</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
