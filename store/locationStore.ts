import { create } from 'zustand';
import { mockLocations } from '../utils/mockData';

export type LocationType = 'all' | 'indoor' | 'outdoor';

export interface Location {
  id: string;
  name: string;
  description?: string;
  type: LocationType;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  sunScore: number;
  address?: string;
  directionsUrl?: string;
  features?: string[];
  weatherInfo?: {
    temperature: number;
    condition: string;
    uvIndex: number;
    sunriseTime: string;
    sunsetTime: string;
  };
}

interface LocationStore {
  locations: Location[];
  comparisonList: Location[];
  userLocation: { lat: number; lng: number } | null;
  viewMode: 'list' | 'map';
  locationType: 'all' | 'indoor' | 'outdoor';
  sortOrder: 'score' | 'distance';
  setLocations: (locations: Location[]) => void;
  setUserLocation: (location: { lat: number; lng: number }) => void;
  setViewMode: (mode: 'list' | 'map') => void;
  setLocationType: (type: 'all' | 'indoor' | 'outdoor') => void;
  setSortOrder: (order: 'score' | 'distance') => void;
  addToComparison: (location: Location) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: mockLocations,
  comparisonList: [],
  userLocation: null,
  viewMode: 'list',
  locationType: 'all',
  sortOrder: 'score',
  setLocations: (locations) => set({ locations }),
  setUserLocation: (location) => set({ userLocation: location }),
  setViewMode: (viewMode) => set({ viewMode }),
  setLocationType: (locationType) => set({ locationType }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  addToComparison: (location) => set((state) => {
    if (state.comparisonList.length >= 3) return state;
    if (state.comparisonList.some(loc => loc.id === location.id)) return state;
    return { comparisonList: [...state.comparisonList, location] };
  }),
  removeFromComparison: (id) => set((state) => ({
    comparisonList: state.comparisonList.filter(location => location.id !== id)
  })),
  clearComparison: () => set({ comparisonList: [] })
})); 