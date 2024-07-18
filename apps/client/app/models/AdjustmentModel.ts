interface AdjustmentLineItem {
    id: number;
    adjustment_id: number;
    item_id: number;
    quantity: number;
    cost: number;
    created_at: string;
}

export interface Adjustment {
    id: number;
    created_at: string;
    branch_id: number;
    adjustment_line_items: AdjustmentLineItem[];
}
