import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

// Información del evento Senda Coffee — Jardín Cocinarte
export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: 'El Lugar',
    title: 'Jardín Cocinarte',
    subtitle: 'Al aire libre',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: 'La Experiencia',
    title: 'Senda Coffee',
    subtitle: 'Cafetería simulada',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: 'El Ambiente',
    title: 'Naturaleza',
    subtitle: 'Jardín & aire libre',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: 'El Momento',
    title: 'Una tarde especial',
    subtitle: 'Café & buena compañía',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: 'Te esperamos',
    title: '¡Confirma!',
    subtitle: 'WhatsApp al final ↓',
    position: 'right',
  }
]