const instructors = [
  {
    name: "Ana García",
    specialty: "Vinyasa & Hatha Yoga",
    duration: "30-60 min",
    image: "/professional-female-yoga-instructor-portrait-clean.jpg",
  },
  {
    name: "Carlos Mendoza",
    specialty: "Meditación & Mindfulness",
    duration: "15-45 min",
    image: "/professional-male-meditation-teacher-portrait-mini.jpg",
  },
  {
    name: "Laura Sánchez",
    specialty: "Fitness Consciente",
    duration: "40-55 min",
    image: "/professional-female-fitness-instructor-portrait-cl.jpg",
  },
  {
    name: "Miguel Torres",
    specialty: "Respiración & Pranayama",
    duration: "20-30 min",
    image: "/professional-male-breathwork-instructor-portrait-p.jpg",
  },
]

export function InstructorsSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-lg md:text-xl font-medium tracking-widest uppercase text-foreground text-center mb-16">
          Conoce a tus instructores
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {instructors.map((instructor, index) => (
            <div key={index} className="group text-center">
              <div className="relative overflow-hidden rounded-full aspect-square mb-5 mx-auto max-w-[200px]">
                <img
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium text-foreground">{instructor.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{instructor.specialty}</p>
              <p className="mt-1 text-xs text-muted-foreground">{instructor.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
