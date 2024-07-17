'use client'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SOHByBranch from '../components/Stock/StockOnHandPopUp';
import { fetchStockItems } from '../helpers/stock-summary';
import { accumulateStockItems } from '../helpers/stock-summary';

interface StockItem {
  id: number;
  itemId: number;
  SOH: number;
  stockAvailable: number;
  branch_id: number;
  item: {
    id: number;
    parent_item_id: number;
    name: string;
  };
}

export default  function Index()  {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      const data = await fetchStockItems();
      setStockItems(data);
    };

    fetchStock();
  }, []);

  const handleSOHClick = (stock: StockItem) => {
    setSelectedStock(stock);
  };
  const accumulatedStockItemsMap = accumulateStockItems(stockItems);

  const uniqueStockItems = Array.from(accumulatedStockItemsMap.values());

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="stock summary table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name {stockItems.length}</TableCell>
            <TableCell align="right">Stock On Hand</TableCell>
            <TableCell align="right">Stock Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uniqueStockItems.map((stock) => (
            <TableRow
              key={stock.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {stock.item.name}
              </TableCell>
              <TableCell align="right" onClick={() => handleSOHClick(stock)} style={{ cursor: 'pointer' }}>
                  {stock.SOH}
              </TableCell>
              <TableCell align="right">{stock.stockAvailable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <SOHByBranch stock={selectedStock} allStock={stockItems} onClose={() => setSelectedStock(null)} />
    </>
  );
};
