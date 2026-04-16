# 🏆 Sistema de Progresión y Niveles (Aethra XP)

Este sistema busca gamificar la plataforma para aumentar la retención y la calidad del contenido.

## 📈 Tabla de Niveles (Fórmula)
Usaremos una progresión exponencial para que cada nivel sea más difícil que el anterior:
`XP Siguiente Nivel = 100 * (Nivel ^ 1.5)`

| Nivel | XP Acumulada Necesaria |
|-------|-------------------------|
| 1 | 0 |
| 2 | 100 |
| 5 | ~1,100 |
| 10 | ~3,100 |
| 20 | ~8,900 |

## 🛠️ Acciones y Recompensas
| Acción | XP | Límite / Notas |
|--------|----|----------------|
| Login Diario | 10 | 1 vez cada 24h. |
| Consulta IA | 5 | Máximo 50 XP/día por este medio. |
| Vincular Riot | 100 | 1 vez por cuenta única. |
| Guía Aprobada | 150 | Al pasar revisión de moderación. |
| Victoria LoL/Val | 20 | Sincronizado vía API. |

## 🎁 Recompensas por Hito
- **Nivel 5:** Badge "Creador Novel" + Permiso para publicar Guías.
- **Nivel 10:** Acceso a canales de chat "High Elo" (basado en rango real + nivel).
- **Nivel 25:** Marco de avatar animado personalizado.
- **Nivel 50:** Título "Oráculo de Aethra" + Acceso a IA sin límites (Bonus temporal).
