import { env } from 'cloudflare:workers';
export function reservationDatabase(){if(!env.DB)throw new Error('Reservation storage unavailable');return env.DB;}
