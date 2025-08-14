import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import { Idea } from "@/types/idea";
import { IdeaRow } from "./IdeaRow";

type Props = {
  ideas: Idea[];
  onEdit: (idea: Idea) => void;
  onDelete: (idea: Idea) => void;
};

export function IdeaTable({ ideas, onEdit, onDelete }: Props) {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Autor</TableCell>
            <TableCell>Melhoria</TableCell>
            <TableCell>Processo Atual</TableCell>
            <TableCell>Proposta</TableCell>
            <TableCell>Benefício</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ideas.map((idea) => (
            <IdeaRow
              key={idea.id}
              idea={idea}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
