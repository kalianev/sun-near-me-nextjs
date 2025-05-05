import React from 'react';
import { MapPin, Sun, Cloud } from 'lucide-react';
import SunScoreBadge from '../SunScoreBadge';
import { motion } from 'framer-motion';
import { City } from '../../utils/mockData';

interface CityComparisonCardProps {
  city: City;
  index: number;
  isHighestScore: boolean;
}

const CityComparisonCard: React.FC<CityComparisonCardProps> = ({ 
  city, 
  index,
  isHighestScore
}) => {
  return (
    <motion.div 
      className={`place-card overflow-hidden ${
        isHighestScore ? 'ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-slate-900' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {isHighestScore && (
        <div className="bg-amber-500 text-white text-xs font-medium py-1 px-4 text-center">
          Top Sun Score
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-xl">{city.name}</h3>
            <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
              <MapPin size={14} className="mr-1" />
              {city.state}
            </div>
          </div>
          <SunScoreBadge score={city.sunScore} size="lg" />
        </div>
        
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Temperature</div>
            <div className="text-lg font-medium flex items-center">
              <Sun size={18} className="mr-1 text-amber-500" />
              {city.weatherInfo.temperature}°F
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Conditions</div>
            <div className="text-lg font-medium flex items-center">
              <Cloud size={18} className="mr-1 text-sky-500" />
              {city.weatherInfo.condition}
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">UV Index</div>
            <div className="text-lg font-medium">
              {city.weatherInfo.uvIndex}/10
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Sunlight Hours</div>
            <div className="text-lg font-medium">
              {city.weatherInfo.sunlightHours}h
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm mb-2">Top Sunny Activities</h4>
          <ul className="text-sm space-y-1">
            {city.topActivities.map((activity: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default CityComparisonCard; 