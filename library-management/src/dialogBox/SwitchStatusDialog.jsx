import React from "react";
import { Dialog, DialogTitle, DialogContent,  DialogActions, Button, Typography, CircularProgress,} from "@mui/material";

function SwitchStatusDialog({open, onClose, onConfirm, member, loading, colors}) {
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
  };

  const isActive = member?.is_active;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Status Change</DialogTitle>

      <DialogContent>
        <Typography>
          Change status of <b>{member?.name}</b> to{" "}
          <b>{isActive ? "Inactive" : "Active"}</b>?
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
            backgroundColor: isActive
              ? colors.inActiveColor
              : colors.activeColor,
            color: colors.textColor,
            "&:hover": {
              backgroundColor: isActive
                ? colors.inActiveColorHover
                : colors.activeColorHover,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={18} sx={{ color: "white" }} />
          ) : isActive ? (
            "Deactivate"
          ) : (
            "Activate"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SwitchStatusDialog;
