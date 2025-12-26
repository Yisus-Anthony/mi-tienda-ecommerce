import Link from "next/link";
import type { Product } from "@/data/products";
import { formatMXN } from "@/lib/money";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/producto/${p.slug}`} className="group rounded-2xl border overflow-hidden hover:shadow-sm">
      <div className="aspect-square bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-[1.01] transition" />
      </div>
      <div className="p-4">
        <div className="font-medium">{p.name}</div>
        <div className="text-sm text-gray-600">{formatMXN(p.price)}</div>
      </div>
    </Link>
  );
}
