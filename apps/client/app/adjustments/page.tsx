'use client'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {useRouter} from "next/navigation";
import { Adjustment } from "../models/AdjustmentModel"; 
import CurrencyFormat from "../components/CurrencyFormat";
import { useState, useEffect } from "react";
export default  function Index() {
  const [adjustments, setAdjustments] = useState<Adjustment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchPurchaseOrders() {
      try {
        const response = await fetch('http://localhost:3100/api/adjustments');
        if(!response.ok) {
          setError('Adjustments not found');
          return;
        }
      const data = await response.json();
      setAdjustments(data);
    } 
    catch (error) {
      setError('Failed to fetch Adjustments');
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
      const handleNewAdjustmentOrderClick = () => {
        router.push('adjustments/new-adjustment'); 
      };

      return (
        <>
          <Button variant="contained" color="primary" onClick={handleNewAdjustmentOrderClick}>
            New Adjustment
          </Button> 
          <TableContainer component={Paper}>
            <Table aria-label="adjustments table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="right">Total Quantity</TableCell>
                  <TableCell align="right">Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adjustments?.map((adjustment) => (
                  <TableRow key={adjustment.id}>
                    <TableCell component="th" scope="row">
                      {adjustment.id}
                    </TableCell>
                    <TableCell align="left">{adjustment.created_at}</TableCell>
                    <TableCell align="right">{adjustment.adjustment_line_items.reduce((total, item) => total + (item.quantity), 0)}</TableCell>
                    <TableCell align="right">
                    <CurrencyFormat
                      value={adjustment.adjustment_line_items.reduce((total, item) => total + (item.quantity * item.cost), 0)}
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
  
 

