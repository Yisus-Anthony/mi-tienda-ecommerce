"use client";

export default function Pagination({
  page,
  pages,
  onPage,
}: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex gap-2 items-center justify-center mt-6">
      <button
        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Anterior
      </button>
      <div className="text-sm text-gray-600">
        Página {page} de {pages}
      </div>
      <button
        className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
        onClick={() => onPage(Math.min(pages, page + 1))}
        disabled={page >= pages}
      >
        Siguiente
      </button>
    </div>
  );
}
