"use client";

import { useEffect, useMemo, useState } from "react";
import { cartTotal, loadCart } from "@/lib/cart";
import { formatMXN } from "@/lib/money";

export default function CheckoutPage() {
  const [cart] = useState(loadCart());
  const total = useMemo(() => cartTotal(cart), [cart]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pay() {
    setErr(null);
    if (!cart.length) return setErr("Tu carrito está vacío.");
    if (!name || !email) return setErr("Nombre y email son obligatorios.");
    setLoading(true);
    try {
      const res = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, email, phone, address },
          items: cart.map((x) => ({
            title: `${x.name} (Talla ${x.size})`,
            quantity: x.qty,
            unit_price: x.price,
            currency_id: "MXN",
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error creando preferencia");
      window.location.href = data.init_point;
    } catch (e: any) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="text-gray-600 mt-2">Completa tus datos para pagar con MercadoPago.</p>

        <div className="mt-6 space-y-3">
          <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Teléfono (opcional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Dirección (opcional)" value={address} onChange={(e) => setAddress(e.target.value)} />

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button
            onClick={pay}
            disabled={loading}
            className="w-full rounded-xl bg-black text-white py-3 text-sm disabled:opacity-60"
          >
            {loading ? "Redirigiendo a MercadoPago…" : `Pagar ${formatMXN(total)}`}
          </button>

          <div className="text-xs text-gray-500">
            Serás redirigido al checkout de MercadoPago para elegir método de pago y cuotas.
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-4 h-fit">
        <div className="font-medium">Resumen</div>
        <div className="mt-3 flex justify-between text-sm">
          <span>Total</span>
          <span>{formatMXN(total)}</span>
        </div>
      </div>
    </main>
  );
}
