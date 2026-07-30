# Integracion Wearable

La integracion wearable se plantea con un flujo sencillo y demostrable desde Android Studio / Wear OS Emulator.

## Flujo

```text
Angular crea una solicitud
  -> Spring Boot la guarda como match pendiente
    -> Wearable consulta notificaciones pendientes
      -> Wearable muestra la solicitud
        -> Usuario acepta, rechaza o marca para despues
          -> Spring Boot actualiza el estado
            -> Angular puede reflejar el cambio en Matches
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

La app consulta solicitudes pendientes, muestra la primera disponible y permite aceptar, rechazar o guardar para despues desde el reloj.

## Sincronizacion con el sitio

La pagina `Matches` del frontend consulta el backend periodicamente. Esto permite que un cambio hecho desde el wearable se vea en el sitio sin recargar manualmente.

## Implementacion sugerida en Wear OS

- Hacer polling cada 5 o 10 segundos al endpoint de notificaciones.
- Mostrar la primera solicitud pendiente.
- Enviar accion con `PATCH` al endpoint correspondiente.
- Actualizar la tarjeta visual del reloj segun la respuesta.
