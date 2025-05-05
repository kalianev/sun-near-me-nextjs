"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Sun,
  Droplets,
  Sunrise,
  Sunset,
  Share2,
  BookmarkPlus,
  Clock,
  ExternalLink
} from 'lucide-react';
import SunScoreBadge from '@/components/SunScoreBadge';
import { useLocationStore } from '@/lib/location-store';
import { mockLocations } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
// import MapView from '@/components/MapView'; // Uncomment if you have a MapView component
// import SunPlaylist from '@/components/SunPlaylist'; // Uncomment if you have a SunPlaylist component

const PlaceDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { locations, addToComparison } = useLocationStore();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      // Try to find in store first, fallback to mock data
      const found = locations.find((loc) => loc.id === params.id) || mockLocations.find((loc) => loc.id === params.id);
      setSelectedLocation(found || null);
      setLoading(false);
    }
  }, [params, locations]);

  if (loading || !params?.id) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-pulse">
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4"></div>
          <div className="h-8 w-1/2 mx-auto bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="h-4 w-1/3 mx-auto bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedLocation) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Location not found</h2>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="flex items-center mx-auto"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to results
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="flex items-center text-sm font-medium mb-6 hover:text-amber-500 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to results
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-xl overflow-hidden mb-4">
            <img
              src={selectedLocation.imageUrl}
              alt={selectedLocation.name}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-semibold mb-1">{selectedLocation.name}</h1>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                  <MapPin size={14} className="mr-1" />
                  {selectedLocation.address}
                </div>
              </div>
              <SunScoreBadge score={selectedLocation.sunScore} size="lg" showLabel />
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {selectedLocation.description}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {selectedLocation.features.map((feature: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm"
                  >
                    {feature.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {selectedLocation.weatherInfo && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Current Conditions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 flex items-center">
                    <Sun size={20} className="text-amber-500 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Weather</div>
                      <div className="font-medium">{selectedLocation.weatherInfo.temperature}°F, {selectedLocation.weatherInfo.condition}</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 flex items-center">
                    <Droplets size={20} className="text-sky-500 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">UV Index</div>
                      <div className="font-medium">{selectedLocation.weatherInfo.uvIndex}/10</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 flex items-center">
                    <Sunrise size={20} className="text-amber-500 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Sunrise</div>
                      <div className="font-medium">{selectedLocation.weatherInfo.sunriseTime}</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 flex items-center">
                    <Sunset size={20} className="text-amber-500 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Sunset</div>
                      <div className="font-medium">{selectedLocation.weatherInfo.sunsetTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Best Sun Times</h3>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock size={18} className="text-slate-500 mr-2" />
                  <span className="font-medium">Peak Sunshine Hours</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">
                    10:00 AM - 2:00 PM
                  </span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm">
                    5:00 PM - 7:00 PM (Golden Hour)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => addToComparison(selectedLocation)}
                variant="outline"
                className="flex items-center"
              >
                <BookmarkPlus size={16} className="mr-2" />
                Add to Comparison
              </Button>
              <Button
                variant="outline"
                className="flex items-center"
              >
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => {
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.address)}`;
                  window.open(mapsUrl, '_blank');
                }}
              >
                <ExternalLink size={16} className="mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="sticky top-24">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Location</h3>
              <div className="h-[400px] rounded-lg overflow-hidden">
                {/* <MapView location={selectedLocation} /> */}
                <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                  Map Placeholder
                </div>
              </div>
            </div>
            {/* <SunPlaylist ... /> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlaceDetailsPage; 