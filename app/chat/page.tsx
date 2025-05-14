import { Chat } from "@/components/app/Chat";

export default function ChatPage() {
  return (
    <main className="container mx-auto py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-center">Chat with AI Assistant</h1>
        <p className="text-center text-muted-foreground">
          Ask me anything about sun and weather conditions!
        </p>
        <Chat />
      </div>
    </main>
  );
} 