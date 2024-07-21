export interface GeneExpressionData {
    data: { [key: string]: any }[];
  }

export interface GeneExpressionEntry {
    gene: string;
    expression_level: number;
  }
  
export interface GeneExpressionFormProps {
    onSubmit: (data: { data: GeneExpressionEntry[] }) => void;
  }

export interface ResultItem {
    gene: string;
    expression_level: number;
  }
  
export interface ResultsProps {
    data: ResultItem[];
  }
  
  