import { Location } from '../store/locationStore';

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Central Park',
    address: 'Central Park, New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856',
    sunScore: 85,
    weatherInfo: {
      temperature: 72,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:30 AM',
      sunsetTime: '7:45 PM'
    },
    features: ['Picnic_Areas', 'Walking_Trails', 'Lakes']
  },
  {
    id: '2',
    name: 'Battery Park',
    address: 'Battery Park, New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    sunScore: 78,
    weatherInfo: {
      temperature: 70,
      condition: 'Partly Cloudy',
      uvIndex: 6,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Waterfront', 'Gardens', 'Monuments']
  },
  {
    id: '3',
    name: 'Riverside Park',
    address: 'Riverside Park, New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    sunScore: 82,
    weatherInfo: {
      temperature: 71,
      condition: 'Sunny',
      uvIndex: 8,
      sunriseTime: '6:32 AM',
      sunsetTime: '7:42 PM'
    },
    features: ['Bike_Paths', 'Playgrounds', 'Sports_Fields']
  }
];

export interface City {
  id: string;
  name: string;
  state: string;
  sunScore: number;
  coordinates: [number, number];
  topActivities: string[];
  weatherInfo: {
    temperature: number;
    condition: string;
    sunriseTime: string;
    sunsetTime: string;
    uvIndex: number;
    sunlightHours: number;
  };
}

export const mockCities: City[] = [
  {
    id: 'boston',
    name: 'Boston',
    state: 'MA',
    sunScore: 88,
    coordinates: [42.3601, -71.0589] as [number, number],
    topActivities: ['Fenway Park Tour', 'Harbor Walk', 'Public Garden'],
    weatherInfo: {
      temperature: 75,
      condition: 'Sunny',
      sunriseTime: '6:15 AM',
      sunsetTime: '7:30 PM',
      uvIndex: 8,
      sunlightHours: 13
    }
  },
  {
    id: 'providence',
    name: 'Providence',
    state: 'RI',
    sunScore: 82,
    coordinates: [41.8240, -71.4128] as [number, number],
    topActivities: ['WaterFire', 'Roger Williams Park', 'East Bay Bike Path'],
    weatherInfo: {
      temperature: 73,
      condition: 'Partly Cloudy',
      sunriseTime: '6:20 AM',
      sunsetTime: '7:25 PM',
      uvIndex: 7,
      sunlightHours: 12
    }
  },
  {
    id: 'portland',
    name: 'Portland',
    state: 'ME',
    sunScore: 79,
    coordinates: [43.6591, -70.2568] as [number, number],
    topActivities: ['Old Port', 'Eastern Promenade', 'Portland Head Light'],
    weatherInfo: {
      temperature: 68,
      condition: 'Partly Cloudy',
      sunriseTime: '6:25 AM',
      sunsetTime: '7:20 PM',
      uvIndex: 6,
      sunlightHours: 11
    }
  }
]; 