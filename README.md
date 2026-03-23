# Challenge - Ecom App

Aplicación backend para gestión de productos, variantes y stock distribuido en múltiples depósitos, con sincronización hacia canales externos mediante procesamiento asíncrono.

---

## Tecnologías utilizadas

* Node.js
* MySQL
* Redis
* BullMQ (colas y workers)
* Docker & Docker Compose
* Axios

---

## Funcionalidades principales
* Crear productos relacionados con sus variantes
* Crear depósitos
* Gestión de stock por depósito
    * Crear stock para una variante de un determinado depósito
    * Actualiza el stock de una variante de un determinado depósito
* Recalculo de stock total por variante
* Sincronización de stock con API externa (Mock Channel API)
* Procesamiento asíncrono con workers
* Sistema de auditoría de eventos (audit_logs)

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/jissust/challenge_ecommapp.git
cd challenge_ecommapp
```

---

2. Crear archivo `.env` (si no existe)

Ejemplo básico:

```env
DB_HOST=mysql
DB_USER=challenge_user
DB_PASSWORD=challenge_pass
DB_NAME=challenge_db
REDIS_HOST=redis
REDIS_PORT=6379
```

---

3. Levantar los contenedores:

```bash
docker-compose up --build
```

---

## Flujo principal

1. Se actualiza el stock de una variante en un depósito
2. Se recalcula el stock total
3. Se encola un job en BullMQ
4. El worker procesa el job
5. Se sincroniza el stock con el Mock Channel API
6. Se registran eventos en `audit_logs`

---

## Auditoría

Se registran eventos importantes como:

* Sincronizacion exitosa con publicaciones.
* Falla en la sincronización con publicaciones.
* Crear un stock relacionado con una variante de un determinado depósito.
* Creación de producto.

---

## Qué mejorarías si tuvieras más tiempo. 

* Testing: Agregaría tests unitarios y de integración para los endpoints principales, asegurando la correcta funcionalidad y evitando regresiones.
* Validaciones: Incorporaría validaciones más robustas en la creación y actualización de entidades para garantizar la integridad de los datos.
* Performance: Implementaría mecanismos de caché para optimizar tareas repetitivas y mejorar los tiempos de respuesta.
* UX: Desarrollaría un frontend básico con formularios para facilitar la creación y gestión de entidades.
* Observabilidad: Extendería el sistema de logs y auditoría a todos los módulos para mejorar la trazabilidad y el monitoreo del sistema.