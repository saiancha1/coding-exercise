'use client';
import { useEffect, useState } from 'react';
import { PurchaseOrder, PurchaseOrderItem, mapPurchaseOrderDTOToPurchaseOrder } from '../models/purchaseOrderModel';
import {Card, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

import { useRouter } from 'next/navigation'; 
import CurrencyFormat from '../components/CurrencyFormat';

export default  function Index() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<PurchaseOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderDate, setOrderDate] = useState<string | null>(null);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPurchaseOrders() {
      try {
        const response = await fetch('http://localhost:3100/api/purchase-orders');
        if(!response.ok) {
          setError('Failed to fetch data');
          return;
        }
      const dtos = await response.json();
      setPurchaseOrders(dtos.map(mapPurchaseOrderDTOToPurchaseOrder));
      setFilteredOrders(dtos.map(mapPurchaseOrderDTOToPurchaseOrder));
    } 
    catch (error) {
      setError('Failed to fetch purchase orders');
    }
    finally {
      setIsLoading(false); 
    }
  }
    fetchPurchaseOrders();
  }, []);
  useEffect(() => {
    const parsedSearchTerm = Number(searchTerm);
    console.log('triggered search ' + expectedDeliveryDate)
    const filtered = purchaseOrders.filter(order => {
      const matchesOrderDate = orderDate ? order.orderDate?.toLocaleDateString() === orderDate : true;
      const matchesExpectedDeliveryDate = expectedDeliveryDate ? order.expectedDeliveryDate?.toLocaleDateString() === expectedDeliveryDate : true;
      const containsItem = !isNaN(parsedSearchTerm) ? order.items.some(item => item.itemId === parsedSearchTerm) : true;
      console.log('triggered search ' + order.orderId + matchesOrderDate || matchesExpectedDeliveryDate || containsItem);

      return matchesOrderDate || matchesExpectedDeliveryDate || containsItem;
    });
    setFilteredOrders(filtered);
  }, [searchTerm, orderDate, expectedDeliveryDate, purchaseOrders]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleRowClick = (purchaseOrderId:number) => {
    // Navigate to the [purchaseorderId].tsx page with the correct ID
    router.push(`/purchase-orders/purchase-order/${purchaseOrderId}`);
  };

  
  
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
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px' }}
      />
      <TextField
        label="Order Date"
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ margin: '10px' }}
      />
      <TextField
        label="Expected Delivery Date"
        type="date"
        value={expectedDeliveryDate}
        onChange={(e) => setExpectedDeliveryDate(e.target.value)}
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
  );
}
