import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!token) {
    return NextResponse.json({ error: "Falta MERCADOPAGO_ACCESS_TOKEN" }, { status: 500 });
  }
  if (!siteUrl) {
    return NextResponse.json({ error: "Falta NEXT_PUBLIC_SITE_URL" }, { status: 500 });
  }

  const body = await req.json();
  const { items, customer } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
  }

  // Preferencia: redirecciones al volver de MercadoPago
  const preference = {
    items,
    payer: customer?.email ? { email: customer.email } : undefined,
    back_urls: {
      success: `${siteUrl}/carrito`,
      pending: `${siteUrl}/carrito`,
      failure: `${siteUrl}/carrito`,
    },
    auto_return: "approved",
    notification_url: `${siteUrl}/api/mercadopago/webhook`,
  };

  const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preference),
  });

  const data = await mpRes.json();

  if (!mpRes.ok) {
    return NextResponse.json({ error: data?.message || "Error MercadoPago", details: data }, { status: 400 });
  }

  // init_point: URL a la que rediriges al comprador
  return NextResponse.json({ init_point: data.init_point });
}
