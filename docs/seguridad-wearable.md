# Seguridad de SkillSwap Wear

## Alcance

La app protege la pantalla de solicitudes mediante un PIN de cuatro digitos. El objetivo es evitar que otra persona responda una oferta desde el reloj sin pasar por la pantalla de acceso.

## Controles implementados

- Pantalla inicial de PIN.
- Limite visual y logico de cuatro digitos.
- Entrada oculta mediante indicadores circulares.
- Rechazo de PIN incompleto, incorrecto, de seis digitos o no numerico.
- Pantalla principal condicionada al estado autenticado.
- Cierre de sesion que elimina el acceso activo y regresa al PIN.
- Notificacion que abre la app, pero no evita el PIN cuando la sesion esta cerrada.

## Pruebas automatizadas

Las pruebas de `PinAuthenticatorTest` cubren:

| Caso | Resultado esperado |
| --- | --- |
| `2026` | Acceso permitido |
| `1234` | Acceso rechazado |
| `202` | Acceso rechazado |
| `202620` | Acceso rechazado |
| `20A6` | Acceso rechazado |

Comando:

```powershell
.\gradlew.bat testDebugUnitTest
```

## Pruebas manuales

| Prueba | Procedimiento | Resultado esperado |
| --- | --- | --- |
| Pantalla protegida | Abrir la app sin sesion | Solo aparece el PIN |
| PIN incorrecto | Escribir cuatro numeros distintos de `2026` | Mensaje `PIN incorrecto` y captura vacia |
| PIN correcto | Escribir `2026` y pulsar Entrar | Se muestra la pantalla de solicitudes |
| Cierre de sesion | Pulsar `Cerrar sesion` | Regresa al PIN |
| Notificacion bloqueada | Cerrar sesion, generar oferta y tocar la alerta | Solicita PIN antes de mostrar la oferta |
| Datos visibles | Revisar payload y pantalla | Solo se muestran nombre y habilidades del intercambio |

## Biometria no implementada

La consigna permite PIN o biometria. Se eligio PIN porque funciona de manera consistente en el emulador Wear OS y no depende de hardware biometrico. Agregar una simulacion de huella sin sensor real produciria una evidencia poco reproducible.

## Limitaciones reconocidas

- El PIN es fijo y local, apropiado solo para la demostracion academica.
- El indicador de sesion se guarda en preferencias locales sin cifrado.
- No existen cuentas, recuperacion de PIN, limite de intentos ni bloqueo temporal.
- Los matches del backend se mantienen en memoria.

Para produccion se requeririan cuentas, PIN derivado y almacenado de forma segura, preferencias cifradas, limite de intentos, revocacion de sesiones y base de datos persistente.
