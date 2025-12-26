import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">MiTienda</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/productos" className="hover:underline">Productos</Link>
          <Link href="/carrito" className="hover:underline">Carrito</Link>
        </nav>
      </div>
    </header>
  );
}
