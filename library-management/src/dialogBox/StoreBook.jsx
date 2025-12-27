import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function StoreBook({ open, onClose, addToStore, issuing }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
                Are you sure to add this book into your store?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={issuing}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={addToStore}
                    disabled={issuing}
                >
                    {issuing ? "Adding..." : "Add to store"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default StoreBook;