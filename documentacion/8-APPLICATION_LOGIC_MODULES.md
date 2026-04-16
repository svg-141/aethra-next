# 🧠 Lógica de Aplicación - Aethra Core API (v2.0)

Este documento detalla los procesos internos del `Core API` y cómo maneja las funciones críticas.

## 1. Módulo de Usuario y Onboarding
- **`registerUser(data)`:**
  1. Hashea la contraseña.
  2. Crea el registro `User` en Postgres.
  3. Crea el objeto `PrivacySettings` por defecto.
  4. Lanza evento `INIT_ONBOARDING`.
- **`completeOnboarding(userId, gameSelections)`:**
  1. Guarda en `OnboardingData`.
  2. Genera los `GameProfile` iniciales para los juegos seleccionados.
  3. Marca al usuario como activo y le otorga +50 XP inicial.

## 2. Módulo de Integración Riot (GCP Microservice)
- **`syncRiotData(userId)`:**
  1. Recupera el `puuid` de Postgres.
  2. Llama a la API de Riot (LEAGUE-V4 y MATCH-V5).
  3. Compara resultados con `GameMatchCache` en MongoDB.
  4. Si hay partidas nuevas:
     - Guarda en `GameMatchCache`.
     - Llama a `awardXP(userId, WIN_XP)` si corresponde.
     - Actualiza el rango en el `GameProfile` de Postgres.

## 3. Módulo de Gamificación (XP Controller)
- **`awardXP(userId, actionCode)`:**
  1. Consulta `AIUsageDaily` o `ActivityLogs` para ver si el usuario ya alcanzó el límite diario.
  2. Si es válido:
     - Incrementa `xp` en Postgres.
     - Ejecuta `checkLevelUp(userId)`.
- **`checkLevelUp(userId)`:**
  1. Aplica la fórmula exponencial (`5-LEVELING_SYSTEM.md`).
  2. Si hay cambio de nivel:
     - Crea una `Notification` en Postgres.
     - Emite el evento `level_up` vía Socket.io.
     - Verifica si se desbloquean nuevas insignias (`Badge`).

## 4. Módulo de Comunidad y Foros
- **`createGuide(userId, data)`:**
  1. Sanitiza el contenido (Markdown).
  2. Crea el registro `Guide`.
  3. Si el usuario es PRO, marca la guía para revisión inmediata por Mods.
- **`getThreadTree(postId)`:**
  1. Construcción recursiva del árbol de comentarios anidados.
  2. Inyecta metadatos del autor (Badges, Nivel) en cada comentario.

## 5. Módulo de Moderación y Auditoría
- **`reportContent(senderId, entityId, type)`:**
  1. Crea un log en `ActivityLogs` (Mongo).
  2. Crea un evento de alerta en el `Admin Dashboard` (vía Sockets).
- **`applySanction(adminId, targetId, sanctionData)`:**
  1. Crea el registro `Sanction` en Postgres.
  2. Si el tipo es `BAN_PERMA`, cierra todas las sesiones activas en el Core API.
  3. Genera el log de auditoría en MongoDB.

## 6. Módulo de Mensajería (Socket Interactor)
- **`handleNewMessage(socketData)`:**
  1. El Core API valida la sesión del socket.
  2. Guarda el mensaje en la colección `Messages` (Mongo).
  3. Actualiza el `lastMessage` y el `unreadCounts` en la colección `ChatChannels` (Mongo).
  4. Emite el evento de mensaje nuevo al canal específico de Socket.io.
