import React, { useState } from 'react';

interface GeneExpressionData {
  data: { gene: string; expression_level: number }[];
}

interface GeneExpressionFormProps {
  onSubmit: (data: GeneExpressionData) => void;
}

const GeneExpressionForm: React.FC<GeneExpressionFormProps> = ({
  onSubmit,
}) => {
  const [entries, setEntries] = useState<
    { gene: string; expression_level: number }[]
  >([{ gene: '', expression_level: 0 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    index: number,
    field: 'gene' | 'expression_level',
    value: string | number
  ) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: value,
    };
    setEntries(updatedEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { gene: '', expression_level: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    try {
      await onSubmit({ data: entries });
    } catch (error) {
      console.error('Error submitting data', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {entries.map((entry, index) => (
        <div key={index} className="entry">
          <input
            type="text"
            placeholder="Gene"
            value={entry.gene}
            onChange={(e) => handleChange(index, 'gene', e.target.value)}
          />
          <input
            type="number"
            placeholder="Expression Level"
            value={entry.expression_level}
            onChange={(e) =>
              handleChange(index, 'expression_level', e.target.value)
            }
          />
        </div>
      ))}
      <button type="button" onClick={addEntry}>
        Add Entry
      </button>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Analyze'}
      </button>
    </form>
  );
};

export default GeneExpressionForm;
