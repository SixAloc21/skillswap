# SkillSwap

SkillSwap es una plataforma web academica para encontrar, publicar e intercambiar habilidades entre personas. El proyecto ahora esta separado en frontend Angular y backend Spring Boot para simular una arquitectura mas cercana a una aplicacion real.

## Tecnologias

- Angular 19
- TypeScript
- SCSS
- RxJS
- Spring Boot
- Spring Data Elasticsearch
- Elasticsearch
- Docker Compose
- Kotlin y Jetpack Compose para Wear OS

## Funcionalidades principales

- Landing page moderna con hero, beneficios, categorias y banner digital.
- Navbar responsive con acceso a Inicio, Explorar, Publicar, Matches, Perfil y Contacto.
- Menu hamburguesa colapsable para navegacion movil.
- Buscador funcional por texto y descripcion.
- Busqueda predictiva con sugerencias y tolerancia a errores de escritura.
- Filtros por categoria, modalidad y nivel.
- Tarjetas dinamicas de habilidades con acciones de detalle y solicitud.
- Detalle completo de habilidad con modal de confirmacion.
- Formulario de publicacion con validaciones y guardado mediante API Spring Boot.
- Pagina de Matches con estados pendientes, aceptados y rechazados.
- Perfil tipo dashboard con estadisticas y habilidades publicadas.
- Integracion con app Wear OS para recibir y responder solicitudes desde emulador.
- Acceso Wear OS protegido por PIN y cierre de sesion.
- Notificaciones locales de nuevas ofertas sin Firebase.
- Pagina de contacto con datos, redes sociales, mapa simulado y formulario conectado al backend.
- Paginas complementarias de privacidad, acerca de y ayuda.
- Backend Spring Boot con API REST.
- Buscador preparado para Elasticsearch.
- Endpoints para que un wearable consulte notificaciones.
- Documentacion tecnica dentro de `docs/`.

## Ejecutar frontend

```bash
cd frontend
npm install
npm start
```

El frontend se sirve por defecto en:

```text
http://localhost:4200/
```

## Ejecutar backend

Primero abre Docker Desktop y levanta Elasticsearch desde la raiz del proyecto:

```bash
docker compose -f docker-compose.elasticsearch.yml up -d
```

Despues ejecuta Spring Boot:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

El backend se sirve por defecto en:

```text
http://localhost:8080/
```

## Estructura general

```text
frontend/
  src/
  public/
  angular.json
backend/
  src/
  pom.xml
docs/
docker-compose.elasticsearch.yml
```

La app del reloj se desarrolla actualmente en `C:\Users\nunez\AndroidStudioProjects\SkillSwapWear`. Antes de entregar el codigo por Git debe publicarse en un repositorio propio o incorporarse a este repositorio sin archivos locales ni carpetas de build.

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

## Capturas sugeridas

- Hero principal de la pagina de inicio.
- Busqueda en `Explorar` con filtros activos.
- Mensaje sin resultados en el buscador.
- Modal de solicitud de intercambio.
- Formulario de publicacion con validaciones visibles.
- Estado actualizado de una tarjeta en `Matches`.
- Dashboard del perfil.
- App Wear OS recibiendo una solicitud desde el backend.
- Formulario de contacto enviado correctamente.
- Footer con datos de contacto, redes y paginas complementarias.

## Documentacion adicional

- [docs/seleccion-framework.md](docs/seleccion-framework.md)
- [docs/compatibilidad-navegadores.md](docs/compatibilidad-navegadores.md)
- [docs/pruebas-buscador.md](docs/pruebas-buscador.md)
- [docs/arquitectura.md](docs/arquitectura.md)
- [docs/guia-ejecucion.md](docs/guia-ejecucion.md)
- [docs/interaccion-dom.md](docs/interaccion-dom.md)
- [docs/backend-springboot.md](docs/backend-springboot.md)
- [docs/elasticsearch.md](docs/elasticsearch.md)
- [docs/integracion-wearable.md](docs/integracion-wearable.md)
- [docs/reporte-lighthouse.md](docs/reporte-lighthouse.md)
- [docs/elementos-sitio-web.md](docs/elementos-sitio-web.md)
- [docs/despliegue.md](docs/despliegue.md)
- [docs/cumplimiento-practicas.md](docs/cumplimiento-practicas.md)
- [docs/seguridad-wearable.md](docs/seguridad-wearable.md)
- [docs/actualizaciones-estables.md](docs/actualizaciones-estables.md)
