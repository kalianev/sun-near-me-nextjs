import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronRight, Bot, User, Sun, MapPin, Filter, SunMedium, Building, ArrowDownUp, List, MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/lib/chat-store';
import { useLocationStore } from '@/lib/location-store';
import { Input } from './ui/input';
import { Button } from './ui/button';
import MapView from './map/MapView';
import LocationList from './LocationList';

const ChatInterface: React.FC = () => {
  const { messages, addMessage, suggestedPrompts } = useChatStore();
  const { locations, viewMode, locationType, sortOrder, setViewMode, setLocationType, setSortOrder, setUserLocation } = useLocationStore();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addMessage({ role: 'user', content: inputValue });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      // Set mock user location (Boston)
      setUserLocation({ lat: 42.3601, lng: -71.0589 });
    }, 1200);
    setInputValue('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => {
      const form = document.getElementById('chat-form') as HTMLFormElement;
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  // Filter and sort locations
  const filteredLocations = locations.filter(location => {
    if (locationType === 'all') return true;
    return location.type === locationType;
  }).sort((a, b) => {
    if (sortOrder === 'score') {
      return b.sunScore - a.sunScore;
    }
    return 0; // For demo, we'll just use the original order for distance
  });

  return (
    <div className="chat-container h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <Bot size={20} className="mr-2 text-sky-500" />
          Sun Seeker AI
        </h2>
      </div>
      
      {/* Message history */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[300px]">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
              <Sun size={32} className="text-amber-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">Ask About Sunny Places</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
              I can help you find the sunniest spots near you or answer questions about sun-optimized locations.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-sky-100 dark:bg-sky-900/30 text-slate-800 dark:text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                        message.role === 'user' ? 'bg-sky-500' : 'bg-amber-500'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User size={12} className="text-white" />
                      ) : (
                        <Bot size={12} className="text-white" />
                      )}
                    </div>
                    <span className="text-xs font-medium">
                      {message.role === 'user' ? 'You' : 'Sun Seeker AI'}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-2">
                  <Bot size={12} className="text-white" />
                </div>
                <span className="text-xs font-medium">Sun Seeker AI</span>
              </div>
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Results section */}
      {showResults && (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center">
              <SunMedium size={20} className="text-amber-500 mr-2" />
              Sun Near Me
            </h3>
            <div className="flex items-center text-sm">
              <MapPin size={16} className="mr-1 text-slate-500" />
              <span>Boston, MA</span>
            </div>
          </div>

          {/* Filters and view toggles */}
          <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <Filter size={16} className="mr-2 text-slate-500" />
                <span className="mr-3 text-sm font-medium">Filters:</span>
                
                <div className="space-x-2">
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${
                      locationType === 'all'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                    onClick={() => setLocationType('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full flex items-center ${
                      locationType === 'outdoor'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                    onClick={() => setLocationType('outdoor')}
                  >
                    <SunMedium size={14} className="mr-1" />
                    Outdoor
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full flex items-center ${
                      locationType === 'indoor'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                    onClick={() => setLocationType('indoor')}
                  >
                    <Building size={14} className="mr-1" />
                    Indoor
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <ArrowDownUp size={16} className="mr-2 text-slate-500" />
                  <select 
                    className="bg-slate-100 dark:bg-slate-700 border-none rounded-lg text-sm py-1 px-2"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'score' | 'distance')}
                  >
                    <option value="score">Sort by Sun Score</option>
                    <option value="distance">Sort by Distance</option>
                  </select>
                </div>
                
                <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg">
                  <button 
                    className={`p-2 ${viewMode === 'list' ? 'bg-slate-100 dark:bg-slate-700' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                  <button 
                    className={`p-2 ${viewMode === 'map' ? 'bg-slate-100 dark:bg-slate-700' : ''}`}
                    onClick={() => setViewMode('map')}
                    aria-label="Map view"
                  >
                    <MapIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results info */}
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Found {filteredLocations.length} sun-friendly places{locationType !== 'all' ? ` (${locationType})` : ''} near you
            </p>
          </div>

          {/* View content */}
          {viewMode === 'map' ? (
            <div className="h-[400px] rounded-xl overflow-hidden shadow-md">
              <MapView />
            </div>
          ) : (
            <LocationList />
          )}
        </div>
      )}

      {/* Suggested prompts */}
      {messages.length === 0 && (
        <div className="mb-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-full px-3 py-1.5 flex items-center transition-colors"
              >
                {prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}
                <ChevronRight size={14} className="ml-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <form
        id="chat-form"
        onSubmit={handleSubmit}
        className="border-t border-slate-200 dark:border-slate-700 pt-4"
        autoComplete="off"
      >
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pr-12"
            placeholder="Ask me about sunny places..."
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-sky-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white disabled:text-slate-500 transition-colors"
          >
            <Send size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 