# 🏗️ Arquitectura Técnica e Integración - Aethra (v2.0)

Este documento describe cómo se distribuyen y comunican las capas del sistema.

## 1. Topología de Servicios (Modular & Cloud)

- **Capa 1: Cliente (Next.js / Vercel)**
  - Gestiona la UI con temas dinámicos.
  - Consumo de `Aethra Core API` mediante REST.
  - Gestión de estados de IA (Loading, Streaming).

- **Capa 2: Aethra Core API (Node.js / Express / Docker)**
  - Es el núcleo transaccional.
  - Maneja la conexión con Prisma (Postgres) y Mongoose (MongoDB).
  - Orquesta la sincronización con Riot y las suscripciones de Stripe.

- **Capa 3: Real-time Messaging (Socket Server)**
  - Servidor dedicado de Socket.io.
  - Interactúa directamente con MongoDB para persistencia instantánea.

- **Capa 4: AI Engine (Ubuntu Server / Google Cloud)**
  - Alojamiento de modelos LLM (Llama 3 / Mistral).
  - API de procesamiento síncrono y streaming.

---

## 2. Protocolos de Comunicación
| Origen | Destino | Protocolo | Descripción |
|--------|---------|-----------|-------------|
| Frontend | Core API | HTTPS (REST) | Datos de usuario, guías, settings. |
| Frontend | Socket Server | WSS (Socket.io) | DMs, Notificaciones vivas, Presencia. |
| Core API | IA Engine | HTTP/2 (gRPC o Stream) | Envío masivo de prompts y contexto. |
| Core API | Riot Games | HTTPS (API Rest) | Consultas de historial y rangos. |

---

## 3. Contrato de Integración de IA
Para que el desarrollo de la IA sea independiente, el motor de IA en GCP debe exponer este formato:

### Petición a IA (`POST /process`)
```json
{
  "sessionId": "MongoDB_ObjectId",
  "userId": "UUID_Postgres",
  "gameContext": "valorant",
  "prompt": "Estrategia de defensa en Ascent",
  "history": [
    { "role": "user", "content": "Hola" },
    { "role": "assistant", "content": "Saludos, ¿qué juego analizamos?" }
  ]
}
```

### Respuesta desde IA (Stream)
La IA debe responder mediante **Server-Sent Events (SSE)** para permitir que el texto aparezca palabra por palabra en el frontend sin latencia percibida.

---

## 4. Resiliencia y Tolerancia a Fallos (Estrategia Detallada)
Para evitar que un fallo en un microservicio colapse toda la plataforma (Efecto Dominó), implementamos las siguientes estrategias:

### A. Patrón Circuit Breaker (IA & Riot API)
Si el motor de IA en GCP o la API de Riot empiezan a fallar o tardar demasiado, el sistema entra en modo "Circuito Abierto":
1.  **Detección:** Si se detectan 5 fallos consecutivos, el Core API deja de intentar conectarse al servicio afectado por 30 segundos.
2.  **Fallback (Respuesta de Emergencia):** En lugar de un error 500, el frontend recibe una respuesta predefinida.
    - *IA Fallando:* El chat muestra: "La IA está procesando demasiada información, consulta nuestras guías estáticas mientras tanto".
    - *Riot Fallando:* Se muestran los últimos datos guardados en `GameMatchCache` (MongoDB) con un aviso de "Datos no actualizados".
3.  **Recuperación:** Pasado el tiempo, el sistema intenta una sola petición (Circuito Medio-Abierto). Si tiene éxito, se restablece el servicio.

### B. Degradación Graciosa (Graceful Degradation)
Aethra está diseñada para que sus funciones vitales sean independientes:
- Si el **Socket Server** muere: El usuario no puede chatear en tiempo real, pero **SÍ** puede seguir leyendo guías, viendo su perfil y navegando (Next.js sigue funcionando).
- Si el **Core API** muere: El Frontend entra en "Modo Lectura" usando datos cacheados en el navegador, informando al usuario de que la edición está temporalmente deshabilitada.

### C. Estrategia de Reintentos con Backoff Exponencial
Para errores temporales de red en el Socket o la base de datos:
- El sistema no reintenta locamente. Espera 1s, luego 2s, luego 4s... hasta un máximo de 5 intentos. Esto evita saturar el servidor justo cuando está intentando recuperarse de un fallo.

### D. Idempotencia en Operaciones Críticas
Para acciones como "Subir de Nivel" o "Comprar Suscripción":
- Cada petición lleva un `requestToken`. Si el usuario hace clic dos veces o la conexión falla y se reintenta, el Core API detecta el token duplicado y procesa la acción **una sola vez**, evitando duplicidad de XP o cobros.

