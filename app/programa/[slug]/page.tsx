import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ProgramDetailClient from "./program-detail-client"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

async function getProgram(slug: string) {
  const supabase = await createClient()

  const { data: program, error } = await supabase
    .from("programs")
    .select(`
      *,
      instructor:instructors(*),
      classes(
        *,
        instructor:instructors(id, name, slug, avatar_url)
      )
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (error || !program) {
    return null
  }

  // Sort classes by sequence/day_number
  if (program.classes) {
    program.classes.sort((a: any, b: any) => {
      if (a.sequence !== null && b.sequence !== null) {
        return a.sequence - b.sequence
      }
      if (a.day_number !== null && b.day_number !== null) {
        return a.day_number - b.day_number
      }
      return 0
    })
  }

  return program
}

async function getUserProgramProgress(programId: string, classIds: string[]) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || classIds.length === 0) return {}

  const { data } = await supabase.from("user_progress").select("*").eq("user_id", user.id).in("class_id", classIds)

  const progressMap: Record<string, any> = {}
  data?.forEach((p) => {
    progressMap[p.class_id] = p
  })

  return progressMap
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgram(slug)

  if (!program) {
    return { title: "Programa no encontrado" }
  }

  return {
    title: `${program.title} | Wellness Platform`,
    description: program.short_description || program.description,
  }
}

export default async function ProgramaPage({ params }: Props) {
  const { slug } = await params
  const program = await getProgram(slug)

  if (!program) {
    notFound()
  }

  const classIds = program.classes?.map((c: any) => c.id) || []
  const progressMap = await getUserProgramProgress(program.id, classIds)

  // Attach progress to classes
  if (program.classes) {
    program.classes = program.classes.map((c: any) => ({
      ...c,
      user_progress: progressMap[c.id] || null,
    }))
  }

  return <ProgramDetailClient program={program} />
}
