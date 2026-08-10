# Matriz de cumplimiento de practicas 3 a 12

## Resumen

| Practica | Requisito | Estado | Evidencia o justificacion |
| --- | --- | --- | --- |
| 3 y 4 | Librerias, navegadores, wearable, notificaciones y rendimiento movil | Cumple | `compatibilidad-navegadores.md`, Angular, RxJS y app Wear OS |
| 3 y 4 | Buscador interno y pruebas basicas | Cumple | Ruta `/explorar`, Elastic Cloud y `pruebas-buscador.md` |
| 3 y 4 | Documentacion y presentacion | Cumple | README y carpeta `docs/` |
| 5 y 6 | Elementos DOM y enlace con dispositivo inteligente | Cumple | `interaccion-dom.md`, Spring Boot y endpoints wearable |
| 5 y 6 | Widget especializado y datos transferidos | Cumple | App SkillSwap Wear y tabla de payload en `integracion-wearable.md` |
| 5 y 6 | Uso de repositorio para despliegue | Cumple con observacion | Existe estrategia Git; el wearable debe publicarse en repo propio o incorporarse antes de entregar |
| 7 y 8 | Widget wearable del catalogo Flutter | Equivalente, no literal | Se uso Kotlin + Jetpack Compose para Wear OS; no se utilizo un widget Flutter |
| 7 y 8 | Dashboard Flutter + Angular | Parcial | Existe dashboard responsive en Angular, pero no contiene un modulo compilado con Flutter |
| 9 y 10 | Documentacion de actualizacion Git y smartwatch | Cumple | `actualizaciones-estables.md` e `integracion-wearable.md` |
| 9 y 10 | Base estable, errores, base de datos y calendario | Cumple | `actualizaciones-estables.md` y `despliegue.md` |
| 11 y 12 | Autenticacion PIN o biometria | Cumple | PIN de cuatro digitos, pantalla protegida y cierre de sesion |
| 11 y 12 | Pruebas de seguridad | Cumple | `PinAuthenticatorTest` y `seguridad-wearable.md` |
| Pagina web | Elementos 1 a 14 | Cumple | `elementos-sitio-web.md` |

## Justificacion de Flutter

El requisito de Flutter no se cumple literalmente. SkillSwap eligio una app nativa Wear OS con Kotlin y Jetpack Compose porque:

- Es la tecnologia oficial y directa para el dispositivo objetivo.
- Permite notificaciones, servicio local, haptica y ciclo de vida propios de Wear OS.
- Evita incorporar un segundo framework solo para mostrar estadisticas ya resueltas en Angular.
- El dashboard requerido existe en `/perfil` y consume datos de los servicios Angular.

Esta decision demuestra la misma integracion funcional, pero debe presentarse como una sustitucion tecnica, no como un componente Flutter. Si el docente exige Flutter de forma estricta, este es el unico punto que requiere desarrollo adicional.

## Biometria

No se implemento porque el enunciado permite PIN o biometria y el emulador elegido no garantiza sensor biometrico. El PIN cubre inicio de sesion, proteccion de pantalla y cierre de sesion de forma reproducible.

## Persistencia

El proyecto cumple como prototipo academico, pero no como plataforma productiva completamente durable. Elastic Cloud persiste las habilidades; matches, contactos y sesion web son simulaciones en memoria/locales. Esta limitacion esta documentada y debe explicarse durante la presentacion.

## Dictamen

El proyecto cubre buscador, DOM, elementos web, dashboard Angular, integracion wearable, notificaciones, PIN, documentacion de Git y estrategia de actualizaciones. Antes del despliegue faltan dos decisiones:

1. Publicar o incorporar el proyecto Wear OS en Git.
2. Confirmar si el docente acepta Kotlin/Compose como sustituto de Flutter.

Ademas, Lighthouse permanece pendiente como evidencia de rendimiento; no es un requisito funcional bloqueante, pero conviene ejecutarlo después del despliegue.

## Verificacion ejecutada

- Angular: build de produccion correcto y 3 pruebas del buscador aprobadas.
- Spring Boot: build correcto y 2 pruebas del ciclo de matches aprobadas.
- Wear OS: APK generado y 5 pruebas del PIN aprobadas.
