# ADR-003: Implementación de auditoría de eventos

## Contexto

El sistema requiere trazabilidad sobre eventos importantes como cambios de stock y sincronización con sistemas externos.

## Decisión

Se implementó una tabla audit_logs junto con un helper reutilizable para registrar eventos relevantes tanto en servicios como en workers.

## Consecuencias

Ventajas:
- Permite trazabilidad completa del sistema
- Facilita debugging y monitoreo
- Separa logs de negocio de logs técnicos

Desventajas:
- Incrementa el volumen de datos en la base
- Puede impactar levemente el rendimiento
- Requiere definir qué eventos registrar