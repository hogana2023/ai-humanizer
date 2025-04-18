# AI Humanizer User Guide

## Introduction

AI Humanizer is a web application designed to transform AI-generated content into more human-like text that can bypass AI detection tools. This guide will help you understand how to use the application effectively.

## Getting Started

### Accessing the Application

The AI Humanizer web app can be accessed at:
- GitHub Repository: https://github.com/hogana2023/ai-humanizer
- Live Application: [Your deployed URL]

### System Requirements

The web application is compatible with:
- Modern web browsers (Chrome, Firefox, Safari, Edge)
- Both desktop and mobile devices

## Using the Application

### Main Interface

The AI Humanizer interface consists of three main sections:

1. **Input Section** - Where you paste your AI-generated text
2. **Settings Panel** - Where you customize the humanization process
3. **Output Section** - Where you receive the humanized text

### Step-by-Step Usage

1. **Input Your Text**
   - Paste your AI-generated text in the input area
   - The character counter will show how much of the 5,000 character limit you've used
   - You can use the "Try Sample" button to test the application with pre-generated text
   - Use "Clear" to reset the input field

2. **Configure Humanization Settings**
   - **Mode Selection**: Choose from four humanization modes:
     - **Standard**: Balanced approach suitable for most content
     - **Academic**: Formal style appropriate for essays and research papers
     - **Creative**: More expressive style for storytelling and creative writing
     - **Casual**: Conversational style for informal content

   - **Humanization Intensity**: Adjust the slider to control how aggressively the text is transformed
     - Lower intensity: Subtle changes that preserve more of the original text
     - Higher intensity: More significant transformations that may alter the text structure

   - **Advanced Settings** (optional): Click the "Advanced" button to access:
     - **Perplexity**: Controls word choice unpredictability
     - **Burstiness**: Adjusts sentence length variation
     - **Vocabulary Diversity**: Controls the variety of words used
     - **Sentence Variation**: Adjusts how sentence structures are modified
     - **Add Human Elements**: Toggle to add personal phrases and expressions
     - **Preserve Formatting**: Toggle to maintain original paragraph breaks and formatting

3. **Process Your Text**
   - Click the "Humanize Text" button to process your content
   - The application will apply various algorithms to transform your text
   - Processing time depends on text length and selected settings

4. **Review Results**
   - The humanized text appears in the output section
   - The AI Detection Score shows how human-like the text appears
   - You can click "View Comparison" to see a summary of changes made
   - Use "Copy" to copy the text to your clipboard
   - Use "Download" to save the text as a file

## Humanization Techniques

AI Humanizer employs several techniques to make AI-generated text appear more human:

1. **Sentence Structure Variation**
   - Varies sentence length and structure
   - Reorders sentence components
   - Adjusts sentence beginnings for more natural flow

2. **Vocabulary Diversification**
   - Replaces common AI-preferred words with alternatives
   - Introduces idioms and colloquialisms where appropriate
   - Enhances word choice variety

3. **Human Elements Addition**
   - Adds personal perspectives and opinions
   - Introduces emotional language
   - Includes rhetorical questions and conversational phrases

4. **Perplexity Enhancement**
   - Increases unpredictability in word choice
   - Makes text less statistically predictable
   - Reduces patterns that AI detectors look for

## Best Practices

For optimal results with AI Humanizer:

1. **Content Type Matching**
   - Use the appropriate mode for your content type
   - Academic mode for formal papers
   - Creative mode for stories and creative writing
   - Casual mode for blog posts and informal content

2. **Settings Optimization**
   - Start with medium intensity and adjust based on results
   - Use advanced settings for fine-tuning specific aspects
   - Check results with "View Comparison" to understand changes

3. **Post-Processing**
   - Review the humanized text for any awkward phrasing
   - Make minor manual edits if necessary
   - Verify that the meaning of your original text is preserved

4. **Testing**
   - For critical content, test the humanized text with multiple AI detectors
   - Make adjustments to settings based on detection results

## Troubleshooting

### Common Issues

1. **Text Not Being Humanized Effectively**
   - Try increasing the humanization intensity
   - Use advanced settings to target specific aspects
   - Try a different humanization mode

2. **Meaning Changes**
   - Lower the intensity setting
   - Disable certain advanced features like sentence variation
   - Review and edit the output manually

3. **Browser Performance Issues**
   - Try processing smaller chunks of text
   - Close other browser tabs and applications
   - Use a desktop browser for large documents

## API Documentation

For developers who want to integrate AI Humanizer into their applications, the following API endpoints are available:

### Humanize Text

**Endpoint:** `/api/humanize`
**Method:** POST
**Content-Type:** application/json

**Request Body:**
```json
{
  "text": "AI-generated text to humanize",
  "mode": "standard",
  "intensity": 0.7,
  "settings": {
    "perplexity": 0.6,
    "burstiness": 0.8,
    "vocabularyDiversity": 0.7,
    "sentenceVariation": 0.6,
    "addHumanElements": true,
    "preserveFormatting": true
  }
}
```

**cURL Example:**
```bash
curl -X POST https://your-domain.com/api/humanize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "AI-generated text to humanize",
    "mode": "standard",
    "intensity": 0.7,
    "settings": {
      "perplexity": 0.6,
      "burstiness": 0.8,
      "vocabularyDiversity": 0.7,
      "sentenceVariation": 0.6,
      "addHumanElements": true,
      "preserveFormatting": true
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "humanizedText": "Transformed human-like text",
  "stats": {
    "originalLength": 123,
    "humanizedLength": 128,
    "processingTime": "0.5s",
    "detectionScores": {
      "perplexity": 0.8,
      "burstiness": 0.7,
      "overallHumanScore": 0.85
    },
    "changes": {
      "sentencesRestructured": 5,
      "vocabularyEnhanced": 12,
      "humanElementsAdded": 3
    }
  }
}
```

### Check AI Detection

**Endpoint:** `/api/detect`
**Method:** POST
**Content-Type:** application/json

**Request Body:**
```json
{
  "text": "Text to check for AI detection"
}
```

**cURL Example:**
```bash
curl -X POST https://your-domain.com/api/detect \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Text to check for AI detection"
  }'
```

**Response:**
```json
{
  "success": true,
  "isAIGenerated": true,
  "confidence": 0.85,
  "scores": {
    "perplexity": 0.3,
    "burstiness": 0.4,
    "overallHumanScore": 0.15
  },
  "analysis": {
    "sentenceStructure": "Low variation detected",
    "vocabularyDiversity": "Limited word choice variety",
    "commonPatterns": ["Repetitive transitions", "Predictable phrasing"]
  }
}
```

### Get Sample Text

**Endpoint:** `/api/samples`
**Method:** GET
**Parameters:** 
- `type` (string): Type of sample text (academic, creative, technical, article)
- `length` (string): Length of sample text (short, medium, long)

**cURL Example:**
```bash
curl "https://your-domain.com/api/samples?type=academic&length=short"
```

**Response:**
```json
{
  "success": true,
  "sampleText": "Sample AI-generated text based on requested type and length",
  "metadata": {
    "type": "academic",
    "length": "short",
    "wordCount": 150
  }
}
```

## Privacy and Terms

- AI Humanizer does not store your text content
- All processing is done in your browser or on secure servers
- No data is shared with third parties
- The application is provided "as is" without warranties

## Support and Feedback

For support or to provide feedback:
- Create an issue on GitHub: https://github.com/hogana2023/ai-humanizer/issues
- Contact the developer directly at [contact information]

Thank you for using AI Humanizer!
