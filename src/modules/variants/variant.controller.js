import { updateStockVariantWarehouseService } from "./variant.service.js";

export const updateStockWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { warehouse_id, quantity } = req.body;

        const result = await updateStockVariantWarehouseService({
            variant_id: id,
            warehouse_id,
            quantity
        });
        res.json(result);
    } catch (error){
        res.status(500).json({error: error.message});
    }
};
