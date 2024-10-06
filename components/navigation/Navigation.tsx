'use client'

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Code, Menu, Home, Info, Trophy, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"

const items = [
  {
    title: "HOME",
    href: "/",
    icon: Home,
  },
  {
    title: "ABOUT",
    href: "/about",
    icon: Info,
  },
  {
    title: "RANKING",
    href: "/ranking",
    icon: Trophy,
  },
  {
    title: "BLOG",
    href: "/blog",
    icon: BookOpen,
  },
]

const Navigation = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}>
        <div className="mx-auto max-w-screen-xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
              <Code className="h-6 w-6" />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              SyntaxEcho
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {items.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200",
                      "hover:bg-gray-100 hover:scale-105",
                      pathname === item.href 
                        ? "bg-black text-white hover:bg-gray-800" 
                        : "text-gray-600"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}>
          <nav className="flex flex-col p-4 space-y-2">
            {items.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-lg flex items-center space-x-3",
                    pathname === item.href 
                      ? "bg-black text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
      {/* Spacer to prevent content from being hidden under the fixed header */}
      <div className="h-20"></div>
    </>
  )
}

export default Navigation