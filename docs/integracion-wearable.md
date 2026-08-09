# Integracion Wearable

La integracion wearable se plantea con un flujo sencillo y demostrable desde Android Studio / Wear OS Emulator.

## Flujo

```text
Angular crea una solicitud
  -> Spring Boot la guarda como match pendiente
    -> Servicio local de Wear OS consulta cada 10 segundos
      -> Wear OS muestra "Tienes una nueva oferta"
        -> Usuario toca la notificacion
          -> Si no hay sesion, se solicita el PIN
            -> La app muestra Aceptar, Rechazar o Despues
              -> Spring Boot actualiza el estado
                -> Angular refleja el cambio en Matches
```

## Endpoints

```text
GET   /api/wearable/notifications
PATCH /api/wearable/notifications/{id}/accept
PATCH /api/wearable/notifications/{id}/reject
PATCH /api/wearable/notifications/{id}/later
```

## URL desde emulador Android

Dentro del emulador, `localhost` apunta al propio emulador. Para llegar al backend de la computadora se usa:

```text
http://10.0.2.2:8080
```

Ejemplo:

```text
http://10.0.2.2:8080/api/wearable/notifications
```

## App Wear OS local

La app Wear OS del proyecto se encuentra en:

```text
C:\Users\nunez\AndroidStudioProjects\SkillSwapWear
```

La configuracion de URL esta en:

```text
app/src/main/java/com/example/skillswapwear/network/ApiConfig.kt
```

Para pruebas locales usa:

```text
BASE_URL = "http://10.0.2.2:8080/"
```

La app consulta solicitudes pendientes, genera una notificacion nativa sin Firebase, muestra la primera disponible y permite aceptar, rechazar o guardar para despues desde el reloj.

## Datos transferidos y proposito

| Dato | Direccion | Proposito |
| --- | --- | --- |
| `id` | Backend a reloj y reloj a backend | Identificar la solicitud que se responde |
| `requesterName` | Backend a reloj | Indicar quien propone el intercambio |
| `desiredSkill` | Backend a reloj | Mostrar la habilidad que desea aprender |
| `offeredSkill` | Backend a reloj | Mostrar lo que ofrece a cambio |
| `status` | Bidireccional | Sincronizar pendiente, aceptado, rechazado o ver despues |

No se transfieren contrasenas, datos bancarios, imagenes ni expedientes personales.

## PIN y pantalla protegida

- PIN academico de cuatro digitos: `2026`.
- Un PIN incorrecto limpia la captura y conserva bloqueada la pantalla principal.
- Una sesion correcta se guarda localmente hasta usar `Cerrar sesion`.
- Si se toca una notificacion con la sesion cerrada, primero aparece la pantalla de PIN.
- La biometria no se implemento porque es opcional y el emulador Wear OS seleccionado no garantiza un sensor biometrico reproducible.

## Notificaciones sin Firebase

`OfferPollingService` funciona como servicio local en primer plano y consulta el endpoint cada 10 segundos. Su notificacion permanente `SkillSwap conectado` es silenciosa y de prioridad minima. Una oferta nueva utiliza un canal de prioridad alta y se registra una sola vez por `matchId`.

Limitaciones aceptadas:

- Hay un retraso maximo aproximado de 10 segundos.
- El reloj y el backend deben tener conectividad.
- Despues de forzar el cierre de la app debe abrirse otra vez.
- El polling consume mas bateria que un push remoto; se eligio para evitar Firebase en la demostracion.

## Sincronizacion con el sitio

La pagina `Matches` del frontend consulta el backend periodicamente. Esto permite que un cambio hecho desde el wearable se vea en el sitio sin recargar manualmente.

## Implementacion realizada en Wear OS

- Polling local cada 10 segundos.
- Notificacion deduplicada por solicitud.
- Acceso protegido mediante PIN.
- Apertura de la app al tocar la notificacion.
- Acciones mediante `PATCH` y actualizacion posterior en Angular.
