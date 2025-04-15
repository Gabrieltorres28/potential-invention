"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapSection } from "@/components/map-section"
import { FlipCard } from "@/components/flip-card"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Efecto parallax para la imagen de fondo
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
          <Image
            src="/fondoisipp.png"
            alt="ISIPP Building"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 mix-blend-multiply" />
        </motion.div>

        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
          style={{ opacity }}
        >
          <motion.h1
            className="font-playfair text-4xl font-bold tracking-tight text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ISIPP 1206
          </motion.h1>
          <motion.p
            className="mt-4 font-playfair text-xl text-white md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tradición, Conocimiento y Futuro
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30" size="lg">
              Conocé nuestras carreras
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Careers Section */}
      <section className="bg-white py-24 dark:bg-zinc-900">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="font-playfair text-3xl font-bold tracking-tight md:text-4xl">Nuestras Carreras</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Formación académica de excelencia para los profesionales del mañana
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {careers.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FlipCard career={career} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Section */}
      <section className="relative overflow-hidden bg-zinc-50 py-24 dark:bg-zinc-950">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-3xl font-bold tracking-tight md:text-4xl">Nuestra Institución</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Con más de 30 años de trayectoria, ISIPP 1206 se ha consolidado como una institución de referencia en la
                formación de profesionales técnicos.
              </p>
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-primary">Misión</h3>
                  <p className="mt-2 text-muted-foreground">
                    Formar profesionales técnicos con sólidos conocimientos, valores éticos y compromiso social, capaces
                    de responder a las demandas del mercado laboral actual.
                  </p>
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-primary">Visión</h3>
                  <p className="mt-2 text-muted-foreground">
                    Ser reconocidos como una institución educativa de excelencia, referente en la formación técnica
                    profesional, que contribuye al desarrollo sostenible de la sociedad.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] overflow-hidden rounded-lg shadow-xl"
            >
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="ISIPP Students"
                fill
                className="object-cover transition-transform duration-10000 ease-in-out hover:scale-110"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="bg-white py-24 dark:bg-zinc-800">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-playfair text-3xl font-bold tracking-tight md:text-4xl">Responde tus dudas</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Completá el formulario para recibir más información sobre nuestras carreras
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* CTA Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-playfair text-3xl font-bold tracking-tight md:text-4xl"
            >
              Tu futuro empieza hoy. Inscribite y marcá la diferencia.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Preinscribirme ahora
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const careers = [
  {
    title: "Tec. Analista de Sistemas",
    description:
      "Formación integral en desarrollo de software, bases de datos, redes y sistemas de información para liderar proyectos tecnológicos.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-code"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    details: [
      "Duración: 3 años",
      "Título oficial con validez nacional",
      "Programación en múltiples lenguajes",
      "Diseño y administración de bases de datos",
      "Análisis y diseño de sistemas",
      "Gestión de proyectos informáticos",
      "Prácticas profesionales en empresas del sector",
    ],
  },
  {
    title: "Tec. en Redes Informáticas",
    description:
      "Especialización en diseño, implementación y mantenimiento de infraestructuras de redes y sistemas de comunicación empresarial.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-network"
      >
        <rect x="16" y="16" width="6" height="6" rx="1"></rect>
        <rect x="2" y="16" width="6" height="6" rx="1"></rect>
        <rect x="9" y="2" width="6" height="6" rx="1"></rect>
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
        <path d="M12 12V8"></path>
      </svg>
    ),
    details: [
      "Duración: 3 años",
      "Título oficial con validez nacional",
      "Configuración de redes LAN, WAN y WLAN",
      "Administración de servidores",
      "Seguridad informática y ciberseguridad",
      "Virtualización y cloud computing",
    
    ],
  },
  {
    title: "Tec. Seguridad e Higiene Laboral",
    description:
      "Formación especializada en prevención de riesgos laborales, normativas de seguridad y gestión de entornos de trabajo saludables.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shield-check"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
    details: [
      "Duración: 3 años",
      "Título oficial con validez nacional",
      "Normativas nacionales e internacionales",
      "Evaluación y prevención de riesgos laborales",
      "Gestión ambiental y sustentabilidad",
      "Ergonomía y factores humanos",
      "Prácticas profesionales en empresas",
    ],
  },
]
