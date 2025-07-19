import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '../styles/styles.css';
import '../styles/components.css';
import Image from 'next/image';
import ClientLayout from '../components/ClientLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aethra - Tu Asistente Gaming IA",
  description: "Plataforma de inteligencia artificial especializada en gaming, estrategias y análisis de juegos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen scrollbar-morado">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
