'use client'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface StockItem {
  id: number;
  itemId: number;
  SOH: number;
  stockAvailable: number;
  item: {
    id: number;
    parent_item_id: number;
    name: string;
    sku: string;
    price: string;
    quantity: number;
    created_at: null | string;
    updated_at: null | string;
  };
}

export default  function Index()  {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchStockItems = async () => {
      const response = await fetch('http://localhost:3100/api/stock-summaries'); 
      const data = await response.json();
      setStockItems(data);
    };

    fetchStockItems();
  }, []);

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
          {stockItems.map((stock) => (
            <TableRow
              key={stock.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {stock.item.name}
              </TableCell>
              <TableCell align="right">{stock.SOH}</TableCell>
              <TableCell align="right">{stock.stockAvailable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};
