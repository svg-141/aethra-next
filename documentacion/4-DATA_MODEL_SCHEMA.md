# 🗄️ Esquema de Datos Híbrido - Aethra (Especificación Final v1.2)

Aethra utiliza una arquitectura de base de datos dual para optimizar el rendimiento y la escalabilidad:
1. **PostgreSQL (vía Prisma):** Datos relacionales, integridad, autenticación, finanzas y comunidad.
2. **MongoDB:** Mensajería, historiales de IA, caché de juegos y auditoría profunda.

---

## 🐘 1. PostgreSQL (Base de Datos Principal - Relacional)

### Entidades de Usuario y Configuración
- **User:**
    - `id`: UUID (Primary Key).
    - `email`: String (Unique).
    - `isEmailVerified`: Boolean (Default: false).
    - `password`: String (Hashed).
    - `username`: String (Unique).
    - `avatar`: String (URL).
    - `bio`: String (Max 250 chars).
    - `role`: Enum (`USER`, `MODERATOR`, `ADMIN`).
    - `plan`: Enum (`FREE`, `PRO`).
    - `themePreference`: String (Default: 'aethra-purple').
    - `xp`: Int (Default: 0).
    - `level`: Int (Default: 1).
    - `createdAt` / `updatedAt`: DateTime.

- **PrivacySettings:**
    - `userId`: Relation (User).
    - `isProfilePublic`: Boolean (Default: true).
    - `allowDMsFrom`: Enum (`EVERYONE`, `FRIENDS_ONLY`, `NONE`).
    - `showRankInProfile`: Boolean (Default: true).

- **OnboardingData:**
    - `userId`: Relation (User).
    - `gamesSelected`: String[] (IDs de juegos).
    - `completed`: Boolean.

### Integración con Juegos (Riot Games & Perfiles)
- **GameProfile:**
    - `id`: UUID.
    - `userId`: Relation (User).
    - `gameId`: Enum (`LOL`, `VALORANT`, `TFT`, `CS2`, `DOTA2`).
    - `riotPuuid`: String (Opcional).
    - `riotId`: String (ej: "User#NA1").
    - `currentRank`: String.
    - `region`: String.
    - `lastUpdate`: DateTime.

### Entidades Sociales y Notificaciones
- **Friendship:**
    - `id`: UUID.
    - `requesterId`: Relation (User).
    - `addresseeId`: Relation (User).
    - `status`: Enum (`PENDING`, `ACCEPTED`, `BLOCKED`).

- **Notification:**
    - `id`: UUID.
    - `recipientId`: Relation (User).
    - `senderId`: Relation (User - Opcional).
    - `type`: Enum (`FRIEND_REQUEST`, `POST_COMMENT`, `GUIDE_LIKE`, `SYSTEM_ALERT`, `NEW_MESSAGE`).
    - `entityId`: String (ID del objeto relacionado).
    - `targetUrl`: String (Ruta interna para redirección al clic).
    - `isRead`: Boolean (Default: false).
    - `createdAt`: DateTime.

### Entidades de Comunidad y Gamificación
- **Guide:**
    - `id`: UUID.
    - `authorId`: Relation (User).
    - `gameId`: String.
    - `title`: String.
    - `content`: Text (Markdown).
    - `tags`: String[] (ej: "Build", "Early Game").
    - `isOfficial`: Boolean.
    - `viewCount`: Int (Default: 0).
    - `upvotes` / `downvotes`: Int.

- **ForumPost:**
    - `id`: UUID.
    - `authorId`: Relation (User).
    - `gameId`: String.
    - `title`: String.
    - `content`: Text.
    - `votes`: Int.

- **Comment:**
    - `id`: UUID.
    - `authorId`: Relation (User).
    - `postId`: Relation (ForumPost - Opcional).
    - `guideId`: Relation (Guide - Opcional).
    - `content`: Text.
    - `parentId`: UUID (Para respuestas anidadas).

- **Badge:** (Insignias de logros)
    - `id`: UUID.
    - `name`: String.
    - `description`: String.
    - `iconUrl`: String.
- **UserBadge:** (Join Table)
    - `userId`: Relation (User).
    - `badgeId`: Relation (Badge).
    - `unlockedAt`: DateTime.

### Negocio y Soporte
- **Subscription:**
    - `userId`: Relation (User).
    - `stripeSubscriptionId`: String.
    - `status`: String.
- **Sanction:**
    - `targetUserId`: Relation (User).
    - `moderatorId`: Relation (User).
    - `type`: Enum (`WARN`, `MUTE`, `BAN_TEMP`, `BAN_PERMA`).
    - `reason`: String.
    - `expiresAt`: DateTime.
- **SupportTicket:**
    - `id`: UUID.
    - `creatorId`: Relation (User).
    - `subject`: String.
    - `status`: Enum (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`).
    - `priority`: Enum (`LOW`, `MEDIUM`, `HIGH`).

---

## 🍃 2. MongoDB (Base de Datos Secundaria - Documental)

### Colección: `ChatChannels`
- `_id`: ObjectId.
- `type`: String ("DM", "GROUP").
- `participants`: Array [UserIDs].
- `lastMessage`: {
    - `text`: String,
    - `timestamp`: Date,
    - `senderId`: UUID
  }.
- `unreadCounts`: Map { "userId": Int } (Contador de mensajes sin leer por usuario).

### Colección: `Messages`
- `_id`: ObjectId.
- `channelId`: ObjectId (Indexado).
- `senderId`: UUID.
- `content`: { `text`: String, `mediaUrl`: String, `mediaType`: String }.
- `reactions`: Array [ { `emoji`: String, `userId`: UUID } ].
- `isReported`: Boolean.
- `timestamp`: Date.

### Colección: `AISessions`
- `_id`: ObjectId.
- `userId`: UUID.
- `gameContext`: String.
- `modelUsed`: String (ej: "GPT4All-Llama3").
- `conversation`: [ { `role`: "user" | "assistant", `content`: String, `timestamp`: Date } ].

### Colección: `AIUsageDaily`
- `userId`: UUID.
- `date`: String (YYYY-MM-DD).
- `count`: Int.

### Colección: `ActivityLogs`
- `userId`: UUID.
- `action`: String.
- `category`: String.
- `metadata`: { `endpoint`: String, `payload`: Object, `status`: String, `errorStack`: String }.
- `timestamp`: Date.

---

## 🔄 3. Lógica de Funciones Complejas

1.  **Cálculo de Nivel:** No guardamos el nivel en tiempo real si no queremos. Se puede calcular en el frontend o backend con la fórmula de `documentacion/5-LEVELING_SYSTEM.md` basada en `xp`.
2.  **Breadcrumbs de Notificación:** El campo `targetUrl` permite que, al hacer clic en "Alguien comentó en tu post", la app sepa exactamente a qué ruta redirigir sin lógica extra.
3.  **Moderación Cruzada:** Cuando un moderador ve una `Sanction`, el sistema busca en `ActivityLogs` (MongoDB) todas las acciones recientes de ese usuario para dar contexto de su comportamiento.
4.  **Optimización de Lista de Chats:** Al guardar `lastMessage` dentro del canal, la vista de `Messenger` carga instantáneamente sin tener que buscar en la colección de `Messages`.
