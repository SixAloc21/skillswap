# Interaccion con el DOM en Angular

## Que elementos del DOM cambian

- El banner digital de inicio aparece y desaparece.
- Las tarjetas de habilidades en `Explorar` cambian segun la busqueda y filtros.
- Los modales de confirmacion se muestran y ocultan.
- Los estados de los matches cambian visualmente entre pendiente, aceptado y rechazado.
- Los mensajes de validacion del formulario aparecen segun los errores detectados.
- El formulario de contacto muestra errores, estado de envio y modal de confirmacion.

## Eventos del usuario que activan cambios

- Escritura en el input de busqueda.
- Cambio de opciones en selects de categoria, modalidad y nivel.
- Clic en `Ver detalle`.
- Clic en `Solicitar intercambio`.
- Clic en `Aceptar`, `Rechazar` y `Limpiar filtros`.
- Envio del formulario de publicacion.
- Envio del formulario de contacto.
- Clic para cerrar el banner digital.
- Clic en el menu hamburguesa para abrir o cerrar la navegacion colapsable.

## Directivas de Angular usadas

- `*ngIf`: para mostrar u ocultar banner, modales, mensajes y estados vacios.
- `*ngFor`: para renderizar listas dinamicas de habilidades, categorias y matches.
- `[ngClass]`: para aplicar clases segun modalidad o estado.
- `[(ngModel)]`: para capturar y reaccionar a los filtros del buscador.
- `formControlName`: para enlazar el formulario reactivo de publicacion.
- `routerLink`: para navegar entre paginas internas y complementarias.

## Como se actualizan las cards del buscador

1. El usuario escribe o cambia un filtro.
2. Angular actualiza el modelo de datos del componente.
3. `SkillService.searchSkills()` envia los criterios a Spring Boot.
4. El backend consulta Elasticsearch y devuelve las habilidades filtradas.
5. `filteredSkills` se reasigna.
6. `*ngFor` vuelve a renderizar solo las tarjetas que cumplen los criterios.

## Como se muestran y ocultan los modales

- Cada pagina usa variables booleanas como `showRequestModal` o `showSuccessModal`.
- Cuando el usuario hace clic, la variable cambia a `true`.
- El componente `ModalComponent` aparece con `*ngIf`.
- Al confirmar o cancelar, la variable vuelve a `false` y el modal desaparece del DOM.

## Como se valida el formulario dinamicamente

- Los formularios de publicacion y contacto usan `ReactiveFormsModule`.
- Cada control define validadores como `required` y `minLength`.
- Cuando el usuario toca un campo o intenta enviar el formulario, Angular marca el estado del control.
- Los mensajes de error se muestran con `*ngIf` dependiendo de `touched` y `hasError(...)`.

## Conclusion

La aplicacion evita manipulacion manual innecesaria del DOM. En su lugar, aprovecha el enfoque declarativo de Angular para sincronizar el estado de la interfaz con las acciones del usuario.
