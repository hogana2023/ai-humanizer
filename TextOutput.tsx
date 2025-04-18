import React, { useState } from 'react';
import Button from '../ui/Button';

const TextOutput = () => {
  const [humanizedText, setHumanizedText] = useState('');
  const [humanScore, setHumanScore] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  // This would be populated from the API in a real implementation
  const dummyStats = {
    sentencesRestructured: 5,
    vocabularyEnhanced: 12,
    humanElementsAdded: 3
  };

  const handleCopy = () => {
    if (humanizedText) {
      navigator.clipboard.writeText(humanizedText)
        .then(() => {
          alert('Text copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy text:', err);
        });
    }
  };

  const handleDownload = () => {
    if (humanizedText) {
      const blob = new Blob([humanizedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'humanized-text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Humanized Text</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Humanized text will appear here..."
          value={humanizedText}
          readOnly
        ></textarea>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">AI Detection Score:</span>
          <span className="text-sm font-medium text-gray-700">{humanScore}% Human</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${humanScore}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Button onClick={toggleComparison} variant="outline">
          {showComparison ? 'Hide Comparison' : 'View Comparison'}
        </Button>
        <div className="flex space-x-3">
          <Button onClick={handleCopy} variant="outline">Copy</Button>
          <Button onClick={handleDownload} variant="outline">Download</Button>
        </div>
      </div>
      
      {showComparison && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Changes Made:</h3>
          <ul className="list-disc pl-5 text-gray-600">
            <li>{dummyStats.sentencesRestructured} sentences restructured</li>
            <li>{dummyStats.vocabularyEnhanced} vocabulary enhancements</li>
            <li>{dummyStats.humanElementsAdded} human elements added</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextOutput;
