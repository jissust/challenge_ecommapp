# ADR-001: Uso de Docker para entorno consistente

## Contexto

El proyecto requiere múltiples servicios (API, base de datos MySQL, Redis y worker), lo que puede generar problemas de configuración y diferencias entre entornos de desarrollo.

## Decisión

Se decidió utilizar Docker y Docker Compose para contenerizar la aplicación y orquestar todos los servicios necesarios mediante un único comando.

## Consecuencias

Ventajas:
- Entorno consistente para todos los desarrolladores
- Fácil instalación y ejecución del proyecto
- Aislamiento de dependencias

Desventajas:
- Mayor complejidad inicial en la configuración
- Necesidad de conocimientos básicos de Docker
- Posible impacto en performance en entornos locales