import { Idea } from "@/types/idea";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  idea: Idea;
};

export function IdeaCard({ idea }: Props) {
  const formattedDate = format(new Date(idea.createdAt), "dd/MM/yyyy", {
    locale: ptBR,
  });
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h2>{idea.improvement}</h2>
      <p>
        <strong>Processo atual:</strong> {idea.currentProcess}
      </p>
      <p>
        <strong>Proposta:</strong> {idea.proposedChange}
      </p>
      <p>
        <strong>Benefício:</strong> {idea.expectedBenefit}
      </p>
      <p>
        <em>
          Autor: {idea.authorId} — {formattedDate}
        </em>
      </p>
    </div>
  );
}
