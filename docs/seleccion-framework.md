# Seleccion del framework

## Por que se usa Angular

Angular se eligio porque ofrece una estructura solida para proyectos academicos de interfaces: enrutamiento, formularios, componentizacion y manejo de estado de interfaz sin depender de muchas librerias externas.

## Ventajas para SkillSwap

- Permite dividir la aplicacion en paginas y componentes reutilizables.
- Facilita el uso de formularios con validaciones reactivas.
- Hace evidente la interaccion con el DOM mediante directivas y bindings.
- Integra TypeScript de forma nativa para mantener modelos claros.

## Escalabilidad

La estructura creada permite crecer a futuro con autenticacion, consumo de API, panel administrativo o historial de intercambios sin rehacer la base del frontend.

## Componentizacion

SkillSwap usa componentes compartidos como navbar, tarjetas de habilidad, modal y banner. Esto evita duplicar logica y mantiene consistencia visual.

## Reversionamiento con GitHub

Angular funciona bien en flujos colaborativos con GitHub porque separa responsabilidades por archivos y carpetas. Cada modulo o pagina puede versionarse con cambios claros y faciles de revisar.

## Integracion con backend y base de datos

La aplicacion Angular consume una API REST desarrollada con Spring Boot. Las habilidades se indexan en Elasticsearch para busqueda por texto y filtros. A futuro se puede agregar una base de datos relacional o documental para usuarios, historial de intercambios y autenticacion.
