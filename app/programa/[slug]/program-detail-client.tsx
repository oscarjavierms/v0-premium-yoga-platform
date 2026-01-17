"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, BookOpen, Clock, CheckCircle2, Lock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LEVEL_LABELS, PILLAR_LABELS } from "@/types/content"
import type { Program, Class } from "@/types/content"

interface ProgramDetailClientProps {
  program: Program & { classes?: Class[] }
}

export default function ProgramDetailClient({ program }: ProgramDetailClientProps) {
  const classes = program.classes || []

  const programProgress = useMemo(() => {
    if (classes.length === 0) return 0
    const completed = classes.filter((c) => c.user_progress?.is_completed).length
    return Math.round((completed / classes.length) * 100)
  }, [classes])

  const nextClass = useMemo(() => {
    // Find first incomplete class or the first class
    const incomplete = classes.find((c) => !c.user_progress?.is_completed)
    return incomplete || classes[0]
  }, [classes])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative">
        {/* Cover image */}
        <div className="absolute inset-0 h-[50vh] md:h-[60vh]">
          <Image
            src={
              program.cover_url ||
              program.thumbnail_url ||
              "/placeholder.svg?height=800&width=1600&query=yoga program cover"
            }
            alt={program.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-8 pb-16 md:pb-24">
          {/* Back link */}
          <Link
            href="/programas"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a programas
          </Link>

          <div className="max-w-3xl pt-[20vh] md:pt-[25vh]">
            {/* Category */}
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {PILLAR_LABELS[program.pillar]}
            </span>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-4 mb-6">{program.title}</h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">{program.description}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
              {program.duration_days && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {program.duration_days} días
                </span>
              )}
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {program.total_classes} clases
              </span>
              <span>{LEVEL_LABELS[program.level]}</span>
            </div>

            {/* Instructor */}
            {program.instructor && (
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                  {program.instructor.avatar_url && (
                    <Image
                      src={program.instructor.avatar_url || "/placeholder.svg"}
                      alt={program.instructor.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instructora</p>
                  <p className="font-medium">{program.instructor.name}</p>
                </div>
              </div>
            )}

            {/* Progress & CTA */}
            {programProgress > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tu progreso</span>
                  <span className="font-medium">{programProgress}%</span>
                </div>
                <Progress value={programProgress} className="h-2" />
              </div>
            )}

            {nextClass && (
              <Link href={`/clase/${nextClass.slug}`}>
                <Button size="lg" className="gap-2">
                  <Play className="w-4 h-4" fill="currentColor" />
                  {programProgress > 0 ? "Continuar programa" : "Comenzar programa"}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Classes list */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-medium mb-8">Contenido del programa</h2>

          <div className="space-y-4">
            {classes.map((classItem, index) => (
              <ClassListItem key={classItem.id} classItem={classItem} index={index + 1} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ClassListItem({ classItem, index }: { classItem: Class; index: number }) {
  const isCompleted = classItem.user_progress?.is_completed
  const isLocked = !classItem.is_free && false // Would check subscription status here

  return (
    <Link
      href={isLocked ? "#" : `/clase/${classItem.slug}`}
      className={`block bg-card border border-border rounded-lg p-4 md:p-6 hover:border-foreground/20 transition-all ${
        isLocked ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex items-center gap-4 md:gap-6">
        {/* Index/Status */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : isLocked ? (
            <Lock className="w-4 h-4 text-muted-foreground" />
          ) : (
            <span className="text-sm font-medium">{index}</span>
          )}
        </div>

        {/* Thumbnail */}
        <div className="hidden sm:block relative w-24 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={classItem.thumbnail_url || "/placeholder.svg?height=100&width=150&query=yoga class"}
            alt={classItem.title}
            fill
            className="object-cover"
          />
          {classItem.user_progress && !isCompleted && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
              <div className="h-full bg-white" style={{ width: `${classItem.user_progress.watch_percentage}%` }} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {classItem.day_number && <span className="text-xs text-muted-foreground">Día {classItem.day_number}</span>}
            {classItem.is_free && (
              <span className="text-xs font-medium bg-foreground/10 px-2 py-0.5 rounded">Gratis</span>
            )}
          </div>
          <h3 className="font-medium truncate">{classItem.title}</h3>
          {classItem.description && (
            <p className="text-sm text-muted-foreground line-clamp-1 hidden md:block">{classItem.description}</p>
          )}
        </div>

        {/* Duration */}
        <div className="flex-shrink-0 text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {classItem.duration_minutes} min
        </div>
      </div>
    </Link>
  )
}
