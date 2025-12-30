import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions,Typography,  Button} from '@mui/material'

function DeleteBook({ open, onClose, onDelete, selectedBook }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
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
        <Button onClick={onClose} sx={{ color: "gray" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => onDelete(selectedBook.id)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteBook
