"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-zinc-900/90 py-2 shadow-md backdrop-blur-sm dark:bg-zinc-900/90" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Instituto Superior de Informática Logo"
              width={60}
              height={60}
              className="h-14 w-auto"
            />
            <div className="ml-3">
              <h1 className="text-lg font-bold text-white leading-tight">Instituto Superior de Informática</h1>
              <p className="text-xs text-white/80">Puerto Piray, Misiones, Argentina</p>
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={`flex items-center font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-white dark:text-white" : "text-white"
                } ${activeDropdown === item.label ? "text-primary" : ""}`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                  />
                )}
              </Link>

              {item.children && (
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 min-w-[220px] rounded-md bg-white p-2 shadow-lg ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700"
                      onMouseEnter={() => {
                        if (dropdownTimeoutRef.current) {
                          clearTimeout(dropdownTimeoutRef.current)
                        }
                      }}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="space-y-1 py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-primary dark:text-white dark:hover:bg-zinc-700 dark:hover:text-primary"
                          >
                            <div className="font-medium">{child.label}</div>
                            {child.description && (
                              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{child.description}</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <ThemeToggle />
          <Button
            className={`bg-primary text-white hover:bg-primary/90 ${isScrolled ? "border-primary" : "border-white"}`}
          >
            Contacto
          </Button>
        </nav>

        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-white" : "text-white"}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white">
              <div className="flex flex-col space-y-6 pt-6">
                {navItems.map((item) => (
                  <div key={item.label} className="space-y-3">
                    <Link href={item.href} className="text-lg font-medium transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 space-y-2 border-l border-zinc-200 pl-4 dark:border-zinc-700">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-300 dark:hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button className="bg-primary text-white hover:bg-primary/90">Contacto</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const navItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Carreras",
    href: "#carreras",
    children: [
      {
        label: "Tec. Analista de Sistemas",
        href: "#sistemas",
        description: "Desarrollo de software y sistemas de información",
      },
      {
        label: "Tec. Redes Informáticas",
        href: "#redes",
        description: "Infraestructura y comunicaciones",
      },
      {
        label: "Tec. Seguridad e Higiene",
        href: "#seguridad",
        description: "Prevención de riesgos laborales",
      },
    ],
  },
  {
    label: "Inscripciones",
    href: "#inscripciones",
    children: [
      { label: "Requisitos", href: "#requisitos" },
      { label: "Fechas importantes", href: "#fechas" },
      { label: "Aranceles", href: "#aranceles" },
      { label: "Becas", href: "#becas" },
    ],
  },
  {
    label: "Institucional",
    href: "#institucional",
    children: [
      { label: "Historia", href: "#historia" },
      { label: "Misión y Visión", href: "#mision" },
      { label: "Autoridades", href: "#autoridades" },
      { label: "Infraestructura", href: "#infraestructura" },
    ],
  },
]
