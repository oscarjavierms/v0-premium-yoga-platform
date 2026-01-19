"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const classes = [
  {
    title: "Vinyasa Flow Matutino",
    duration: "45 min",
    image: "/vinyasa-yoga-flow-in-bright-airy-studio.jpg",
  },
  {
    title: "Meditación Guiada",
    duration: "20 min",
    image: "/guided-meditation-peaceful-environment.jpg",
  },
  {
    title: "Yoga Restaurativo",
    duration: "60 min",
    image: "/restorative-yoga-with-props-in-calm-setting.jpg",
  },
  {
    title: "Breathwork Intensivo",
    duration: "30 min",
    image: "/breathwork-practice-deep-breathing.jpg",
  },
  {
    title: "Hatha Suave",
    duration: "50 min",
    image: "/gentle-hatha-yoga-class-minimalist-studio.jpg",
  },
]

export function ClassesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
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
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Clases destacadas</h2>
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
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {classes.map((classItem, index) => (
            <div key={index} className={cn("flex-shrink-0 w-[260px] md:w-[300px] snap-start", "group cursor-pointer")}>
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={classItem.image || "/placeholder.svg"}
                  alt={classItem.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-base font-medium text-foreground">{classItem.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{classItem.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
