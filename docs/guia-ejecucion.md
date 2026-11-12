# Guia de ejecucion

## Requisitos

- Node.js 22 o compatible con Angular 19.
- npm.
- Java 17 o superior.
- Docker Desktop para Elasticsearch.

## Instalar frontend

```bash
cd frontend
npm install
```

## Levantar Elasticsearch

Desde la raiz del proyecto:

```bash
docker compose -f docker-compose.elasticsearch.yml up -d
```

## Ejecutar backend

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

API:

```text
https://skillswap-api-e7y8.onrender.com
```

## Ejecutar frontend

```bash
cd frontend
npm start
```

Aplicacion:

```text
http://localhost:4200
```

## Rutas principales

- `/`
- `/explorar`
- `/habilidad/:id`
- `/publicar`
- `/matches`
- `/perfil`
- `/contacto`
- `/privacidad`
- `/acerca-de`
- `/ayuda`

## Evidencias sugeridas para entregar

1. Pantalla inicial con hero y banner digital.
2. Busqueda con filtros activos conectada al backend.
3. Mensaje sin resultados del buscador.
4. Modal de confirmacion al solicitar intercambio.
5. Formulario con mensajes de validacion.
6. Publicacion exitosa visible en Explorar.
7. Cambio visual de estado en Matches.
8. Dashboard del perfil.
9. App Wear OS consumiendo `/api/wearable/notifications`.
10. Formulario de contacto enviando datos a `/api/contact`.
11. Footer con redes sociales, datos de contacto y paginas complementarias.
