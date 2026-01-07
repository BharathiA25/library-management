import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton, Chip} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DeleteIcon from "@mui/icons-material/Delete";

function CopiesManage({open, onClose, copies, onDelete, onSwitchStatus }) {
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Manage Inventory
      </DialogTitle>

      <DialogContent dividers>
        {copies.length === 0 && (
          <Typography align="center" sx={{ py: 3 }}>
            No copies registered for this book.
          </Typography>
        )}

        {copies.map((copy) => (
          <Box
            key={copy.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Copy #{copy.id}
              </Typography>
              <Chip
                label={copy.status}
                size="small"
                color={copy.status === "AVAILABLE" ? "success" : "warning"}
              />
            </Box>

            <Box>
              <IconButton
                onClick={() =>
                  onSwitchStatus(copy.id, copy.status)
                }
                color="primary"
              >
                <SwapHorizIcon />
              </IconButton>

              <IconButton
                onClick={() => onDelete(copy.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CopiesManage;
