import React from 'react';
import { motion } from 'framer-motion';
import { useLocationStore, Location } from '@/store/locationStore';
import LocationCard from './LocationCard';

const LocationList: React.FC = () => {
  const { locations, locationType, sortOrder } = useLocationStore();

  // Filter and sort locations
  const filteredLocations = locations.filter((location: Location) => {
    if (locationType === 'all') return true;
    return location.type === locationType;
  }).sort((a: Location, b: Location) => {
    if (sortOrder === 'score') {
      return b.sunScore - a.sunScore;
    }
    return 0; // For demo, we'll just use the original order for distance
  });

  if (!filteredLocations.length) {
    return (
      <motion.div
        className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-medium mb-2">No locations found</h3>
        <p className="text-slate-500 dark:text-slate-400">
          Try adjusting your search parameters or exploring a different area.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredLocations.map((location: Location, index: number) => (
        <motion.div
          key={location.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <LocationCard 
            location={location as any}
            index={index} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default LocationList; 