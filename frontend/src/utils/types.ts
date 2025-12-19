export interface GeneExpressionEntry {
  [key: string]: any; // Allow indexing by string keys
  gene?: string;
  expression_level?: number;
}

export interface GeneExpressionData {
  data: Array<GeneExpressionEntry>;
}

export interface GeneExpressionFormProps {
  onSubmit: (data: GeneExpressionData) => void;
  isLoading?: boolean;
}

export interface ResultsProps {
  fields?: string[];
  data: {
    data: any; // Can be array or object response from API
  };
}
