export type Product = {
  id: string;
  name: string;
  price: number; // MXN
  image: string;
  slug: string;
  description: string;
  sizes: string[];
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const base = [
  { name: "Playera Básica Premium", price: 299 },
  { name: "Hoodie Oversize", price: 799 },
  { name: "Pants Jogger", price: 599 },
  { name: "Camisa Casual", price: 699 },
];

export const PRODUCTS: Product[] = Array.from({ length: 100 }).map((_, i) => {
  const b = base[i % base.length];
  const name = `${b.name} #${i + 1}`;
  const slug = slugify(name);
  return {
    id: `p_${i + 1}`,
    name,
    price: b.price + (i % 7) * 20,
    image: `https://picsum.photos/seed/${slug}/900/900`,
    slug,
    description:
      "Ropa cómoda y moderna. Material suave, corte actual y excelente relación calidad/precio.",
    sizes: ["CH", "M", "G", "XG"],
  };
});

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
