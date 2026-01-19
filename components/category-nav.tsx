"use client"
import { cn } from "@/lib/utils"

type Category = "all" | "yoga" | "meditacion" | "fitness"

interface CategoryNavProps {
  onCategoryChange: (category: Category) => void
  activeCategory: Category
}

const categories = [
  { id: "yoga" as const, label: "Yoga", number: "01" },
  { id: "meditacion" as const, label: "Meditación", number: "02" },
  { id: "fitness" as const, label: "Fitness", number: "03" },
]

export function CategoryNav({ onCategoryChange, activeCategory }: CategoryNavProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-center gap-16 md:gap-24 lg:gap-32">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Number */}
              <span className="text-[10px] font-sans tracking-widest text-muted-foreground mb-2">
                {category.number}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "font-serif text-xl md:text-2xl lg:text-3xl transition-colors duration-300",
                  activeCategory === category.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {category.label}
              </span>

              {/* Expanding underline */}
              <span
                className={cn(
                  "absolute -bottom-2 left-1/2 h-[1px] bg-foreground transition-all duration-300 ease-out",
                  activeCategory === category.id
                    ? "w-full -translate-x-1/2"
                    : "w-0 -translate-x-1/2 group-hover:w-full",
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}

export type { Category }
