import React from 'react';
import Button from '../ui/Button';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onLoadSample: (type: string) => void;
  isProcessing: boolean;
}

export default function TextInput({ 
  text, 
  onTextChange, 
  onLoadSample,
  isProcessing 
}: TextInputProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Input Text</h2>
      
      <div className="mb-4">
        <textarea
          className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Paste your AI-generated text here..."
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          disabled={isProcessing}
        />
      </div>
      
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-gray-600 mb-2">Or load a sample:</p>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onLoadSample('academic')}
            disabled={isProcessing}
          >
            Academic
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onLoadSample('creative')}
            disabled={isProcessing}
          >
            Creative
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onLoadSample('technical')}
            disabled={isProcessing}
          >
            Technical
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onLoadSample('casual')}
            disabled={isProcessing}
          >
            Casual
          </Button>
        </div>
      </div>
    </div>
  );
}
