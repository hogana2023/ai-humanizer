import React from 'react';
import { calculateReadingTime } from '../../lib/utils';

interface TextOutputProps {
  text: string;
  detectionScore?: number;
  isProcessing: boolean;
  error?: string;
}

export default function TextOutput({ 
  text, 
  detectionScore, 
  isProcessing,
  error
}: TextOutputProps) {
  const readingTime = text ? calculateReadingTime(text) : 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Humanized Output</h2>
      
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Processing your text...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-red-500 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      ) : text ? (
        <>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{readingTime}</span> min read
              </div>
              {detectionScore !== undefined && (
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium">Human Score:</span>
                  <span className={`text-sm font-bold ${detectionScore >= 80 ? 'text-green-600' : detectionScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {detectionScore}%
                  </span>
                </div>
              )}
            </div>
            <button 
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              onClick={() => {
                if (text) {
                  navigator.clipboard.writeText(text);
                }
              }}
            >
              Copy to clipboard
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md h-64 overflow-y-auto">
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p>Humanized text will appear here</p>
        </div>
      )}
    </div>
  );
}
