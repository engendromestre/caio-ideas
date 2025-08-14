import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface Props {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
}

export default function IdeaSnackbar({
  open,
  message,
  severity,
  onClose,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}