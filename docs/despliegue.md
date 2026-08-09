# Despliegue de SkillSwap

## Estrategia actual

SkillSwap puede desplegar frontend y backend sin contratar Elastic Cloud de inmediato.

En ese escenario:

- El frontend usa la URL publica del backend.
- El backend arranca en Render.
- Elasticsearch queda opcional.
- Si no existe `ELASTICSEARCH_URIS`, el backend usa el modo respaldo en memoria.
- El buscador sigue funcionando para la demostracion, pero el indicador mostrara `Busqueda en modo respaldo`.

Esta estrategia es adecuada para una demostracion academica. No debe describirse como produccion persistente: los matches y contactos se almacenan en memoria y se pierden cuando el backend se reinicia.

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

Variables minimas para desplegar sin Elasticsearch remoto:

```text
SKILLSWAP_CORS_ALLOWED_ORIGINS=http://localhost:4200
```

Cuando el frontend ya tenga dominio publico, agregarlo tambien:

```text
SKILLSWAP_CORS_ALLOWED_ORIGINS=http://localhost:4200,https://tu-frontend.vercel.app
```

## Activar Elastic Cloud despues

Cuando se tenga Elastic Cloud, agregar estas variables en Render:

```text
ELASTICSEARCH_URIS=https://tu-endpoint.es.region.aws.elastic-cloud.com
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=tu-password
```

No se necesita cambiar codigo para activar Elasticsearch remoto; solo variables de entorno.

## Frontend en Vercel o Netlify

Antes de desplegar frontend, cambiar:

```text
frontend/src/environments/environment.prod.ts
```

Ejemplo:

```ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://tu-backend.onrender.com'
};
```

Luego desplegar usando:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: dist/skillswap/browser
```

## Wear OS

Para pruebas locales:

```text
http://10.0.2.2:8080/
```

Para despliegue real, cambiar en la app Wear OS:

```text
ApiConfig.BASE_URL
```

por la URL publica del backend.

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
