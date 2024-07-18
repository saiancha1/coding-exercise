export const fetchStockItems = async () => {
    const response = await fetch('http://localhost:3100/api/stock-summaries');
    const data = await response.json();
    return data;
  };
  export function accumulateStockItems(stockItems) {
    const stockItemsArray = stockItems.reduce((acc, item) => {
        if (acc.has(item.itemId)) {
          const existingItem = acc.get(item.itemId);
          acc.set(item.itemId, { ...item, SOH: existingItem.SOH + item.SOH });
        } else {
          acc.set(item.itemId, item);
        }
        return acc;
      }, new Map());
      
      const result = Array.from(stockItemsArray.values());
      return result;
  }