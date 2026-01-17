import { createClient } from "@/lib/supabase/server"
import ProgramsClient from "./programs-client"

export const metadata = {
  title: "Programas | Wellness Platform",
  description: "Descubre nuestros programas estructurados de yoga, meditación y bienestar.",
}

async function getPrograms() {
  const supabase = await createClient()

  const { data: programs, error } = await supabase
    .from("programs")
    .select(`
      *,
      instructor:instructors(id, name, slug, avatar_url)
    `)
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching programs:", error)
    return []
  }

  return programs
}

export default async function ProgramasPage() {
  const programs = await getPrograms()
  const featuredProgram = programs.find((p) => p.is_featured)
  const regularPrograms = programs.filter((p) => !p.is_featured)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-4">Programas</h1>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl">
            Transforma tu práctica con programas estructurados. Cada programa está diseñado para guiarte paso a paso
            hacia resultados concretos.
          </p>
        </div>
      </section>

      <ProgramsClient initialPrograms={programs} />
    </main>
  )
}
