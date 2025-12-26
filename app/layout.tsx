import "./globals.css";
import Header from "@/components/Header";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export const metadata = {
  title: "MiTienda",
  description: "Ecommerce moderno listo para Vercel + MercadoPago",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
