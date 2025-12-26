import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold">Ropa moderna, simple y lista para comprar</h1>
          <p className="text-gray-600 mt-2">Checkout con MercadoPago (México) + carrito + WhatsApp.</p>
        </div>
        <Link href="/productos" className="rounded-xl bg-black text-white px-4 py-2 text-sm">
          Ver catálogo
        </Link>
      </div>

      <h2 className="mt-10 mb-4 text-lg font-medium">Destacados</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {featured.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}
