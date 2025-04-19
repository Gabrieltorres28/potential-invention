"use client";
import React from "react";
import Image from "next/image";
import redesImage from "@/public/infosectionimage.jpg"; // Cambialo por tu imagen real

export default function RedesInfoSection() {
  return (
    <section
      id="carrera"
      className="py-16 bg-gradient-to-r from-[#7c4255] to-[#590835]"
    >
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* Contenido a la izquierda */}
        <div className="w-full md:w-1/2 text-white">
          <h2 className="text-4xl font-semibold mb-6 text-center md:text-left">
            Información sobre la Carrera
          </h2>
          <p className="text-lg text-white/80 text-center md:text-left mb-8">
            La Tecnicatura en Redes te prepara para diseñar, implementar y
            mantener infraestructuras de redes y sistemas de comunicación
            empresarial.
          </p>
          <ul className="space-y-4 text-lg text-white/90">
            <li className="flex items-center space-x-3">
              <span className="text-primary">🕒</span>
              <span>Duración: 3 años</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-primary">📍</span>
              <span>Modalidad: Presencial</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-primary">🎓</span>
              <span>Cursillo de inicio: 2 semanas</span>
            </li>
          </ul>
          <div className="mt-8 text-center md:text-left">
            <a
              href="#"
              className="bg-primary text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              Más información
            </a>
          </div>
        </div>

        {/* Imagen a la derecha */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src={redesImage}
            alt="Imagen de la carrera de redes"
            className="rounded-xl shadow-lg"
            width={300} // ajustá el tamaño deseado
            height={300}
            priority
          />
        </div>
      </div>
    </section>
  );
}
