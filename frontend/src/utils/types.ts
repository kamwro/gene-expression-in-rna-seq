export interface GeneExpressionEntry {
  gene: string;
  expression_level: number;
}

export interface GeneExpressionData {
  data: Array<GeneExpressionEntry>;
}

export interface GeneExpressionFormProps {
  onSubmit: (data: GeneExpressionData) => void;
}

export interface ResultsProps {
  data: GeneExpressionData;
}
