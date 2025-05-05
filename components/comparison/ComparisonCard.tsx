import React from 'react';
import { X, MapPin, Sun, Droplets, CalendarClock } from 'lucide-react';
import SunScoreBadge from '../SunScoreBadge';
import { motion } from 'framer-motion';
import { Location } from '../../lib/location-store';

interface ComparisonCardProps {
  location: Location;
  onRemove: (id: string) => void;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ location, onRemove }) => {
  return (
    <motion.div 
      className="place-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-32">
        <img 
          src={location.imageUrl} 
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => onRemove(location.id)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 transition-colors"
          aria-label="Remove from comparison"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">{location.name}</h3>
          <SunScoreBadge score={location.sunScore} size="sm" />
        </div>
        
        {location.address && (
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center">
            <MapPin size={12} className="mr-1" />
            {location.address}
          </div>
        )}
        
        {location.weatherInfo && (
          <div className="space-y-2 mb-3">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center text-slate-600 dark:text-slate-300">
                <Sun size={14} className="mr-1 text-amber-500" />
                Weather
              </span>
              <span>{location.weatherInfo.temperature}°F, {location.weatherInfo.condition}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center text-slate-600 dark:text-slate-300">
                <Droplets size={14} className="mr-1 text-sky-500" />
                UV Index
              </span>
              <span>{location.weatherInfo.uvIndex}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center text-slate-600 dark:text-slate-300">
                <CalendarClock size={14} className="mr-1 text-slate-500" />
                Sun Hours
              </span>
              <span>
                {location.weatherInfo.sunriseTime} - {location.weatherInfo.sunsetTime}
              </span>
            </div>
          </div>
        )}
        
        {location.features && location.features.length > 0 && (
          <div className="text-xs space-y-1">
            {location.features.map((feature, idx) => (
              <div key={idx} className="flex items-center">
                <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                {feature.replace('_', ' ')}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ComparisonCard; 