# 🗺️ Sitemap de Rutas (Aethra)

Este documento sirve como referencia rápida de todas las rutas y su propósito.

## 🌐 Rutas Públicas (Landing & Auth)
| Ruta | Descripción |
|------|-------------|
| `/` | Landing Page Principal. |
| `/login` | Página de Inicio de Sesión. |
| `/register` | Página de Registro. |
| `/auth/callback` | Callback para OAuth de Google. |
| `/auth/forgot-password` | Recuperación de cuenta. |
| `/pricing` | Detalle de planes y suscripciones. |

---

## 🔒 Rutas Privadas (Usuario Autenticado)
| Ruta | Descripción |
|------|-------------|
| `/onboarding` | Configuración inicial post-registro. |
| `/dashboard` | Página de inicio del usuario. |
| `/ai` | Asistente de IA Competitivo. |
| `/messenger` | Centro de Mensajería (DMs/Grupos). |
| `/messenger/[id]` | Ventana de chat específica. |
| `/community` | Hub de Comunidad (Guías/Foros). |
| `/community/guides/[id]` | Visualización de una guía específica. |
| `/community/forum/[game]` | Foro específico de un juego. |
| `/profile/[username]` | Perfil de usuario (Propio o Tercero). |
| `/settings` | Ajustes de cuenta y temas. |
| `/notifications` | Lista completa de notificaciones. |
| `/support` | Centro de Soporte y FAQs. |
| `/support/ticket/[id]` | Visualización y chat de un ticket específico. |

---

## 🛠️ Rutas Administrativas (`/admin`)
| Ruta | Descripción |
|------|-------------|
| `/admin` | Dashboard de Control Principal. |
| `/admin/users` | Gestión y roles de usuarios. |
| `/admin/moderation` | Revisión de reportes y baneo. |
| `/admin/ai` | Monitor de la instancia IA en GCP. |
| `/admin/content` | Moderación de guías, foros e insignias. |
| `/admin/support` | Gestión de tickets de soporte. |
| `/admin/logs` | Auditoría de acciones y seguridad. |

---

## ❓ Rutas de Error
| Ruta | Descripción |
|------|-------------|
| `/404` | Error de página no encontrada. |
| `/500` | Error de servidor. |
