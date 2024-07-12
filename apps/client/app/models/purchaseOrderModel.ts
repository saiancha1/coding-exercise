export interface PurchaseOrderDTO {
    id: number;
    vendor_name: string;
    order_date: Date;
    expected_delivery_date: Date;
    created_at: Date;
    updated_at: Date;
    purchase_order_line_items: PurchaseOrderItemDTO[];
}

export interface PurchaseOrder {
    orderId: number;
    vendorName: string;
    orderDate: Date | null;
    expectedDeliveryDate: Date | null;
    createdDate: Date;
    updatedDate: Date | null;
    items: PurchaseOrderItem[];
}

export interface PurchaseOrderItemDTO {
    id: number;
    purchase_order_id: number;
    item_id: number;
    quantity: number;
    unit_cost: number;
    created_at: Date;
    updated_at: Date;
}
export interface PurchaseOrderItem {
    purchaseOrderLineId: number;
    purchaseOrderId: number;
    itemId: number;
    quantity: number;
    unitCost: number;
    createdDate: Date;
    updatedDate: Date | null;
}

export function mapPurchaseOrderDTOToPurchaseOrder(purchaseOrder: PurchaseOrderDTO): PurchaseOrder {
    return {
        orderId: purchaseOrder.id,
        vendorName: purchaseOrder.vendor_name,
        orderDate: purchaseOrder.order_date ? new Date(purchaseOrder.order_date) : null,
        expectedDeliveryDate: purchaseOrder.expected_delivery_date ? new Date(purchaseOrder.expected_delivery_date) : null,
        createdDate: new Date(purchaseOrder.created_at),
        updatedDate: purchaseOrder.updated_at ? new Date(purchaseOrder.updated_at) : null,
        items: purchaseOrder.purchase_order_line_items.map(mapPurchaseOrderItemDTOToPurchaseOrderItem)
    };
}

export function mapPurchaseOrderItemDTOToPurchaseOrderItem(purchaseOrderItem: PurchaseOrderItemDTO): PurchaseOrderItem {
    return {
        purchaseOrderLineId: purchaseOrderItem.id,
        purchaseOrderId: purchaseOrderItem.purchase_order_id,
        itemId: purchaseOrderItem.item_id,
        quantity: purchaseOrderItem.quantity,
        unitCost: purchaseOrderItem.unit_cost,
        createdDate: purchaseOrderItem.created_at,
        updatedDate: purchaseOrderItem.updated_at ? new Date(purchaseOrderItem.updated_at) : null
    };
}