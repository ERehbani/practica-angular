export const API_URL = 'http://localhost:3000';

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// Comparador para ordenar por día y después por horario
export function porDiaYHorario(a: { dia: string; horario: string }, b: { dia: string; horario: string }): number {
  return DIAS.indexOf(a.dia) - DIAS.indexOf(b.dia) || a.horario.localeCompare(b.horario);
}
