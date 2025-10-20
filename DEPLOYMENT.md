# Guía de Despliegue en Vercel - Aethra

Esta guía te ayudará a desplegar tu proyecto Aethra en Vercel.

## Requisitos Previos

- Cuenta de GitHub
- Cuenta de Vercel (puedes usar tu cuenta de GitHub para autenticarte)
- Proyecto subido a GitHub

## Pasos para Despliegue

### 1. Preparar el Proyecto

Asegúrate de que todos los cambios estén en tu repositorio:

```bash
git add .
git commit -m "Preparar proyecto para despliegue en Vercel"
git push origin main
```

### 2. Importar Proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "Add New..." → "Project"
4. Selecciona tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto Next.js

### 3. Configuración del Proyecto

#### Framework Preset
- **Framework**: Next.js (detectado automáticamente)
- **Root Directory**: `aethra-next` (si tu proyecto está en una subcarpeta)
- **Build Command**: `npm run build` (ya configurado)
- **Output Directory**: `.next` (configuración por defecto)

#### Variables de Entorno

Si necesitas variables de entorno, agrégalas en la sección "Environment Variables":

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

### 4. Desplegar

1. Haz clic en "Deploy"
2. Vercel comenzará a construir tu aplicación
3. Una vez completado, recibirás una URL de producción

## Configuración Adicional

### Dominio Personalizado

1. Ve a tu proyecto en Vercel
2. Navega a "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar los DNS

### Optimizaciones Implementadas

El proyecto ya incluye las siguientes optimizaciones para Vercel:

- ✅ Configuración de `vercel.json` con headers de seguridad
- ✅ Optimización de imágenes con Next.js Image
- ✅ Compresión automática habilitada
- ✅ Caché de assets estáticos
- ✅ Output standalone para menor tamaño
- ✅ Headers de seguridad (CSP, HSTS, etc.)

### Rutas Estáticas

Las siguientes rutas están optimizadas para caché:

- `/assets/*` - Imágenes y recursos estáticos (cache 1 año)
- Todos los assets públicos tienen headers de seguridad

## Despliegues Automáticos

Vercel desplegará automáticamente:

- **Producción**: Cada push a `main`
- **Preview**: Cada Pull Request

## Monitoreo

Después del despliegue, puedes:

1. Ver logs en tiempo real en el dashboard de Vercel
2. Configurar integraciones (Slack, Discord, etc.)
3. Ver analytics de rendimiento
4. Revisar métricas de Web Vitals

## Solución de Problemas

### Error de Build

Si el build falla:

1. Verifica los logs en Vercel
2. Asegúrate de que `npm run build` funcione localmente
3. Verifica que todas las dependencias estén en `package.json`

### Imágenes no se Cargan

Si las imágenes no se muestran:

1. Verifica que las rutas sean relativas a `/public/`
2. Usa `/assets/...` en lugar de `./public/assets/...`
3. Asegúrate de que los archivos existan en el repositorio

### Variables de Entorno

Para variables de entorno que se usan en el cliente:

- Deben empezar con `NEXT_PUBLIC_`
- Se configuran en Vercel Dashboard → Settings → Environment Variables
- Requieren un nuevo deploy para aplicarse

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción (local)
npm run build

# Iniciar servidor de producción (local)
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js en Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Optimización de Imágenes](https://nextjs.org/docs/basic-features/image-optimization)

## Soporte

Si encuentras problemas durante el despliegue:

1. Revisa la documentación de Vercel
2. Consulta los logs de build
3. Verifica la configuración de `next.config.ts`
4. Asegúrate de que todas las rutas de assets sean correctas
