export interface Location {
  id: string
  name: string
  description: string
  type: "beach" | "park" | "viewpoint" | "trail" | "restaurant" | "cafe"
  coordinates: {
    lat: number
    lng: number
  }
  image: string
  sunScore: number
  bestTime: {
    sunrise: string
    sunset: string
    goldenHour: string
  }
  activities: string[]
  amenities: string[]
}

export const locations: Location[] = [];

export interface Recommendation {
  id: string
  location: Location
  bestTime: string
  reason: string
  sunScore: number
}

export const recommendations: Recommendation[] = [];

// Old mock locations and related types have been moved to mock-data.ts
// Keep only real or unique data in this file.

// (If you have real API data or unique types, keep them here. Otherwise, this file can be cleaned up.) 