"use client"

import { useState } from "react"
import { CategoryNav, type Category } from "./category-nav"
import { FilteredCatalog } from "./filtered-catalog"

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("yoga")

  return (
    <div className="bg-background">
      <CategoryNav onCategoryChange={setActiveCategory} activeCategory={activeCategory} />
      <FilteredCatalog activeCategory={activeCategory} />
    </div>
  )
}
