import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Location } from '@/store/locationStore';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate distance between two points using Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export interface SunspotResult {
  name: string;
  distanceInKm: number;
  lat: number;
  lng: number;
  sunScore: number;
}

interface Sunspot {
  id: string;
  name: string;
  description: string;
  type: "indoor" | "outdoor";
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  sunScore: number;
  tags: string[];
}

export function getTopSunspots(
  userLat: number,
  userLng: number,
  sunspots: Sunspot[],
  limit: number = 3
): SunspotResult[] {
  // Calculate distances and create results array
  const results = sunspots.map(spot => ({
    name: spot.name,
    distanceInKm: calculateDistance(
      userLat,
      userLng,
      spot.coordinates.lat,
      spot.coordinates.lng
    ),
    lat: spot.coordinates.lat,
    lng: spot.coordinates.lng,
    sunScore: spot.sunScore
  }));

  // Sort by sunScore (descending) and then by distance (ascending)
  return results
    .sort((a, b) => {
      if (b.sunScore !== a.sunScore) {
        return b.sunScore - a.sunScore;
      }
      return a.distanceInKm - b.distanceInKm;
    })
    .slice(0, limit);
}
