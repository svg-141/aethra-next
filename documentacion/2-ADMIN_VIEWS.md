# 🛠️ Especificación Detallada de Vistas - Administrador (Aethra)

Este panel es el centro de control total de la plataforma. Solo accesible para roles `ADMIN` y `MODERATOR`.

## 🏗️ Navegación y Modo Dual
- **Botón `Switch to User View`:** Ubicado en la parte superior del Sidebar. Permite al Admin navegar por la web como un usuario normal (ver guías, chatear, usar IA) pero manteniendo una "Barra de Herramientas de Admin" flotante.
- **Botón `Back to Admin Panel`:** Visible solo para Admins cuando están en la vista de usuario.

---

## 🏛️ Detalle de Vistas Administrativas

### 1. Dashboard de Control (`/admin`)
- **Widgets de Tiempo Real:**
    - `Usuarios Online`: Contador vivo + lista rápida de últimos logins.
    - `Carga del Servidor (GCP)`: Gráfico de uso de CPU/RAM de la instancia de IA.
    - `Estado de APIs`: Semáforo de estado (Riot API, Supabase, MongoDB, GCP).
- **Cola de Moderación Urgente:** Lista de los 5 reportes de toxicidad más recientes con botón `Atender Ahora`.
- **Métricas de Conversión:** Gráfico de nuevos registros y suscripciones Pro del día.

### 2. Gestión de Usuarios (`/admin/users`)
- **Tabla Maestra de Usuarios:**
    - Columnas: ID, Avatar, Username, Email, Rol, Plan, Nivel, Estado (Activo/Baneado).
- **Acciones por Usuario (Botones en fila):**
    - `Editar Perfil`: Cambiar username, avatar o bio manualmente.
    - `Gestionar Rol`: Cambiar entre User, Moderator o Admin.
    - `Recuperar Cuenta`: Generar link de reset de password o cambiar email vinculado.
    - `Ver Actividad`: Redirige a `/admin/logs?userId=[id]` para ver todo lo que ha hecho.
    - `Sancionar`: Abre modal para Mute o Ban (Temporal/Perma).
- **Ficha de Detalle (`/admin/users/[id]`):**
    - Vista de todas las guías, comentarios y reportes asociados a ese usuario.
    - Botón `Impersonate` (Solo Admins): Permite entrar a la cuenta del usuario para debuggear errores específicos (requiere log de auditoría).

### 3. Centro de Moderación y Seguridad (`/admin/moderation`)
- **Filtros:** Por tipo (Mensaje Chat, Post Foro, Guía, Multimedia).
- **Lista de Reportes Pendientes:**
    - `Evidencia`: El contenido denunciado.
    - `Contexto`: Botón para cargar los 10 mensajes anteriores en el chat.
    - `Historial del Acusado`: Ver si tiene sanciones previas.
- **Acciones Rápidas:**
    - `Ignorar`: Marca como falso reporte.
    - `Borrar Contenido`: Elimina el post/mensaje y envía notificación de advertencia al autor.
    - `Ban Automático`: Si la IA detecta toxicidad extrema (ej: racismo), el admin solo confirma con un clic.

### 4. Gestión de Contenido y Comunidad (`/admin/content`)
- **Control de Guías:**
    - Lista de guías pendientes de revisión.
    - Botón `Hacer Oficial`: Añade el badge de "Guía Verificada" y le da XP extra al autor.
- **Gestión de Insignias (Badges):**
    - `Editor de Badges`: Formulario para subir el icono (SVG/PNG) y definir la lógica (ej: "Se gana al llegar a Nivel 10").
    - `Asignación Manual`: Para premios de torneos o eventos especiales.
- **Temas Visuales:**
    - `Theme Manager`: Lista de los 8 temas actuales.
    - `Añadir Tema`: Formulario para definir las variables CSS (Primary, Secondary, Background) y nombre del nuevo tema.

### 5. Monitor de IA y Sistema (`/admin/ai`)
- **Consola de Logs IA:** Visualización en tiempo real de las peticiones que llegan a GCP.
- **Configuración del Modelo:**
    - Switch para cambiar entre modelos de IA (ej: "Llama-3-8B" a "Mistral-7B").
    - Botón `Force Meta Update`: Obliga a la IA a re-escanear las APIs de Riot para actualizar su conocimiento sobre el parche actual.
- **Límites de Cuota:** Configurar cuántas consultas diarias tiene el plan Free vs Pro.

### 6. Soporte y Tickets (`/admin/support`)
- **Bandeja de Tickets:** Clasificados por `Soporte Técnico`, `Reporte de Pago`, `Apelación de Ban`.
- **Chat de Soporte:** Interfaz de mensajería directa con el usuario que abrió el ticket.
- **Notas Internas:** Espacio para que los moderadores dejen comentarios sobre un caso que otros mods puedan ver.

### 7. Explorador de Auditoría (`/admin/logs`)
- **Buscador Universal:** Filtrar por `UserID`, `Acción`, `Rango de Fechas` o `IP`.
- **Visualizador de Payloads:** Ver exactamente qué datos se enviaron en una petición que causó un error 500.
- **Exportación:** Botón para descargar logs en JSON/CSV para análisis externo.
