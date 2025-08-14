import { Idea } from "@/types/idea";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, TableCell, TableRow } from "@mui/material";
import { getAuthorNameById } from "@/constants/authors";

type Props = {
  idea: Idea;
  onEdit: (idea: Idea) => void;
  onDelete: (idea: Idea) => void;
};

export function IdeaRow({ idea, onEdit, onDelete }: Props) {
  return (
    <TableRow hover>
     <TableCell>{getAuthorNameById(idea.authorId)}</TableCell>
      <TableCell>{idea.improvement}</TableCell>
      <TableCell>{idea.currentProcess}</TableCell>
      <TableCell>{idea.proposedChange}</TableCell>
      <TableCell>{idea.expectedBenefit}</TableCell>
      <TableCell align="center">
        <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
          <IconButton
            color="primary"
            aria-label="Editar"
            onClick={() => onEdit(idea)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="Excluir"
            onClick={() => onDelete(idea)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

