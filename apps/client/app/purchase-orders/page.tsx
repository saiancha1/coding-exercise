'use client';
import { useEffect, useState } from 'react';
import { PurchaseOrder, PurchaseOrderItem, mapPurchaseOrderDTOToPurchaseOrder } from '../models/purchaseOrderModel';
import {Card, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

import { useRouter } from 'next/navigation'; 
import CurrencyFormat from '../components/CurrencyFormat';
import PurchaseOrderList from '../components/purchase-order/PurchaseOrderList';

export default  function Index() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
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
      <PurchaseOrderList purchaseOrders={purchaseOrders} handleRowClick={handleRowClick} />
    </>
  );
}
