"use client"

import { cn } from "@/lib/utils"
import { Flower2, Flame, Dumbbell, Wind } from "lucide-react"

const categories = [
  {
    name: "Yoga",
    icon: Flower2, // Lotus/flower for yoga
  },
  {
    name: "Meditación",
    icon: Flame, // Calm flame for meditation
  },
  {
    name: "Fitness",
    icon: Dumbbell, // Dumbbell for fitness
  },
  {
    name: "Respiración",
    icon: Wind, // Air waves for breathing
  },
]

export function CategoriesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex justify-start md:justify-center gap-8 lg:gap-16 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.name}
                className={cn("group flex flex-col items-center gap-4", "flex-shrink-0", "transition-all duration-300")}
              >
                <div
                  className={cn(
                    "w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32",
                    "aspect-square rounded-full",
                    "bg-white border border-neutral-200",
                    "flex items-center justify-center",
                    "group-hover:bg-neutral-900 group-hover:border-neutral-900",
                    "transition-all duration-300",
                  )}
                >
                  <IconComponent
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14",
                      "text-neutral-700",
                      "stroke-[1.25]", // Thin consistent stroke weight
                      "group-hover:text-white",
                      "transition-colors duration-300",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs tracking-widest uppercase",
                    "font-light text-muted-foreground",
                    "group-hover:text-foreground",
                    "transition-colors duration-300",
                  )}
                >
                  {category.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
