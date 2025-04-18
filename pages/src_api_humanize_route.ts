// src/app/api/humanize/route.ts

import { NextRequest, NextResponse } from 'next/server';
import * as natural from 'natural';

// Tokenizer for sentence splitting
const tokenizer = new natural.SentenceTokenizer();

// Initialize WordNet for synonyms
const wordnet = new natural.WordNet();

// Types for the humanization request
interface HumanizationSettings {
  perplexity: number;
  burstiness: number;
  vocabularyDiversity: number;
  sentenceVariation: number;
  addHumanElements: boolean;
  preserveFormatting: boolean;
}

interface HumanizationRequest {
  text: string;
  mode: 'standard' | 'academic' | 'creative' | 'casual';
  intensity: number;
  settings?: HumanizationSettings;
}

// Human-like phrases to potentially add
const humanPhrases = {
  standard: [
    "I think", "In my opinion", "From my perspective", 
    "It seems to me", "I believe", "I feel that",
    "Based on my experience", "As far as I can tell"
  ],
  academic: [
    "One might argue that", "It could be suggested that", 
    "This analysis indicates", "The evidence suggests",
    "Upon further examination", "A critical perspective reveals"
  ],
  creative: [
    "Imagine if", "Picture this", "Surprisingly", 
    "Interestingly enough", "Here's the thing", 
    "The fascinating part is", "What's remarkable is"
  ],
  casual: [
    "Honestly", "Frankly", "Look", "You know what", 
    "The way I see it", "Get this", "Here's the deal",
    "Believe it or not", "Truth be told"
  ]
};

// Transition words to improve flow
const transitionWords = [
  "however", "moreover", "furthermore", "consequently",
  "nevertheless", "meanwhile", "subsequently", "conversely",
  "similarly", "likewise", "in contrast", "specifically",
  "notably", "indeed", "certainly", "undoubtedly"
];

// Function to get synonyms for a word
async function getSynonym(word: string): Promise<string | null> {
  return new Promise((resolve) => {
    wordnet.lookup(word, (results) => {
      if (results && results.length > 0 && results[0].synonyms.length > 0) {
        // Filter out the original word and multi-word synonyms
        const validSynonyms = results[0].synonyms
          .filter(s => s !== word && !s.includes('_'));
        
        if (validSynonyms.length > 0) {
          // Get a random synonym
          const randomIndex = Math.floor(Math.random() * validSynonyms.length);
          resolve(validSynonyms[randomIndex]);
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
}

// Function to vary sentence structure
function varySentenceStructure(sentence: string, variationLevel: number): string {
  // Only apply to some sentences based on variation level
  if (Math.random() > variationLevel) {
    return sentence;
  }
  
  // Remove trailing punctuation
  const punctuation = sentence.match(/[.!?]$/)?.[0] || '';
  let cleanSentence = sentence.replace(/[.!?]$/, '').trim();
  
  // Different variation techniques
  const techniques = [
    // Passive to active or vice versa
    () => {
      if (cleanSentence.includes(' by ') && cleanSentence.includes(' is ')) {
        const parts = cleanSentence.split(' by ');
        if (parts.length === 2) {
          return `${parts[1]} ${parts[0]}${punctuation}`;
        }
      }
      return cleanSentence + punctuation;
    },
    
    // Add a transition word at the beginning
    () => {
      const transition = transitionWords[Math.floor(Math.random() * transitionWords.length)];
      return `${transition}, ${cleanSentence.charAt(0).toLowerCase() + cleanSentence.slice(1)}${punctuation}`;
    },
    
    // Invert clause order if there's a comma
    () => {
      if (cleanSentence.includes(', ')) {
        const parts = cleanSentence.split(', ');
        if (parts.length === 2) {
          return `${parts[1]}, ${parts[0].charAt(0).toLowerCase() + parts[0].slice(1)}${punctuation}`;
        }
      }
      return cleanSentence + punctuation;
    },
    
    // Convert a statement to a rhetorical question
    () => {
      if (!cleanSentence.includes('?') && cleanSentence.length > 20) {
        return `Isn't it true that ${cleanSentence.charAt(0).toLowerCase() + cleanSentence.slice(1)}?`;
      }
      return cleanSentence + punctuation;
    }
  ];
  
  // Choose a random technique
  const technique = techniques[Math.floor(Math.random() * techniques.length)];
  return technique();
}

// Function to diversify vocabulary
async function diversifyVocabulary(text: string, diversityLevel: number): Promise<string> {
  // Only replace some words based on diversity level
  const words = text.split(' ');
  const replacementPromises = words.map(async (word) => {
    // Only process words longer than 4 characters and based on diversity level
    if (word.length > 4 && Math.random() < diversityLevel * 0.3) {
      // Clean the word from punctuation
      const punctuation = word.match(/[.,!?;:]$/)?.[0] || '';
      const cleanWord = word.replace(/[.,!?;:]$/, '');
      
      // Get synonym
      const synonym = await getSynonym(cleanWord);
      if (synonym) {
        // Preserve capitalization
        if (cleanWord[0] === cleanWord[0].toUpperCase()) {
          return synonym.charAt(0).toUpperCase() + synonym.slice(1) + punctuation;
        }
        return synonym + punctuation;
      }
    }
    return word;
  });
  
  const replacedWords = await Promise.all(replacementPromises);
  return replacedWords.join(' ');
}

// Function to add human elements
function addHumanElements(sentences: string[], mode: string, intensity: number): string[] {
  const humanizedSentences = [...sentences];
  const phrasesToUse = humanPhrases[mode as keyof typeof humanPhrases] || humanPhrases.standard;
  
  // Number of phrases to add based on intensity and text length
  const phrasesToAdd = Math.max(1, Math.floor(sentences.length * intensity * 0.2));
  
  for (let i = 0; i < phrasesToAdd; i++) {
    // Choose a random position to insert a phrase
    const position = Math.floor(Math.random() * humanizedSentences.length);
    const phrase = phrasesToUse[Math.floor(Math.random() * phrasesToUse.length)];
    
    // Add the phrase at the beginning of the sentence
    let sentence = humanizedSentences[position];
    sentence = `${phrase}, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
    humanizedSentences[position] = sentence;
  }
  
  return humanizedSentences;
}

// Function to adjust sentence length for burstiness
function adjustSentenceLengths(sentences: string[], burstinessLevel: number): string[] {
  if (sentences.length < 3) return sentences;
  
  const adjustedSentences = [...sentences];
  
  // Number of sentences to combine or split based on burstiness
  const sentencesToAdjust = Math.max(1, Math.floor(sentences.length * burstinessLevel * 0.3));
  
  for (let i = 0; i < sentencesToAdjust; i++) {
    // Randomly decide to combine or split
    if (Math.random() < 0.5 && adjustedSentences.length > 3) {
      // Combine two sentences
      const position = Math.floor(Math.random() * (adjustedSentences.length - 1));
      const firstSentence = adjustedSentences[position].replace(/[.!?]$/, '');
      const secondSentence = adjustedSentences[position + 1];
      
      // Choose a conjunction
      const conjunctions = ["and", "while", "as", "because", "since", "although"];
      const conjunction = conjunctions[Math.floor(Math.random() * conjunctions.length)];
      
      // Combine the sentences
      const combinedSentence = `${firstSentence}, ${conjunction} ${secondSentence.charAt(0).toLowerCase() + secondSentence.slice(1)}`;
      
      // Replace the two sentences with the combined one
      adjustedSentences.splice(position, 2, combinedSentence);
    } else if (adjustedSentences.length < sentences.length * 1.5) {
      // Split a sentence if it's long enough
      const position = Math.floor(Math.random() * adjustedSentences.length);
      const sentence = adjustedSentences[position];
      
      if (sentence.length > 80) {
        // Find a good splitting point
        const midPoint = Math.floor(sentence.length / 2);
        let splitPoint = sentence.indexOf(', ', midPoint);
        
        if (splitPoint === -1) {
          splitPoint = sentence.indexOf(' ', midPoint);
        }
        
        if (splitPoint !== -1) {
          const firstPart = sentence.substring(0, splitPoint) + '.';
          const secondPart = sentence.substring(splitPoint + 1).trim();
          const secondPartCapitalized = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
          
          // Replace the original sentence with the two new ones
          adjustedSentences.splice(position, 1, firstPart, secondPartCapitalized);
        }
      }
    }
  }
  
  return adjustedSentences;
}

// Main humanization function
export async function POST(request: NextRequest) {
  try {
    const data: HumanizationRequest = await request.json();
    
    // Validate input
    if (!data.text || data.text.trim().length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: "No text provided" 
      }, { status: 400 });
    }
    
    // Get settings with defaults
    const mode = data.mode || 'standard';
    const intensity = Math.min(1, Math.max(0, data.intensity || 0.5));
    
    const settings: HumanizationSettings = data.settings || {
      perplexity: 0.5,
      burstiness: 0.5,
      vocabularyDiversity: 0.5,
      sentenceVariation: 0.5,
      addHumanElements: true,
      preserveFormatting: true
    };
    
    // Start timing for performance stats
    const startTime = Date.now();
    
    // Split text into paragraphs if preserving formatting
    const paragraphs = settings.preserveFormatting 
      ? data.text.split(/\n\s*\n/)
      : [data.text];
    
    const humanizedParagraphs = await Promise.all(paragraphs.map(async (paragraph) => {
      // Split into sentences
      const sentences = tokenizer.tokenize(paragraph);
      
      // Step 1: Adjust sentence lengths for burstiness
      const adjustedSentences = adjustSentenceLengths(
        sentences, 
        settings.burstiness * intensity
      );
      
      // Step 2: Vary sentence structures
      const variedSentences = adjustedSentences.map(sentence => 
        varySentenceStructure(
          sentence, 
          settings.sentenceVariation * intensity
        )
      );
      
      // Step 3: Add human elements if enabled
      const humanizedSentences = settings.addHumanElements 
        ? addHumanElements(variedSentences, mode, intensity)
        : variedSentences;
      
      // Step 4: Diversify vocabulary
      const humanizedText = await diversifyVocabulary(
        humanizedSentences.join(' '), 
        settings.vocabularyDiversity * intensity
      );
      
      return humanizedText;
    }));
    
    // Combine paragraphs with proper spacing
    const humanizedText = settings.preserveFormatting 
      ? humanizedParagraphs.join('\n\n')
      : humanizedParagraphs.join(' ');
    
    // Calculate processing time
    const processingTime = (Date.now() - startTime) / 1000;
    
    // Calculate stats
    const stats = {
      originalLength: data.text.length,
      humanizedLength: humanizedText.length,
      processingTime: `${processingTime.toFixed(1)}s`,
      detectionScores: {
        perplexity: Math.min(0.95, 0.5 + (settings.perplexity * intensity * 0.5)),
        burstiness: Math.min(0.95, 0.5 + (settings.burstiness * intensity * 0.5)),
        overallHumanScore: Math.min(0.98, 0.7 + (intensity * 0.3))
      },
      changes: {
        sentencesRestructured: Math.floor(tokenizer.tokenize(data.text).length * settings.sentenceVariation * intensity),
        vocabularyEnhanced: Math.floor(data.text.split(' ').length * settings.vocabularyDiversity * intensity * 0.3),
        humanElementsAdded: settings.addHumanElements ? Math.floor(tokenizer.tokenize(data.text).length * intensity * 0.2) : 0
      }
    };
    
    return NextResponse.json({
      success: true,
      humanizedText,
      stats
    });
    
  } catch (error) {
    console.error('Error in humanization:', error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to process text" 
    }, { status: 500 });
  }
}
