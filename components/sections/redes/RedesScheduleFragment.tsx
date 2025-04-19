"use client";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ScheduleCalendar, { ScheduleEvent } from "@/components/ScheduleCalendar";

export default function RedesScheduleFragment() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadXlsx = async () => {
      try {
        console.log("🔍 Iniciando carga del archivo Excel...");
        const resp = await fetch("/schedule.xlsx");
        
        if (!resp.ok) {
          throw new Error(`Error al cargar el archivo: HTTP ${resp.status}`);
        }

        const arrayBuffer = await resp.arrayBuffer();
        console.log("📊 Archivo cargado, tamaño:", arrayBuffer.byteLength, "bytes");

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        console.log("📋 Hoja a procesar:", sheetName);

        const sheet = workbook.Sheets[sheetName];
        const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });
        console.log("📝 Filas obtenidas:", rows.length);

        if (rows.length < 2) {
          throw new Error("El archivo no contiene suficientes datos");
        }

        const header = rows[0] as string[];
        const parsedEvents: ScheduleEvent[] = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || !row[0]) continue;

          // Procesar horario (formato "17,40 a 18,25" o "17:40 a 18:25")
          const timeMatch = String(row[0]).match(/(\d{1,2}[,:]\d{2})\s*a\s*(\d{1,2}[,:]\d{2})/);
          if (!timeMatch) continue;

          const [inicio, fin] = [timeMatch[1], timeMatch[2]].map(time => {
            const [h, m] = time.replace(',', ':').split(':');
            return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
          });

          // Procesar cada día (columnas 1-5)
          for (let col = 1; col <= 5 && col < header.length; col++) {
            const cellContent = String(row[col] || "").trim();
            if (!cellContent) continue;

            const dia = header[col] as ScheduleEvent["dia"];
            
            // Extraer materia y aula
            const aulaMatch = cellContent.match(/\(([^)]+)\)$/);
            const materia = aulaMatch 
              ? cellContent.replace(aulaMatch[0], "").trim() 
              : cellContent;
            const aula = aulaMatch?.[1].trim();

            parsedEvents.push({
              materia,
              dia,
              inicio,
              fin,
              aula,
              sistema: "Redes" // Propiedad opcional incluida
            });
          }
        }

        console.log("✅ Eventos parseados:", parsedEvents);
        setEvents(parsedEvents);
        setError(null);
      } catch (err) {
        console.error("❌ Error:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadXlsx();
  }, []);

  return (
    <section className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          🕒 Horario de Clases - Redes
        </h2>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-lg">Cargando horario...</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <ScheduleCalendar 
              events={events} 
              startHour={17}  // 5 PM
              endHour={23}    // 11 PM
              hourHeight={80} // 80px = 1 hora
            />
          </div>
        )}
      </div>
    </section>
  );
}