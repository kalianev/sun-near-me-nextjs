'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sun, Calendar, MapPin, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { City } from '../../../utils/mockData';

interface WeekendPlan {
  city: City;
  activities: string[];
  weather: {
    temperature: number;
    condition: string;
    sunriseTime: string;
    sunsetTime: string;
    uvIndex: number;
    sunlightHours: number;
  };
  bestTime: string;
}

const WeekendPlanPage = () => {
  const router = useRouter();
  const [weekendPlan, setWeekendPlan] = useState<WeekendPlan | null>(null);

  useEffect(() => {
    // Get the weekend plan from localStorage
    const storedPlan = localStorage.getItem('weekendPlan');
    if (storedPlan) {
      setWeekendPlan(JSON.parse(storedPlan));
    } else {
      // If no plan exists, redirect back to compare page
      router.push('/compare');
    }
  }, [router]);

  if (!weekendPlan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-sm font-medium mb-6 hover:text-amber-500 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Your Sunny Weekend in {weekendPlan.city.name}</h1>
          <div className="flex items-center gap-2 text-amber-500">
            <Sun size={20} />
            <span className="font-medium">Sun Score: {weekendPlan.city.sunScore}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-sky-500" />
              <h3 className="font-medium">Location</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {weekendPlan.city.name}, {weekendPlan.city.state}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun size={16} className="text-amber-500" />
              <h3 className="font-medium">Weather</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {weekendPlan.weather.temperature}°F, {weekendPlan.weather.condition}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-slate-500" />
              <h3 className="font-medium">Best Time</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {weekendPlan.bestTime}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-amber-500" />
            Weekend Itinerary
          </h2>
          <div className="space-y-4">
            {weekendPlan.activities.map((activity, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{activity}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Best enjoyed during peak sunlight hours for optimal experience
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(weekendPlan.city.name)}`, '_blank')}
            className="btn btn-primary flex items-center gap-2"
          >
            <MapPin size={16} />
            View on Map
          </button>
          <button 
            onClick={() => {
              // Clear the weekend plan and return to compare page
              localStorage.removeItem('weekendPlan');
              router.push('/compare');
            }}
            className="btn btn-outline"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekendPlanPage; 