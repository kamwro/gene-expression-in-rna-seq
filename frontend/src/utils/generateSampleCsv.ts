export const generateSampleCsv = () => {
  const sampleData = [
    ['Gene', 'Expression Level'],
    ['BRCA1', '12.34'],
    ['TP53', '7.89'],
  ];

  // Convert the array to CSV format
  const csvContent = sampleData.map((row) => row.join(',')).join('\n');

  // Create a Blob from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a link element and trigger download
  const link = document.createElement('a');
  if (link.download !== undefined) {
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
