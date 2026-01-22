"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Esto enviará a todos los que entren a la raíz directo a tu nuevo santuario
    router.push("/mi-santuario")
  }, [router])

  return <div className="bg-white min-h-screen" /> // Pantalla blanca mientras redirige
}
