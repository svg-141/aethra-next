# 🔑 Diccionario de Variables de Entorno - Aethra

Este documento define todas las variables necesarias para configurar los diferentes microservicios de Aethra.

---

## 📱 1. Frontend (Next.js / Vercel)
Variables prefijadas con `NEXT_PUBLIC_` para ser accesibles desde el navegador.

| Variable | Descripción | Por qué es necesaria |
|----------|-------------|----------------------|
| `NEXT_PUBLIC_API_URL` | URL del Aethra Core API. | Para que el frontend sepa a qué servidor pedirle datos (REST). |
| `NEXT_PUBLIC_SOCKET_URL` | URL del Socket Server. | Para establecer la conexión de WebSockets para el chat. |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | ID de Cliente de Google Cloud. | Para habilitar el login con Google (OAuth). |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase. | Para cargar imágenes y videos directamente desde el cliente. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase. | Permite subidas limitadas de archivos desde el navegador. |

---

## 🧠 2. Aethra Core API (Node.js / Docker)
Variables privadas (nunca exponer al frontend).

| Variable | Descripción | Por qué es necesaria |
|----------|-------------|----------------------|
| `DATABASE_URL` | Connection String de PostgreSQL. | Para que Prisma se conecte a la DB principal. |
| `MONGODB_URI` | Connection String de MongoDB. | Para guardar logs de auditoría y caché de Riot. |
| `JWT_SECRET` | Clave de firma de tokens. | Para validar que las sesiones de usuario son legítimas. |
| `JWT_JWE_SECRET` | Clave de cifrado (32 caracteres). | Para cifrar el contenido del token (Seguridad v2.0). |
| `NEXTAUTH_SECRET` | Clave secreta de NextAuth. | Requerida por la librería para encriptar cookies de sesión. |
| `GOOGLE_CLIENT_SECRET` | Secreto de Google Cloud. | Para completar el intercambio de tokens de OAuth. |
| `RIOT_API_KEY` | API Key de Riot Developer Portal. | Para obtener datos de LoL/Valorant en tiempo real. |
| `STRIPE_SECRET_KEY` | Clave privada de Stripe. | Para procesar los pagos de la suscripción Aethra Pro. |
| `AI_ENGINE_URL` | URL del servidor Ubuntu en GCP. | Para que el Core API sepa dónde enviar los prompts. |
| `AI_ENGINE_SECRET` | Token compartido (Shared Secret). | Para que la IA sepa que la petición viene de nuestro servidor. |

---

## ⚡ 3. Real-time Engine (Socket Server)

| Variable | Descripción | Por qué es necesaria |
|----------|-------------|----------------------|
| `PORT` | Puerto de escucha (ej: 4000). | Define en qué puerto correrá el servidor de sockets. |
| `MONGODB_URI` | Misma que en el Core API. | Para que el socket guarde mensajes directamente en Mongo. |
| `REDIS_URL` | URL de la instancia de Redis. | Para sincronizar mensajes si escalamos a múltiples servidores. |
| `CORS_ORIGIN` | URL del Frontend. | Seguridad para evitar que otros dominios se conecten al socket. |

---

## 🤖 4. AI Engine (FastAPI / Ubuntu)

| Variable | Descripción | Por qué es necesaria |
|----------|-------------|----------------------|
| `MODEL_PATH` | Ruta al archivo `.GGUF` del modelo. | Indica al motor qué IA cargar (Llama, Mistral, etc.). |
| `AUTH_SECRET` | Misma que `AI_ENGINE_SECRET`. | Validación de seguridad para cada prompt recibido. |
| `REDIS_URL` | Instancia de Redis. | Para manejar la cola de peticiones y el contexto de chat. |

---

## 🛠️ Notas de Seguridad
1. **Nunca** subas archivos `.env` al repositorio de GitHub. Usa el archivo `.gitignore`.
2. En producción, usa los gestores de secretos de cada plataforma (**Vercel Environment Variables**, **GCP Secret Manager**, etc.).
3. **Rotación:** Se recomienda cambiar los secretos de `JWT` y `AI_ENGINE` cada 6 meses.
