import { apiClient } from './client';
import type { GeneExpressionEntry } from '../utils/types';

export interface GeneExpressionRequest {
  data: GeneExpressionEntry[];
}

export interface GeneExpressionResponse {
  expression_level: Record<string, Record<string, number>>;
  gene_counts: Record<string, number>;
}

export const processGeneExpression = async (
  data: GeneExpressionRequest
): Promise<GeneExpressionResponse> => {
  const response = await apiClient.post<GeneExpressionResponse>(
    '/process',
    data
  );
  return response.data;
};
