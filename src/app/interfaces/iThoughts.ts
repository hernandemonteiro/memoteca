interface Thought {
  id?: number;
  content: string;
  author: string;
  model: 'modelo1' | 'modelo2' | 'modelo3';
}

export type { Thought };
