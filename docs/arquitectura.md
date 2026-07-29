# Arquitectura del proyecto

## Estructura de carpetas

```text
frontend/
  src/
    app/
      core/
        data/
        models/
        services/
      shared/
        components/
      pages/
  public/
  angular.json

backend/
  src/
    main/
      java/com/skillswap/api/
      resources/
  pom.xml

docs/
docker-compose.elasticsearch.yml
```

## Frontend Angular

- `NavbarComponent`: navegacion principal y menu movil.
- `SkillCardComponent`: tarjeta reutilizable para habilidades.
- `ModalComponent`: confirmaciones y mensajes emergentes.
- `PromoBannerComponent`: banner digital que puede mostrarse u ocultarse.
- Paginas: Home, Explorar, Detalle, Publicar, Matches, Perfil, Wearable, Contacto, Privacidad, Acerca de, Ayuda y Not Found.

## Backend Spring Boot

- `SkillController`: expone habilidades, busqueda y publicacion.
- `MatchController`: administra solicitudes y cambios de estado.
- `WearableController`: entrega notificaciones compactas para smartwatch.
- `ContactController`: recibe mensajes de contacto.

## Servicios

- Frontend `SkillService`: consume `GET/POST /api/skills` y `GET /api/skills/search`.
- Frontend `MatchService`: consume `/api/matches` y `/api/wearable/notifications`.
- Frontend `ContactService`: consume `POST /api/contact`.
- Backend `SkillService`: indexa y busca habilidades en Elasticsearch, con respaldo en memoria para demos.
- Backend `MatchService`: mantiene solicitudes en memoria durante la ejecucion.

## Flujo de datos

1. Angular captura acciones del usuario con bindings, eventos y formularios.
2. Los servicios del frontend llaman a la API REST de Spring Boot.
3. Spring Boot consulta o actualiza Elasticsearch para habilidades.
4. Los matches y notificaciones se actualizan en memoria desde el backend.
5. Angular recibe la respuesta y actualiza el DOM sin recargar la pagina.

## Persistencia

- Habilidades: Elasticsearch en el indice `skillswap-skills`.
- Matches: memoria del backend para simulacion academica.
- Contactos: memoria del backend para simulacion academica.
- Perfil: usuario simulado local para mostrar dashboard sin autenticacion real.
