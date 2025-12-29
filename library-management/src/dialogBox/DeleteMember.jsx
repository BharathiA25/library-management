import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress} from "@mui/material";

function DeleteMember({ open, onClose, onConfirm, member, loading, colors }) {
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete <b>{member?.name}</b>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={loading}
          onClick={onConfirm}
          sx={{
            backgroundColor: colors.deleteColor,
            color: colors.textColor,
            "&:hover": { backgroundColor: colors.deleteColorHover },
          }}
        >
          {loading ? <CircularProgress size={18} sx={{ color: "white" }} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteMember;
