import { create } from "zustand"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

interface ChatStore {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => Promise<void>
  clearMessages: () => void
  suggestedPrompts: string[]
  isLoading: boolean
  error: string | null
}

const suggestedPrompts = [
  "Where are the sunniest spots near me?",
  "What's the best time for outdoor photos today?",
  "Are there any indoor places with good natural light?",
  "Compare the sun exposure between different neighborhoods",
]

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  addMessage: async (message) => {
    // Don't add system messages to the visible messages
    if (message.role !== 'system') {
      set((state) => ({ 
        messages: [...state.messages, message],
        isLoading: message.role === 'user', // Set loading when user sends message
        error: null // Clear any previous errors
      }))
    }
    
    // If it's a user message, get OpenAI response
    if (message.role === "user") {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...get().messages.filter(m => m.role !== 'system'), message],
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.message) {
          set((state) => ({
            messages: [...state.messages, {
              role: "assistant",
              content: data.message.content
            }],
            isLoading: false,
            error: null
          }));
        } else {
          console.error('Error from OpenAI API:', data.error);
          // Include the detailed error message in development
          const errorMessage = process.env.NODE_ENV === 'development' 
            ? `Error: ${data.error}${data.details ? ` (${data.details})` : ''}`
            : data.error;
            
          set((state) => ({
            messages: [...state.messages, {
              role: "assistant",
              content: "I apologize, but I encountered an error. Please try again."
            }],
            isLoading: false,
            error: errorMessage
          }));
        }
      } catch (error) {
        console.error('Error sending message:', error);
        set((state) => ({
          messages: [...state.messages, {
            role: "assistant",
            content: "I apologize, but I encountered an error. Please try again."
          }],
          isLoading: false,
          error: "Failed to connect to the chat service. Please check your connection and try again."
        }));
      }
    }
  },
  clearMessages: () => set({ messages: [], error: null }),
  suggestedPrompts
})) 