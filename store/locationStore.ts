import { create } from 'zustand';
import { Location } from '../lib/location-store';

interface LocationStore {
  comparisonList: Location[];
  addToComparison: (location: Location) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  comparisonList: [],
  addToComparison: (location) => 
    set((state) => {
      if (state.comparisonList.length >= 3) return state;
      if (state.comparisonList.some(loc => loc.id === location.id)) return state;
      return { comparisonList: [...state.comparisonList, location] };
    }),
  removeFromComparison: (id) =>
    set((state) => ({
      comparisonList: state.comparisonList.filter(location => location.id !== id)
    })),
  clearComparison: () => set({ comparisonList: [] })
})); 