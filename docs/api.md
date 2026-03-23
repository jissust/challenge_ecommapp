# API endpoints

## 1. Crear depósitos
POST: http://localhost:3000/api/warehouses
```
{ "code": "BA-CENTRAL", "name": "Depósito Central Buenos Aires" }
```
y

```
{ "code": "CBA-01", "name": "Depósito Córdoba" }
```

## 2. Crear productos
POST: http://localhost:3000/api/products
```
{
    "name": "Remera Básica Algodón",
    "description": "Remera de algodón 100% peinado, corte recto.",
    "base_sku": "REM-BAS",
    "base_price": 8500,
    "variants": [
        { "sku": "SKU-001", "title": "Negro / Talle S", "color": "Negro", "size": "S", "stock_by_warehouse": { "BA-CENTRAL": 15, "CBA-01": 5 } },
        { "sku": "SKU-002", "title": "Negro / Talle M", "color": "Negro", "size": "M", "stock_by_warehouse": { "BA-CENTRAL": 20, "CBA-01": 10 } },
        { "sku": "SKU-003", "title": "Negro / Talle L", "color": "Negro", "size": "L", "stock_by_warehouse": { "BA-CENTRAL": 10, "CBA-01": 5 } },
        { "sku": "SKU-004", "title": "Blanco / Talle M", "color": "Blanco", "size": "M", "stock_by_warehouse": { "BA-CENTRAL": 12, "CBA-01": 0 } }
    ]
}
```

## 3. Sincronizar publicaciones
Copia las publicaciones del archivo mock-channel-api/data/publications.json y las inserta en la tabla publications y las variantes en la tabla publication_variants.
GET: http://localhost:3000/api/publications/sync

## 4. Crear stock
Creo el stock para una variante de un determinado deposito. 
POST: http://localhost:3000/api/stocks
```
{
    "variant_id":1,
    "warehouse_id":1,
    "quantity":30
}
```
## 5. Actualizar stock
Actualizo stock de una variante para un determinado depostio y a la vez recalcula todo el stock de la variante.
PUT: http://localhost:3000/api/variants/1/stock
```
{
  "warehouse_id":1,
  "quantity": 40
}
```
