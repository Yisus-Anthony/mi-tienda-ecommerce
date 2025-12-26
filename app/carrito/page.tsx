"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cartTotal, loadCart, removeFromCart, saveCart, updateQty } from "@/lib/cart";
import { formatMXN } from "@/lib/money";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());
  useEffect(() => { saveCart(cart); }, [cart]);

  const total = useMemo(() => cartTotal(cart), [cart]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Carrito</h1>

      {cart.length === 0 ? (
        <div className="mt-6 text-gray-600">
          Tu carrito está vacío. <Link href="/productos" className="underline">Ver productos</Link>
        </div>
      ) : (
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="rounded-2xl border p-4 flex gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover bg-gray-100" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">Talla: {item.size}</div>
                  <div className="text-sm text-gray-600">{formatMXN(item.price)}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="rounded-lg border px-2 py-1"
                      onClick={() => setCart((c) => updateQty(c, item.productId, item.size, item.qty - 1))}
                    >-</button>
                    <div className="text-sm w-8 text-center">{item.qty}</div>
                    <button className="rounded-lg border px-2 py-1"
                      onClick={() => setCart((c) => updateQty(c, item.productId, item.size, item.qty + 1))}
                    >+</button>
                    <button
                      className="ml-auto text-sm underline"
                      onClick={() => setCart((c) => removeFromCart(c, item.productId, item.size))}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border p-4 h-fit">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatMXN(total)}</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">Envío e impuestos se calculan en el checkout.</div>
            <Link href="/checkout" className="mt-4 block text-center rounded-xl bg-black text-white py-3 text-sm">
              Ir a checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
