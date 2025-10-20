# Configuración de Google OAuth para Aethra

Esta guía te ayudará a configurar la autenticación con Google en tu proyecto Aethra.

## Pasos para Configurar Google OAuth

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombra tu proyecto (ej: "Aethra Gaming Platform")

### 2. Habilitar Google+ API

1. En el menú lateral, ve a **APIs & Services** → **Library**
2. Busca "Google+ API"
3. Haz clic en "Enable"

### 3. Crear Credenciales OAuth 2.0

1. Ve a **APIs & Services** → **Credentials**
2. Haz clic en **Create Credentials** → **OAuth client ID**
3. Si es tu primera vez, configura la pantalla de consentimiento:
   - **User Type**: External
   - **App name**: Aethra
   - **User support email**: tu email
   - **Developer contact**: tu email
   - **Scopes**: Agrega `email`, `profile`, `openid`

4. Después de configurar la pantalla de consentimiento, vuelve a **Credentials**
5. Crea **OAuth client ID**:
   - **Application type**: Web application
   - **Name**: Aethra Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (desarrollo)
     - `https://tu-dominio.vercel.app` (producción)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/auth/callback` (desarrollo)
     - `https://tu-dominio.vercel.app/auth/callback` (producción)

6. Haz clic en **Create**
7. Copia el **Client ID** y **Client Secret**

### 4. Configurar Variables de Entorno

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Copia el contenido de `.env.local.example`
3. Reemplaza los valores:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback
```

### 5. Para Producción en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Ve a **Settings** → **Environment Variables**
3. Agrega las siguientes variables:
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Tu Client ID
   - `GOOGLE_CLIENT_SECRET`: Tu Client Secret
   - `NEXT_PUBLIC_REDIRECT_URI`: `https://tu-dominio.vercel.app/auth/callback`

4. Redeploy tu aplicación

### 6. Actualizar Redirect URIs en Google

Después de desplegar en Vercel:

1. Vuelve a [Google Cloud Console](https://console.cloud.google.com/)
2. Ve a **APIs & Services** → **Credentials**
3. Edita tu OAuth 2.0 Client ID
4. Agrega la URL de producción en **Authorized redirect URIs**:
   - `https://tu-dominio.vercel.app/auth/callback`
5. Guarda los cambios

## Flujo de Autenticación

### Como Funciona

1. Usuario hace clic en "Continuar con Google"
2. Se redirige a Google para autenticación
3. Usuario acepta los permisos
4. Google redirige de vuelta a `/auth/callback` con un código
5. El backend intercambia el código por tokens
6. Se crea/actualiza el usuario en la base de datos
7. Se crea una sesión y se redirige al dashboard

### Endpoints Necesarios

Debes crear estos archivos:

```
src/app/auth/
├── callback/
│   └── route.ts       # Maneja la respuesta de Google
└── signout/
    └── route.ts       # Cierra sesión
```

## Implementación Básica

### /src/app/auth/callback/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    // 1. Intercambiar código por tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    // 2. Obtener información del usuario
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const userInfo = await userInfoResponse.json();

    // 3. Crear/actualizar usuario en tu base de datos
    // ... tu lógica aquí ...

    // 4. Crear sesión
    // ... tu lógica de sesión aquí ...

    // 5. Redirigir al dashboard
    const stateData = state ? JSON.parse(state) : {};
    const selectedPlan = stateData.selectedPlan || 'free';

    return NextResponse.redirect(
      new URL(`/dashboard?plan=${selectedPlan}&new_user=true`, request.url)
    );

  } catch (error) {
    console.error('Error en OAuth callback:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}
```

## Seguridad

### Mejores Prácticas

1. **NUNCA** expongas el `CLIENT_SECRET` en el frontend
2. Usa HTTPS en producción
3. Valida el `state` parameter para prevenir CSRF
4. Implementa rate limiting en tus endpoints
5. Guarda los tokens de forma segura (encriptados)
6. Implementa refresh tokens para sesiones largas

## Recursos

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [NextAuth.js](https://next-auth.js.org/) (librería recomendada para auth en Next.js)

## Alternativa Recomendada: NextAuth.js

Para una implementación más robusta, considera usar NextAuth.js:

```bash
npm install next-auth
```

Configuración simple con Google:

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // ... más configuración
});

export { handler as GET, handler as POST };
```

## Soporte

Si encuentras problemas:
1. Revisa que las URLs de redirect coincidan exactamente
2. Verifica que las variables de entorno estén configuradas
3. Asegúrate de que Google+ API esté habilitada
4. Revisa los logs de Google Cloud Console
