"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, UserCircle, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// Importamos los componentes del menú desplegable
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Método", href: "#metodo" },
  { name: "Clases", href: "#clases" },
  { name: "Profesores", href: "#profesores" },
  { name: "Membresía", href: "#membresia" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Simulamos si el usuario está logueado (esto luego vendrá de tu Auth)
  const [isLoggedIn, setIsLoggedIn] = useState(true) 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl tracking-tight">SANTUARIO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm tracking-wide uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User / CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-4">
            {isLoggedIn ? (
              /* MENÚ DE PERFIL (No desenfoca el fondo) */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none p-1 rounded-full hover:bg-black/5 transition">
                    <UserCircle className="h-8 w-8 text-neutral-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/mi-santuario" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> Mi Santuario
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> Ajustes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-sm tracking-wide uppercase">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/registro">
                  <Button className="text-sm tracking-wide uppercase px-6">Comenzar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button type="button" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="px-6 py-8 space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-lg tracking-wide text-foreground/70 hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
