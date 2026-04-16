# 🗺️ Roadmap de Aethra (v2.0) - Plataforma de Gaming & IA

Este Roadmap refleja el desarrollo de Aethra como un ecosistema modular (Next.js + Core API).

## Fase 1: Cimientos y Core API (Infraestructura)
- [ ] **Setup Core API:** Configuración de Express/Node con Prisma (Postgres) y Mongoose (MongoDB).
- [ ] **Base de Datos Principal:** Implementación de modelos de Usuario, Roles (RBAC) y Onboarding.
- [ ] **Auth Gateway:** Integración de NextAuth.js con el Core API para sesiones seguras (JWE).
- [ ] **Documentación de API:** Setup de Swagger o similar para documentar los endpoints del Core.

## Fase 2: Rediseño a "Dashboard App" (Frontend)
- [ ] **App Layout:** Implementación del Shell (Sidebar, Header, Paneles) con soporte para los 8 temas.
- [ ] **User Profile:** Vista de perfil personal e integración de los Badges (Insignias).
- [ ] **Onboarding Flow:** Interfaz de selección de juegos y niveles iniciales.
- [ ] **Integración con Core:** Consumo de los primeros endpoints de usuario.

## Fase 3: Real-time Engine (Mensajería)
- [ ] **Microservicio Socket.io:** Servidor dedicado para DMs y grupos.
- [ ] **Lógica de Chat (Mongo):** Envío de mensajes, multimedia (Supabase Integration) y reacciones.
- [ ] **Sistema de Notificaciones:** Emisión de eventos reales (voto en guía, solicitud de amigo).
- [ ] **Unread Counts:** Contador de mensajes no leídos persistente.

## Fase 4: Inteligencia y Datos de Riot (Análisis Pro)
- [ ] **Riot Service:** Módulo de sincronización de historial y rangos (MatchHistory cacheado en Mongo).
- [ ] **IA Gateway:** Puente seguro con la instancia de Ubuntu en GCP (Streaming de respuestas).
- [ ] **Prompt Context:** Lógica para inyectar datos del usuario (rango, main champ) en las consultas a la IA.
- [ ] **Control de Cuotas:** Límites de uso de IA por Plan (Free/Pro).

## Fase 5: Gamificación y Comunidad (Ecosistema)
- [ ] **XP Engine:** Lógica de otorgamiento automático de experiencia por acciones.
- [ ] **Guides & Forums:** Sistema de creación de guías (Markdown) y hilos de discusión.
- [ ] **Voting System:** Upvotes/Downvotes con impacto en la reputación del usuario.

## Fase 6: Panel Administrativo y Moderación
- [ ] **Dashboard Admin:** Widgets de estado del servidor y actividad de usuarios.
- [ ] **Security Audit Explorer:** Buscador de logs de actividad en MongoDB.
- [ ] **Soporte Interno:** Sistema de tickets de soporte integrado con chat.
- [ ] **Global Moderation:** Herramientas de ban/mute y borrado de contenido tóxico.

---

### 🚀 Metodología de Trabajo
1. **Contrato de API primero:** Definir el endpoint antes de codificar.
2. **Seguridad por diseño:** Cada nueva función pasa por el filtro de RBAC.
3. **Optimización Continua:** Pruebas de carga en Socket.io y la IA antes de cada fase final.
