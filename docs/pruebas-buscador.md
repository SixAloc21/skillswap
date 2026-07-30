# Pruebas del buscador

Las siguientes pruebas validan el comportamiento esperado de la pagina `Explorar`.

| Prueba | Accion | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Busqueda por texto | Escribir `fotografia` en el buscador | Se muestran solo habilidades cuyo titulo o descripcion contienen el termino | Completado |
| Busqueda predictiva | Escribir `fotgrafia` en el buscador | Se muestran o sugieren habilidades relacionadas con fotografia aunque exista error de escritura | Completado |
| Autocomplete | Escribir `ingl` en el buscador | Aparece una sugerencia como `Ingles conversacional para entrevistas` | Completado |
| Filtro por categoria | Seleccionar `Idiomas` | Se muestran solamente habilidades de la categoria Idiomas | Completado |
| Filtro por modalidad | Seleccionar `Online` | El listado se reduce a resultados con modalidad Online | Completado |
| Filtro por nivel | Seleccionar `Avanzado` | Se muestran solo habilidades de nivel Avanzado | Completado |
| Caso sin resultados | Buscar una cadena inexistente como `astrofisica marina` | Se oculta la grilla y aparece un mensaje dinamico sin resultados | Completado |
| Limpieza de filtros | Hacer clic en `Limpiar filtros` | Se vacian campos y vuelve a mostrarse el conjunto completo de habilidades | Completado |

## Observaciones

- Cada accion actualiza el DOM sin recargar la pagina.
- Las tarjetas cambian en tiempo real gracias a la consulta del frontend hacia Spring Boot.
- Elasticsearch usa busqueda aproximada con `fuzziness: AUTO` para tolerar errores pequenos.
- El mensaje sin resultados se muestra con `*ngIf`.
