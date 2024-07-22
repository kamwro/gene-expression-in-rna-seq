// src/utils/csvToJson.ts
import Papa from 'papaparse';
import { GeneExpressionData, GeneExpressionEntry } from './types';

export const csvToJson = (file: File): Promise<GeneExpressionData> => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse<GeneExpressionEntry>(file, {
        header: true,
        skipEmptyLines: true,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ',',
        complete: (results) => {
          if (results.errors.length) {
            console.error('Parsing errors:', results.errors);
            reject(results.errors);
          } else {
            console.log('Parsing results:', results);
            resolve({ data: results.data });
          }
        },
        error: (error) => {
          console.error('Parsing error:', error);
          reject(error);
        },
      });
    } catch (error) {
      console.error('Error reading file:', error);
      reject(error);
    }
  });
};
