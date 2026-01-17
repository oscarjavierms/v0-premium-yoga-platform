"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, BarChart2, Heart, Share2, CheckCircle2 } from "lucide-react"
import VimeoPlayer from "@/components/video/vimeo-player"
import ClassCard from "@/components/content/class-card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { LEVEL_LABELS, PILLAR_LABELS, INTENSITY_LABELS } from "@/types/content"
import type { Class, UserProgress } from "@/types/content"

interface ClassDetailClientProps {
  classData: Class
  relatedClasses: Class[]
  initialProgress: UserProgress | null
}

export default function ClassDetailClient({ classData, relatedClasses, initialProgress }: ClassDetailClientProps) {
  const [user, setUser] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isCompleted, setIsCompleted] = useState(initialProgress?.is_completed || false)
  const [progress, setProgress] = useState<{ seconds: number; percent: number }>({
    seconds: initialProgress?.watch_position_seconds || 0,
    percent: initialProgress?.watch_percentage || 0,
  })

  useEffect(() => {
    const supabase = createClient()

    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)

      // Check if favorited
      if (user) {
        supabase
          .from("user_favorites")
          .select("id")
          .eq("user_id", user.id)
          .eq("class_id", classData.id)
          .single()
          .then(({ data }) => {
            setIsFavorite(!!data)
          })
      }
    })
  }, [classData.id])

  const toggleFavorite = async () => {
    if (!user) return

    const supabase = createClient()

    if (isFavorite) {
      await supabase.from("user_favorites").delete().eq("user_id", user.id).eq("class_id", classData.id)
    } else {
      await supabase.from("user_favorites").insert({
        user_id: user.id,
        class_id: classData.id,
      })
    }

    setIsFavorite(!isFavorite)
  }

  const handleComplete = () => {
    setIsCompleted(true)
  }

  const handleProgress = (newProgress: { seconds: number; percent: number }) => {
    setProgress(newProgress)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Back navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/clases"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a clases
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            {classData.vimeo_video_id ? (
              <VimeoPlayer
                vimeoId={classData.vimeo_video_id}
                classId={classData.id}
                userId={user?.id}
                initialPosition={initialProgress?.watch_position_seconds || 0}
                onComplete={handleComplete}
                onProgress={handleProgress}
              />
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Video no disponible</p>
              </div>
            )}

            {/* Class info */}
            <div className="space-y-6">
              {/* Category & completion badge */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {PILLAR_LABELS[classData.pillar]}
                </span>
                {isCompleted && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Completada
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl font-medium">{classData.title}</h1>

              {/* Actions */}
              <div className="flex items-center gap-4">
                {user && (
                  <Button variant="outline" size="sm" onClick={toggleFavorite} className="gap-2 bg-transparent">
                    <Heart className={isFavorite ? "fill-red-500 text-red-500" : ""} size={16} />
                    {isFavorite ? "Guardada" : "Guardar"}
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Share2 size={16} />
                  Compartir
                </Button>
              </div>

              {/* Description */}
              {classData.description && (
                <p className="text-muted-foreground leading-relaxed">{classData.description}</p>
              )}

              {/* Equipment & focus areas */}
              {(classData.equipment?.length || classData.focus_areas?.length) && (
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-border">
                  {classData.equipment && classData.equipment.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Equipamiento</h4>
                      <div className="flex flex-wrap gap-2">
                        {classData.equipment.map((item) => (
                          <span key={item} className="px-3 py-1 bg-muted text-sm rounded-full capitalize">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {classData.focus_areas && classData.focus_areas.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Áreas de enfoque</h4>
                      <div className="flex flex-wrap gap-2">
                        {classData.focus_areas.map((area) => (
                          <span key={area} className="px-3 py-1 bg-muted text-sm rounded-full capitalize">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Class details card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h3 className="font-medium text-lg">Detalles de la clase</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Duración
                  </span>
                  <span className="font-medium">{classData.duration_minutes} min</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart2 className="w-4 h-4" />
                    Nivel
                  </span>
                  <span className="font-medium">{LEVEL_LABELS[classData.level]}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Intensidad</span>
                  <span className="font-medium">{INTENSITY_LABELS[classData.intensity]}</span>
                </div>

                {classData.program && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">Programa</span>
                    <Link href={`/programa/${classData.program.slug}`} className="font-medium hover:underline">
                      {classData.program.title}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Instructor card */}
            {classData.instructor && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-medium text-lg mb-4">Instructora</h3>

                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    {classData.instructor.avatar_url && (
                      <Image
                        src={classData.instructor.avatar_url || "/placeholder.svg"}
                        alt={classData.instructor.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{classData.instructor.name}</h4>
                    {classData.instructor.specialty && (
                      <p className="text-sm text-muted-foreground">{classData.instructor.specialty}</p>
                    )}
                  </div>
                </div>

                {classData.instructor.bio && (
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-4">{classData.instructor.bio}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related classes */}
        {relatedClasses.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-8">Clases relacionadas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedClasses.map((classItem) => (
                <ClassCard key={classItem.id} classData={classItem} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
