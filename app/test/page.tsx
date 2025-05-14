'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Preference {
  id: number;
  title: string;
  description: string;
  type: 'elaborate' | 'expand';
  suggestions: string[];
}

const initialPreferences: Preference[] = [
  {
    id: 1,
    title: 'Shopping Preferences',
    description: 'Do you prefer shopping in person or online?',
    type: 'elaborate',
    suggestions: [
      'I enjoy the tactile experience of in-store shopping',
      'I prefer the convenience of online shopping',
      'I like to compare prices in person',
      'I enjoy the social aspect of shopping with friends'
    ]
  },
  {
    id: 2,
    title: 'Font Preferences',
    description: 'What type of fonts do you prefer?',
    type: 'expand',
    suggestions: [
      'Modern sans-serif fonts',
      'Classic serif fonts',
      'Handwritten style fonts',
      'Display fonts for headlines'
    ]
  }
];

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleElaborate();
    } else if (isRightSwipe) {
      handleExpand();
    }
  };

  const handleElaborate = () => {
    setDirection(-1);
    const currentPref = preferences[currentIndex];
    if (currentPref.type === 'elaborate') {
      // Add more detailed suggestions
      const newSuggestions = [
        ...currentPref.suggestions,
        'I enjoy the sensory experience of shopping',
        'I like to try things on before buying',
        'I value immediate gratification'
      ];
      setPreferences(prev => prev.map((p, i) => 
        i === currentIndex ? { ...p, suggestions: newSuggestions } : p
      ));
    }
  };

  const handleExpand = () => {
    setDirection(1);
    const currentPref = preferences[currentIndex];
    if (currentPref.type === 'expand') {
      // Add new related preferences
      const newPreferences: Preference[] = [
        ...preferences,
        {
          id: preferences.length + 1,
          title: 'Color Preferences',
          description: 'What colors do you prefer in your designs?',
          type: 'expand' as const,
          suggestions: [
            'Bold and vibrant colors',
            'Soft and pastel colors',
            'Monochrome schemes',
            'Complementary color pairs'
          ]
        }
      ];
      setPreferences(newPreferences);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Elaborate or Expand
        </h1>
        
        <div 
          className="relative h-[400px] bg-white rounded-xl shadow-lg overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full h-full p-6"
            >
              <div className="h-full flex flex-col">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  {preferences[currentIndex].title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {preferences[currentIndex].description}
                </p>
                <div className="flex-1 overflow-y-auto">
                  <ul className="space-y-3">
                    {preferences[currentIndex].suggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleElaborate}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Elaborate
          </button>
          <button
            onClick={handleExpand}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Expand
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Swipe left to elaborate or right to expand</p>
          <p>Or use the buttons below</p>
        </div>
      </div>
    </div>
  );
} 