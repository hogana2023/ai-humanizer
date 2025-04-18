import React, { useState } from 'react';

interface HumanizerContextType {
  inputText: string;
  setInputText: (text: string) => void;
  humanizedText: string;
  setHumanizedText: (text: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  humanizationSettings: {
    mode: string;
    intensity: number;
    advanced: {
      perplexity: number;
      burstiness: number;
      vocabularyDiversity: number;
      sentenceVariation: number;
      addHumanElements: boolean;
      preserveFormatting: boolean;
    };
  };
  updateSettings: (settings: Partial<HumanizerContextType['humanizationSettings']>) => void;
  updateAdvancedSettings: (settings: Partial<HumanizerContextType['humanizationSettings']['advanced']>) => void;
  humanizeText: () => Promise<void>;
  detectionScore: number;
  changeStats: {
    sentencesRestructured: number;
    vocabularyEnhanced: number;
    humanElementsAdded: number;
  };
}

const defaultContext: HumanizerContextType = {
  inputText: '',
  setInputText: () => {},
  humanizedText: '',
  setHumanizedText: () => {},
  isProcessing: false,
  setIsProcessing: () => {},
  humanizationSettings: {
    mode: 'standard',
    intensity: 0.7,
    advanced: {
      perplexity: 0.6,
      burstiness: 0.8,
      vocabularyDiversity: 0.7,
      sentenceVariation: 0.6,
      addHumanElements: true,
      preserveFormatting: true,
    },
  },
  updateSettings: () => {},
  updateAdvancedSettings: () => {},
  humanizeText: async () => {},
  detectionScore: 0,
  changeStats: {
    sentencesRestructured: 0,
    vocabularyEnhanced: 0,
    humanElementsAdded: 0,
  },
};

export const HumanizerContext = React.createContext<HumanizerContextType>(defaultContext);

export const HumanizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inputText, setInputText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionScore, setDetectionScore] = useState(0);
  const [changeStats, setChangeStats] = useState({
    sentencesRestructured: 0,
    vocabularyEnhanced: 0,
    humanElementsAdded: 0,
  });
  
  const [humanizationSettings, setHumanizationSettings] = useState({
    mode: 'standard',
    intensity: 0.7,
    advanced: {
      perplexity: 0.6,
      burstiness: 0.8,
      vocabularyDiversity: 0.7,
      sentenceVariation: 0.6,
      addHumanElements: true,
      preserveFormatting: true,
    },
  });

  const updateSettings = (settings: Partial<HumanizerContextType['humanizationSettings']>) => {
    setHumanizationSettings(prev => ({
      ...prev,
      ...settings,
    }));
  };

  const updateAdvancedSettings = (settings: Partial<HumanizerContextType['humanizationSettings']['advanced']>) => {
    setHumanizationSettings(prev => ({
      ...prev,
      advanced: {
        ...prev.advanced,
        ...settings,
      },
    }));
  };

  const humanizeText = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to humanize');
      return;
    }

    setIsProcessing(true);

    try {
      // This will be replaced with actual API call in the backend implementation
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate humanized text (this is just a placeholder)
      const simulatedHumanizedText = inputText
        .split('.')
        .map(sentence => {
          // Add some randomness to sentence structure
          const words = sentence.trim().split(' ');
          if (words.length > 5) {
            // Randomly reorder some words or add filler words
            const randomIndex = Math.floor(Math.random() * (words.length - 3)) + 1;
            words.splice(randomIndex, 0, ['actually', 'honestly', 'interestingly', 'surprisingly'][Math.floor(Math.random() * 4)]);
          }
          return words.join(' ');
        })
        .join('. ');
      
      setHumanizedText(simulatedHumanizedText);
      
      // Simulate detection score and stats
      setDetectionScore(Math.floor(Math.random() * 30) + 70); // Random score between 70-99
      setChangeStats({
        sentencesRestructured: Math.floor(inputText.split('.').length * 0.7),
        vocabularyEnhanced: Math.floor(inputText.split(' ').length * 0.2),
        humanElementsAdded: Math.floor(inputText.split('.').length * 0.3),
      });
    } catch (error) {
      console.error('Error humanizing text:', error);
      alert('An error occurred while humanizing the text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <HumanizerContext.Provider
      value={{
        inputText,
        setInputText,
        humanizedText,
        setHumanizedText,
        isProcessing,
        setIsProcessing,
        humanizationSettings,
        updateSettings,
        updateAdvancedSettings,
        humanizeText,
        detectionScore,
        changeStats,
      }}
    >
      {children}
    </HumanizerContext.Provider>
  );
};

export const useHumanizer = () => React.useContext(HumanizerContext);
