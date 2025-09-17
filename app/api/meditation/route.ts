import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { mood, meditationType, duration } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `Create a personalized ${duration}-minute guided meditation script for a college student at SKCT who is feeling ${mood} and wants ${meditationType} meditation.

    Requirements:
    - Write in a calm, soothing, and professional tone
    - Include specific breathing instructions
    - Add pauses indicated by [PAUSE 3s], [PAUSE 5s], etc.
    - Make it relevant to college student life and stress
    - Include body scan or visualization techniques
    - End with positive affirmations
    - Make it exactly ${duration} minutes when read at normal speaking pace
    - Use simple, clear language that's easy to follow
    - Include specific instructions for posture and environment setup

    Structure:
    1. Welcome and settling in (1-2 minutes)
    2. Breathing foundation (2-3 minutes) 
    3. Main meditation technique (4-6 minutes)
    4. Closing and integration (1-2 minutes)

    Format the response as a meditation script that can be read aloud naturally. Do not include any markdown formatting, just plain text with pause indicators.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const meditationScript = response.text()

    return NextResponse.json({ 
      script: meditationScript,
      mood,
      meditationType,
      duration 
    })

  } catch (error) {
    console.error('Error generating meditation:', error)
    return NextResponse.json(
      { error: 'Failed to generate meditation script' },
      { status: 500 }
    )
  }
}
