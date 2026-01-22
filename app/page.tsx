"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  useEffect(() => {
    router.push("/mi-santuario")
  }, [router])
  return <div className="bg-white min-h-screen" />
}
