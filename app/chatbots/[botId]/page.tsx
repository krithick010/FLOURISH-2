"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Send, Mic, MicOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import Sidebar from "@/components/sidebar"

// Browser compatibility for Speech Recognition
interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionResultItem;
  length: number;
  isFinal?: boolean;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
}

// Global definition for browser compatibility
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// Bot personalities and info
const botProfiles = {
  cookie: {
    name: "Cookie",
    avatar: "/images/chatbots/cookie-avatar.svg",
    greeting: "Hi there! I'm Cookie. I'm here to listen and support you. How are you feeling today?",
    personality: "warm, empathetic, and supportive",
    color: "bg-gradient-to-br from-amber-300 to-amber-500",
    voice: {
      // Voice settings for Cookie - warm, feminine voice
      preferredVoice: "female",
      pitch: 1.1,
      rate: 0.9,
      volume: 0.9
    }
  },
  sage: {
    name: "Sage",
    avatar: "/images/chatbots/sage-avatar.svg",
    greeting: "Hello, I'm Sage. I can offer you evidence-based wellness advice and practical strategies. What would you like help with today?",
    personality: "knowledgeable, practical, and informative",
    color: "bg-gradient-to-br from-emerald-300 to-emerald-600",
    voice: {
      // Voice settings for Sage - authoritative, mature voice
      preferredVoice: "male",
      pitch: 0.9,
      rate: 0.95,
      volume: 1.0
    }
  },
  nova: {
    name: "Nova",
    avatar: "/images/chatbots/nova-avatar.svg",
    greeting: "Hey! I'm Nova! I'm here to help you find your motivation and set goals. What are you working toward?",
    personality: "energetic, motivating, and positive",
    color: "bg-gradient-to-br from-violet-300 to-purple-600",
    voice: {
      // Voice settings for Nova - energetic, upbeat voice
      preferredVoice: "female",
      pitch: 1.2,
      rate: 1.1,
      volume: 1.0
    }
  },
  zen: {
    name: "Zen",
    avatar: "/images/chatbots/zen-avatar.svg",
    greeting: "Welcome. I'm Zen. I'm here to help you find inner peace and mindfulness. Let's take a breath together. How can I guide you today?",
    personality: "calm, peaceful, and mindful",
    color: "bg-gradient-to-br from-blue-300 to-sky-500",
    voice: {
      // Voice settings for Zen - calm, soothing voice
      preferredVoice: "male",
      pitch: 0.8,
      rate: 0.8,
      volume: 0.8
    }
  }
}

// Message type
type Message = {
  sender: "user" | "bot"
  text: string
  timestamp: Date
  isPlaying?: boolean
}

export default function ChatbotPage() {
  const params = useParams()
  const router = useRouter()
  const botId = params.botId as string
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false)
  const [voiceRate, setVoiceRate] = useState(1)
  const [voicePitch, setVoicePitch] = useState(1)
  const [isListening, setIsListening] = useState(false)
  const [autoSendVoice, setAutoSendVoice] = useState(false)
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const speechSynthesis = typeof window !== 'undefined' ? window.speechSynthesis : null
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null)

  // Validate bot ID
  useEffect(() => {
    if (!botProfiles[botId as keyof typeof botProfiles]) {
      router.push("/chatbots")
      return
    }

    // Add greeting message
    setMessages([
      {
        sender: "bot",
        text: botProfiles[botId as keyof typeof botProfiles].greeting,
        timestamp: new Date()
      }
    ])
  }, [botId, router])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize and load speech synthesis voices
  useEffect(() => {
    if (speechSynthesis) {
      // Force voice loading
      speechSynthesis.getVoices()
      
      // Some browsers (like Chrome) load voices asynchronously
      speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices()
      }
    }
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognition) {
        setIsSpeechRecognitionSupported(true)
        
        try {
          const recognition = new SpeechRecognition()
          recognition.continuous = false
          recognition.interimResults = false
          recognition.lang = navigator.language || 'en-US'
          
          // Handle recognized speech
          recognition.onresult = (event: SpeechRecognitionEvent) => {
            if (event.results && event.results.length > 0) {
              const transcript = event.results[event.resultIndex][0].transcript
              
              if (autoSendVoice && transcript.trim()) {
                setInput(transcript.trim())
                setTimeout(() => {
                  handleSendMessage(transcript.trim())
                }, 300)
              } else {
                setInput(prev => (prev + ' ' + transcript).trim())
              }
            }
            setIsListening(false)
          }
          
          // Handle errors
          recognition.onerror = (event: Event) => {
            console.error('Speech recognition error:', event)
            setIsListening(false)
            // @ts-ignore - SpeechRecognitionErrorEvent is not defined in TypeScript
            const errorMessage = event.error ? `Microphone error: ${event.error}` : 'Microphone error occurred'
            setSpeechError(errorMessage)
          }
          
          // Handle recognition ending
          recognition.onend = () => {
            setIsListening(false)
          }
          
          speechRecognitionRef.current = recognition
        } catch (error) {
          console.error('Error initializing speech recognition:', error)
          setIsSpeechRecognitionSupported(false)
        }
      }
    }
    
    // Cleanup
    return () => {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.abort()
        } catch (error) {
          console.error('Error cleaning up speech recognition:', error)
        }
      }
    }
  }, [autoSendVoice])

  // Add keyboard shortcut for toggling speech recognition
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Alt+M to toggle microphone
      if (event.altKey && event.key === 'm') {
        toggleListening()
        event.preventDefault()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isListening])

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesis && speechUtteranceRef.current) {
        speechSynthesis.cancel()
      }
    }
  }, [])

  // Function to speak text
  const speakText = (text: string, messageIndex: number) => {
    if (!speechSynthesis) return

    // Cancel any ongoing speech
    speechSynthesis.cancel()

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text)
    speechUtteranceRef.current = utterance

    // Set voice parameters based on bot personality
    utterance.rate = bot.voice.rate * voiceRate
    utterance.pitch = bot.voice.pitch * voicePitch
    utterance.volume = bot.voice.volume

    // Try to find a voice that matches the bot's preferred gender
    const voices = speechSynthesis.getVoices()
    const preferredLang = navigator.language || 'en-US'
    
    if (voices.length > 0) {
      // Try to find a voice that matches both language and gender
      const matchingVoice = voices.find(voice => 
        voice.lang.includes(preferredLang.split('-')[0]) && 
        voice.name.toLowerCase().includes(bot.voice.preferredVoice)
      )
      
      // If no exact match, try to find a voice that just matches the gender
      const genderMatch = !matchingVoice ? voices.find(voice => 
        voice.name.toLowerCase().includes(bot.voice.preferredVoice)
      ) : null
      
      // If still no match, use any available voice in the preferred language
      const langMatch = (!matchingVoice && !genderMatch) ? voices.find(voice => 
        voice.lang.includes(preferredLang.split('-')[0])
      ) : null
      
      // Set the voice, with fallbacks
      utterance.voice = matchingVoice || genderMatch || langMatch || voices[0]
    }

    // Mark message as playing
    setMessages(prevMessages => 
      prevMessages.map((msg, idx) => 
        idx === messageIndex ? {...msg, isPlaying: true} : {...msg, isPlaying: false}
      )
    )

    // Handle speech end
    utterance.onend = () => {
      setMessages(prevMessages => 
        prevMessages.map((msg, idx) => 
          idx === messageIndex ? {...msg, isPlaying: false} : msg
        )
      )
    }

    // Small delay helps ensure speech synthesis is ready
    setTimeout(() => {
      // Start speaking
      speechSynthesis.speak(utterance)
    }, 50)
  }

  // Function to stop speaking
  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      setMessages(prevMessages => 
        prevMessages.map(msg => ({...msg, isPlaying: false}))
      )
    }
  }

  // Function to toggle speech recognition
  const toggleListening = () => {
    // Clear any previous error messages
    setSpeechError(null)
    
    if (!speechRecognitionRef.current || !isSpeechRecognitionSupported) {
      setSpeechError('Speech recognition is not supported in your browser')
      console.warn('Speech recognition not supported or not initialized')
      return
    }
    
    if (isListening) {
      try {
        speechRecognitionRef.current.stop()
      } catch (error) {
        console.error('Error stopping speech recognition:', error)
        setSpeechError('Error stopping speech recognition')
      } finally {
        setIsListening(false)
      }
    } else {
      // Stop any ongoing speech when starting to listen
      stopSpeaking()
      
      try {
        // Some browsers need a small delay between stopping and starting recognition
        setTimeout(() => {
          try {
            speechRecognitionRef.current?.start()
            setIsListening(true)
          } catch (error) {
            console.error('Error starting speech recognition:', error)
            setIsListening(false)
            setSpeechError('Could not start microphone. Please check browser permissions.')
            
            // If start failed, try to recreate the speech recognition object
            reinitializeSpeechRecognition()
          }
        }, 100)
      } catch (error) {
        console.error('Error in speech recognition toggle:', error)
        setIsListening(false)
        setSpeechError('Failed to access microphone')
      }
    }
  }
  
  // Function to reinitialize speech recognition if it fails
  const reinitializeSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition()
          recognition.continuous = false
          recognition.interimResults = false
          recognition.lang = navigator.language || 'en-US'
          
          recognition.onresult = (event: SpeechRecognitionEvent) => {
            if (event.results && event.results.length > 0) {
              const transcript = event.results[event.resultIndex][0].transcript
              
              if (autoSendVoice && transcript.trim()) {
                setInput(transcript.trim())
                setTimeout(() => {
                  handleSendMessage(transcript.trim())
                }, 300)
              } else {
                setInput(prev => (prev + ' ' + transcript).trim())
              }
            }
            setIsListening(false)
          }
          
          recognition.onerror = (event: Event) => {
            console.error('Speech recognition error:', event)
            setIsListening(false)
          }
          
          recognition.onend = () => {
            setIsListening(false)
          }
          
          speechRecognitionRef.current = recognition
        } catch (error) {
          console.error('Error reinitializing speech recognition:', error)
          setIsSpeechRecognitionSupported(false)
        }
      }
    }
  }

  const bot = botProfiles[botId as keyof typeof botProfiles]
  
  if (!bot) {
    return null // This should never happen because of the redirect in useEffect
  }

  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return

    // Add user message
    const userMessage: Message = {
      sender: "user",
      text: messageToSend,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")

    // Stop any ongoing speech when sending a new message
    stopSpeaking()

    try {
      // Send message to our API route
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          botId: botId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the API');
      }

      const data = await response.json();
      
      const botReplyMessage: Message = {
        sender: "bot",
        text: data.response,
        timestamp: new Date(),
        isPlaying: false
      }
      
      setMessages(prev => [...prev, botReplyMessage]);
      
      // Automatically speak the bot's message if speech is enabled
      if (isSpeechEnabled) {
        // Add small delay to ensure DOM update before speaking
        setTimeout(() => {
          speakText(data.response, messages.length + 1) // +1 for the new message
        }, 100)
      }
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Fallback response if API call fails
      const fallbackResponse: Message = {
        sender: "bot",
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        isPlaying: false
      }
      
      setMessages(prev => [...prev, fallbackResponse]);
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="border-b border-stone-200 py-3 px-4 bg-white">
          <div className="flex items-center gap-4">
            <Link href="/chatbots">
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full overflow-hidden relative`}>
                <Image 
                  src={bot.avatar} 
                  alt={`${bot.name} avatar`} 
                  width={40} 
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium text-stone-800">{bot.name}</h2>
                <p className="text-xs text-stone-500">{bot.personality}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-50">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 self-end mb-1">
                    <Image
                      src={bot.avatar}
                      alt={`${bot.name} avatar`}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-none'
                      : `${bot.color} text-white rounded-tl-none`
                  }`}
                >
                  <p>{message.text}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    
                    {/* Speech controls for bot messages */}
                    {message.sender === 'bot' && (
                      <button 
                        onClick={() => message.isPlaying 
                          ? stopSpeaking() 
                          : speakText(message.text, index)
                        }
                        className="ml-2 text-white opacity-70 hover:opacity-100 transition-opacity"
                        title={message.isPlaying ? "Stop speaking" : "Play message"}
                      >
                        {message.isPlaying ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-stone-200 p-4 bg-white">
          <div className="max-w-2xl mx-auto">
            {/* Speech settings */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                  className={`flex items-center space-x-1 text-sm px-2 py-1 rounded-full transition-colors ${
                    isSpeechEnabled 
                      ? `${bot.color.replace('bg-gradient-to-br', 'bg')} text-white` 
                      : 'bg-stone-200 text-stone-700'
                  }`}
                  title={isSpeechEnabled ? "Disable speech" : "Enable speech"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                  <span>{isSpeechEnabled ? 'Speech On' : 'Speech Off'}</span>
                </button>
                
                {/* Microphone status indicator */}
                {isListening && (
                  <div className="flex items-center space-x-1 text-sm px-2 py-1 rounded-full bg-red-100 text-red-600 animate-pulse">
                    <Mic size={16} />
                    <span>Listening...</span>
                  </div>
                )}
                
                {/* Speech error indicator */}
                {speechError && (
                  <div className="flex items-center space-x-1 text-sm px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                    <AlertCircle size={16} />
                    <span className="truncate max-w-[200px]">{speechError}</span>
                    <button 
                      onClick={() => setSpeechError(null)} 
                      className="ml-1 text-amber-700 hover:text-amber-900"
                      title="Dismiss error"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Voice controls - only show when speech is enabled */}
              {isSpeechEnabled && (
                <div className="flex items-center space-x-3 text-sm text-stone-700">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">Speed:</span>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voiceRate}
                      onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                      className="w-20 h-2 accent-teal-600"
                      title={`Speech rate: ${voiceRate.toFixed(1)}x`}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">Pitch:</span>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voicePitch}
                      onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                      className="w-20 h-2 accent-teal-600"
                      title={`Speech pitch: ${voicePitch.toFixed(1)}x`}
                    />
                  </div>
                </div>
              )}
              
              {/* Auto-send toggle - only show if speech recognition is supported */}
              {isSpeechRecognitionSupported && (
                <div className="flex items-center">
                  <button
                    onClick={() => setAutoSendVoice(!autoSendVoice)}
                    className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full transition-colors ${
                      autoSendVoice 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-stone-100 text-stone-500'
                    }`}
                    title={autoSendVoice ? "Disable auto-send" : "Enable auto-send"}
                  >
                    <Mic size={12} className="mr-1" />
                    <span>Auto-send {autoSendVoice ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Message input */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder={`${isListening ? 'Listening...' : speechError ? 'Microphone error detected' : `Message ${bot.name}...`}`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                  className={`rounded-full bg-stone-100 border-stone-200 ${isSpeechRecognitionSupported ? 'pr-10' : ''} ${
                    speechError ? 'border-amber-300' : ''
                  }`}
                />
                {isSpeechRecognitionSupported && (
                  <Button
                    onClick={toggleListening}
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 p-1.5 
                      ${isListening 
                        ? 'text-red-500 animate-pulse shadow-sm shadow-red-200' 
                        : speechError
                          ? 'text-amber-500 hover:text-amber-700'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    title={isListening ? "Stop listening" : speechError ? "Retry microphone (Alt+M)" : "Start voice input (Alt+M)"}
                  >
                    {isListening ? (
                      <div className="relative">
                        <MicOff className="h-full w-full" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                      </div>
                    ) : speechError ? (
                      <div className="relative">
                        <Mic className="h-full w-full" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                      </div>
                    ) : (
                      <Mic className="h-full w-full" />
                    )}
                  </Button>
                )}
              </div>
              <Button 
                onClick={() => handleSendMessage()}
                size="icon"
                className={`rounded-full ${bot.color} text-white`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}