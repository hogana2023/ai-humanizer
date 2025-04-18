// src/hooks/useHumanizer.ts

import { useState } from 'react';

interface HumanizerSettings {
  perplexity: number;
  burstiness: number;
  vocabularyDiversity: number;
  sentenceVariation: number;
  addHumanElements: boolean;
  preserveFormatting: boolean;
}

export function useHumanizer() {
  const [humanizedText, setHumanizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionScore, setDetectionScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Process text through the humanization API
  const processText = async (
    text: string, 
    mode: 'standard' | 'academic' | 'creative' | 'casual', 
    intensity: number,
    settings: HumanizerSettings
  ) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Call the humanize API
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          mode,
          intensity,
          settings
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to humanize text');
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      // Set the humanized text
      setHumanizedText(data.humanizedText);
      
      // Set the detection score
      if (data.stats && data.stats.detectionScores) {
        setDetectionScore(data.stats.detectionScores.overallHumanScore);
      }
      
    } catch (err) {
      console.error('Error humanizing text:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Load a sample text
  const loadSample = async (type: string = 'article', length: string = 'medium'): Promise<string> => {
    try {
      const response = await fetch(`/api/samples?type=${type}&length=${length}`);
      
      if (!response.ok) {
        throw new Error('Failed to load sample text');
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      return data.sampleText;
    } catch (err) {
      console.error('Error loading sample:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return '';
    }
  };
  
  // Check if text is AI-generated
  const detectAI = async (text: string) => {
    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      return {
        isAIGenerated: data.isAIGenerated,
        confidence: data.confidence,
        scores: data.scores,
        analysis: data.analysis
      };
    } catch (err) {
      console.error('Error detecting AI:', err);
      throw err;
    }
  };
  
  return {
    humanizedText,
    isProcessing,
    detectionScore,
    error,
    processText,
    loadSample,
    detectAI
  };
}
