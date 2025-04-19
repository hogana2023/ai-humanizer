"use client";

import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TextInput from '../components/features/TextInput';
import TextOutput from '../components/features/TextOutput';
import SettingsPanel from '../components/features/SettingsPanel';

// Mock humanizer hook functionality for the simplified version
function useHumanizer() {
  const [humanizedText, setHumanizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionScore, setDetectionScore] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const processText = (
    text: string, 
    mode: 'standard' | 'academic' | 'creative' | 'casual', 
    intensity: number,
    advancedSettings: any
  ) => {
    setIsProcessing(true);
    setError(undefined);
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        // Simple humanization logic for demonstration
        let result = text;
        
        // Add some variation based on mode and intensity
        if (intensity > 0.5) {
          // Replace some common phrases
          result = result.replace(/in conclusion/gi, 'to sum up');
          result = result.replace(/however/gi, 'nevertheless');
          result = result.replace(/therefore/gi, 'consequently');
          
          // Add some filler words if advanced setting is enabled
          if (advancedSettings.addHumanElements) {
            result = result.replace(/\. /g, '. Well, ');
            result = result.replace(/\? /g, '? Hmm, ');
          }
        }
        
        // Calculate a mock detection score
        const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-99
        
        setHumanizedText(result);
        setDetectionScore(score);
        setIsProcessing(false);
      } catch (err) {
        setError('An error occurred during processing. Please try again.');
        setIsProcessing(false);
      }
    }, 2000);
  };

  const loadSample = async (type: string) => {
    // Sample texts for different types
    const samples: Record<string, string> = {
      academic: "The analysis of climate change impacts requires interdisciplinary approaches. Recent studies have demonstrated that global temperature increases of 1.5°C above pre-industrial levels will have significant consequences for ecosystems worldwide. Therefore, it is imperative that policymakers implement effective mitigation strategies.",
      creative: "The old house stood silently against the twilight sky, its windows like vacant eyes staring into the distance. Sarah hesitated at the gate, memories flooding back from her childhood. The rusted hinges creaked as she pushed forward, stepping into a past she had tried so hard to forget.",
      technical: "The implementation of the algorithm requires O(n log n) time complexity. By utilizing a balanced binary search tree, we can optimize the lookup operations. The system architecture consists of three primary components: the data processing module, the analytics engine, and the user interface layer.",
      casual: "Hey! So I was thinking about that movie we saw last weekend. It was pretty good, right? The special effects were amazing, but the plot had some serious holes. Anyway, I'm thinking of checking out that new restaurant downtown. Wanna join?"
    };
    
    return samples[type] || "Sample text not found for the selected type.";
  };

  return {
    humanizedText,
    isProcessing,
    detectionScore,
    error,
    processText,
    loadSample
  };
}

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
