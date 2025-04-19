import * as XLSX from "xlsx";

export interface ScheduleEvent {
  materia: string;
  dia: "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes";
  inicio: string;
  fin: string;
}

export function parseScheduleXlsx(arrayBuffer: ArrayBuffer): ScheduleEvent[] {
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });

  const header = rows[0] as string[];
  const parsed: ScheduleEvent[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    // Ignorar filas vacías o sin horario válido
    if (!row[0] || !String(row[0]).match(/(\d{1,2}[:,]\d{2})\s*a\s*(\d{1,2}[:,]\d{2})/)) continue;

    // Reemplazar coma por dos puntos, y dividir por "a"
    const [inicioRaw, finRaw] = String(row[0])
      .replace(",", ":")
      .split("a")
      .map((s) => s.trim().replace(",", ":"));

    const inicio = convertirHora(inicioRaw);
    const fin = convertirHora(finRaw);

    // columnas de lunes (1) a viernes (5)
    for (let col = 1; col <= 5; col++) {
      const dia = header[col] as ScheduleEvent["dia"];
      const celda = row[col]?.toString().trim();
      if (celda) {
        parsed.push({ materia: celda, dia, inicio, fin });
      }
    }
  }

  return parsed;
}

function convertirHora(hora: string): string {
  return hora.includes(":") ? hora : hora.replace(",", ":");
}
