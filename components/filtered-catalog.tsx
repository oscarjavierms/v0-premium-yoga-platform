"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "./category-nav"

const allSeries = [
  {
    id: 1,
    title: "Despertar Consciente",
    category: "yoga",
    classes: 12,
    level: "Principiante",
    image: "/person-doing-gentle-morning-yoga-in-bright-minimal.jpg",
  },
  {
    id: 2,
    title: "Vinyasa Flow",
    category: "yoga",
    classes: 8,
    level: "Intermedio",
    image: "/vinyasa-yoga-flow-in-bright-airy-studio.jpg",
  },
  {
    id: 3,
    title: "Hatha Esencial",
    category: "yoga",
    classes: 10,
    level: "Todos los niveles",
    image: "/gentle-hatha-yoga-class-minimalist-studio.jpg",
  },
  {
    id: 4,
    title: "Calma Interior",
    category: "meditacion",
    classes: 14,
    level: "Principiante",
    image: "/peaceful-meditation-session-in-serene-room-with-so.jpg",
  },
  {
    id: 5,
    title: "Mindfulness Diario",
    category: "meditacion",
    classes: 21,
    level: "Todos los niveles",
    image: "/guided-meditation-peaceful-environment.jpg",
  },
  {
    id: 6,
    title: "Meditación Profunda",
    category: "meditacion",
    classes: 7,
    level: "Avanzado",
    image: "/woman-meditating-peaceful-serene-minimal-studio.jpg",
  },
  {
    id: 7,
    title: "Fuerza y Equilibrio",
    category: "fitness",
    classes: 16,
    level: "Intermedio",
    image: "/mindful-fitness-training-in-clean-modern-studio.jpg",
  },
  {
    id: 8,
    title: "Core Power",
    category: "fitness",
    classes: 10,
    level: "Avanzado",
    image: "/woman-fitness-workout-elegant-minimal-studio.jpg",
  },
  {
    id: 9,
    title: "Movimiento Consciente",
    category: "fitness",
    classes: 12,
    level: "Principiante",
    image: "/woman-fitness-workout-elegant-minimal.jpg",
  },
]

interface FilteredCatalogProps {
  activeCategory: Category
}

export function FilteredCatalog({ activeCategory }: FilteredCatalogProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredSeries =
    activeCategory === "all" ? allSeries : allSeries.filter((series) => series.category === activeCategory)

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
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-muted-foreground">Series disponibles</h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="p-2 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente"
              className="p-2 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredSeries.map((series, index) => (
            <div
              key={series.id}
              className={cn(
                "flex-shrink-0 w-[280px] md:w-[320px] snap-start",
                "group cursor-pointer",
                "animate-in fade-in duration-500",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={series.image || "/placeholder.svg"}
                  alt={series.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-4">
                {/* Number + Title */}
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-sans tracking-widest text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <h3 className="font-serif text-base md:text-lg text-foreground uppercase tracking-wide">
                    {series.title}
                  </h3>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground">
                    {series.classes} clases
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground/50" />
                  <span className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground">
                    {series.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
