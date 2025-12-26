import type { Product } from "@/data/products";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  size: string;
  qty: number;
};

const KEY = "mi_tienda_cart_v1";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(cart: CartItem[], product: Product, size: string, qty = 1) {
  const idx = cart.findIndex((x) => x.productId === product.id && x.size === size);
  if (idx >= 0) {
    const copy = [...cart];
    copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
    return copy;
  }
  return [
    ...cart,
    {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      size,
      qty,
    },
  ];
}

export function removeFromCart(cart: CartItem[], productId: string, size: string) {
  return cart.filter((x) => !(x.productId === productId && x.size === size));
}

export function updateQty(cart: CartItem[], productId: string, size: string, qty: number) {
  return cart.map((x) =>
    x.productId === productId && x.size === size ? { ...x, qty: Math.max(1, qty) } : x
  );
}

export function cartTotal(cart: CartItem[]) {
  return cart.reduce((sum, x) => sum + x.price * x.qty, 0);
}
