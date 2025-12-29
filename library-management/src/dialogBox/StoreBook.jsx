import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { getThemeControl } from '../utils';
function StoreBook({ open, onClose, addToStore, issuing }) {
    const {activeColor} = getThemeControl()
    const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
                Are you sure to add this book into your store?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={issuing} sx={{textTransform : 'capitalize', }}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={addToStore}
                    disabled={issuing}
                    sx={{backgroundColor : activeColor, textTransform : 'capitalize', "&:disabled": {
              backgroundColor: "#1c2626",
              color: "rgba(255, 255, 255, 0.5)",
            }}}
                >
                    {issuing ? "Adding..." : "Add to store"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default StoreBook;