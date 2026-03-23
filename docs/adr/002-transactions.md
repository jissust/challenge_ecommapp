# ADR-002: Uso de transacciones para manejo de stock

## Contexto

La actualización de stock implica múltiples operaciones: modificar stock por depósito, recalcular stock total y actualizar la variante.

## Decisión

Se decidió utilizar transacciones en la base de datos para asegurar que todas las operaciones se ejecuten de manera correcta.

## Consecuencias

Ventajas:
- Garantiza consistencia de datos
- Evita estados intermedios inválidos
- Facilita rollback ante errores

Desventajas:
- Puede afectar el rendimiento en escenarios de alta concurrencia
- Mayor complejidad en el manejo de errores