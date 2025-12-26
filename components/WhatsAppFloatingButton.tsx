export default function WhatsAppFloatingButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const msg = encodeURIComponent("Hola, me interesa un producto. ¿Me ayudas?");
  const href = number ? `https://wa.me/${number}?text=${msg}` : "https://wa.me/";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg px-4 py-3 bg-black text-white hover:opacity-90"
      aria-label="WhatsApp"
    >
      WhatsApp
    </a>
  );
}
