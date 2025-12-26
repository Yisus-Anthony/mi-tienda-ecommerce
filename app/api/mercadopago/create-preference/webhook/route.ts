import { NextResponse } from "next/server";

/**
 * En producción: aquí validarías el evento y consultarías la API de MercadoPago
 * para confirmar pago, registrar orden, enviar email, etc.
 */
export async function POST(req: Request) {
  // MercadoPago envía notificaciones; por ahora solo confirmamos recepción.
  // Puedes loguear o guardar en DB si después conectas una.
  return NextResponse.json({ received: true });
}
