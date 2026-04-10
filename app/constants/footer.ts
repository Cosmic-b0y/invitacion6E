import { FooterLink } from "../types";

// TODO: Cambia el número de WhatsApp antes de publicar
const WHATSAPP_NUMBER = '9612753555';
const WHATSAPP_MSG = encodeURIComponent('Hola! Confirmo mi asistencia al evento de Senda Coffee en el Jardín Cocinarte ');

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: 'Confirmar Asistencia',
    hoverText: 'WhatsApp',
    icon: 'icons/github.svg',
    url: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`,
  },
];