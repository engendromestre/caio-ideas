import { useState, useEffect } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Idea } from "@/types/idea";

type IdeaFormProps = {
  onSubmit: (data: Omit<Idea, "id">, id?: number) => void;
  initialData?: Idea;
};

const authorOptions = [
  { id: "A001", name: "Ana Souza" },
  { id: "B002", name: "Bruno Lima" },
  { id: "C003", name: "Carla Mendes" },
  { id: "D004", name: "Daniel Rocha" },
  { id: "E005", name: "Eduarda Silva" },
];

export default function IdeaForm({ onSubmit, initialData }: IdeaFormProps) {
  const [authorId, setAuthorId] = useState("");
  const [improvement, setImprovement] = useState("");
  const [currentProcess, setCurrentProcess] = useState("");
  const [proposedChange, setProposedChange] = useState("");
  const [expectedBenefit, setExpectedBenefit] = useState("");

  useEffect(() => {
    if (initialData) {
      setAuthorId(initialData.authorId || "");
      setImprovement(initialData.improvement || "");
      setCurrentProcess(initialData.currentProcess || "");
      setProposedChange(initialData.proposedChange || "");
      setExpectedBenefit(initialData.expectedBenefit || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ideaData: Omit<Idea, "id"> = {
      authorId,
      improvement,
      currentProcess,
      proposedChange,
      expectedBenefit,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(ideaData, initialData?.id);

    if (!initialData) {
      setAuthorId("");
      setImprovement("");
      setCurrentProcess("");
      setProposedChange("");
      setExpectedBenefit("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid size={4}>
          <FormControl fullWidth required>
            <InputLabel>Autor</InputLabel>
            <Select
              value={authorId}
              label="Autor"
              onChange={(e) => setAuthorId(e.target.value)}
            >
              {authorOptions.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name} ({author.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Melhoria"
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
            required
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Processo Atual"
            value={currentProcess}
            onChange={(e) => setCurrentProcess(e.target.value)}
            required
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Mudança"
            value={proposedChange}
            onChange={(e) => setProposedChange(e.target.value)}
            required
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Benefício"
            value={expectedBenefit}
            onChange={(e) => setExpectedBenefit(e.target.value)}
            required
          />
        </Grid>

        <Grid size={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ height: "54px" }}
          >
            {initialData ? "Atualizar" : "Salvar"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
