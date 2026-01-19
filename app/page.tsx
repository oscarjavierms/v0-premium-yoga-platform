export const metadata = {
  title: "Premium Yoga Platform",
}
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSection } from "@/components/landing/problem-section"
import { PillarsSection } from "@/components/landing/pillars-section"
import { ClassesPreview } from "@/components/landing/classes-preview"
import { InstructorsSection } from "@/components/landing/instructors-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { ManifestoSection } from "@/components/landing/manifesto-section"
import { CTASection } from "@/components/landing/cta-section"

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
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <PillarsSection />
        <ClassesPreview />
        <InstructorsSection />
        <PricingSection />
        <ManifestoSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
