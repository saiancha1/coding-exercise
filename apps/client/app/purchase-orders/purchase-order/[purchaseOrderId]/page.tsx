'use client';
import { useEffect, useState } from 'react';
import { PurchaseOrder, mapPurchaseOrderDTOToPurchaseOrder } from '../../../models/purchaseOrderModel';
import { useParams, useRouter   } from 'next/navigation'; 
import {Button, Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Alert, Tab } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CurrencyFormat from '../../../components/CurrencyFormat';

async function fetchPurchaseOrderById(purchaseOrderId:string) {
  const response = await fetch(`http://localhost:3100/api/purchase-orders/${purchaseOrderId}`);
  if (!response.ok) {
    throw new Error('Purchase order not found');
  }
  return response.json();
}


export default  function Index() {

    const params = useParams();
    const {purchaseOrderId} = params;
    console.log(purchaseOrderId);
    const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleBackToPurchaseOrders = () => {
      router.push('/purchase-orders'); // Adjust the path as necessary
    };

    useEffect(() => {

      fetchPurchaseOrderById(purchaseOrderId)
      .then(data => {
        setPurchaseOrder(mapPurchaseOrderDTOToPurchaseOrder(data));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    
      }, [purchaseOrderId]);
    
    if (isLoading) return (<p>Loading...</p>);
    if (error) {
      return (<><p>Error: {error}</p>
      <Button variant="contained" color="primary" onClick={handleBackToPurchaseOrders}>
        Back to Purchase Orders List
      </Button> 
      </>);
    }
    
   
    
    return (<>
    <div className="purchase-order">
    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
      <Typography variant="h4">Purchase Order Details PO-{purchaseOrder?.orderId}</Typography>
      <Button variant="contained" color="primary" onClick={handleBackToPurchaseOrders}>
        Back to Purchase Orders List
      </Button>
    </Box>
    <List sx={{ '& .MuiListItemText-secondary': { color: 'white', fontWeight:'bold' } }}>
      <ListItem>
        <ListItemText primary="Order ID" secondary={purchaseOrder?.orderId} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Vendor Name" secondary={purchaseOrder?.vendorName} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Order Date" secondary={purchaseOrder?.orderDate?.toLocaleDateString()} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Expected Delivery Date" secondary={purchaseOrder?.expectedDeliveryDate?.toLocaleDateString()} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Created Date" secondary={purchaseOrder?.createdDate.toLocaleDateString()} />
      </ListItem>
      <Divider component="li" />
      {purchaseOrder?.updatedDate && (
      <ListItem>
        <ListItemText primary="Last Updated Date" secondary={purchaseOrder?.updatedDate?.toLocaleDateString()} />
      </ListItem>
      )}
    </List>
    <Typography variant="h3" gutterBottom>
      Order Items
    </Typography>
    <TableContainer component={Paper}>
      <Table aria-label="purchase order items">
        <TableHead>
          <TableRow>
            <TableCell>Line ID</TableCell>
            <TableCell>Item ID</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit Cost</TableCell>
            <TableCell>Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchaseOrder?.items.map((item) => (
            <TableRow key={item.purchaseOrderLineId}>
              <TableCell>{item.purchaseOrderLineId}</TableCell>
              <TableCell>{item.itemId}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unitCost}</TableCell>
              <TableCell>
                <CurrencyFormat value={item.quantity * item.unitCost} currency='USD' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Card variant="outlined" sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Total Cost
          </Typography>
          <Typography variant="h5">
            <CurrencyFormat value={Number(purchaseOrder?.items.reduce((acc, item) => acc + item.quantity * item.unitCost, 0).toFixed(2) || 0)} 
            currency ='USD' />
          </Typography>
        </CardContent>
      </Card>
  </div>
    </>);
}