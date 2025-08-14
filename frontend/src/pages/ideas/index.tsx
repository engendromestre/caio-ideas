import React from "react";
import { Container, Typography, Box } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import DPlusLogo from "./components/dplus";
import IdeaForm from "./components/IdeaForm";
import { IdeaTable } from "./components/IdeaTable";
import IdeaSnackbar from "./components/IdeaSnackbar";

import { useIdeas } from "@/hooks/useIdeas";
import DeleteConfirmationDialog from "./components/IdeaDeleteConfirmDialog";

export default function Index() {
  const {
    ideas,
    selectedIdea,
    setSelectedIdea,
    handleSubmit,
    handleEdit,
    handleDelete,
    confirmOpen,
    ideaToDelete,
    executeDelete,
    snackbar,
    setSnackbar,
  } = useIdeas();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        <DPlusLogo /> Ideias <LightbulbIcon color="primary" fontSize="large" />
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <Box width="100%" maxWidth="1000px">
          <IdeaForm onSubmit={handleSubmit} initialData={selectedIdea} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box width="100%" maxWidth="1000px">
          <IdeaTable
            ideas={ideas}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </Box>

      <DeleteConfirmationDialog
        open={confirmOpen}
        onClose={() => setSelectedIdea(undefined)}
        onConfirm={executeDelete}
        idea={ideaToDelete}
      />

      <IdeaSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </Container>
  );
}
