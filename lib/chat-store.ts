import { create } from "zustand"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface ChatStore {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
  suggestedPrompts: string[]
}

// Mock responses for different prompts
const mockResponses: Record<string, string> = {
  "Find sunny spots": [
    "Here are some great sunny spots near you:",
    "1. Rooftop Garden (☀️92) - Perfect for morning sun",
    "2. Beachfront Deck (☀️95) - Best for sunset views",
    "3. Mountain View Terrace (☀️93) - All-day sunshine"
  ].join("\n"),
  "Best time for photos": [
    "The best times for photography are:",
    "• Golden Hour: 4:00 PM - 5:30 PM",
    "• Blue Hour: 6:00 PM - 6:30 PM",
    "• Sunrise: 6:45 AM - 7:15 AM",
    "Recommended spots:",
    "1. Beachfront Deck - Perfect for sunset shots",
    "2. Mountain View Terrace - Great for panoramic views"
  ].join("\n"),
  "Indoor sun spots": [
    "Here are some great indoor spots with natural light:",
    "1. Glass House (☀️90) - Floor-to-ceiling windows",
    "2. Sunny Cafe (☀️88) - Large windows and patio",
    "3. Sun Room (☀️89) - Dedicated sun space",
    "4. Conservatory (☀️87) - Historic glass building"
  ].join("\n"),
  "default": "I can help you find the best sun spots in your area. Try asking about sunny spots, best photo times, or indoor locations with natural light.",
  "top 3 cities with the most sunlight hours in california": `☀️ **Top 3 Sunniest Cities in California:**\n\n1. **Redding** — 3,363 hours/year\n2. **Fresno** — 3,271 hours/year\n3. **Sacramento** — 3,265 hours/year\n\nThese cities enjoy the most annual sunshine in California!`,
  "sunny cafe with outdoor seating": `☕ **Sunny Cafe Recommendation:**\n\n- **Sunny Cafe**\n  123 Sunshine Ave, San Francisco\n  - Outdoor patio, south-facing, open 7am–6pm\n  - Sun Score: 88\n  - [Directions](#)\n\nWould you like more options?`,
  "sunset in san francisco": `🌅 **Best Sunset Spots in San Francisco:**\n\n1. **Baker Beach** — Iconic Golden Gate views\n2. **Lands End** — Dramatic cliffs and ocean\n3. **Twin Peaks** — Panoramic cityscape\n\nGolden hour is typically 7:30–8:15pm in summer.`,
  "parks with the most shade": `🌳 **Shady Parks Nearby:**\n\n- **Golden Gate Park** — Large groves, plenty of shade\n- **Presidio** — Eucalyptus and pine forests\n- **Buena Vista Park** — Dense tree cover, cool spots\n\nPerfect for a cool, relaxing afternoon!`,
  "compare sunlight hours in sf vs la": `☀️ **Sunlight Hours Comparison:**\n\n- **San Francisco:** ~3,055 hours/year\n- **Los Angeles:** ~3,254 hours/year\n\nLA gets about 200 more hours of sunshine annually than SF. Want to compare more cities?`,
}

export const SUGGESTED_PROMPTS = [
  'Where are the top 3 cities within 2 hours of me that are sunny today?',
  'Find me a sunny cafe with outdoor seating near me',
  'Where can I catch the sunset in the next hour?',
  'Which nearby parks have the most sunlight right now?',
  'Compare sunlight hours in Boston, NYC, and Philadelphia today'
];

// Map user inputs to responses
const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase()
  
  if (lowerInput.includes("sunny") || lowerInput.includes("spots")) {
    return mockResponses["Find sunny spots"]
  }
  if (lowerInput.includes("photo") || lowerInput.includes("picture")) {
    return mockResponses["Best time for photos"]
  }
  if (lowerInput.includes("indoor")) {
    return mockResponses["Indoor sun spots"]
  }
  
  return mockResponses.default
}

function getMockResponse(input: string): string {
  return getResponse(input)
}

export const suggestedPrompts = [
  'Where are the top 3 cities within 2 hours of me that are sunny today?',
  'Find me a sunny cafe with outdoor seating near me',
  'Where can I catch the sunset in the next hour?',
  'Which nearby parks have the most sunlight right now?',
  'Compare sunlight hours in Boston, NYC, and Philadelphia today'
]

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => {
    set((state) => {
      const newMessages = [...state.messages, message]
      
      // If it's a user message, add an AI response
      if (message.role === "user") {
        const response = getMockResponse(message.content)
        newMessages.push({ role: "assistant", content: response })
      }
      
      return { messages: newMessages }
    })
  },
  clearMessages: () => set({ messages: [] }),
  suggestedPrompts
})) 