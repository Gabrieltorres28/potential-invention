import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface AuthorityProps {
  name: string
  position: string
  description: string
  imageUrl: string
}

const authorities: AuthorityProps[] = [
  {
    name: "Juli Morla",
    position: "Rectora",
    description:
      "Profesora de Informática y especialista en Educación Tecnológica. Su visión innovadora ha transformado el enfoque pedagógico del ISIPP, implementando metodologías que combinan la excelencia académica con la práctica profesional. Bajo su liderazgo, el instituto ha desarrollado vínculos estratégicos con empresas del sector tecnológico, garantizando una formación alineada con las demandas actuales del mercado laboral.",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Mariana Castro",
    position: "Vicerrectora",
    description:
      "Licenciada en Sistemas con especialización en Ciencias de Datos. Su amplio recorrido en el campo de la analítica y el procesamiento de información ha sido fundamental para la modernización de los planes de estudio. Coordina los programas académicos con un enfoque orientado a las nuevas tecnologías, implementando laboratorios de práctica que simulan entornos reales de trabajo. Su compromiso con la innovación educativa ha posicionado a nuestros egresados como profesionales altamente valorados en el mercado.",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Fátima Medina",
    position: "Representante Legal del SPEM",
    description:
      "Con una destacada trayectoria en la gestión de instituciones educativas privadas, representa al Servicio Provincial de Enseñanza Privada de Misiones (SPEM) en nuestra institución. Su experiencia en la articulación entre el sector educativo y los organismos reguladores ha sido clave para el desarrollo institucional del ISIPP. Gracias a su gestión, hemos logrado implementar programas educativos innovadores que cumplen con los más altos estándares de calidad, asegurando el reconocimiento oficial y la validez nacional de nuestros títulos.",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Fabián Breu",
    position: "Secretario Académico",
    description:
      "Técnico Químico con formación complementaria en gestión educativa. Como personal administrativo altamente calificado, coordina eficientemente los procesos académicos y administrativos del instituto. Su meticulosa organización y conocimiento de los procedimientos institucionales garantizan el correcto funcionamiento de las actividades académicas, desde la inscripción hasta la titulación. Su dedicación al servicio de estudiantes y docentes ha sido fundamental para mantener los altos estándares de calidad educativa que caracterizan a nuestra institución.",
    imageUrl: "/placeholder.svg?height=400&width=400",
  },
]

interface AuthoritiesSectionProps {
  onClose: () => void
}

export function AuthoritiesSection({ onClose }: AuthoritiesSectionProps) {
  // Variantes para la animación de entrada de la página
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Variantes para los elementos individuales
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Esto asegura que el scroll se resetea al inicio cuando se entra o se sale de la página
  useEffect(() => {
    window.scrollTo(0, 0)  // Resetea el scroll al inicio de la página cuando se carga
  }, [])

  return (
    <motion.div
      className="min-h-screen pt-24 pb-16 bg-white dark:bg-zinc-900 overflow-y-auto max-h-screen"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      <div className="container px-4 md:px-6">
        <motion.div className="flex items-center mb-8" variants={itemVariants}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="mr-4 text-primary hover:bg-primary/10 hover:text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Volver</span>
          </Button>
          <h1 className="font-playfair text-3xl font-bold tracking-tight md:text-4xl text-primary">
            Nuestras Autoridades
          </h1>
        </motion.div>

        <motion.p className="max-w-3xl mx-auto text-center text-muted-foreground mb-12" variants={itemVariants}>
          El equipo directivo del Instituto Superior ISIPP 1206 está conformado por profesionales comprometidos con la
          excelencia educativa, la innovación pedagógica y el desarrollo integral de nuestros estudiantes.
        </motion.p>

        <div className="space-y-16">
          {authorities.map((authority, index) => (
            <motion.div
              key={authority.name}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              variants={itemVariants}
            >
              <div className="w-full md:w-1/3">
                <motion.div
                  className="relative h-[300px] w-[300px] mx-auto overflow-hidden rounded-full border-4 border-primary/20 shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={authority.imageUrl || "/placeholder.svg"}
                    alt={authority.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay"></div>
                </motion.div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="font-playfair text-2xl font-bold text-primary mb-1">{authority.name}</h2>
                <h3 className="text-xl font-medium text-muted-foreground mb-4">{authority.position}</h3>
                <div className="h-1 w-20 bg-primary/30 rounded mb-4"></div>
                <p className="text-muted-foreground leading-relaxed">{authority.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <Button onClick={onClose} className="bg-primary text-white hover:bg-primary/90 hover-vibrate">
            Volver al inicio
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
