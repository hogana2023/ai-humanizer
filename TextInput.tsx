import React, { useState } from 'react';
import Button from '../ui/Button';

const TextInput = () => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 5000;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
  };

  const handleClear = () => {
    setText('');
    setCharCount(0);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText(clipboardText);
        setCharCount(clipboardText.length);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleTrySample = () => {
    const sampleText = `Artificial intelligence has revolutionized numerous industries by automating complex tasks and providing data-driven insights. Machine learning algorithms can analyze vast amounts of information to identify patterns and make predictions with remarkable accuracy. These technological advancements have significant implications for productivity, decision-making processes, and innovation across various sectors. As AI continues to evolve, it will likely transform how we approach problem-solving and create new opportunities for growth and development.`;
    setText(sampleText);
    setCharCount(sampleText.length);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Input Text</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your AI-generated text here..."
          value={text}
          onChange={handleTextChange}
          maxLength={maxChars}
        ></textarea>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          {charCount}/{maxChars} characters
        </div>
        <div className="flex space-x-3">
          <Button onClick={handlePaste} variant="outline">Paste</Button>
          <Button onClick={handleTrySample} variant="outline">Try Sample</Button>
          <Button onClick={handleClear} variant="outline">Clear</Button>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
