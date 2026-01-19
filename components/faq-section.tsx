"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "¿Este programa es para principiantes o para personas con experiencia?",
    answer:
      "Nuestros programas están diseñados para todos los niveles. Cada clase incluye modificaciones y variaciones para que puedas adaptar la práctica a tu nivel actual, ya seas principiante o tengas años de experiencia.",
  },
  {
    question: "¿Necesito experiencia previa en yoga o meditación?",
    answer:
      "No es necesaria ninguna experiencia previa. Nuestros instructores te guiarán paso a paso, explicando cada postura y técnica de manera clara y accesible.",
  },
  {
    question: "¿Cuánto tiempo necesito dedicarle a la semana?",
    answer:
      "Recomendamos al menos 3-4 sesiones por semana de 20-45 minutos cada una. Sin embargo, incluso 10 minutos diarios pueden hacer una diferencia significativa en tu bienestar.",
  },
  {
    question: "¿Qué hace diferente a esta plataforma?",
    answer:
      "Nos enfocamos en calidad sobre cantidad. Cada clase está cuidadosamente curada por instructores certificados, con un enfoque en la experiencia consciente y el bienestar integral, no solo el ejercicio físico.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <div className="hidden lg:block">
            <img
              src="/person-relaxing-with-tablet-in-minimalist-living-r.jpg"
              alt="Persona relajándose con tablet"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* FAQ Accordion */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10">Preguntas frecuentes</h2>

            <div className="space-y-0 divide-y divide-border">
              {faqs.map((faq, index) => (
                <div key={index} className="py-5">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex items-start justify-between w-full text-left gap-4"
                  >
                    <span className="text-base font-medium text-foreground pr-4">{faq.question}</span>
                    <span className="flex-shrink-0 text-muted-foreground">
                      {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0",
                    )}
                  >
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-10 px-8 py-6 text-base font-normal bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              Empieza tu práctica
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
