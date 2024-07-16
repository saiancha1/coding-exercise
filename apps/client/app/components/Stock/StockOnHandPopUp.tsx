import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';

function SOHByBranch({ stock, allStock, onClose }: { stock: any, allStock:any, onClose: any }) {
    const selectedStock = allStock?.filter((item: any) => item.itemId === stock?.itemId);   
     console.log(selectedStock?.length);
    return (
        <Dialog open={Boolean(stock)} onClose={onClose}>
            <DialogTitle>Stock By Branch {stock?.item.name}</DialogTitle>
                <List>
                    {selectedStock?.map((stock:any) => (
                        <ListItem key={stock.branch_id}>
                            <ListItemText primary={`Branch ID: ${stock.branch_id}, SOH: ${stock.SOH}`} />
                        </ListItem>
                    ))}
                </List>
        </Dialog>
  );
}
export default SOHByBranch;