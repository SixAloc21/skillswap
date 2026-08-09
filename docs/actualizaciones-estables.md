# Plan de actualizaciones estables

## Uso de Git y repositorio

Cada actualizacion debe desarrollarse en una rama, revisarse y fusionarse solo cuando las tres aplicaciones compilen.

```text
main
  -> rama de funcionalidad
    -> cambios pequenos y documentados
      -> pruebas frontend, backend y wearable
        -> pull request o revision
          -> merge y etiqueta de version
```

Convencion sugerida:

- Ramas: `feature/buscador`, `feature/wear-notifications`, `fix/cors`.
- Commits: `feat: agrega notificaciones locales en Wear OS`.
- Versiones: `v1.0.0`, `v1.0.1` para correcciones y `v1.1.0` para funciones nuevas.
- Nunca subir `local.properties`, secretos, contrasenas de Elasticsearch ni archivos de firma.

La app Wear OS se encuentra actualmente en un proyecto Android Studio separado. Para una entrega reproducible debe publicarse en un repositorio propio o incorporarse al repositorio principal sin `.gradle/`, `.idea/`, `build/` ni `local.properties`.

## Lista de verificacion de una base estable

1. Construir Angular con `npm run build`.
2. Ejecutar pruebas del backend con `.\mvnw.cmd test`.
3. Ejecutar `testDebugUnitTest` y `assembleDebug` en Wear OS.
4. Probar busqueda, filtros y caso sin resultados.
5. Crear una solicitud y comprobar la notificacion del reloj.
6. Responder desde el reloj y comprobar el estado en Matches.
7. Verificar variables de entorno y CORS.
8. Actualizar README y documentos afectados.
9. Crear etiqueta de version solo después de aprobar los pasos anteriores.

## Errores previstos y tratamiento

| Riesgo | Deteccion | Tratamiento |
| --- | --- | --- |
| Elasticsearch no disponible | Indicador `Busqueda en modo respaldo` | Mantener fallback y revisar `ELASTICSEARCH_URIS` |
| CORS bloquea frontend | Error HTTP desde el navegador | Agregar el dominio a `SKILLSWAP_CORS_ALLOWED_ORIGINS` |
| Backend de Render dormido | Primera consulta lenta | Mostrar carga y reintentar |
| Wearable no conecta | Mensaje de error de red | Revisar `ApiConfig.BASE_URL` y conectividad |
| No llega notificacion | Canal desactivado o servicio detenido | Conceder permiso y abrir nuevamente la app |
| Reinicio pierde matches | Lista vacia | Limitacion de almacenamiento en memoria; usar base persistente en produccion |
| Build de frontend falla | Error de Angular CLI | Corregir antes de fusionar; no desplegar un build parcial |

## Base de datos

- Elasticsearch almacena e indexa habilidades cuando esta disponible.
- El modo de respaldo conserva habilidades en memoria para demostraciones.
- Matches y contactos tambien viven en memoria y no sobreviven reinicios.
- Una version productiva debe incorporar persistencia para usuarios, matches, contactos y tokens/dispositivos.

## Calendario sugerido

| Frecuencia | Actividad |
| --- | --- |
| En cada cambio | Build y pruebas relacionadas |
| Semanal durante desarrollo | Revision de errores y documentacion |
| Antes de cada entrega | Prueba integral web-backend-reloj |
| Mensual si esta publicado | Dependencias, seguridad y disponibilidad |
| Trimestral | Actualizacion de Angular, Spring y Wear OS en una rama dedicada |

Las actualizaciones de dependencias no deben aplicarse automaticamente a produccion; primero se prueban en una rama y se conserva una version estable para poder regresar.
