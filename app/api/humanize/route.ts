import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

interface HumanizationRequest {
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: HumanizationRequest = await request.json();
    const { text } = data;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { success: false, error: 'No text provided for humanization.' },
        { status: 400 }
      );
    }

    // Step 1: Rewrite the text with an LLM to sound human
    const openai = new OpenAI({ apiKey: process.env.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 });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a human writer. Rewrite the following text so that it reads like a natural, conversational human wrote it, while preserving its meaning.',
        },
        { role: 'user', content: text },
      ],
    });

    const humanizedText =
      completion.choices?.[0]?.message?.content.trim() || '';

    // Step 2: Run the real detector on the rewritten text
    const baseUrl = new URL(request.url).origin;
    const detectRes = await fetch(`${baseUrl}/api/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: humanizedText }),
    });

    if (!detectRes.ok) {
      throw new Error(
        `Detection request failed: ${detectRes.status} ${detectRes.statusText}`
      );
    }

    const detectData = await detectRes.json();

    return NextResponse.json({
      success: true,
      humanizedText,
      stats: {
        detectionScores: detectData.scores,
        overallHumanScore: detectData.confidence,
      },
    });
  } catch (err: any) {
    console.error('Error in humanization route:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
