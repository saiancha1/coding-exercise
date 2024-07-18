import { Box, Button, Card, CardContent, Divider, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PurchaseOrder } from "../../models/purchaseOrderModel";
import CurrencyFormat from "../CurrencyFormat";

interface PurchaseOrderViewProps {
    purchaseOrder: PurchaseOrder | null;
    handleBackToPurchaseOrders: () => void;
}

const PurchaseOrderView = ({purchaseOrder, handleBackToPurchaseOrders}: PurchaseOrderViewProps) => {
    return(
    <>
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
    </>
    )
}
export default PurchaseOrderView;