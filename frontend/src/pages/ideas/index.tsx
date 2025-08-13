import { createIdea, deleteIdea, getIdeas, updateIdea } from "@/services/ideas";
import { Idea } from "@/types/idea";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import IdeaForm from "./components/IdeaForm";
import { IdeaTable } from "./components/IdeaTable";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

export default function Index() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<Idea | undefined>(undefined);

  function refreshIdeas() {
    getIdeas()
      .then(setIdeas)
      .catch((err) => console.error("Erro ao buscar ideias:", err));
  }

  useEffect(() => {
    refreshIdeas();
  }, []);

  function handleSubmit(data: Omit<Idea, "id">, id?: number) {
    const action = id ? updateIdea(id, data) : createIdea(data);
    action.then(() => {
      refreshIdeas();
      setSelectedIdea(undefined);
    });
  }

  function handleEdit(idea: Idea) {
    setSelectedIdea(idea);
  }

  function handleDelete(id: number) {
    deleteIdea(id).then(refreshIdeas);
  }

  console.log(ideas);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        <LightbulbIcon color="primary" fontSize="large" />
        Ideias sugeridas
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
    </Container>
  );
}
