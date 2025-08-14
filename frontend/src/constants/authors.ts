export const authorOptions = [
  { id: "A001", name: "Ana Souza" },
  { id: "B002", name: "Bruno Lima" },
  { id: "C003", name: "Carla Mendes" },
  { id: "D004", name: "Daniel Rocha" },
  { id: "E005", name: "Eduarda Silva" },
];

export function getAuthorNameById(id: string): string {
  const author = authorOptions.find((a) => a.id === id);
  return author ? author.name : id;
}
