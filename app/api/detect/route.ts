// src/app/api/detect/route.ts

import { NextRequest, NextResponse } from 'next/server';
import * as natural from 'natural';

// Tokenizer for sentence splitting
const tokenizer = new natural.SentenceTokenizer();
const wordTokenizer = new natural.WordTokenizer();

interface DetectionRequest {
  text: string;
}

// Function to calculate perplexity (measure of randomness/unpredictability)
function calculatePerplexity(text: string): number {
  // Split into sentences and words
  const sentences = tokenizer.tokenize(text);
  
  if (sentences.length <= 1) {
    return 0.3; // Low perplexity for very short texts
  }
  
  // Calculate sentence length variance
  const sentenceLengths = sentences.map(s => s.length);
  const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  
  // Calculate variance
  const variance = sentenceLengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / sentenceLengths.length;
  const stdDev = Math.sqrt(variance);
  
  // Normalize to a 0-1 scale (higher is more human-like)
  const normalizedStdDev = Math.min(stdDev / 50, 1);
  
  // Calculate word diversity
  const words = wordTokenizer.tokenize(data.text.toLowerCase()) || [];
  const uniqueWords = new Set(words);
  const uniqueRatio =
  words.length > 0
    ? uniqueWords.size / words.length
    : 0;
  
  // Combine metrics (weighted)
  return (normalizedStdDev * 0.6) + (uniqueRatio * 0.4);
}

// Function to calculate burstiness (variation in sentence structure)
function calculateBurstiness(text: string): number {
  const sentences = tokenizer.tokenize(text);
  
  if (sentences.length <= 2) {
    return 0.4; // Low burstiness for very short texts
  }
  
  // Calculate sentence length differences between consecutive sentences
  let totalDifference = 0;
  for (let i = 0; i < sentences.length - 1; i++) {
    totalDifference += Math.abs(sentences[i].length - sentences[i + 1].length);
  }
  
  const avgDifference = totalDifference / (sentences.length - 1);
  
  // Normalize to a 0-1 scale (higher is more human-like)
  const normalizedDifference = Math.min(avgDifference / 40, 1);
  
  // Check for sentence beginnings diversity
  const beginnings = sentences.map(s => {
    const words = wordTokenizer.tokenize(data.text.toLowerCase()) || [];
    return words && words.length > 0 ? words[0].toLowerCase() : '';
  }).filter(w => w.length > 0);
  
  const uniqueBeginnings = new Set(beginnings);
  const beginningDiversity = uniqueBeginnings.size / beginnings.length;
  
  // Combine metrics
  return (normalizedDifference * 0.7) + (beginningDiversity * 0.3);
}

// Function to detect common AI patterns
function detectAIPatterns(text: string): string[] {
  const patterns = [];
  
  // Check for repetitive phrases
  const phrases = text.match(/\b(\w+\s+\w+\s+\w+)\b/g) || [];
  const phraseCounts: Record<string, number> = {};
  
  phrases.forEach(phrase => {
    phraseCounts[phrase] = (phraseCounts[phrase] || 0) + 1;
  });
  
  const repetitiveThreshold = Math.max(3, Math.floor(phrases.length * 0.05));
  const repetitivePhrases = Object.entries(phraseCounts)
    .filter(([_, count]) => count > repetitiveThreshold)
    .map(([phrase]) => phrase);
  
  if (repetitivePhrases.length > 0) {
    patterns.push("Repetitive phrases detected");
  }
  
  // Check for overly consistent sentence lengths
  const sentences = tokenizer.tokenize(text);
  if (sentences.length > 5) {
    const lengths = sentences.map(s => s.length);
    const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / lengths.length;
    
    if (variance < 100) {
      patterns.push("Consistent sentence lengths");
    }
  }
  
  // Check for lack of filler words (common in human writing)
  const fillerWords = ['well', 'you know', 'like', 'actually', 'basically', 'honestly', 'literally'];
  const lowerText = text.toLowerCase();
  const hasFillerWords = fillerWords.some(word => lowerText.includes(word));
  
  if (!hasFillerWords && text.length > 200) {
    patterns.push("Lack of filler words");
  }
  
  // Check for overly formal language
  const informalWords = ['awesome', 'cool', 'huge', 'okay', 'stuff', 'thing', 'pretty', 'really'];
  const hasInformalWords = informalWords.some(word => lowerText.includes(word));
  
  if (!hasInformalWords && text.length > 200) {
    patterns.push("Overly formal language");
  }
  
  return patterns;
}

export async function POST(request: NextRequest) {
  try {
    const data: DetectionRequest = await request.json();
    
    // Validate input
    if (!data.text || data.text.trim().length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: "No text provided" 
      }, { status: 400 });
    }
    
    // Calculate perplexity and burstiness
    const perplexity = calculatePerplexity(data.text);
    const burstiness = calculateBurstiness(data.text);
    
    // Detect common AI patterns
    const patterns = detectAIPatterns(data.text);
    
    // Calculate overall human score (weighted combination)
    const overallHumanScore = (perplexity * 0.4) + (burstiness * 0.6);
    
    // Determine if AI generated based on threshold
    const isAIGenerated = overallHumanScore < 0.65;
    const confidence = isAIGenerated ? 
      Math.min(0.95, 1 - overallHumanScore) : 
      Math.min(0.95, overallHumanScore);
    
    // Analyze sentence structure and vocabulary
    //const sentences = tokenizer.tokenize(data.text);
    //const words = wordTokenizer.tokenize(Text.toLowerCase()) || [];
    const sentences = tokenizer.tokenize(data.text);
    const words = wordTokenizer.tokenize(data.text.toLowerCase()) || [];
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    
    const sentenceStructure = burstiness < 0.5 ? 
      "Low variation detected" : 
      "Natural variation present";
      
    const vocabularyDiversity = (words.length > 0 && uniqueWords.size / words.length < 0.6) 
      "Limited word choice variety" : 
      "Good vocabulary diversity";
    
    return NextResponse.json({
      success: true,
      isAIGenerated,
      confidence,
      scores: {
        perplexity,
        burstiness,
        overallHumanScore
      },
      analysis: {
        sentenceStructure,
        vocabularyDiversity,
        commonPatterns: patterns
      }
    });
    
  } catch (error) {
    console.error('Error in detection:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to analyze text" 
    }, { status: 500 });
  }
}
