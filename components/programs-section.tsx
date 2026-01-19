"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const programs = [
  {
    title: "Despertar Consciente",
    type: "Yoga + Meditación",
    duration: "21 días",
    image: "/person-doing-gentle-morning-yoga-in-bright-minimal.jpg",
  },
  {
    title: "Calma Interior",
    type: "Meditación",
    duration: "14 días",
    image: "/peaceful-meditation-session-in-serene-room-with-so.jpg",
  },
  {
    title: "Fuerza y Equilibrio",
    type: "Fitness Consciente",
    duration: "28 días",
    image: "/mindful-fitness-training-in-clean-modern-studio.jpg",
  },
  {
    title: "Respira Profundo",
    type: "Respiración",
    duration: "7 días",
    image: "/breathwork-session-in-peaceful-minimalist-space.jpg",
  },
]

export function ProgramsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Programas exclusivos</h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="p-2 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente"
              className="p-2 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {programs.map((program, index) => (
            <div key={index} className={cn("flex-shrink-0 w-[320px] md:w-[380px] snap-start", "group cursor-pointer")}>
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-foreground">{program.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span>{program.type}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>{program.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
