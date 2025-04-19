// src/components/features/TextOutput.tsx

import React from 'react';
import { Button } from '../ui/Button';

interface TextOutputProps {
  text: string;
  detectionScore: number | null;
  isProcessing: boolean;
  error: string | null;
}

const TextOutput: React.FC<TextOutputProps> = ({
  text,
  detectionScore,
  isProcessing,
  error
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };
  
  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'humanized-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const getScoreColor = () => {
    if (!detectionScore) return 'bg-gray-200';
    if (detectionScore >= 0.8) return 'bg-green-500';
    if (detectionScore >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Humanized Output</h2>
      
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center h-64 border border-gray-300 rounded-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Processing your text...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 border border-red-300 bg-red-50 rounded-md">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-red-600">{error}</p>
        </div>
      ) : text ? (
        <>
          <div className="mb-4">
            <textarea
              className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={text}
              readOnly
            />
          </div>
          
          {detectionScore !== null && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">AI Detection Score:</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getScoreColor()}`}
                  style={{ width: `${detectionScore * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>AI-like</span>
                <span>Human-like</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={copyToClipboard}
              variant="outline"
            >
              Copy
            </Button>
            
            <Button
              onClick={downloadText}
              variant="outline"
            >
              Download
            </Button>
            
            <Button
              variant="outline"
            >
              View Comparison
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border border-gray-300 rounded-md bg-gray-50">
          <p className="text-gray-500">Humanized text will appear here</p>
        </div>
      )}
      
      {text && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">What's Next?</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Copy or download your humanized text</li>
            <li>Test it with other AI detectors if needed</li>
            <li>Make minor manual edits for further personalization</li>
            <li>Use the text in your desired application</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextOutput;
