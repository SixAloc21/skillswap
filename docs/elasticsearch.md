# Elasticsearch en SkillSwap

SkillSwap usa Elasticsearch para indexar y consultar habilidades desde el backend Spring Boot.

## Por que no se conecta Angular directo

El frontend no debe conectarse directamente a Elasticsearch porque expondria detalles internos del motor de busqueda. La arquitectura correcta es:

```text
Angular -> Spring Boot -> Elasticsearch
```

## Indice usado

```text
skillswap-skills
```

## Levantar servicio

```bash
docker compose -f docker-compose.elasticsearch.yml up -d
```

Si el backend se inicio antes que Docker, el servicio vuelve a intentar crear el indice automaticamente cuando recibe una consulta. Esto evita errores por orden de arranque durante la demostracion.

## Busqueda

Endpoint:

```text
GET /api/skills/search
```

Parametros:

- `q`: texto libre.
- `category`: categoria.
- `modality`: `ONLINE`, `PRESENCIAL`, `HIBRIDO`.
- `level`: `BASICO`, `INTERMEDIO`, `AVANZADO`.

Ejemplo:

```text
http://localhost:8080/api/skills/search?q=ingles&category=Idiomas&modality=ONLINE&level=INTERMEDIO
```

## Busqueda predictiva

SkillSwap incluye busqueda tolerante a errores pequenos de escritura mediante `fuzziness: AUTO` de Elasticsearch.

Ejemplos:

```text
fotgrafia -> Fotografia de producto con celular
ingl -> Ingles conversacional para entrevistas
matemticas -> Matematicas para regularizacion
```

Endpoint de sugerencias:

```text
GET /api/skills/suggestions?q=fotgrafia
```

Respuesta esperada:

```json
[
  {
    "skillId": "skill-phone-photography",
    "title": "Fotografia de producto con celular",
    "category": "Fotografia"
  }
]
```

En Angular, la pagina `/explorar` consulta este endpoint mientras el usuario escribe y muestra una caja de sugerencias debajo del buscador.

Si Elasticsearch no esta disponible, el backend usa un modo de respaldo en memoria con comparacion aproximada para que la demostracion no falle.
