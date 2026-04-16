# 📱 Especificación Detallada de Vistas - Usuario (Aethra)

## 🏠 1. Landing Page (Ruta Raíz `/`)
Es la página pública para usuarios no autenticados. Su objetivo es la conversión.

### Sección Hero
- **Título Impactante:** Enfocado en la IA y el Gaming Competitivo.
- **Subtítulo:** Explicación breve de la ventaja de usar Aethra.
- **Botón `Empieza Gratis`:** Redirige a `/register`.
- **Botón `Explorar Meta`:** Redirige a `/community`.
- **Imagen/Video:** Demo de la IA respondiendo una consulta compleja.

### Sección Características (Features)
- **IA Asistente:** Descripción de la integración con GPT4All en GCP.
- **Comunidad:** Mención a los foros y guías de pro-players.
- **Tiempo Real:** Explicación de la mensajería instantánea.

### Sección de Precios (Pricing)
- **Plan Free:**
    - Consultas limitadas a la IA (X por día).
    - Acceso a foros públicos.
    - Anuncios limitados.
- **Plan Aethra Pro (Suscripción):**
    - Consultas ILIMITADAS.
    - Análisis de Meta en tiempo real.
    - Rol exclusivo en la comunidad.
    - Sin anuncios.
- **Botón `Suscribirse`:** Redirige a `/login` o `/checkout`.

### Footer
- Enlaces a RRSS, Términos de Servicio, Privacidad y Contacto.

---

## 🔑 2. Flujo de Autenticación y Onboarding

### Login (`/login`)
- **Inputs:** Email y Contraseña.
- **Botón `Google Login`:** Integración con NextAuth.
- **Enlace `Olvidé mi contraseña`:** Redirige a `/auth/forgot-password`.
- **Enlace `Crear cuenta`:** Redirige a `/register`.

### Registro (`/register`)
- **Formulario Step-by-Step:**
    - Step 1: Datos básicos (Email, Pass).
    - Step 2: Verificación de Email (OTP o Link).
    - Step 3: Redirección automática al Onboarding.

### Onboarding (`/onboarding`)
*Esta vista aparece solo la primera vez que un usuario se registra.*
- **Selección de Juegos:** Grid de iconos de juegos. El usuario debe elegir al menos uno.
- **Nivel Competitivo:** Selector por juego (ej: Bronce, Diamante, Global Elite).
- **Botón `Finalizar`:** Guarda en DB y redirige al `/dashboard`.

---

## 🏛️ 3. Vistas de Aplicación (Dashboard & Core)

### Dashboard (`/dashboard`)
- **Sección Bienvenida:** Texto dinámico "Hola, [Username]".
- **Widgets de Estadísticas (Cards):**
    - `Partidas Analizadas`: Número total de consultas a la IA.
    - `Nivel de Usuario`: XP acumulada en la plataforma.
    - `Juego Favorito`: Basado en el uso de la IA.
- **Feed de Noticias del Meta (Grid):**
    - Cards de noticias: Imagen, Título, Badge de Juego (ej: "League of Legends").
    - Botón "Leer más" -> Abre modal con la noticia completa o redirige a `/news/[id]`.
- **Quick AI Access:**
    - Botón grande "Preguntar sobre mi último juego" -> Redirige a `/ai` con el contexto del juego precargado.

### IA Competitive Assistant (`/ai`)
- **Selector de Contexto (Top Bar):** Tabs de juegos (LoL, Valorant, etc.).
- **Área de Chat (Centro):** Burbujas de mensaje, soporte para Markdown.
- **Barra de Entrada (Bottom):** Input, botón enviar, botón limpiar contexto.
- **Sidebar de Sesiones (Izquierda interna):** Lista de conversaciones pasadas.

### Messenger Hub (`/messenger`)
- **Columna de Chats (Izquierda):** Buscador, lista de chats activos, badge de mensajes sin leer.
- **Ventana de Chat (Centro):** Cabecera (Nombre, Foto), Mensajes con carga infinita, Botón reporte.
- **Input:** Soporte para texto, multimedia (Supabase) y emojis.

---

## 👥 4. Perfil de Usuario y Red Social (`/profile/[username]`)
Esta vista se adapta si es el perfil propio o de un tercero.

### Cabecera de Perfil (Header)
- **Info Básica:** Avatar, Username, Nivel, Rango Competitivo principal.
- **Badges (Logros):** Fila de iconos de insignias obtenidas (ej: "Mentor de Guías", "Vencedor Riot").
- **Bio:** Breve descripción del jugador.
- **Botones de Acción (Si es tercero):**
    - `Agregar Amigo` / `Eliminar Amigo`.
    - `Enviar Mensaje` -> Redirige al DM en `/messenger`.
    - `Bloquear / Reportar` -> Abre modal de seguridad.

### Tabs de Contenido (Tabs)
1. **Estadísticas (Riot Analytics):**
    - Visualización de rango actual, winrate y campeones favoritos (Caché de MongoDB).
2. **Guías:** Grid de guías publicadas por este usuario.
3. **Actividad (Posts/Comentarios):** Feed de sus últimas participaciones en los foros.
4. **Multimedia:** Galería de imágenes/videos que el usuario ha compartido públicamente o en guías.

---

## ⚙️ 5. Ajustes y Soporte

### Settings (`/settings`)
- **General:** Nickname, avatar, biografía.
- **Privacidad:** Quién puede ver perfil/enviar DMs.
- **Temas:** Selector de los 8 temas de Aethra con preview.

### Soporte (`/support`)
- **FAQ:** Preguntas frecuentes.
- **Mis Tickets:** Lista de incidencias abiertas/cerradas.
- **Botón `Nuevo Ticket`:** Formulario (Asunto, Categoría, Descripción).
