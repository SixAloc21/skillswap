# Despliegue de SkillSwap

## Estrategia actual

- El frontend se publica en Vercel y consume la API publica de Render.
- El backend usa Elastic Cloud como unica fuente para habilidades y busquedas.
- `ELASTICSEARCH_URIS` y `ELASTICSEARCH_API_KEY` son obligatorias.
- Si Elastic Cloud no responde, la API devuelve un error; no inventa resultados locales.

Los matches y contactos aun se almacenan en memoria y se pierden cuando el backend se reinicia. Esta limitacion debe explicarse al presentar el prototipo.

## Backend en Render

El repositorio incluye `render.yaml` y `backend/Dockerfile`. Crear un
**Blueprint** en Render apuntando al repositorio permite detectar esta
configuracion y construir el servicio Java dentro de Docker automaticamente.

Configuracion incluida:

```text
Runtime: Docker
Plan: Free
Root Directory: backend
Health Check: /actuator/health
Auto Deploy: cada commit
```

Variables obligatorias:

```text
SKILLSWAP_CORS_ALLOWED_ORIGINS=http://localhost:4200,https://frontend-six-taupe-c8r0pelv2y.vercel.app
ELASTICSEARCH_URIS=https://tu-endpoint.es.region.aws.elastic-cloud.com
ELASTICSEARCH_API_KEY=tu-api-key-de-elasticsearch
```

La API key debe crearse para Elasticsearch desde la administracion del despliegue; no se debe usar una API key de administracion de la organizacion de Elastic Cloud. Los secretos se guardan en Render y nunca en Git.

## Frontend en Vercel

URL de produccion:

```text
https://frontend-six-taupe-c8r0pelv2y.vercel.app
```

La URL publica del backend se configura en:

```text
frontend/src/environments/environment.prod.ts
```

Ejemplo:

```ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://skillswap-api-e7y8.onrender.com'
};
```

Desplegar usando:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: dist/skillswap/browser
```

## Wear OS

Para conectar el emulador con un backend local se puede usar:

```text
http://10.0.2.2:8080/
```

La compilacion publicada usa directamente:

```text
https://skillswap-api-e7y8.onrender.com/
```

La URL publica debe usar HTTPS. Ademas:

- Instalar un APK firmado de release en el reloj.
- Abrir la app una vez y conceder el permiso de notificaciones.
- Verificar que el servicio `SkillSwap conectado` permanezca activo.
- Probar que una solicitud del frontend genera la notificacion y abre la pantalla protegida.

## Verificacion previa al despliegue

```text
Frontend: npm run build
Backend:  .\mvnw.cmd test
Wear OS:  .\gradlew.bat testDebugUnitTest assembleDebug
```

Antes de publicar, completar tambien una ejecucion real de Lighthouse. El archivo `reporte-lighthouse.md` sigue marcado como pendiente y no debe presentarse como evidencia terminada.
