# Compatibilidad con navegadores

## Navegadores objetivo

SkillSwap fue pensado para funcionar en los navegadores modernos mas comunes:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

## Consideraciones tecnicas

| Libreria o tecnologia | Uso | Compatibilidad considerada |
| --- | --- | --- |
| Angular 19 | Componentes, rutas, formularios y actualizacion declarativa del DOM | Chrome, Edge, Firefox y Safari modernos |
| TypeScript 5.7 | Tipado y compilacion del frontend | Se transpila a JavaScript mediante Angular CLI |
| RxJS 7.8 | Consultas HTTP, estado reactivo y sincronizacion de Matches | No depende de APIs experimentales del navegador |
| CSS Grid y Flexbox | Layout responsive | Soporte estable en los navegadores objetivo |
| Spring Boot | API REST fuera del navegador | Evita conectar el cliente directamente con Elasticsearch |
| Wear Compose Material 3 | Interfaz nativa del smartwatch | Se ejecuta como app Wear OS, no como pagina web dentro del reloj |

Angular CLI genera los bundles compatibles segun la configuracion del proyecto. No se usan APIs web experimentales ni funciones exclusivas de un navegador.

## Consideraciones moviles

- El navbar cambia a menu movil.
- Las grillas de tarjetas se adaptan a una sola columna en pantallas pequenas.
- Formularios, botones y modales mantienen area tactil suficiente.

## Consideraciones para wearables

- La integracion wearable se maneja desde una app Wear OS ejecutada en Android Studio.
- La app consume el backend de SkillSwap y muestra solicitudes compactas para el reloj.
- Se privilegian textos cortos, acciones rapidas y un estado visible.
- La pantalla principal esta protegida con PIN y permite cerrar sesion.
- La app usa un servicio local de baja prioridad para consultar ofertas aun cuando se muestra la caratula.

## Smart TV

No se implemento una aplicacion para Smart TV porque el dispositivo inteligente elegido para el proyecto es el smartwatch. El sitio puede abrirse en navegadores modernos de television, pero no se declara soporte formal para controles remotos, navegacion por foco o resoluciones de sala. Esta exclusion reduce alcance y evita afirmar compatibilidad que no fue probada.

## Notificaciones

La app Wear OS consulta solicitudes pendientes cada 10 segundos. Cuando detecta una solicitud nueva genera una notificacion nativa; al tocarla abre SkillSwap Wear y muestra las acciones disponibles. Sin Firebase, la app debe abrirse al menos una vez tras iniciar el reloj y mantiene un servicio local visible de prioridad minima. Para un despliegue publico debe apuntar a la URL HTTPS publica del backend.

## Rendimiento

- La busqueda usa el backend de SkillSwap y Elastic Cloud; el navegador nunca se conecta directamente al indice.
- Las actualizaciones visuales ocurren sin recarga de pagina.
- La cantidad de datos iniciales indexados se mantiene razonable para una demo escolar fluida.
- Las grillas se reducen a una columna en pantallas pequenas y las imagenes no exceden el ancho disponible.
- El wearable transfiere objetos compactos y evita descargar imagenes, lo que reduce consumo de red y bateria.
