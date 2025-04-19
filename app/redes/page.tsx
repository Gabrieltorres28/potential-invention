"use client";

import { Header } from "@/components/header";
import SocialBubble from "@/components/SocialBubble";
import RedesInfoSection from "@/components/sections/redes/RedesInfoSection"; // default import
import RedesRequisitos_vision from "@/components/sections/redes/requisitos-vision"; // default import
import RedesScheduleFragment from "@/components/sections/redes/RedesScheduleFragment";
export default function RedesPage() {
  return (
    <>
      {/* Tu hero/portada */}
      <div
        id="inicio"
        className="relative min-h-screen bg-[url('/pararede.webp')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
          <Header />
          <SocialBubble />
          <h1 className="text-5xl font-bold text-center">Redes y Comunicación</h1>
        </div>
      </div>

      {/* Aquí tu componente importado */}
      <RedesInfoSection />
      
      <RedesRequisitos_vision />
      <RedesScheduleFragment />
    </>
  );
}

