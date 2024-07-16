'use client';
import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, FormControl, InputLabel, MenuItem, Select, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Paper, Autocomplete, Alert, Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function Index() {
  const [branch, setBranch] = useState('');
  const [items, setItems] = useState<LineItem[]>([]);
  const [branches, setBranches] = useState<{ id: string; name: string; }[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  interface LineItem {
    product: Item | null;
    quantity: number;
    cost: number;
    tempId:any;
  }
  interface Item {
    id: number;
    parent_item_id: number;
    name: string;
    sku: string;
    price: string;
    quantity: number;
    created_at: null | string;
    updated_at: null | string;
  }
  

  useEffect(() => {
    fetch('http://localhost:3100/api/branches')
      .then(response => response.json())
      .then(data => setBranches(data))
      .catch(error => console.error('Error fetching branches:', error));

      fetch('http://localhost:3100/api/parent-items')
      .then(response => response.json())
      .then(data => {
        const childItems = data.flatMap((item:any) => item.items);
        setProducts(childItems);})
      .catch(error => console.error('Error fetching items:', error));
  }, [products]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!branch) {
      setError('Branch is required');
      return;
    }
    const payload = {
      "branch_id": branch,
      "adjustment_line_items": {
        "create": items.map(item => ({
          "item_id": item.product?.id,
          "quantity": Number(item.quantity),
          "cost": Number(item.cost)
        }))
      }
    };
  
    try {
      const response = await fetch('http://localhost:3100/api/adjustments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setResult(`Order created with ID: ${data.id}`);
    } catch (error) {
      setError('An error has occurred. Order not created.');
    }
  };

  const handleItemChange = (index: number, field: keyof typeof items[0], value: string) => {
    const newItems: LineItem[] = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { tempId: uuidv4(), product: null, quantity: 0, cost: 0.00 }]);
  };
  return (
    <>
     {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
       {result && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">{result}</Alert>
        </Stack>
      )}
      <Container maxWidth="sm" sx={{ backgroundColor: 'white' }}>``
        <Typography variant="h4" component="h1" gutterBottom>
          Stock Adjustment
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="branch-label">Branch</InputLabel>
            <Select
              labelId="branch-label"
              value={branch}
              label="Branch"
              onChange={(e) => setBranch(e.target.value)}
            >
                            {branches.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table aria-label="line items">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.tempId || item.product?.id}>
                     <TableCell>
                     <Autocomplete
                     freeSolo
          options={products}
          getOptionLabel={(option) => option?.name ?? ''}
          renderInput={(params) => <TextField {...params} label="Product" variant="outlined" />}
          value={item.product?.name}
          onChange={(event, newValue) => {
            handleItemChange(index, 'product', newValue ? newValue : '');
          }}
          fullWidth
        />
                </TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        label="Cost"
                        type="number"
                        value={item.cost}
                        onChange={(e) => handleItemChange(index, 'cost', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={addItem} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Add Item
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, marginLeft: 2 }}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}