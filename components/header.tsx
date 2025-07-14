"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, Search, Phone, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchModal } from "@/components/ui/search-modal"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCallClick = () => {
    window.location.href = "tel:+2348125119785"
  }

  const handleDirectionsClick = () => {
    const address = "Cradle Event Hall, Cradle Hotel, works layout, Owerri Municipal, Owerri, Imo State, Nigeria"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, "_blank")
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg md:text-xl">DC</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <div
                  className={`font-bold text-lg md:text-xl transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}
                >
                  Dominion City
                </div>
                <div
                  className={`text-xs md:text-sm transition-colors ${isScrolled ? "text-gray-600" : "text-white/80"}`}
                >
                  Greatness Centre
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                href="/"
                className={`transition-colors hover:text-blue-600 font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex items-center transition-colors hover:text-blue-600 font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}
                >
                  About <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-lg border-0 shadow-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/about">Our Story</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/about/leadership">Leadership</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/about/beliefs">What We Believe</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/services"
                className={`transition-colors hover:text-blue-600 font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                Services
              </Link>
              <Link
                href="/events"
                className={`transition-colors hover:text-blue-600 font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                Events
              </Link>
              <Link
                href="/sermons"
                className={`transition-colors hover:text-blue-600 font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                Sermons
              </Link>
              <Link
                href="/ministries"
                className={`transition-colors hover:text-blue-600 font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                Ministries
              </Link>
              <Link
                href="/contact"
                className={`transition-colors hover:text-blue-600 font-medium ${isScrolled ? "text-gray-700" : "text-white"}`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className={`hover:scale-105 transition-transform ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"}`}
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:scale-105 transition-transform ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"}`}
                onClick={handleCallClick}
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:scale-105 transition-transform ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"}`}
                onClick={handleDirectionsClick}
              >
                <MapPin className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 backdrop-blur border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                asChild
              >
                <Link href="/giving">Give</Link>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className={`hover:scale-105 transition-transform ${isScrolled ? "text-gray-700" : "text-white"}`}
                onClick={handleCallClick}
              >
                <Phone className="w-4 h-4" />
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:scale-105 transition-transform ${isScrolled ? "text-gray-700" : "text-white"}`}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-lg">
                  <SheetHeader>
                    <SheetTitle className="text-left">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">DC</span>
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-900">Dominion City</div>
                          <div className="text-sm text-gray-600">Greatness Centre</div>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/"
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      href="/services"
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Services
                    </Link>
                    <Link
                      href="/events"
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Events
                    </Link>
                    <Link
                      href="/sermons"
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Sermons
                    </Link>
                    <Link
                      href="/ministries"
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Ministries
                    </Link>
                    <Link
                      href="/blog"
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/contact"
                      className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Contact
                    </Link>

                    <div className="border-t pt-4 space-y-3">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        asChild
                      >
                        <Link href="/giving">Give Online</Link>
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsSearchOpen(true)}>
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={handleDirectionsClick}>
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
