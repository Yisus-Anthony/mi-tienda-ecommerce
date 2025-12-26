export default function WhatsAppFloatingButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const msg = encodeURIComponent("Hola, me interesa un producto. ¿Me ayudas?");
  const href = number ? `https://wa.me/${number}?text=${msg}` : "https://wa.me/";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-20 right-5 z-50 hover:scale-105 transition-transform"
    >
      {/* CÍRCULO VERDE */}
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#25D366] shadow-lg">
        {/* Ícono WhatsApp */}
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M19.11 17.44c-.28-.14-1.64-.81-1.89-.9-.25-.09-.44-.14-.63.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.87-2.08-.23-.56-.47-.48-.63-.49-.16-.02-.35-.02-.53-.02-.19 0-.49.07-.75.35-.25.28-.98.96-.98 2.34 0 1.38 1.01 2.71 1.15 2.9.14.19 1.99 3.04 4.82 4.26.67.29 1.2.46 1.61.59.68.22 1.3.19 1.79.12.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.12-.25-.19-.53-.33zM16.04 2.67c-7.37 0-13.37 6-13.37 13.37 0 2.36.62 4.67 1.8 6.71L2 30l7.46-2.46c1.96 1.07 4.17 1.63 6.38 1.63h.01c7.37 0 13.37-6 13.37-13.37S23.41 2.67 16.04 2.67zm0 24.1h-.01c-1.99 0-3.94-.54-5.63-1.56l-.4-.24-4.43 1.46 1.48-4.31-.26-.44c-1.09-1.74-1.67-3.76-1.67-5.83 0-6.06 4.93-10.99 10.99-10.99 6.06 0 10.99 4.93 10.99 10.99 0 6.06-4.93 10.99-10.99 10.99z" />
        </svg>
      </div>
    </a>
  );
}
