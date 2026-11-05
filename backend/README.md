# SkillSwap API

Backend Spring Boot para SkillSwap.

## Que incluye

- API REST para habilidades.
- Integracion con Elasticsearch mediante Spring Data Elasticsearch.
- Endpoints de matches.
- Endpoints para wearable.
- Endpoint de formulario de contacto.
- CORS habilitado para Angular en `localhost:4200`.

## Requisitos

- Java 17 o superior.
- Un despliegue de Elastic Cloud y una API key de Elasticsearch.
- No necesitas Maven instalado: el proyecto incluye Maven Wrapper.

## Configurar Elastic Cloud

```powershell
$env:ELASTICSEARCH_URIS='https://tu-endpoint.es.region.aws.elastic-cloud.com'
$env:ELASTICSEARCH_API_KEY='tu-api-key-de-elasticsearch'
```

El backend usa exclusivamente el indice `skillswap-skills` de Elastic Cloud. Si las variables faltan o el servicio no esta disponible, las consultas fallan en vez de usar datos locales.

## Ejecutar backend

Desde `C:\SkillSwap\backend`:

```bash
.\mvnw.cmd spring-boot:run
```

API disponible en:

```text
https://skillswap-api-e7y8.onrender.com
```

## Endpoints principales

```text
GET    /api/skills
GET    /api/skills/search?q=ingles&category=Idiomas&modality=ONLINE&level=INTERMEDIO
GET    /api/skills/{id}
POST   /api/skills

GET    /api/matches
POST   /api/matches
PATCH  /api/matches/{id}/accept
PATCH  /api/matches/{id}/reject
PATCH  /api/matches/{id}/later

GET    /api/wearable/notifications
PATCH  /api/wearable/notifications/{id}/accept
PATCH  /api/wearable/notifications/{id}/reject
PATCH  /api/wearable/notifications/{id}/later

GET    /api/contact
POST   /api/contact
```

## URL para Android Studio Emulator

Si el wearable corre en emulador Android/Wear OS y el backend esta en tu PC, usa:

```text
http://10.0.2.2:8080
```

Ejemplo:

```text
GET http://10.0.2.2:8080/api/wearable/notifications
```
