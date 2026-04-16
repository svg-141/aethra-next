# 🚀 Especificación Técnica de Infraestructura y Tecnologías - Aethra (v1.1)

Este documento detalla la implementación profunda de cada capa tecnológica del ecosistema Aethra.

---

## 1. Capa de Frontend: Next.js 15 (Vercel)
Elegimos Next.js no solo como framework, sino como nuestro **BFF (Backend for Frontend)**.

- **Renderizado Híbrido:** 
    - **Server Components (RSC):** Para cargar guías y foros de forma instantánea (SEO optimizado).
    - **Client Components:** Para el Dashboard dinámico y los chats que requieren interactividad.
- **Gestión de Estado:** 
    - **Zustand:** Para el estado global ligero (datos del usuario, notificaciones rápidas).
    - **React Query (TanStack):** Para manejar el "caching" de las peticiones a la Core API y evitar peticiones duplicadas.
- **Estilos y Temas:**
    - **SASS + Bootstrap 5.3:** Mixins de SASS para inyectar las variables CSS de los 8 temas dinámicos.
    - **CSS Variables:** Definidas en el `:root` para cambios de color sin re-renderizar componentes.

---

## 2. Capa de Negocio: Aethra Core API (Node.js/Express)
Este es un servidor **Stateful** (con estado) alojado en Docker.

- **Runtime:** Node.js 20+ (LTS) con **TypeScript**.
- **Framework:** **Express** (por su ligereza) o **NestJS** (si buscamos estructura empresarial).
- **ORM (Prisma):** Maneja el tipado estricto entre TypeScript y PostgreSQL. Genera migraciones seguras para la base de datos.
- **Seguridad (Jose/JWT):** Implementación de **JWE (JSON Web Encryption)**. Los tokens no solo están firmados, sino cifrados para que nadie pueda leer el payload aunque intercepte el token.
- **Validación de Datos:** **Zod**. Cada petición que llega a la API es validada estructuralmente antes de tocar la lógica de negocio.

---

## 3. Capa de Inteligencia: AI Engine (Ubuntu/Python)
El servidor en Google Cloud Compute Engine especializado en cómputo.

- **Framework:** **FastAPI**. Elegido por su soporte nativo de asincronía y velocidad superior a Flask/Django.
- **Modelo LLM:** **GPT4All** ejecutando modelos cuantizados (formato `.GGUF` como Llama 3 o Mistral). Esto permite correr IA de alta calidad en CPUs potentes sin depender exclusivamente de GPUs carísimas.
- **Streaming (SSE):** Implementación de **Server-Sent Events**. La IA envía "chunks" de texto. El Core API los recibe y los reenvía al Frontend en tiempo real.
- **Gestión de Memoria:** **Redis**. Se usa para guardar el "Contexto de Ventana" (los últimos mensajes) para que la IA no olvide de qué están hablando durante la sesión.

---

## 4. Capa Real-time: Socket Server (Node.js/Socket.io)
Un microservicio independiente para manejar la concurrencia de miles de conexiones abiertas.

- **Protocolo:** WebSockets con fallback a Long Polling.
- **Persistencia Directa:** Al recibir un mensaje, el Socket Server escribe en **MongoDB Atlas** antes de emitir el evento. Esto garantiza que si el receptor está offline, el mensaje ya esté guardado.
- **Escalabilidad:** Uso de **Redis Adapter**. Si necesitamos subir dos servidores de Sockets, Redis se encarga de que un mensaje enviado al Servidor A llegue al usuario conectado al Servidor B.

---

## 5. Capa de Persistencia (Híbrida)

- **PostgreSQL (Supabase):** 
    - **Uso:** Datos maestros (Users, Roles, XP, Guías).
    - **Por qué:** Necesitamos integridad referencial. Si borras un usuario, sus guías deben borrarse o anonimizarse automáticamente (Cascading).
- **MongoDB Atlas:** 
    - **Uso:** Mensajería, Logs de Auditoría, Historial de Riot.
    - **Por qué:** Los mensajes de chat crecen exponencialmente. MongoDB escala horizontalmente de forma mucho más barata y eficiente que Postgres para este tipo de datos "append-only".

---

## 6. Despliegue y DevOps (Pipeline)

- **Contenedores:** **Docker + Docker Compose**. El entorno que usas en tu PC será 100% idéntico al de Google Cloud.
- **CI/CD:** **GitHub Actions**. 
    - Al hacer `push main`: Ejecuta Linter -> Ejecuta Tests -> Build de Imagen Docker -> Push a Google Container Registry -> Deploy automático.
- **Infraestructura como Código:** Definiremos un archivo `docker-compose.prod.yml` para levantar todo el stack con un solo comando en el servidor de producción.

---

## 7. Monitoreo y Resiliencia
- **Patrón Opossum (Circuit Breaker):** Biblioteca en Node.js que corta las peticiones a la IA si esta empieza a fallar, protegiendo la salud del Core API.
- **Logs:** **Winston/Pino** para generar logs estructurados que luego MongoDB pueda indexar para el Panel de Admin.
