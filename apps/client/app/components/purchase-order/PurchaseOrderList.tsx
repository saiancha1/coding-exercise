'use-client';
import { SetStateAction, useEffect, useState } from 'react';
import {TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Card, TextField,Paper } from '@mui/material';
import { PurchaseOrder } from '../../models/purchaseOrderModel';
import CurrencyFormat from '../CurrencyFormat';

interface PurchaseOrderTableProps {
    purchaseOrders: PurchaseOrder[];
    handleRowClick: (orderId: number) => void;
  }

  const PurchaseOrderList = ({  purchaseOrders, handleRowClick } : PurchaseOrderTableProps)  => {
    const [filteredOrders, setFilteredOrders] = useState<PurchaseOrder[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderDate, setOrderDate] = useState<string | null>(null);
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<string | null>(null);
    useEffect(() => {

      let filtered = [...purchaseOrders];
      console.log(orderDate);
      if (orderDate) {
        filtered = filtered.filter(order => order.orderDate?.toLocaleDateString() === orderDate);
      }
    
      if (expectedDeliveryDate) {
        filtered = filtered.filter(order => order.expectedDeliveryDate?.toLocaleDateString() === expectedDeliveryDate);
      }
    
      const parsedSearchTerm = Number(searchTerm);
      if (!isNaN(parsedSearchTerm) && parsedSearchTerm > 0) {
        filtered = filtered.filter(order => order.items.some(item => item.itemId === parsedSearchTerm));
      }
    
      setFilteredOrders(filtered);
    }, [searchTerm, orderDate, expectedDeliveryDate, purchaseOrders]);
    return (
        <>
        <Typography variant="h4" gutterBottom>
          Purchase Orders
        </Typography>
        <Card sx={{ marginBottom: '20px' }}>
        <TextField
          label="Search by Item"
          variant="outlined"
          value={searchTerm}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
          style={{ margin: '10px' }}
        />
        <TextField
          label="Order Date"
          type="date"
          value={orderDate}
          onChange={(e: { target: { value: SetStateAction<string | null>; }; }) => setOrderDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          style={{ margin: '10px' }}
        />
        <TextField
          label="Expected Delivery Date"
          type="date"
          value={expectedDeliveryDate}
          onChange={(e: { target: { value: SetStateAction<string | null>; }; }) => setExpectedDeliveryDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          style={{ margin: '10px' }}
        />
        </Card>
        <TableContainer component={Paper}>
          <Table aria-label="purchase orders table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Expected Delivery Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((purchaseOrder) => (
                <TableRow key={purchaseOrder.orderId} hover>
                  <TableCell>
                  <Button variant="contained" onClick={() => handleRowClick(purchaseOrder.orderId)}>
                    PO-{purchaseOrder.orderId}
                  </Button>
                  </TableCell>
                  <TableCell>{purchaseOrder.vendorName}</TableCell>
                  <TableCell>{purchaseOrder.orderDate?.toLocaleDateString()}</TableCell>
                  <TableCell>{purchaseOrder.expectedDeliveryDate?.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <ul>
                      {purchaseOrder.items.map((item) => (
                        <li key={item.purchaseOrderLineId}>{item.quantity} x {item.itemId}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <CurrencyFormat
                      value={purchaseOrder.items.reduce((total, item) => total + (item.quantity * item.unitCost), 0)}
                      currency='USD'/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
    )
   
  }

  export default PurchaseOrderList