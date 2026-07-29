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
- Docker Desktop para levantar Elasticsearch.
- No necesitas Maven instalado: el proyecto incluye Maven Wrapper.

## Levantar Elasticsearch

Desde `C:\SkillSwap`:

```bash
docker compose -f docker-compose.elasticsearch.yml up -d
```

Si Docker Desktop no esta abierto o Elasticsearch no esta disponible, el backend aun puede iniciar con datos locales de respaldo. Cuando Elasticsearch este activo, la busqueda usa el indice `skillswap-skills`.

Si el backend arranca antes que Elasticsearch, el servicio intenta crear y llenar el indice automaticamente en la siguiente consulta.

## Ejecutar backend

Desde `C:\SkillSwap\backend`:

```bash
.\mvnw.cmd spring-boot:run
```

API disponible en:

```text
http://localhost:8080
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
