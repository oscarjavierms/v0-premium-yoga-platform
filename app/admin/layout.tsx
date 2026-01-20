import type React from "react"


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
