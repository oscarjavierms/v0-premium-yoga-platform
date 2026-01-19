"use client"

import { useState, useEffect, useRef } from "react"
import { Search, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navLinks = [
  {
    name: "Yoga",
    href: "#yoga",
    preview: {
      image: "/woman-meditating-yoga-pose-serene-minimal-studio.jpg",
      category: "Yoga",
      title: "Serie Fundamental: Vinyasa & Flow",
      description: "6 Sesiones exclusivas para elevar tu práctica diaria",
    },
  },
  {
    name: "Meditación",
    href: "#meditacion",
    preview: {
      image: "/woman-meditating-peaceful-serene-minimal-studio.jpg",
      category: "Meditación",
      title: "Paz Interior: Mindfulness Esencial",
      description: "8 Sesiones guiadas para cultivar la calma interior",
    },
  },
  {
    name: "Fitness",
    href: "#fitness",
    preview: {
      image: "/woman-fitness-workout-elegant-minimal-studio.jpg",
      category: "Fitness",
      title: "Fuerza & Tono: Full Body",
      description: "10 Sesiones de alta intensidad para transformar tu cuerpo",
    },
  },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActivePreview(name)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActivePreview(null)
    }, 50)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent",
      )}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="font-serif text-2xl tracking-tight text-foreground">
            Calma
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-6 pointer-events-none">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative flex flex-col items-center"
                style={{ zIndex: activePreview === link.name ? 60 : 10 }}
              >
                <a
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors duration-200 px-4 py-1 pointer-events-auto",
                    activePreview === link.name ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.name}
                </a>

                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pointer-events-none"
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={cn(
                      "w-16 h-3 mx-auto",
                      activePreview === link.name ? "pointer-events-auto" : "pointer-events-none",
                    )}
                  />

                  <div
                    className={cn(
                      "w-80 bg-white rounded-xl shadow-xl border border-border/50 overflow-hidden transition-all duration-300 ease-out origin-top",
                      activePreview === link.name
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 -translate-y-2 scale-95 pointer-events-none",
                    )}
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={link.preview.image || "/placeholder.svg"}
                        alt={link.preview.title}
                        fill
                        className={cn(
                          "object-cover transition-transform duration-300 origin-center",
                          activePreview === link.name && "scale-105",
                        )}
                      />
                    </div>

                    <div className="p-5 text-center flex flex-col items-center justify-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                        {link.preview.category}
                      </p>
                      <h3 className="font-serif text-lg text-foreground mb-2">{link.preview.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{link.preview.description}</p>
                      <a
                        href={link.href}
                        className="inline-block w-full text-center py-2.5 px-4 border border-foreground text-sm font-medium transition-all duration-200 bg-foreground text-background hover:bg-transparent hover:text-foreground"
                      >
                        Ver Serie Completa
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <button
              aria-label="Buscar"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label="Iniciar sesión"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
