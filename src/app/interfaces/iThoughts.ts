interface Thought {
  id?: number;
  content: string;
  author: string;
  model: 'modelo1' | 'modelo2' | 'modelo3';
  favorite: boolean;
}

export type { Thought };
