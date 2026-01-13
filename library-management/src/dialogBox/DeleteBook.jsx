import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions,Typography,  Button,CircularProgress } from '@mui/material'

function DeleteBook({ open, onClose, onDelete, selectedBook, deleting}) {
    
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Delete Book
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this book{" "}
          <strong>{selectedBook?.title}</strong>? This action is permanent.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={deleting} sx={{ color: "gray" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={deleting}
          onClick={() => onDelete(selectedBook.id)}
        >
          {deleting ?  <CircularProgress size={18} sx={{ color: "white" }} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteBook
