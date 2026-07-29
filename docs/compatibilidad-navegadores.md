# Compatibilidad con navegadores

## Navegadores objetivo

SkillSwap fue pensado para funcionar en los navegadores modernos mas comunes:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

## Consideraciones tecnicas

- Angular 19 transpila el codigo TypeScript a JavaScript compatible con navegadores modernos.
- El uso de Flexbox y CSS Grid ayuda a mantener layouts consistentes.
- No se usan APIs experimentales que dependan de un navegador especifico.

## Consideraciones moviles

- El navbar cambia a menu movil.
- Las grillas de tarjetas se adaptan a una sola columna en pantallas pequenas.
- Formularios, botones y modales mantienen area tactil suficiente.

## Consideraciones para wearables

- La vista `Wearable` reduce la cantidad de informacion mostrada.
- Se privilegian textos cortos, acciones rapidas y un estado visible.
- Sirve como simulacion academica de adaptacion a dispositivos inteligentes.

## Notificaciones

La app no usa notificaciones reales del sistema, pero la pagina wearable simula una notificacion compacta de SkillSwap para mostrar como podria trasladarse la experiencia a un smartwatch.

## Rendimiento

- Los datos son locales, por lo que la respuesta del buscador y filtros es inmediata.
- Las actualizaciones visuales ocurren sin recarga de pagina.
- La cantidad de datos iniciales indexados se mantiene razonable para una demo escolar fluida.
