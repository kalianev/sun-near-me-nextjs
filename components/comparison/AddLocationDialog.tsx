import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocationStore, Location } from '../../lib/location-store';
import { useLocationStore as useComparisonStore } from '../../store/locationStore';
import LocationCard from '../LocationCard';

interface AddLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddLocationDialog: React.FC<AddLocationDialogProps> = ({ isOpen, onClose }) => {
  const { locations } = useLocationStore();
  const { comparisonList, addToComparison } = useComparisonStore();

  // Filter out locations that are already in the comparison list
  const availableLocations = locations.filter(
    location => !comparisonList.some((comp: Location) => comp.id === location.id)
  );

  const handleLocationAdded = () => {
    // Close the dialog after a short delay to allow the animation to complete
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Location to Compare</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {availableLocations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400">
                No more locations available to add to comparison.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableLocations.map((location, index) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  index={index}
                  isCompareDialog={true}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddLocationDialog; 