"use client";

import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TextInput from '../components/features/TextInput';
import TextOutput from '../components/features/TextOutput';
import SettingsPanel from '../components/features/SettingsPanel';
import { useHumanizer } from '../hooks/useHumanizer';

export default function Home() {
  // State for input text
  const [inputText, setInputText] = useState('');
  
  // State for settings
  const [mode, setMode] = useState<'standard' | 'academic' | 'creative' | 'casual'>('standard');
  const [intensity, setIntensity] = useState(0.7);
  const [advancedSettings, setAdvancedSettings] = useState({
    perplexity: 0.6,
    burstiness: 0.7,
    vocabularyDiversity: 0.6,
    sentenceVariation: 0.6,
    addHumanElements: true,
    preserveFormatting: true
  });
  
  // Use the humanizer hook
  const { 
    humanizedText, 
    isProcessing, 
    detectionScore, 
    processText, 
    loadSample,
    error
  } = useHumanizer();
  
  // Handle form submission
  const handleSubmit = () => {
    if (!inputText.trim()) return;
    
    processText(inputText, mode, intensity, advancedSettings);
  };
  
  // Handle loading a sample
  const handleLoadSample = async (type: string) => {
    const text = await loadSample(type);
    setInputText(text);
  };
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Humanizer
        </h1>
        
        <p className="text-center mb-8 max-w-2xl mx-auto">
          Transform AI-generated content into human-like text that bypasses AI detection.
          Our advanced algorithms add natural variation and human elements to make your text appear more authentic.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Text Input Section */}
          <div className="lg:col-span-1">
            <TextInput 
              text={inputText}
              onTextChange={setInputText}
              onLoadSample={handleLoadSample}
              isProcessing={isProcessing}
            />
          </div>
          
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <SettingsPanel 
              mode={mode}
              onModeChange={setMode}
              intensity={intensity}
              onIntensityChange={setIntensity}
              advancedSettings={advancedSettings}
              onAdvancedSettingsChange={setAdvancedSettings}
              onSubmit={handleSubmit}
              isProcessing={isProcessing}
              disabled={!inputText.trim()}
            />
          </div>
          
          {/* Text Output Section */}
          <div className="lg:col-span-1">
            <TextOutput 
              text={humanizedText}
              detectionScore={detectionScore}
              isProcessing={isProcessing}
              error={error}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
