import { useState, useEffect } from "react";
import { createIdea, deleteIdea, getIdeas, updateIdea } from "@/services/ideas";
import { Idea } from "@/types/idea";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | undefined>();
  const [ideaToDelete, setIdeaToDelete] = useState<Idea | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch inicial
  useEffect(() => {
    refreshIdeas();
  }, []);

  function refreshIdeas() {
    getIdeas()
      .then(setIdeas)
      .catch((err) => console.error("Erro ao buscar ideias:", err));
  }

  function showSnackbar(message: string, severity: SnackbarState["severity"]) {
    setSnackbar({ open: true, message, severity });
  }

  function handleSubmit(data: Omit<Idea, "id">, id?: number) {
    const action = id ? updateIdea(id, data) : createIdea(data);
    action
      .then(() => {
        refreshIdeas();
        setSelectedIdea(undefined);
        showSnackbar(
          id ? "Ideia atualizada com sucesso!" : "Ideia criada com sucesso!",
          "success"
        );
      })
      .catch(() => showSnackbar("Erro ao salvar ideia.", "error"));
  }

  function handleEdit(idea: Idea) {
    setSelectedIdea(idea);
  }

  function handleDelete(idea: Idea) {
    setIdeaToDelete(idea);
    setConfirmOpen(true);
  }

  function executeDelete() {
    if (!ideaToDelete?.id) return;
    deleteIdea(ideaToDelete.id)
      .then(() => {
        refreshIdeas();
        showSnackbar("Ideia excluída com sucesso!", "success");
      })
      .catch(() => showSnackbar("Erro ao excluir ideia.", "error"))
      .finally(() => {
        setConfirmOpen(false);
        setIdeaToDelete(null);
      });
  }

  return {
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
    setSnackbar,    // para fechar
  };
}