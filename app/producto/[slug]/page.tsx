"use client";

import { useMemo, useState, useEffect } from "react";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { addToCart, loadCart, saveCart } from "@/lib/cart";
import { formatMXN } from "@/lib/money";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = useMemo(() => getProductBySlug(params.slug), [params.slug]);
  const [size, setSize] = useState("M");
  const [cart, setCart] = useState(loadCart());

  useEffect(() => { saveCart(cart); }, [cart]);

  if (!product) return <div className="mx-auto max-w-6xl px-4 py-10">Producto no encontrado.</div>;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-8">
      <div className="rounded-2xl overflow-hidden border bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="text-gray-600 mt-1">{formatMXN(product.price)}</div>
        <p className="text-sm text-gray-700 mt-4">{product.description}</p>

        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Talla</div>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-xl border px-3 py-2 text-sm ${size === s ? "bg-black text-white" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          className="mt-6 w-full rounded-xl bg-black text-white py-3 text-sm"
          onClick={() => setCart((c) => addToCart(c, product, size, 1))}
        >
          Agregar al carrito
        </button>
      </div>
    </main>
  );
}
