import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Opciones de configuración para producción */
  reactStrictMode: true,

  /* Optimización de imágenes */
  images: {
    domains: ['randomuser.me', 'cdn.discordapp.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /* Optimización de build */
  compress: true,
  poweredByHeader: false,

  /* Configuración de salida para Vercel */
  output: 'standalone',

  /* Directorios estáticos */
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: '/assets/:path*',
      },
    ];
  },

  /* Headers de seguridad */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  /* Configuración de Webpack */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
