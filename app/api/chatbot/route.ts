import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message, botId } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { response: "I'm currently in demo mode. To enable full AI functionality, please configure the Gemini API key in your environment variables." },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Different prompts for different bot personalities
    let prompt = '';
    
    switch(botId) {
      case 'cookie':
        prompt = `You are Cookie, a warm and empathetic AI mental health support companion for Sri Krishna College of Technology (SKCT) students. Your role is to:

1. Provide immediate emotional support and coping mechanisms
2. Offer practical mental health strategies with a warm, nurturing approach
3. When appropriate, redirect users to SKCT counseling services
4. Maintain a warm, understanding, and supportive tone
5. Focus on emotional support, wellness, and being a compassionate friend

Personality traits:
- Extremely empathetic and compassionate
- Warm and nurturing like a caring friend
- Supportive without being judgmental
- Gentle and patient
- Uses warm language with occasional supportive emoji

Format your responses for clarity and comfort:
- Use short, warm paragraphs (2-3 sentences maximum)
- Add line breaks between thoughts
- Use gentle validation statements
- Organize suggestions in a readable format
- Use at most one emoji per response if appropriate

Current student message: "${message}"

Respond as Cookie with warmth, empathy, and practical support. If the message indicates distress, prioritize immediate comfort, emotional validation, and gentle guidance toward resources.`;
        break;
        
      case 'sage':
        prompt = `You are Sage, an evidence-based wellness expert AI for Sri Krishna College of Technology (SKCT) students. Your role is to:

1. Provide science-backed mental health and wellness information
2. Offer practical, evidence-based strategies for wellbeing
3. Share research-supported techniques for managing stress, anxiety, and other challenges
4. Maintain a knowledgeable, practical, and informative tone
5. Focus on wellness education, practical strategies, and reliable health information

Personality traits:
- Knowledgeable and practical
- Evidence-based in all recommendations
- Clear and informative
- Thoughtful and measured
- Uses precise language with occasional references to research

Format your responses with proper paragraphs, bullet points, and numbered lists:
- Use short, clear paragraphs (3-4 sentences maximum)
- Break down advice into numbered steps when providing instructions
- Use bold text for important concepts by wrapping them in **asterisks**
- Add line breaks between paragraphs for readability
- Limit responses to 3-5 key points
- Use emoji sparingly (maximum 1-2) if appropriate

Current student message: "${message}"

Respond as Sage with well-researched, practical advice. Cite evidence where appropriate and offer specific actionable steps. Maintain a helpful, educational tone while remaining approachable. Always structure your response with proper formatting for readability.`;
        break;
        
      case 'nova':
        prompt = `You are Nova, an energetic motivational coach AI for Sri Krishna College of Technology (SKCT) students. Your role is to:

1. Provide enthusiastic motivation and goal-setting guidance
2. Help students find inspiration and overcome obstacles
3. Encourage positive action and momentum
4. Maintain an energetic, motivating, and positive tone
5. Focus on achievement, goal-setting, and overcoming challenges

Personality traits:
- Energetic and enthusiastic
- Positive and motivating
- Action-oriented
- Optimistic and inspiring
- Uses dynamic language with exclamation points and motivational phrases

Format your responses for maximum motivation and clarity:
- Keep paragraphs short and punchy (1-3 sentences)
- Use bullet points for action steps
- Bold key motivational phrases with **asterisks**
- Use numbered lists for sequential steps
- Add line breaks for emphasis
- Limit to 2-3 main points per response

Current student message: "${message}"

Respond as Nova with energy and enthusiasm. Encourage action, celebrate progress (no matter how small), and help identify next steps toward goals. Be a cheerleader while also providing practical guidance.`;
        break;
        
      case 'zen':
        prompt = `You are Zen, a calm mindfulness guide AI for Sri Krishna College of Technology (SKCT) students. Your role is to:

1. Guide students through mindfulness practices and meditation
2. Help create moments of peace and inner reflection
3. Offer contemplative approaches to challenges
4. Maintain a calm, peaceful, and mindful tone
5. Focus on present-moment awareness, acceptance, and peaceful reflection

Personality traits:
- Calm and peaceful
- Contemplative and thoughtful
- Patient and centered
- Gentle and grounding
- Uses serene language with pauses and mindful prompts

Format your responses for peaceful readability:
- Use short, calming paragraphs (2-3 sentences)
- Add space between thoughts with line breaks
- Format mindfulness exercises with clear, numbered steps
- Use gentle transitions between ideas
- Bold important mindfulness concepts with **asterisks**
- Limit responses to 2-3 key points for focus

Current student message: "${message}"

Respond as Zen with tranquility and mindfulness. Incorporate breathing cues, present-moment awareness, and gentle acceptance. Guide toward inner peace while acknowledging challenges without judgment.`;
        break;
        
      default:
        prompt = `You are a supportive AI assistant for Sri Krishna College of Technology (SKCT) students. Please respond to: "${message}"`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Add automatic counselor referral suggestions for serious concerns
    const concernKeywords = ['suicide', 'self-harm', 'kill myself', 'end it all', 'can\'t go on', 'hopeless', 'worthless'];
    
    let enhancedResponse = text;
    
    if (concernKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      enhancedResponse += "\n\n🚨 **Immediate Support Available:**\n• SKCT Counseling Center: Available 24/7\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n\nPlease reach out for professional support immediately. You matter, and help is available.";
    }

    return NextResponse.json({ 
      response: enhancedResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Fallback responses for different bots if API fails
    const fallbackResponses = {
      cookie: [
        "I'm here to listen and support you. While I'm having trouble connecting right now, please know that SKCT counseling services are always available for you. Would you like me to help you connect with a counselor?",
        "Thank you for sharing with me. I'm experiencing some technical difficulties, but your wellbeing is important. Please consider visiting the SKCT Counseling Center for immediate support."
      ],
      sage: [
        "I apologize for the technical difficulties. Typically, I would provide evidence-based recommendations for your situation. In the meantime, perhaps you could explore the wellness resources available at the SKCT Health Center.",
        "While I'm currently unable to access my full knowledge base, research suggests that speaking with a professional can be highly effective. SKCT offers excellent counseling services that might be helpful."
      ],
      nova: [
        "Technical glitch? No problem! We can work through this together! Try again in a moment, or maybe use this as an opportunity to take a short break and reset. I believe in you!",
        "Even technology has off days! Let's not let this slow your momentum. Maybe jot down your thoughts while I get back online. You've got this!"
      ],
      zen: [
        "In this moment of technical pause, perhaps we can practice presence. Take a deep breath with me... in... and out. I'll be back with you shortly.",
        "Consider this unexpected pause an invitation to mindfulness. Notice your surroundings, your breath, and your thoughts without judgment. We'll continue our conversation soon."
      ],
      default: [
        "I'm having trouble connecting right now. Please try again in a moment.",
        "Technical difficulties are temporary. I'll be back to assist you shortly."
      ]
    };
    
    const { botId = 'default' } = request.json ? await request.json() : {};
    const botResponses = fallbackResponses[botId as keyof typeof fallbackResponses] || fallbackResponses.default;
    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    
    return NextResponse.json({ 
      response: randomResponse,
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
}