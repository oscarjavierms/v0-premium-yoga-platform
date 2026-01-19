import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CatalogSection } from "@/components/catalog-section"
import { ProgramsSection } from "@/components/programs-section"
import { ClassesSection } from "@/components/classes-section"
import { InstructorsSection } from "@/components/instructors-section"
import { FaqSection } from "@/components/faq-section"
import { FinalMessage } from "@/components/final-message"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CatalogSection />
      <ProgramsSection />
      <ClassesSection />
      <InstructorsSection />
      <FaqSection />
      <FinalMessage />
      <Footer />
    </main>
  )
}
