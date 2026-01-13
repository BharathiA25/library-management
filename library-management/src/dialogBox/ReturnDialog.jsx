import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions,  Button, Typography, CircularProgress,} from "@mui/material";

function ReturnDialog({ open, onClose, onConfirm, returning }) {

  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Return</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to return this book?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={returning}
          sx={{ textTransform: "capitalize" }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={returning}
          onClick={onConfirm}
          sx={{ textTransform: "capitalize" }}
        >
          {returning ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Yes, Return"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReturnDialog;
