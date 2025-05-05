import { create } from 'zustand';
import { mockLocations } from './mock-data';

export type LocationType = 'all' | 'outdoor' | 'indoor';

export interface Location {
  id: string;
  name: string;
  description: string;
  type: LocationType;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  sunScore: number;
  address?: string;
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
  userLocation: { lat: number; lng: number } | null;
  viewMode: 'list' | 'map';
  locationType: LocationType;
  sortOrder: 'score' | 'distance';
  setLocations: (locations: Location[]) => void;
  setUserLocation: (location: { lat: number; lng: number }) => void;
  setViewMode: (mode: 'list' | 'map') => void;
  setLocationType: (type: LocationType) => void;
  setSortOrder: (order: 'score' | 'distance') => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: mockLocations,
  userLocation: null,
  viewMode: 'list',
  locationType: 'all',
  sortOrder: 'score',
  setLocations: (locations) => set({ locations }),
  setUserLocation: (location) => set({ userLocation: location }),
  setViewMode: (viewMode) => set({ viewMode }),
  setLocationType: (locationType) => set({ locationType }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
})); 