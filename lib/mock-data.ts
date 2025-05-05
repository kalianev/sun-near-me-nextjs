import { format } from 'date-fns';
import { Location } from './location-store';

const today = new Date();
const sunrise = new Date(today);
sunrise.setHours(6, 30, 0, 0);
const sunset = new Date(today);
sunset.setHours(19, 15, 0, 0);

export const mockLocations: Location[] = [
  {
    id: "1",
    name: "Baker Beach",
    description: "A scenic beach with stunning views of the Golden Gate Bridge and Marin Headlands.",
    type: "outdoor",
    coordinates: {
      lat: 37.7937,
      lng: -122.4838
    },
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
    sunScore: 9.5,
    address: "Baker Beach, San Francisco, CA",
    features: ["Beach", "Scenic Views", "Photography"],
    weatherInfo: {
      temperature: 72,
      condition: "Sunny",
      uvIndex: 8,
      sunriseTime: "6:45 AM",
      sunsetTime: "7:30 PM"
    }
  },
  {
    id: "2",
    name: "Lands End Trail",
    description: "A coastal trail offering panoramic views of the Pacific Ocean and Golden Gate Bridge.",
    type: "outdoor",
    coordinates: {
      lat: 37.7786,
      lng: -122.5118
    },
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 8.5,
    address: "Lands End Trail, San Francisco, CA",
    features: ["Hiking", "Scenic Views", "Photography"],
    weatherInfo: {
      temperature: 70,
      condition: "Partly Cloudy",
      uvIndex: 7,
      sunriseTime: "6:50 AM",
      sunsetTime: "7:35 PM"
    }
  },
  {
    id: "3",
    name: "Crissy Field",
    description: "A waterfront park with stunning views of the Golden Gate Bridge and San Francisco Bay.",
    type: "outdoor",
    coordinates: {
      lat: 37.8024,
      lng: -122.4658
    },
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.0,
    address: "Crissy Field, San Francisco, CA",
    features: ["Park", "Beach", "Walking"],
    weatherInfo: {
      temperature: 71,
      condition: "Sunny",
      uvIndex: 8,
      sunriseTime: "6:40 AM",
      sunsetTime: "7:25 PM"
    }
  },
  {
    id: '4',
    name: 'Boston Common',
    type: 'outdoor',
    address: 'Boston Common, Boston, MA',
    sunScore: 90,
    coordinates: [-71.0662, 42.3551],
    description: 'Historic public park offering wide open green spaces perfect for sunbathing, picnics, and outdoor activities. Minimal tree coverage in the main lawn areas.',
    features: ['outdoor_seating', 'shade_available'],
    imageUrl: 'https://images.pexels.com/photos/772429/pexels-photo-772429.jpeg',
    distanceInKm: 0.8,
    weatherInfo: {
      temperature: 74,
      condition: 'Sunny',
      sunriseTime: format(sunrise, 'h:mm a'),
      sunsetTime: format(sunset, 'h:mm a'),
      uvIndex: 8
    }
  },
  {
    id: '5',
    name: 'Waterfront Pier',
    type: 'outdoor',
    address: 'Atlantic Ave, Boston, MA',
    sunScore: 87,
    coordinates: [-71.0498, 42.3596],
    description: 'A scenic pier along the harbor with unobstructed sunlight and cooling ocean breezes. Perfect for watching the sunset over the water.',
    features: ['waterfront', 'outdoor_seating', 'west_facing'],
    imageUrl: 'https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg',
    distanceInKm: 1.2,
    weatherInfo: {
      temperature: 71,
      condition: 'Clear',
      sunriseTime: format(sunrise, 'h:mm a'),
      sunsetTime: format(sunset, 'h:mm a'),
      uvIndex: 7
    }
  },
  {
    id: '6',
    name: 'Glass House Restaurant',
    type: 'indoor',
    address: '321 Newbury St, Boston, MA',
    sunScore: 82,
    coordinates: [-71.0873, 42.3488],
    description: 'A modern dining establishment with a glass-enclosed dining room and retractable roof sections. Natural light floods the space even on cloudy days.',
    features: ['floor_to_ceiling_windows', 'skylight', 'south_facing'],
    imageUrl: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
    distanceInKm: 1.5,
    weatherInfo: {
      temperature: 73,
      condition: 'Sunny',
      sunriseTime: format(sunrise, 'h:mm a'),
      sunsetTime: format(sunset, 'h:mm a'),
      uvIndex: 7
    }
  },
  {
    id: '7',
    name: 'Emerald Necklace',
    type: 'outdoor',
    address: 'Back Bay Fens, Boston, MA',
    sunScore: 88,
    coordinates: [-71.0951, 42.3429],
    description: 'A chain of parks with well-maintained walking paths and open meadows. Multiple sun-drenched spots perfect for outdoor activities.',
    features: ['hiking_trails', 'outdoor_seating', 'shade_available'],
    imageUrl: 'https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg',
    distanceInKm: 2.1,
    weatherInfo: {
      temperature: 72,
      condition: 'Sunny',
      sunriseTime: format(sunrise, 'h:mm a'),
      sunsetTime: format(sunset, 'h:mm a'),
      uvIndex: 7
    }
  },
  {
    id: '8',
    name: 'Seaport Deck',
    type: 'outdoor',
    address: 'Seaport Blvd, Boston, MA',
    sunScore: 89,
    coordinates: [-71.0423, 42.3513],
    description: 'Modern waterfront deck with panoramic harbor views. Excellent spot for sunrise yoga or afternoon relaxation.',
    features: ['waterfront', 'outdoor_seating', 'east_facing'],
    imageUrl: 'https://images.pexels.com/photos/1769392/pexels-photo-1769392.jpeg',
    distanceInKm: 1.9,
    weatherInfo: {
      temperature: 70,
      condition: 'Clear',
      sunriseTime: format(sunrise, 'h:mm a'),
      sunsetTime: format(sunset, 'h:mm a'),
      uvIndex: 8
    }
  }
];

export const mockTrendingPlaces = [
  {
    id: 't1',
    name: "Harbor Islands",
    type: 'outdoor',
    sunScore: 94,
    imageUrl: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
    description: "Boston Harbor's hidden gems, perfect for a day trip with consistent sunshine and ocean breezes."
  },
  {
    id: 't2',
    name: 'SkyBar Lounge',
    type: 'indoor',
    sunScore: 88,
    imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    description: 'Trendy rooftop lounge with panoramic city views and excellent sun exposure until sunset.'
  },
  {
    id: 't3',
    name: 'Crystal Lake',
    type: 'outdoor',
    sunScore: 91,
    imageUrl: 'https://images.pexels.com/photos/147411/pexels-photo-147411.jpeg',
    description: 'Secluded lake with east-facing beaches that get amazing morning light and all-day sun.'
  }
];

export type TrendingPlace = typeof mockTrendingPlaces[number];

// You can add mockCities and mockTrendingPlaces here as well if needed 