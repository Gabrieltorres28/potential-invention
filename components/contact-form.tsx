"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FormData = {
  name: string
  email: string
  career: string
  message: string
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Here you would normally send the data to your backend
    setTimeout(() => {
      setIsSubmitted(true)
      reset()
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-8 text-center"
        >
          <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
          <h3 className="text-xl font-semibold">¡Formulario enviado!</h3>
          <p className="mt-2 text-muted-foreground">Nos pondremos en contacto contigo a la brevedad.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Ingresa tu nombre"
              {...register("name", { required: "Este campo es obligatorio" })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Dirección de correo inválida",
                },
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="career">Carrera de interés</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sistemas">Tec. Análisis de Sistemas</SelectItem>
                <SelectItem value="redes">Tec. Redes</SelectItem>
                <SelectItem value="seguridad">Tec. Seguridad e Higiene Laboral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje (opcional)</Label>
            <Textarea
              id="message"
              placeholder="Escribe tu consulta aquí..."
              {...register("message")}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
            Enviar solicitud
          </Button>
        </form>
      )}
    </div>
  )
}
