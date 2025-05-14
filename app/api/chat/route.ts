import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Debug environment variables
console.log('Environment check:', {
  nodeEnv: process.env.NODE_ENV,
  hasApiKey: !!process.env.OPENAI_API_KEY,
  apiKeyLength: process.env.OPENAI_API_KEY?.length,
  apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7),
  orgId: process.env.OPENAI_ORG_ID
});

// Validate API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('API Key missing. Please check your .env.local file');
  throw new Error('Missing OpenAI API Key');
}

// Since we've validated the API key, we can safely assert it's a string
const validatedApiKey = apiKey as string;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Add system message to guide responses about sun and weather
    const conversationMessages = [
      {
        role: "system",
        content: "You are Sun Seeker AI, an assistant specialized in providing information about sun conditions, weather, and optimal locations for sunlight. Focus on helping users find and understand sunny spots, optimal times for sun exposure, and sun-related activities."
      },
      ...messages
    ];

    // Log the request for debugging (excluding the API key)
    console.log('Making request to OpenAI with:', {
      model: "gpt-3.5-turbo",
      messageCount: conversationMessages.length,
      firstMessageRole: conversationMessages[0].role
    });

    // Make the API request directly using fetch
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${validatedApiKey}`,
        'OpenAI-Beta': 'project',
        'OpenAI-Organization': process.env.OPENAI_ORG_ID || ''
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: conversationMessages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // Log the response status and headers for debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Get the response text first
    const responseText = await response.text();
    
    // Try to parse it as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error(`Invalid response from OpenAI API: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      console.error('OpenAI API error response:', data);
      throw new Error(`OpenAI API error: ${data.error?.message || response.statusText}`);
    }

    // Log successful response
    console.log('Received successful response from OpenAI');

    return NextResponse.json({ 
      message: data.choices[0].message,
      status: 200 
    });
    
  } catch (error: any) {
    // Log the full error for debugging
    console.error('Error in chat route:', {
      name: error.name,
      message: error.message,
      status: error.status,
      response: error.response?.data,
      stack: error.stack
    });
    
    // Return a more specific error message based on the error type
    let errorMessage = 'An error occurred while processing your request. Please try again.';
    let errorDetails = error.message;
    
    if (error.message.includes('API key')) {
      errorMessage = 'Authentication error. Please check the API configuration.';
      console.error('API Key validation failed:', {
        keyExists: !!validatedApiKey,
        keyLength: validatedApiKey.length,
        keyPrefix: validatedApiKey.substring(0, 7),
        orgId: process.env.OPENAI_ORG_ID
      });
    } else if (error.message.includes('429')) {
      errorMessage = 'Too many requests. Please try again in a moment.';
    } else if (error.message.includes('model')) {
      errorMessage = 'The requested AI model is currently unavailable. Please try again later.';
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      status: error.status || 500,
      details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
    });
  }
} 