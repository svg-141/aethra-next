# 🛡️ Seguridad, Privacidad y Permisos - Aethra (v2.0)

Este documento define la arquitectura de seguridad de la plataforma, garantizando la integridad de los datos y el control de acceso.

## 1. Control de Acceso Basado en Roles (RBAC)
Implementamos una matriz de permisos vinculada al rol del usuario en PostgreSQL.

| Funcionalidad | Usuario (Free) | Usuario (Pro) | Moderador | Administrador |
|---------------|:--------------:|:-------------:|:---------:|:-------------:|
| Usar IA       | ✅ (Cuota Diaria)| ✅ (Ilimitada)| ✅         | ✅            |
| Enviar DMs    | ✅ (Solo amigos)| ✅ (Abierto)  | ✅         | ✅            |
| Crear Guías   | ❌ (Nivel < 5) | ✅            | ✅         | ✅            |
| Moderar Foro  | ❌             | ❌            | ✅ (Básico) | ✅ (Total)    |
| Ver Logs      | ❌             | ❌            | ❌         | ✅            |
| Impersonate   | ❌             | ❌            | ❌         | ✅ (Auditado) |
| Gestionar IA  | ❌             | ❌            | ❌         | ✅            |

---

## 2. Autenticación y Sesiones
- **Framework:** NextAuth.js (Auth.js) v5.
- **Estrategia:** JWT con cifrado `JWE` (JSON Web Encryption).
- **Protección de Cookies:** 
    - `__Host-next-auth.session-token`: HttpOnly, Secure, SameSite=Strict.
- **MFA:** Obligatorio para roles `ADMIN` y `MODERATOR` mediante TOTP (Google Authenticator).

---

## 3. Seguridad en la Capa de Datos
- **PostgreSQL:** RLS (Row Level Security) activado para asegurar que un usuario solo pueda editar su propio `GameProfile` o `Settings`.
- **MongoDB:** Cifrado de campo para mensajes privados. Los logs de auditoría son de "Solo Escritura" para el sistema, nadie puede editarlos.
- **Sanitización:** Uso de `dompurify` en el backend antes de guardar contenido Markdown de guías para evitar `XSS`.

---

## 4. Seguridad en Tiempo Real (WebSockets)
- **Handshake Validation:** Al conectar al `Real-time Engine`, el servidor valida el JWT del usuario contra la base de datos.
- **Channel Isolation:** El servidor de Socket.io valida que el `userId` sea participante del `channelId` antes de emitir cualquier mensaje de la colección `Messages`.
- **Rate Limit de Mensajes:** Máximo 5 mensajes por segundo para evitar inundaciones (Flooding).

---

## 5. IA Gateway Security
- **Shared Secret:** El `Aethra Core API` y el `IA Engine` en GCP comparten una clave rotativa (HMAC) para validar que las peticiones de IA solo vengan de nuestro servidor oficial.
- **Prompt Guard:** Capa intermedia que filtra palabras prohibidas o intentos de "Jailbreak" antes de que el prompt llegue al modelo GPT4All.
