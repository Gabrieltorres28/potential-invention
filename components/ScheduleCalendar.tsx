"use client";

import React from "react";

export type ScheduleEvent = {
    materia: string;
    dia: "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes";
    inicio: string;
    fin: string;
    aula?: string;
    sistema?: string; // Propiedad opcional añadida
  };
  
  interface ScheduleCalendarProps {
    events: ScheduleEvent[];
    startHour?: number;    // Hora de inicio (ej. 8 para 8 AM)
    endHour?: number;      // Hora de fin (ej. 23 para 11 PM)
    hourHeight?: number;   // Altura en px para 1 hora
  }

export default function ScheduleCalendar({ events }: ScheduleCalendarProps) {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;
  const startHour = 8; // Hora de inicio (8 AM)
  const endHour = 23;  // Hora de fin (11 PM)
  const hourHeight = 80; // Altura en px para 1 hora completa

  // Convertir HH:mm a minutos desde medianoche
  const timeToMinutes = (time: string) => {
    const [hh, mm] = time.split(":").map(Number);
    return hh * 60 + mm;
  };

  // Calcular posición vertical exacta en px
  const calculatePosition = (time: string) => {
    const minutes = timeToMinutes(time);
    return ((minutes - startHour * 60) / 60) * hourHeight;
  };

  // Calcular altura exacta en px
  const calculateHeight = (inicio: string, fin: string) => {
    const start = timeToMinutes(inicio);
    const end = timeToMinutes(fin);
    return ((end - start) / 60) * hourHeight;
  };

  // Generar horas para la columna izquierda
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  return (
    <div className="overflow-auto rounded-lg border border-gray-300 shadow-sm">
      <div className="flex min-w-max bg-white">
        {/* Columna de horas */}
        <div className="sticky left-0 z-20 bg-gray-50 border-r border-gray-300">
          <div className="h-12 border-b border-gray-300 flex items-center justify-end pr-3 font-bold text-gray-700">
            Hora
          </div>
          {hours.map((hour) => (
            <div 
              key={hour}
              className="flex items-end justify-end pr-2 text-sm text-gray-500 bg-white"
              style={{ 
                height: `${hourHeight}px`,
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>

        {/* Grid principal */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-5 relative">
            {/* Encabezados de días */}
            {days.map((day) => (
              <div
                key={day}
                className="sticky top-0 z-10 bg-gray-50 p-3 text-center font-bold text-gray-700 border-b border-r border-gray-300"
              >
                {day}
              </div>
            ))}

            {/* Contenedor de celdas */}
            <div 
              className="col-span-5 relative"
              style={{
                height: `${(endHour - startHour) * hourHeight}px`,
                gridColumn: "1 / span 5"
              }}
            >
              {/* Líneas horizontales de guía */}
              {hours.map((hour) => (
                <div
                  key={`line-${hour}`}
                  className="absolute w-full border-t border-gray-200"
                  style={{
                    top: `${(hour - startHour) * hourHeight}px`
                  }}
                ></div>
              ))}

              {/* Eventos */}
              {events.map((event, idx) => {
                const top = calculatePosition(event.inicio);
                const height = calculateHeight(event.inicio, event.fin);
                const col = days.indexOf(event.dia) + 1;

                // Asignar colores por tipo de materia
                const colorClass = event.materia.includes('Prácticas') 
                  ? 'bg-purple-100 border-purple-200 text-purple-800'
                  : event.materia.includes('Sistemas') 
                  ? 'bg-blue-100 border-blue-200 text-blue-800'
                  : event.materia.includes('Administación') 
                  ? 'bg-green-100 border-green-200 text-green-800'
                  : 'bg-yellow-100 border-yellow-200 text-yellow-800';

                return (
                  <div
                    key={`${event.dia}-${event.inicio}-${idx}`}
                    className={`absolute rounded-md border ${colorClass} shadow-sm p-2 mx-1 overflow-hidden flex flex-col`}
                    style={{
                      left: `${(col - 1) * 20}%`,
                      width: '18%',
                      top: `${top}px`,
                      height: `${height}px`,
                      zIndex: 10
                    }}
                  >
                    <div className="flex-grow overflow-hidden">
                      <h3 className="font-semibold text-sm leading-tight truncate">
                        {event.materia}
                      </h3>
                      <div className="text-xs opacity-80 mt-1">
                        {event.inicio} - {event.fin}
                      </div>
                      {event.aula && (
                        <div className="text-xs mt-1 italic bg-white bg-opacity-50 rounded px-1 truncate">
                          {event.aula}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}