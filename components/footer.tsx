import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { SocialMediaFeed } from "@/components/ui/social-media-feed"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Social Media Section */}
      <section className="py-16 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <SocialMediaFeed />
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">DC</span>
              </div>
              <div>
                <div className="font-bold text-lg">Dominion City</div>
                <div className="text-sm text-gray-400">Greatness Centre</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming lives, building communities, and cultivating greatness through faith, love, and service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="text-gray-400 hover:text-white transition-colors">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="text-gray-400 hover:text-white transition-colors">
                  Ministries
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/giving" className="text-gray-400 hover:text-white transition-colors">
                  Giving
                </Link>
              </li>
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Ministries</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ministries/children" className="text-gray-400 hover:text-white transition-colors">
                  Children's Ministry
                </Link>
              </li>
              <li>
                <Link href="/ministries/youth" className="text-gray-400 hover:text-white transition-colors">
                  Youth Ministry
                </Link>
              </li>
              <li>
                <Link href="/ministries/young-adults" className="text-gray-400 hover:text-white transition-colors">
                  Young Adults
                </Link>
              </li>
              <li>
                <Link href="/ministries/men" className="text-gray-400 hover:text-white transition-colors">
                  Men's Ministry
                </Link>
              </li>
              <li>
                <Link href="/ministries/women" className="text-gray-400 hover:text-white transition-colors">
                  Women's Ministry
                </Link>
              </li>
              <li>
                <Link href="/ministries/seniors" className="text-gray-400 hover:text-white transition-colors">
                  Seniors Ministry
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Updated with correct location */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="text-gray-400">
                  <div>97 Works Layout</div>
                  <div>Owerri Municipal, Owerri</div>
                  <div>Imo State, Nigeria</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">+234 803 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">info@dominioncity.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dominion City Works Layout - Greatness Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
