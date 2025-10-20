import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/theme-core.css';
import '../styles/bootstrap-theme.css';
import '../styles/adaptive-ui.css';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#8B5CF6",
  authors: [{ name: "Aethra Team" }],
  keywords: ["gaming", "AI", "esports", "estrategias", "valorant", "league of legends", "cs2", "dota2"],
  robots: "index, follow",
  openGraph: {
    title: "Aethra - Tu Asistente Gaming IA",
    description: "Plataforma de inteligencia artificial especializada en gaming, estrategias y análisis de juegos",
    type: "website",
    locale: "es_ES",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUa6XwKiTxjhX0LNqcqJk4jD5Zd5gYKYZYKZTgz6kU/gYX6KrY8u/Rr9hR/Y"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
        />
      </head>
      <body className={`min-h-screen scrollbar-theme antialiased ${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
          </AuthProvider>
        </ThemeProvider>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
