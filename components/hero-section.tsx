"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Flower2, Flame, Dumbbell, Wind } from "lucide-react"

const categories = [
  {
    name: "Yoga",
    icon: Flower2,
    href: "/yoga",
  },
  {
    name: "Meditación",
    icon: Flame,
    href: "/meditacion",
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    href: "/fitness",
  },
  {
    name: "Respiración",
    icon: Wind,
    href: "#",
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/serene-person-meditating-in-minimalist-bright-room.jpg"
          alt="Persona meditando en un espacio sereno"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight tracking-tight text-balance">
            Encuentra tu paz interior
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Clases ilimitadas para cuerpo, mente y alma
          </p>
          <Button
            size="lg"
            className="mt-10 px-10 py-6 text-base font-normal bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
          >
            Comienza ya
          </Button>
        </div>
      </div>

      {/* Floating Category Buttons */}
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="flex items-center justify-center gap-6 md:gap-10">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className={cn("group flex flex-col items-center gap-3", "transition-all duration-300")}
              >
                <div
                  className={cn(
                    "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
                    "rounded-full",
                    "bg-white/20 backdrop-blur-md",
                    "border border-white/60",
                    "flex items-center justify-center",
                    "group-hover:bg-white/90 group-hover:border-white",
                    "group-hover:scale-105",
                    "shadow-lg shadow-black/5",
                    "transition-all duration-300",
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10",
                      "text-neutral-800",
                      "stroke-[1.25]",
                      "group-hover:text-neutral-900",
                      "transition-colors duration-300",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] md:text-xs tracking-[0.2em] uppercase",
                    "font-medium text-neutral-800",
                    "drop-shadow-sm",
                    "transition-colors duration-300",
                  )}
                >
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
