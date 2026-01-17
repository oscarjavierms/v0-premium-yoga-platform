"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Play, Heart, ChevronRight, Clock, Target, Flame, BookOpen, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import ClassCard from "@/components/content/class-card"
import type { Class, UserProgress } from "@/types/content"

interface DashboardClientProps {
  profile: any
  preferences: any
  inProgressClasses: Array<{ class: Class } & UserProgress>
  favorites: Array<{ class: Class }>
  recommendedClasses: Class[]
  stats: {
    completedClasses: number
    favoritesCount: number
    currentStreak: number
  }
}

export default function DashboardClient({
  profile,
  preferences,
  inProgressClasses,
  favorites,
  recommendedClasses,
  stats,
}: DashboardClientProps) {
  const firstName = profile?.first_name || "Usuario"
  const greeting = getGreeting()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-light tracking-wider">
            WELLNESS
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/clases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Clases
            </Link>
            <Link href="/programas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Programas
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/mi-cuenta">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <form action="/auth/logout" method="POST">
              <Button type="submit" variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                <LogOut className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Welcome Section */}
        <section className="mb-10">
          <p className="text-muted-foreground mb-2">{greeting}</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">{firstName}</h1>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard icon={BookOpen} label="Clases completadas" value={stats.completedClasses} />
          <StatCard icon={Heart} label="Favoritos" value={stats.favoritesCount} />
          <StatCard icon={Flame} label="Racha actual" value={`${stats.currentStreak} días`} />
          <StatCard
            icon={Target}
            label="Meta semanal"
            value={`${Math.min(stats.completedClasses, preferences?.weekly_practice_goal || 3)}/${preferences?.weekly_practice_goal || 3}`}
          />
        </section>

        {/* Continue Watching */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-medium">Continuar viendo</h2>
            {inProgressClasses.length > 0 && (
              <Link href="/mi-actividad">
                <Button variant="ghost" className="gap-1 text-muted-foreground">
                  Ver todo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          {inProgressClasses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {inProgressClasses.map((item) => (
                <ContinueWatchingCard
                  key={item.id}
                  classData={item.class}
                  progress={item.watch_percentage}
                  position={item.watch_position_seconds}
                />
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-2xl p-12 text-center">
              <Play className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Aún no has comenzado ninguna clase</p>
              <Link href="/clases">
                <Button>Explorar clases</Button>
              </Link>
            </div>
          )}
        </section>

        {/* Favorites */}
        {favorites.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-medium">Tus favoritos</h2>
              <Link href="/favoritos">
                <Button variant="ghost" className="gap-1 text-muted-foreground">
                  Ver todo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((item) => (
                <ClassCard key={item.class.id} classData={item.class} isFavorite />
              ))}
            </div>
          </section>
        )}

        {/* Recommended for You */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl font-medium">Recomendado para ti</h2>
              <p className="text-sm text-muted-foreground mt-1">Basado en tus preferencias</p>
            </div>
            <Link href="/clases">
              <Button variant="ghost" className="gap-1 text-muted-foreground">
                Ver todo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {recommendedClasses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedClasses.map((classItem) => (
                <ClassCard key={classItem.id} classData={classItem} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-2xl p-12 text-center">
              <p className="text-muted-foreground mb-4">Explora nuestro catálogo de clases</p>
              <Link href="/clases">
                <Button>Ver todas las clases</Button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string | number
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5">
      <Icon className="h-5 w-5 text-muted-foreground mb-3" />
      <p className="text-2xl font-medium">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  )
}

function ContinueWatchingCard({
  classData,
  progress,
  position,
}: {
  classData: Class
  progress: number
  position: number
}) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} min restantes`
  }

  const remainingTime = classData.duration_minutes * 60 - position

  return (
    <Link href={`/clase/${classData.slug}`} className="group block">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-3">
        <Image
          src={classData.thumbnail_url || "/placeholder.svg?height=400&width=600&query=yoga class"}
          alt={classData.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <Progress value={progress} className="h-1 rounded-none bg-black/30" />
        </div>
      </div>

      <h3 className="font-medium line-clamp-1 group-hover:underline underline-offset-4">{classData.title}</h3>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        <Clock className="w-3 h-3" />
        <span>{formatTime(remainingTime)}</span>
      </div>
    </Link>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Buenos días,"
  if (hour < 18) return "Buenas tardes,"
  return "Buenas noches,"
}
