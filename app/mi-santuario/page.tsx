"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Sparkles, Clock, BookOpen, ChevronRight } from "lucide-react"

export default function MiSantuarioPage() {
  const [saludo, setSaludo] = useState("Holaaaaaaaassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")

  useEffect(() => {
    const hora = new Date().getHours()
    if (hora < 12) setSaludo("Buenos días")
    else if (hora < 20) setSaludo("Buenas tardes")
    else setSaludo("Buenas noches")
  }, [])

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Encabezado Estilo Editorial */}
        <section className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/30 block mb-4">
            Tu refugio personal
          </span>
          <h1 className="text-6xl md:text-7xl font-serif italic text-black tracking-tighter mb-6">
            {saludo}, oscar.
          </h1>
          <p className="text-lg font-light text-black/50 max-w-xl leading-relaxed">
            Tu espacio de bienestar te espera. Cada práctica es un paso hacia tu mejor versión.
          </p>
        </section>

        {/* Los 3 Cuadros de la Foto 2 - Ahora con fondo blanco puro y bordes finos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="border border-black/5 p-10 flex flex-col justify-between h-56 bg-white transition-all hover:border-black/20">
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-black/40">
              <Sparkles size={14} strokeWidth={1} /> DÍAS DE CONCIENCIA
            </div>
            <span className="text-6xl font-light tracking-tighter text-black">0</span>
          </div>

          <div className="border border-black/5 p-10 flex flex-col justify-between h-56 bg-white transition-all hover:border-black/20">
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-black/40">
              <Clock size={14} strokeWidth={1} /> MINUTOS DE INTENCIÓN
            </div>
            <span className="text-6xl font-light tracking-tighter text-black">0</span>
          </div>

          <div className="border border-black/5 p-10 flex flex-col justify-between h-56 bg-white transition-all hover:border-black/20">
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-black/40">
              <BookOpen size={14} strokeWidth={1} /> CLASES COMPLETADAS
            </div>
            <span className="text-6xl font-light tracking-tighter text-black">0</span>
          </div>
        </div>

        {/* Acceso a "Mi Práctica" que te lleva a /favoritos */}
        <section className="border-t border-black/5 pt-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-serif italic mb-2">Mi Práctica</h3>
              <p className="text-sm text-black/40 font-light">Accede a tus clases favoritas y retoma tu camino hacia la paz interior.</p>
            </div>
            
            <Link 
              href="/favoritos" 
              className="group flex items-center gap-10 border border-black px-10 py-5 hover:bg-black hover:text-white transition-all duration-500"
            >
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold">Ver mis clases</span>
              <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
