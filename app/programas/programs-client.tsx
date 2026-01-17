"use client"

import { useState, useMemo } from "react"
import ContentFilters, { type FilterState } from "@/components/content/content-filters"
import ProgramCard from "@/components/content/program-card"
import type { Program } from "@/types/content"

interface ProgramsClientProps {
  initialPrograms: Program[]
}

export default function ProgramsClient({ initialPrograms }: ProgramsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    pillar: null,
    level: null,
    duration: null,
  })

  const filteredPrograms = useMemo(() => {
    return initialPrograms.filter((program) => {
      if (filters.pillar && program.pillar !== filters.pillar) {
        return false
      }
      if (filters.level && program.level !== filters.level && program.level !== "todos") {
        return false
      }
      return true
    })
  }, [initialPrograms, filters])

  const featuredProgram = filteredPrograms.find((p) => p.is_featured)
  const regularPrograms = filteredPrograms.filter((p) => !p.is_featured)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Filters */}
        <ContentFilters
          onFilterChange={setFilters}
          showDuration={false}
          className="mb-10 pb-8 border-b border-border"
        />

        {/* Featured program */}
        {featuredProgram && (
          <div className="mb-12">
            <ProgramCard program={featuredProgram} variant="featured" />
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredPrograms.length} {filteredPrograms.length === 1 ? "programa" : "programas"} encontrados
        </p>

        {/* Programs grid */}
        {regularPrograms.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No se encontraron programas con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </section>
  )
}
