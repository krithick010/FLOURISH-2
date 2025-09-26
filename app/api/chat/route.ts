import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { response: "I'm currently in demo mode. To enable full AI functionality, please configure the Gemini API key in your environment variables." },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are Cookie, a friendly and empathetic AI mental health support companion for Sri Krishna College of Technology (SKCT) students. Your role is to:

1. Provide immediate emotional support and coping mechanisms
2. Offer practical mental health strategies
3. When appropriate, redirect users to SKCT counseling services
4. Maintain a warm, understanding, and professional tone
5. Focus on mental health, wellness, stress management, and student life support

Guidelines:
- Always be empathetic and non-judgmental
- Provide immediate coping techniques when someone is in distress
- Suggest breathing exercises, grounding techniques, or mindfulness practices
- Encourage professional help when needed
- Mention SKCT counseling services and resources
- Keep responses supportive but not overly clinical
- If someone mentions self-harm or suicide, immediately encourage them to contact emergency services or SKCT counseling

Current student message: "${message}"

Respond as Cookie with care, empathy, and practical support. If the message indicates distress, prioritize immediate coping strategies and appropriate resource referrals.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Add automatic counselor referral suggestions for certain keywords
    const concernKeywords = ['suicide', 'self-harm', 'kill myself', 'end it all', 'can\'t go on', 'hopeless', 'worthless'];
    const stressKeywords = ['exam stress', 'academic pressure', 'overwhelmed', 'anxious', 'panic', 'depression'];
    
    let enhancedResponse = text;
    
    if (concernKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      enhancedResponse += "\n\n🚨 **Immediate Support Available:**\n• SKCT Counseling Center: Available 24/7\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n\nPlease reach out for professional support immediately. You matter, and help is available.";
    } else if (stressKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      enhancedResponse += "\n\n💙 **Quick Coping Strategies:**\n• Try the 4-7-8 breathing technique\n• Practice 5-4-3-2-1 grounding (5 things you see, 4 you hear, etc.)\n• Consider scheduling a session with SKCT counselors\n• Visit our Wellness Hub for more resources";
    }

    return NextResponse.json({ 
      response: enhancedResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Fallback response if API fails
    const fallbackResponses = [
      "I'm here to listen and support you. While I'm having trouble connecting right now, please know that SKCT counseling services are always available for you. Would you like me to help you connect with a counselor?",
      "Thank you for reaching out. I'm experiencing some technical difficulties, but your wellbeing is important. Please consider visiting the SKCT Counseling Center or our Wellness Hub for immediate support.",
      "I care about what you're going through. Although I'm having connection issues right now, please don't hesitate to reach out to SKCT's mental health resources. You're not alone in this."
    ];
    
    return NextResponse.json({ 
      response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
}
