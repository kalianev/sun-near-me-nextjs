import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Droplets, Sunrise, Sunset, Sun, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';
import type { Location } from '../lib/location-store';
import SunScoreBadge from './SunScoreBadge';
import { useLocationStore } from '../store/locationStore';

interface LocationCardProps {
  location: Location;
  index?: number;
  isCompareDialog?: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, index = 0, isCompareDialog = false }) => {
  const router = useRouter();
  const { addToComparison } = useLocationStore();

  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    localStorage.setItem('selectedLocation', JSON.stringify(location));
    router.push(`/place/${location.id}`);
  };

  const handleAddToComparison = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToComparison(location);
    if (!isCompareDialog) {
      router.push('/compare');
    }
  };

  const handleOpenInMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <motion.div
      className="overflow-hidden rounded-xl border bg-card/80 shadow hover:shadow-lg cursor-pointer flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={handleViewDetails}
    >
      <div className="relative h-48">
        <Image
          src={location.imageUrl}
          alt={location.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <SunScoreBadge score={location.sunScore} size="md" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white font-semibold text-lg">{location.name}</h3>
          {location.address && (
            <div className="flex items-center text-white/80 text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              {location.address}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-3 flex flex-wrap gap-2">
          {(location.features || []).map((feature, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
          {location.description}
        </p>

        {location.weatherInfo && (
          <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center">
              <Sun size={14} className="mr-1 text-amber-500" />
              {location.weatherInfo.temperature}°F, {location.weatherInfo.condition}
            </div>
            <div className="flex items-center">
              <Droplets size={14} className="mr-1 text-sky-500" />
              UV Index: {location.weatherInfo.uvIndex}
            </div>
            <div className="flex items-center">
              <Sunrise size={14} className="mr-1 text-amber-500" />
              Sunrise: {location.weatherInfo.sunriseTime}
            </div>
            <div className="flex items-center">
              <Sunset size={14} className="mr-1 text-amber-500" />
              Sunset: {location.weatherInfo.sunsetTime}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-auto">
          <div className="flex space-x-2">
            <button
              className="text-sm font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300"
              onClick={handleViewDetails}
            >
              View Details
            </button>
            <button
              className="text-sm font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 flex items-center"
              onClick={handleOpenInMaps}
            >
              <ExternalLink size={14} className="mr-1" />
              Directions
            </button>
          </div>
          <button
            className="text-xs border border-slate-200 dark:border-slate-700 px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            onClick={handleAddToComparison}
          >
            Add to Compare
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard; 