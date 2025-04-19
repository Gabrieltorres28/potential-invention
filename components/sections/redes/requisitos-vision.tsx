"use client";
import React from "react";
import InfoCard from "@/components/InfoCardTemp";


export default function RedesExtraInfoSection() {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        <InfoCard
          title="Requisitos"
          icon="📋"
          items={[
            "✔ Educación Secundaria completa o en curso",
            "✔ Manejo básico de computadoras y conectividad a internet",
          ]}
        />

        <InfoCard
          title="¿Cómo vas a cursar?"
          icon="📚"
          items={[
            "📌 <strong>Modalidad presencial:</strong> prácticas en laboratorio",
            "📌 <strong>Material didáctico:</strong> apuntes, guías y simulaciones",
            "📌 <strong>Foros y consultas:</strong> interacción constante",
            "📌 <strong>Acompañamiento docente:</strong> asesoramiento permanente",
          ]}
        >
          💻 Aprendé con apoyo constante y experiencias reales.
        </InfoCard>

        <InfoCard
          title="¿Por qué elegir esta carrera?"
          icon="🎯"
          items={[
            "📈 <strong>Alta demanda laboral:</strong> el sector tecnológico está en auge",
            "✅ <strong>Competencia profesional:</strong> conocimientos aplicables",
            "🕒 <strong>Flexibilidad:</strong> adaptado a tu rutina",
          ]}
        />

        <InfoCard
          title="Funciones Clave"
          icon="🌟"
          items={[
            "🛠 Configuración de redes y dispositivos",
            "🔐 Seguridad informática y protocolos",
            "📡 Soporte técnico y resolución de problemas",
            "🧰 Mantenimiento de infraestructura digital",
          ]}
        />

        <InfoCard
          title="Ámbitos de Trabajo"
          icon="🏢"
        >
          <p className="text-lg text-gray-700">
            Podés desempeñarte en empresas de telecomunicaciones, áreas de IT, instituciones educativas,
            organismos públicos o como técnico independiente.
          </p>
        </InfoCard>

      </div>
    </section>
  );
}
