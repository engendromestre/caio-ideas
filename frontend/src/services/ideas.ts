import { api } from "@/services/api";
import { Idea } from "@/types/idea";

export async function getIdeas() {
  const response = await api.get("/ideas");
  return response.data;
}

export async function getIdeaById(id: number) {
  const response = await api.get(`/ideas/${id}`);
  return response.data;
}

export async function createIdea(data: Omit<Idea, "id">) {
  const response = await api.post("/ideas", data);
  return response.data;
}

export async function updateIdea(id: number, data: Partial<Idea>) {
  const response = await api.patch(`/ideas/${id}`, data);
  return response.data;
}

export async function deleteIdea(id: number) {
  await api.delete(`/ideas/${id}`);
}
