import { NextResponse } from 'next/server';

// Simple response templates for common queries
const responseTemplates = {
  default: "I can help you find sunny spots and provide information about sun conditions. What would you like to know?",
  sunnySpots: "Based on your location, here are some sunny spots you might enjoy: parks, beaches, and outdoor cafes are great options during sunny hours.",
  bestTime: "The best time for outdoor activities is typically between 10 AM and 4 PM when the sun is at its strongest.",
  indoorLight: "For indoor spaces with good natural light, look for places with large windows facing south or west.",
  compareNeighborhoods: "Different neighborhoods have varying sun exposure based on building heights and orientation. Would you like specific recommendations for your area?"
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    // Simple keyword matching for responses
    let response = responseTemplates.default;
    
    if (lastMessage.includes('sunny') || lastMessage.includes('spots')) {
      response = responseTemplates.sunnySpots;
    } else if (lastMessage.includes('time') || lastMessage.includes('when')) {
      response = responseTemplates.bestTime;
    } else if (lastMessage.includes('indoor') || lastMessage.includes('inside')) {
      response = responseTemplates.indoorLight;
    } else if (lastMessage.includes('compare') || lastMessage.includes('neighborhood')) {
      response = responseTemplates.compareNeighborhoods;
    }

    return NextResponse.json({ 
      message: {
        role: "assistant",
        content: response
      },
      status: 200 
    });
    
  } catch (error: any) {
    console.error('Error in chat route:', error);
    
    return NextResponse.json({ 
      error: 'An error occurred while processing your request. Please try again.',
      status: 500
    });
  }
} 