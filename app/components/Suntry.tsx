'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SuntryIntro } from './SuntryIntro';

interface WeatherData {
  temperature: number;
  humidity: number;
  cloudiness: string;
  uvIndex: number;
}

interface SuntryData {
  id: string;
  title: string;
  location: string;
  dateTime: Date;
  weather: WeatherData;
  mood: string;
  notes: string;
  photoUrl?: string;
  songUrl?: string;
  poeticPrompt?: string;
}

const SAMPLE_SUNTRY: SuntryData = {
  id: '1',
  title: 'Roofbeam Reverie',
  location: 'Rooftop, Capitol Hill, Seattle',
  dateTime: new Date('2024-03-20T17:30:00'),
  weather: {
    temperature: 62,
    humidity: 65,
    cloudiness: 'Partly Cloudy',
    uvIndex: 4
  },
  mood: 'Hopeful',
  notes: "There's a crack between the buildings where the sun slips through and pools onto my notebook. I swear I can feel my bones waking up.",
  photoUrl: '/sample-suntry.jpg',
  songUrl: 'https://open.spotify.com/track/example',
  poeticPrompt: "If today's sun were a sound, what would it be?"
};

const COMMUNITY_SUNTRIES: SuntryData[] = [
  {
    id: '2',
    title: 'Golden Hour at the Beach',
    location: 'Alki Beach, Seattle',
    dateTime: new Date('2024-03-19T18:30:00'),
    weather: {
      temperature: 65,
      humidity: 70,
      cloudiness: 'Clear',
      uvIndex: 3
    },
    mood: 'Calm',
    notes: "The sun is painting the water gold, and every wave catches fire for a moment before returning to the sea. It's like watching the ocean breathe light.",
    photoUrl: '/beach-sunset.jpg',
    songUrl: 'https://open.spotify.com/track/beach-vibes'
  },
  {
    id: '3',
    title: 'Morning Coffee with Sunrise',
    location: 'Secret Garden Café',
    dateTime: new Date('2024-03-21T07:15:00'),
    weather: {
      temperature: 58,
      humidity: 75,
      cloudiness: 'Partly Cloudy',
      uvIndex: 2
    },
    mood: 'Energized',
    notes: "First light through the café windows, turning my coffee steam into little golden galaxies. The whole day feels full of possibility.",
    photoUrl: '/coffee-sunrise.jpg',
    songUrl: 'https://open.spotify.com/track/morning-jazz'
  }
];

function SuntryCard({ suntry }: { suntry: SuntryData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background border border-border rounded-[var(--radius)] p-6 mb-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-display text-foreground">{suntry.title}</h2>
          <p className="text-muted-foreground">
            {format(suntry.dateTime, 'MMMM d, yyyy • h:mm a')} • {suntry.location}
          </p>
        </div>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
          {suntry.mood}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-foreground italic mb-4">"{suntry.notes}"</p>
          <div className="bg-muted/30 rounded-[var(--radius)] p-4">
            <h3 className="text-sm font-body text-muted-foreground mb-2">Weather Snapshot</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>🌡️ {suntry.weather.temperature}°F</div>
              <div>💧 {suntry.weather.humidity}% humidity</div>
              <div>☁️ {suntry.weather.cloudiness}</div>
              <div>☀️ UV Index: {suntry.weather.uvIndex}</div>
            </div>
          </div>
          {suntry.songUrl && (
            <div className="mt-4 flex items-center gap-2 text-sm text-primary">
              <span>🎵</span>
              <a href={suntry.songUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Listen to the moment
              </a>
            </div>
          )}
        </div>
        <div className="relative h-48 bg-muted rounded-[var(--radius)] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            [Photo of the moment]
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Suntry() {
  const [suntry, setSuntry] = useState<Partial<SuntryData>>({
    dateTime: new Date(),
  });
  const [isCreating, setIsCreating] = useState(false);
  const [showPoetPrompt, setShowPoetPrompt] = useState(false);
  const [mySuntries, setMySuntries] = useState<SuntryData[]>([SAMPLE_SUNTRY]);
  const [activeTab, setActiveTab] = useState<'my' | 'community'>('my');

  const moodOptions = [
    { emoji: '✨', label: 'Energized' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '🌅', label: 'Nostalgic' },
    { emoji: '🦋', label: 'Restless' },
    { emoji: '💫', label: 'Inspired' },
    { emoji: '🌟', label: 'Hopeful' },
  ];

  const poeticPrompts = [
    "Describe the color of the light on your skin...",
    "If today's sun were a sound, what would it be?",
    "What memories does this light stir in you?",
    "How does this moment taste?",
    "What shape is the warmth making in your mind?"
  ];

  const handleSaveSuntry = () => {
    const newSuntry: SuntryData = {
      id: Date.now().toString(),
      title: suntry.title || 'Untitled Suntry',
      location: suntry.location || 'Unknown Location',
      dateTime: suntry.dateTime || new Date(),
      weather: {
        temperature: 72,
        humidity: 65,
        cloudiness: 'Partly Cloudy',
        uvIndex: 4
      },
      mood: suntry.mood || 'Calm',
      notes: suntry.notes || '',
      songUrl: suntry.songUrl,
      photoUrl: suntry.photoUrl,
    };

    setMySuntries([newSuntry, ...mySuntries]);
    setIsCreating(false);
    setSuntry({ dateTime: new Date() });
  };

  return (
    <div className="min-h-screen p-8">
      <SuntryIntro />
      
      <div className="container mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-[var(--radius)] shadow-lg p-8"
        >
          <h1 className="text-4xl font-display text-foreground mb-6">
            {isCreating ? 'Create a New Suntry' : 'Your Suntries'}
          </h1>

          {isCreating ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    Title your moment with the sun
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Roofbeam Reverie, Morning Gold..."
                    className="w-full px-4 py-2 rounded-[var(--radius)] bg-background border-input border focus:ring-2 focus:ring-ring focus:border-transparent font-body"
                    value={suntry.title || ''}
                    onChange={(e) => setSuntry({ ...suntry, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="px-4 py-2 rounded-[var(--radius)] bg-background border-input border focus:ring-2 focus:ring-ring focus:border-transparent font-body"
                    value={format(suntry.dateTime || new Date(), "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setSuntry({ ...suntry, dateTime: new Date(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body text-muted-foreground mb-2">
                  Where are you?
                </label>
                <input
                  type="text"
                  placeholder="A secret garden, your favorite sunny corner..."
                  className="w-full px-4 py-2 rounded-[var(--radius)] bg-background border-input border focus:ring-2 focus:ring-ring focus:border-transparent font-body"
                  value={suntry.location || ''}
                  onChange={(e) => setSuntry({ ...suntry, location: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-body text-muted-foreground mb-2">
                  How does this moment feel?
                </label>
                <div className="flex flex-wrap gap-3">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.label}
                      className={`px-4 py-2 rounded-full transition-all font-body ${
                        suntry.mood === mood.label
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                      onClick={() => setSuntry({ ...suntry, mood: mood.label })}
                    >
                      {mood.emoji} {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-body text-muted-foreground">
                    Capture this moment in words
                  </label>
                  <button
                    onClick={() => setShowPoetPrompt(!showPoetPrompt)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    ✨ Need inspiration?
                  </button>
                </div>
                {showPoetPrompt && (
                  <div className="text-sm italic text-muted-foreground bg-muted/50 p-3 rounded-[var(--radius)]">
                    {poeticPrompts[Math.floor(Math.random() * poeticPrompts.length)]}
                  </div>
                )}
                <textarea
                  placeholder="What does the light feel like? What memories does it stir?"
                  className="w-full px-4 py-2 rounded-[var(--radius)] bg-background border-input border focus:ring-2 focus:ring-ring focus:border-transparent h-32 font-body"
                  value={suntry.notes || ''}
                  onChange={(e) => setSuntry({ ...suntry, notes: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    📸 Add a photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 rounded-[var(--radius)] bg-background border-input border focus:ring-2 focus:ring-ring focus:border-transparent font-body"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">
                    🎵 Add a song
                  </label>
                  <input
                    type="text"
                    placeholder="Paste Spotify or Apple Music link..."
                    className="w-full px-4 py-2 rounded-[var(--radius)] bg-background border-input border focus:ring-2 focus:ring-ring focus:border-transparent font-body"
                    value={suntry.songUrl || ''}
                    onChange={(e) => setSuntry({ ...suntry, songUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-[var(--radius)] hover:bg-primary/90 transition-colors font-body"
                  onClick={handleSaveSuntry}
                >
                  Save Suntry
                </button>
                <button
                  className="px-6 py-3 bg-muted text-foreground rounded-[var(--radius)] hover:bg-muted/80 transition-colors font-body"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <button
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-[var(--radius)] hover:bg-primary/90 transition-colors font-body"
                  onClick={() => setIsCreating(true)}
                >
                  + New Suntry
                </button>
                <div className="flex gap-4">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    📚 Collections
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    🗺️ Map View
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    📊 Insights
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4 mb-8 border-b border-border">
                <button
                  className={`px-4 py-2 font-body transition-colors relative ${
                    activeTab === 'my' 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('my')}
                >
                  My Suntries
                  {activeTab === 'my' && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
                <button
                  className={`px-4 py-2 font-body transition-colors relative ${
                    activeTab === 'community' 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('community')}
                >
                  Community Suntries
                  {activeTab === 'community' && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              </div>

              {activeTab === 'my' ? (
                <div>
                  <h2 className="text-2xl font-display text-foreground mb-6">My Solar Journey</h2>
                  {mySuntries.map((suntry) => (
                    <SuntryCard key={suntry.id} suntry={suntry} />
                  ))}
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-display text-foreground mb-6">Sun Collective</h2>
                  <p className="text-muted-foreground mb-6">
                    Discover how others are experiencing their moments in the sun. Each shared Suntry is a window into someone else's solar story.
                  </p>
                  {COMMUNITY_SUNTRIES.map((suntry) => (
                    <SuntryCard key={suntry.id} suntry={suntry} />
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 