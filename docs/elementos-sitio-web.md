# Elementos de una pagina web en SkillSwap

Este documento resume como SkillSwap cubre los elementos solicitados para una pagina web completa.

| Elemento | Implementacion en SkillSwap | Estado |
| --- | --- | --- |
| Nombre de dominio | Propuesta academica: `skillswap.local`; ejecucion local en `localhost:4200` | Cubierto |
| Diseno facil de navegar | Navbar, rutas internas, botones claros y footer con enlaces | Cubierto |
| Paginas internas | Home, Explorar, Detalle, Publicar, Matches, Perfil, Contacto, Privacidad, Acerca de y Ayuda | Cubierto |
| Logotipo | Marca SkillSwap con isotipo `S` en navbar | Cubierto |
| Menus | Menu principal desktop y menu hamburguesa colapsable en movil | Cubierto |
| Textos persuasivos | Hero, beneficios, categorias, ayuda y llamadas a publicar/explorar | Cubierto |
| Imagenes complementarias | Imagen hero y mapa visual en Contacto | Cubierto |
| Datos de contacto | Footer y pagina Contacto con correo, telefono, horario y ubicacion | Cubierto |
| Botones de redes sociales | Links a Instagram, Facebook y LinkedIn en footer y Contacto | Cubierto |
| Formulario de contacto | Pagina `/contacto` conectada a `POST /api/contact` | Cubierto |
| Llamadas a la accion | Explorar, Publicar, Solicitar intercambio, Enviar mensaje | Cubierto |
| Mapa de ubicacion | Mapa visual simulado en Contacto | Cubierto |
| Paginas complementarias | Privacidad, Acerca de y Ayuda | Cubierto |
| Herramientas para estadisticas | Perfil y Matches muestran conteos y estados dinamicos | Cubierto |

## Observaciones del profesor atendidas

- Buscador privado con Elasticsearch: Angular consulta Spring Boot y Spring Boot consulta Elasticsearch.
- Menu colapsable: `NavbarComponent` usa `isMenuOpen`, `*ngIf` y eventos click.
- Datos de contacto: visibles en footer y pagina `/contacto`.
- Formulario de contacto: `ContactComponent` usa formulario reactivo y `ContactService`.
- Privacidad: pagina `/privacidad`.
- Paginas complementarias: `/acerca-de` y `/ayuda`.
- Wearable: app Wear OS conectada a endpoints `/api/wearable/notifications`.
