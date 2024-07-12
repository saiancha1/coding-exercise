'use client';
import { useEffect, useState } from 'react';
import { PurchaseOrder, mapPurchaseOrderDTOToPurchaseOrder } from '../../../models/purchaseOrderModel';
import { useParams, useRouter   } from 'next/navigation'; 
import {Button} from '@mui/material';

import PurchaseOrderView from '../../../components/purchase-order/PurchaseOrderView';

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
    
    return (
    <>
      <PurchaseOrderView purchaseOrder={purchaseOrder} handleBackToPurchaseOrders={handleBackToPurchaseOrders}/>;
    </>
    );
}