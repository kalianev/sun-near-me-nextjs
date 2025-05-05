import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import SunScoreBadge from './SunScoreBadge';
import { mockTrendingPlaces } from '@/lib/mock-data';
import type { TrendingPlace } from '@/lib/mock-data';

const TrendingPlaces: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <TrendingUp size={20} className="mr-2 text-amber-500" />
        <h2 className="text-2xl font-semibold">Trending Sun Spots</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockTrendingPlaces.map((place: TrendingPlace, index: number) => (
          <motion.div 
            key={place.id}
            className="overflow-hidden rounded-xl border bg-card/80 shadow hover:shadow-lg cursor-pointer flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-40">
              <img 
                src={place.imageUrl} 
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <SunScoreBadge score={place.sunScore} />
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg mb-1">{place.name}</h3>
              <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-2 inline-block">
                {place.type === 'indoor' ? 'Indoor' : 'Outdoor'}
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 flex-1">
                {place.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPlaces; 