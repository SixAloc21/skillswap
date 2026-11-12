# Backend Spring Boot

El backend de SkillSwap vive en `backend/` y funciona como API REST para separar el frontend Angular de la logica de busqueda, solicitudes y notificaciones.

## Responsabilidades

- Exponer endpoints REST para habilidades.
- Conectar con Elasticsearch.
- Manejar solicitudes de intercambio.
- Exponer notificaciones consumibles por un wearable.
- Recibir mensajes del formulario de contacto.

## Arquitectura

```text
Angular
  -> HTTP REST
    -> Spring Boot API
      -> Elasticsearch
      -> Matches en memoria
      -> Wearable notifications
```

## Ejecucion

Requisito: Java 17 o superior.

1. Levantar Elasticsearch desde la raiz del proyecto:

```bash
docker compose -f docker-compose.elasticsearch.yml up -d
```

2. Ejecutar Spring Boot:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

3. Verificar estado:

```text
https://skillswap-api-e7y8.onrender.com/actuator/health
```

## Contacto

El formulario de contacto del frontend envia datos a:

```text
POST /api/contact
```

Los mensajes se conservan en memoria durante la ejecucion para mantener el proyecto simple y sin base de datos tradicional.
