// src/components/features/TextInput.tsx

import React from 'react';
import { Button } from '../ui/Button';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onLoadSample: (type: string) => void;
  isProcessing: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  text,
  onTextChange,
  onLoadSample,
  isProcessing
}) => {
  const characterLimit = 5000;
  const characterCount = text.length;
  const isOverLimit = characterCount > characterLimit;
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };
  
  const handleClear = () => {
    onTextChange('');
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Input Text</h2>
      
      <div className="mb-4">
        <textarea
          className={`w-full h-64 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isOverLimit ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Paste your AI-generated text here..."
          value={text}
          onChange={handleTextChange}
          disabled={isProcessing}
        />
        
        <div className="flex justify-between mt-2 text-sm">
          <span className={isOverLimit ? 'text-red-500' : 'text-gray-500'}>
            {characterCount}/{characterLimit} characters
          </span>
          
          {isOverLimit && (
            <span className="text-red-500">
              Character limit exceeded
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleClear}
          variant="outline"
          disabled={isProcessing || !text}
        >
          Clear
        </Button>
        
        <div className="dropdown relative">
          <Button
            variant="outline"
            disabled={isProcessing}
            onClick={() => {}}
            className="dropdown-toggle"
          >
            Try Sample
          </Button>
          
          <div className="dropdown-menu absolute hidden bg-white shadow-lg rounded-md p-2 mt-1 z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              onClick={() => onLoadSample('academic')}
            >
              Academic
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              onClick={() => onLoadSample('creative')}
            >
              Creative
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              onClick={() => onLoadSample('technical')}
            >
              Technical
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              onClick={() => onLoadSample('article')}
            >
              Article
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Tips:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>Paste AI-generated content that needs to be humanized</li>
          <li>For best results, use text between 100-2000 words</li>
          <li>Adjust settings based on your content type</li>
          <li>Try different samples to see how the humanizer works</li>
        </ul>
      </div>
    </div>
  );
};

export default TextInput;
