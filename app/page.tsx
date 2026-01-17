export const metadata = {
  title: "Premium Yoga Platform",
}

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Premium Yoga Platform</h1>
      <p className="text-muted-foreground mt-2">
        Bienvenido. Ve al panel de admin en /admin
      </p>
      <a className="underline mt-4 inline-block" href="/admin">
        Ir al Admin
      </a>
    </main>
  )
}
