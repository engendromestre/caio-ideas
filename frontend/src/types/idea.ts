export type Idea = {
  id?: number;
  authorId: string;
  improvement: string;
  currentProcess: string;
  proposedChange: string;
  expectedBenefit: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
};
