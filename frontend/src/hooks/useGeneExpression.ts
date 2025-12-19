import { useMutation } from '@tanstack/react-query';
import {
  processGeneExpression,
  GeneExpressionRequest,
} from '../api/geneExpression';

export const useGeneExpression = () => {
  return useMutation({
    mutationFn: (data: GeneExpressionRequest) => processGeneExpression(data),
  });
};
