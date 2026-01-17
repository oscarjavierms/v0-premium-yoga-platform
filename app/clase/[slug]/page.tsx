import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ClassDetailClient from "./class-detail-client"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

async function getClass(slug: string) {
  const supabase = await createClient()

  const { data: classData, error } = await supabase
    .from("classes")
    .select(`
      *,
      instructor:instructors(*),
      program:programs(id, title, slug, total_classes)
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (error || !classData) {
    return null
  }

  return classData
}

async function getRelatedClasses(classId: string, pillar: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from("classes")
    .select(`
      *,
      instructor:instructors(id, name, slug, avatar_url)
    `)
    .eq("pillar", pillar)
    .eq("is_published", true)
    .neq("id", classId)
    .limit(4)

  return data || []
}

async function getUserProgress(classId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("class_id", classId)
    .single()

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const classData = await getClass(slug)

  if (!classData) {
    return { title: "Clase no encontrada" }
  }

  return {
    title: `${classData.title} | Wellness Platform`,
    description: classData.description || `Clase de ${classData.pillar} con ${classData.instructor?.name}`,
  }
}

export default async function ClasePage({ params }: Props) {
  const { slug } = await params
  const classData = await getClass(slug)

  if (!classData) {
    notFound()
  }

  const [relatedClasses, userProgress] = await Promise.all([
    getRelatedClasses(classData.id, classData.pillar),
    getUserProgress(classData.id),
  ])

  return <ClassDetailClient classData={classData} relatedClasses={relatedClasses} initialProgress={userProgress} />
}
