import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, mode, intensity, settings } = body;
    
    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Text is required', code: 'INVALID_PARAMETERS' },
        { status: 400 }
      );
    }
    
    if (text.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Text exceeds maximum length of 5000 characters', code: 'TEXT_TOO_LONG' },
        { status: 413 }
      );
    }
    
    // Process the text through humanization algorithms
    const result = await humanizeText(text, mode, intensity, settings);
    
    return NextResponse.json({
      success: true,
      humanizedText: result.humanizedText,
      stats: result.stats
    });
    
  } catch (error) {
    console.error('Error processing humanization request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

async function humanizeText(
  text: string, 
  mode: string = 'standard', 
  intensity: number = 0.7,
  settings?: {
    perplexity?: number;
    burstiness?: number;
    vocabularyDiversity?: number;
    sentenceVariation?: number;
    addHumanElements?: boolean;
    preserveFormatting?: boolean;
  }
) {
  // Default settings
  const finalSettings = {
    perplexity: settings?.perplexity ?? 0.6,
    burstiness: settings?.burstiness ?? 0.8,
    vocabularyDiversity: settings?.vocabularyDiversity ?? 0.7,
    sentenceVariation: settings?.sentenceVariation ?? 0.6,
    addHumanElements: settings?.addHumanElements ?? true,
    preserveFormatting: settings?.preserveFormatting ?? true
  };
  
  // Start timing for performance measurement
  const startTime = Date.now();
  
  // Process the text through various humanization algorithms
  let processedText = text;
  let sentencesRestructured = 0;
  let vocabularyEnhanced = 0;
  let humanElementsAdded = 0;
  
  // 1. Split text into sentences
  const sentences = splitIntoSentences(processedText);
  
  // 2. Apply sentence structure variation based on burstiness setting
  const restructuredSentences = applySentenceVariation(
    sentences, 
    finalSettings.burstiness, 
    finalSettings.sentenceVariation,
    mode
  );
  sentencesRestructured = countDifferences(sentences, restructuredSentences);
  
  // 3. Apply vocabulary diversification
  const enhancedVocabSentences = applyVocabularyDiversification(
    restructuredSentences,
    finalSettings.vocabularyDiversity,
    mode
  );
  vocabularyEnhanced = countWordDifferences(
    restructuredSentences.join(' '), 
    enhancedVocabSentences.join(' ')
  );
  
  // 4. Add human elements if enabled
  let finalSentences = enhancedVocabSentences;
  if (finalSettings.addHumanElements) {
    finalSentences = addHumanElements(
      enhancedVocabSentences,
      finalSettings.perplexity,
      mode
    );
    humanElementsAdded = countAddedHumanElements(
      enhancedVocabSentences, 
      finalSentences
    );
  }
  
  // 5. Combine sentences back into text
  processedText = finalSentences.join(' ');
  
  // Calculate processing time
  const processingTime = ((Date.now() - startTime) / 1000).toFixed(1);
  
  // Calculate detection scores based on the changes made
  const perplexityScore = calculatePerplexityScore(processedText);
  const burstinessScore = calculateBurstinessScore(finalSentences);
  const overallHumanScore = calculateOverallHumanScore(
    perplexityScore, 
    burstinessScore,
    vocabularyEnhanced / text.split(' ').length
  );
  
  return {
    humanizedText: processedText,
    stats: {
      originalLength: text.length,
      humanizedLength: processedText.length,
      processingTime: `${processingTime}s`,
      detectionScores: {
        perplexity: perplexityScore,
        burstiness: burstinessScore,
        overallHumanScore: overallHumanScore
      },
      changes: {
        sentencesRestructured,
        vocabularyEnhanced,
        humanElementsAdded
      }
    }
  };
}

// Helper functions for text processing

function splitIntoSentences(text: string): string[] {
  // Simple sentence splitting - in a real implementation, this would be more sophisticated
  return text.split(/(?<=[.!?])\s+/);
}

function applySentenceVariation(
  sentences: string[], 
  burstiness: number,
  sentenceVariation: number,
  mode: string
): string[] {
  // Apply sentence structure variation based on burstiness setting
  return sentences.map(sentence => {
    // Skip very short sentences
    if (sentence.split(' ').length < 4) return sentence;
    
    // Determine if we should modify this sentence based on settings
    const shouldModify = Math.random() < (burstiness * sentenceVariation);
    if (!shouldModify) return sentence;
    
    // Different modification strategies based on mode
    switch (mode) {
      case 'academic':
        return makeMoreFormal(sentence);
      case 'creative':
        return makeMoreCreative(sentence);
      case 'casual':
        return makeMoreCasual(sentence);
      case 'standard':
      default:
        // Randomly choose a transformation for standard mode
        const transformations = [
          makeMoreFormal,
          makeMoreCreative,
          makeMoreCasual,
          reorderSentenceParts
        ];
        const transform = transformations[Math.floor(Math.random() * transformations.length)];
        return transform(sentence);
    }
  });
}

function makeMoreFormal(sentence: string): string {
  // Example transformation for formal style
  return sentence
    .replace(/(\w+)'re/g, '$1 are')
    .replace(/(\w+)'s/g, '$1 is')
    .replace(/(\w+)n't/g, '$1 not')
    .replace(/I think|I believe/g, 'It is evident that')
    .replace(/lots of|a lot of/g, 'numerous')
    .replace(/big/g, 'substantial')
    .replace(/good/g, 'beneficial')
    .replace(/bad/g, 'detrimental');
}

function makeMoreCreative(sentence: string): string {
  // Add more descriptive elements
  const words = sentence.split(' ');
  
  // Add an adjective before a random noun
  for (let i = 0; i < words.length; i++) {
    // Simple heuristic: words longer than 4 chars that don't end with 'ly' might be nouns
    if (words[i].length > 4 && !words[i].endsWith('ly') && Math.random() < 0.3) {
      const adjectives = [
        'vibrant', 'subtle', 'profound', 'intricate', 'mesmerizing',
        'delicate', 'striking', 'enigmatic', 'captivating', 'ethereal'
      ];
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      words.splice(i, 0, adjective);
      break;
    }
  }
  
  return words.join(' ');
}

function makeMoreCasual(sentence: string): string {
  // Example transformation for casual style
  return sentence
    .replace(/therefore|thus|consequently/g, 'so')
    .replace(/however|nevertheless/g, 'but')
    .replace(/additionally|furthermore/g, 'also')
    .replace(/utilize/g, 'use')
    .replace(/obtain/g, 'get')
    .replace(/purchase/g, 'buy')
    .replace(/regarding/g, 'about');
}

function reorderSentenceParts(sentence: string): string {
  // Simple sentence reordering for variety
  const words = sentence.split(' ');
  
  // Only reorder if sentence is long enough
  if (words.length < 6) return sentence;
  
  // Find a comma or natural break point
  const commaIndex = sentence.indexOf(',');
  
  if (commaIndex > 0) {
    // If there's a comma, we can swap the parts
    const firstPart = sentence.substring(0, commaIndex);
    const secondPart = sentence.substring(commaIndex + 1).trim();
    
    // Sometimes move the second part to the beginning
    if (secondPart.length > 10 && !secondPart.startsWith('which') && !secondPart.startsWith('that')) {
      return `${secondPart}, ${firstPart}.`;
    }
  }
  
  // If no good reordering found, return original
  return sentence;
}

function applyVocabularyDiversification(
  sentences: string[],
  vocabularyDiversity: number,
  mode: string
): string[] {
  // Replace common words with more diverse alternatives
  return sentences.map(sentence => {
    // Skip very short sentences
    if (sentence.split(' ').length < 4) return sentence;
    
    // Common word replacements
    const commonReplacements: Record<string, string[]> = {
      'very': ['extremely', 'incredibly', 'remarkably', 'exceptionally'],
      'good': ['excellent', 'outstanding', 'superb', 'wonderful'],
      'bad': ['poor', 'terrible', 'awful', 'subpar'],
      'big': ['large', 'substantial', 'enormous', 'massive'],
      'small': ['tiny', 'minute', 'compact', 'diminutive'],
      'important': ['crucial', 'essential', 'vital', 'significant'],
      'interesting': ['fascinating', 'intriguing', 'compelling', 'captivating'],
      'said': ['stated', 'mentioned', 'noted', 'remarked'],
      'show': ['demonstrate', 'illustrate', 'exhibit', 'display'],
      'think': ['believe', 'consider', 'contemplate', 'ponder']
    };
    
    // Mode-specific replacements
    const modeReplacements: Record<string, Record<string, string[]>> = {
      'academic': {
        'use': ['utilize', 'employ', 'implement', 'apply'],
        'make': ['construct', 'formulate', 'develop', 'establish'],
        'look at': ['examine', 'analyze', 'investigate', 'assess']
      },
      'creative': {
        'walk': ['stroll', 'saunter', 'amble', 'wander'],
        'see': ['glimpse', 'observe', 'witness', 'behold'],
        'hear': ['perceive', 'detect', 'discern', 'catch']
      },
      'casual': {
        'difficult': ['tough', 'hard', 'tricky', 'challenging'],
        'happy': ['glad', 'stoked', 'thrilled', 'pumped'],
        'sad': ['down', 'blue', 'bummed', 'upset']
      }
    };
    
    // Combine common replacements with mode-specific ones
    const replacements = {
      ...commonReplacements,
      ...(modeReplacements[mode] || {})
    };
    
    // Apply replacements based on vocabularyDiversity setting
    let modifiedSentence = sentence;
    Object.entries(replacements).forEach(([word, alternatives]) => {
      // Only replace if the word exists and based on diversity setting
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(modifiedSentence) && Math.random() < vocabularyDiversity) {
        const alternative = alternatives[Math.floor(Math.random() * alternatives.length)];
        modifiedSentence = modifiedSentence.replace(regex, alternative);
      }
    });
    
    return modifiedSentence;
  });
}

function addHumanElements(
  sentences: string[],
  perplexity: number,
  mode: string
): string[] {
  // Add human-like elements based on perplexity setting
  return sentences.map((sentence, index) => {
    // Skip very short sentences or first/last sentences
    if (sentence.split(' ').length < 5 || index === 0 || index === sentences.length - 1) {
      return sentence;
    }
    
    // Determine if we should add human elements based on perplexity
    const shouldAddElement = Math.random() < perplexity * 0.5;
    if (!shouldAddElement) return sentence;
    
    // Different human elements based on mode
    const humanElements: Record<string, string[]> = {
      'standard': [
        'I think', 'In my experience', 'Interestingly', 
        'Surprisingly', 'To be honest', 'Frankly speaking'
      ],
      'academic': [
        'It is worth noting that', 'Notably', 'Interestingly', 
        'Upon reflection', 'One might argue that', 'Arguably'
      ],
      'creative': [
        'Imagine that', 'Picture this', 'Curiously enough', 
        'Strangely', 'Like a dream', 'As if by magic'
      ],
      'casual': [
        'Honestly', 'Seriously though', 'Get this', 
        'No joke', 'Believe it or not', 'Crazy thing is'
      ]
    };
    
    const elements = humanElements[mode] || humanElements['standard'];
    const element = elements[Math.floor(Math.random() * elements.length)];
    
    // Add the human element at the beginning of the sentence
    return `${element}, ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
  });
}

function countDifferences(original: string[], modified: string[]): number {
  let count = 0;
  for (let i = 0; i < Math.min(original.length, modified.length); i++) {
    if (original[i] !== modified[i]) {
      count++;
    }
  }
  return count;
}

function countWordDifferences(original: string, modified: string): number {
  const originalWords = original.split(' ');
  const modifiedWords = modified.split(' ');
  
  // Count words that are in modified but not in original
  const uniqueWords = new Set(modifiedWords.filter(word => !originalWords.includes(word)));
  return uniqueWords.size;
}

function countAddedHumanElements(original: string[], modified: string[]): number {
  let count = 0;
  const humanElementPrefixes = [
    'I think', 'In my experience', 'Interestingly', 'Surprisingly', 
    'To be honest', 'Frankly speaking', 'It is worth noting that', 
    'Notably', 'Upon reflection', 'One might argue that', 'Arguably',
    'Imagine that', 'Picture this', 'Curiously enough', 'Strangely',
    'Honestly', 'Seriously though', 'Get this', 'No joke', 'Believe it or not'
  ];
  
  for (const sentence of modified) {
    for (const prefix of humanElementPrefixes) {
      if (sentence.includes(`${prefix},`)) {
        count++;
        break;
      }
    }
  }
  
  return count;
}

function calculatePerplexityScore(text: string): number {
  // In a real implementation, this would use a more sophisticated algorithm
  // For now, we'll use a simple heuristic based on word variety
  const words = text.split(' ');
  const uniqueWords = new Set(words);
  
  // Calculate ratio of unique words to total words
  const uniqueRatio = uniqueWords.size / words.length;
  
  // Scale to 0-1 range
  return Math.min(Math.max(uniqueRatio * 1.5, 0), 1);
}

function calculateBurstinessScore(sentences: string[]): number {
  // Calculate variance in sentence length
  const lengths = sentences.map(s => s.split(' ').length);
  const average = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  
  // Calculate variance
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - average, 2), 0) / lengths.length;
  
  // Normalize to 0-1 range (higher variance = higher burstiness)
  return Math.min(Math.max(variance / 20, 0), 1);
}

function calculateOverallHumanScore(
  perplexity: number,
  burstiness: number,
  vocabularyDiversity: number
): number {
  // Weighted average of the different scores
  const weights = {
    perplexity: 0.4,
    burstiness: 0.3,
    vocabularyDiversity: 0.3
  };
  
  const score = (
    perplexity * weights.perplexity +
    burstiness * weights.burstiness +
    vocabularyDiversity * weights.vocabularyDiversity
  );
  
  // Scale to 0-100 range
  return Math.round(score * 100);
}
