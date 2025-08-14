import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Idea } from "@/types/idea";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  idea?: Idea | null;
}

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  idea,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogContent>
        Tem certeza que deseja excluir a ideia “{idea?.improvement}”?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" onClick={onConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}