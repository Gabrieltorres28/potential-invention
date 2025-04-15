"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

type Career = {
  title: string
  description: string
  icon: React.ReactNode
  details?: string[]
}

interface FlipCardProps {
  career: Career
}

export function FlipCard({ career }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="relative h-[400px] w-full perspective-1000">
      <motion.div
        className="relative h-full w-full transform-style-3d transition-all duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front of card */}
        <div
          className={`absolute h-full w-full backface-hidden ${
            isFlipped ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <Card className="flex h-full flex-col overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 dark:bg-zinc-800">
            <CardHeader className="pb-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {career.icon}
              </div>
              <CardTitle className="font-playfair text-xl">{career.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{career.description}</CardDescription>
            </CardContent>
            <CardFooter className="pb-6 pt-2">
              <Button
                onClick={handleFlip}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
              >
                Más información
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Back of card */}
        <div
          className={`absolute h-full w-full backface-hidden rotate-y-180 ${
            isFlipped ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <Card className="flex h-full flex-col overflow-hidden border-none bg-primary text-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="font-playfair text-xl">{career.title}</CardTitle>
              <CardDescription className="text-white/80">Detalles de la carrera</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
              <ul className="space-y-2 text-sm">
                {career.details?.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-white">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pb-6 pt-2">
              <Button
                onClick={handleFlip}
                variant="secondary"
                className="w-full flex items-center justify-center gap-2 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
