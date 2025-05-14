import { format } from 'date-fns';
import { Location } from './location-store';

const today = new Date();
const sunrise = new Date(today);
sunrise.setHours(6, 30, 0, 0);
const sunset = new Date(today);
sunset.setHours(19, 15, 0, 0);

export type City = {
  id: string;
  name: string;
  state: string;
  sunScore: number;
  weatherInfo: {
    temperature: number;
    condition: string;
    uvIndex: number;
    sunriseTime: string;
    sunsetTime: string;
    sunlightHours: number;
  };
  topActivities: string[];
};

export const mockLocations: Location[] = [
  {
    id: '3',
    name: 'Discovery Park',
    description: 'Seattle\'s largest public park featuring miles of trails, beaches, and stunning views of Puget Sound.',
    type: 'outdoor',
    address: '3801 Discovery Park Blvd, Seattle, WA 98199',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Discovery+Park+3801+Discovery+Park+Blvd+Seattle+WA+98199',
    coordinates: {
      lat: 47.6614,
      lng: -122.4270
    },
    sunScore: 82,
    weatherInfo: {
      temperature: 71,
      condition: 'Sunny',
      uvIndex: 8,
      sunriseTime: '6:32 AM',
      sunsetTime: '7:42 PM'
    },
    features: ['Hiking Trails', 'Beach Access', 'Lighthouse', 'Wildlife Viewing']
  },
  {
    id: "1",
    name: "Baker Beach",
    description: "A scenic beach with stunning views of the Golden Gate Bridge and Marin Headlands.",
    type: "outdoor",
    coordinates: {
      lat: 37.7937,
      lng: -122.4838
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Baker_Beach%2C_San_Francisco%2C_CA%2C_USA_-_panoramio.jpg/1280px-Baker_Beach%2C_San_Francisco%2C_CA%2C_USA_-_panoramio.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Lands_End_Trail%2C_San_Francisco%2C_CA%2C_USA_-_panoramio.jpg/1280px-Lands_End_Trail%2C_San_Francisco%2C_CA%2C_USA_-_panoramio.jpg",
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Crissy_Field%2C_San_Francisco%2C_CA%2C_USA_-_panoramio.jpg/1280px-Crissy_Field%2C_San_Francisco%2C_CA%2C_USA_-_panoramio.jpg",
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
    coordinates: {
      lat: 42.3551,
      lng: -71.0662
    },
    description: 'Historic public park offering wide open green spaces perfect for sunbathing, picnics, and outdoor activities. Minimal tree coverage in the main lawn areas.',
    features: ['outdoor_seating', 'shade_available'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Boston_Common_2010.jpg/1280px-Boston_Common_2010.jpg',
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
    coordinates: {
      lat: 42.3596,
      lng: -71.0498
    },
    description: 'A scenic pier along the harbor with unobstructed sunlight and cooling ocean breezes. Perfect for watching the sunset over the water.',
    features: ['waterfront', 'outdoor_seating', 'west_facing'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Boston_Harbor_Walk.jpg/1280px-Boston_Harbor_Walk.jpg',
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
    coordinates: {
      lat: 42.3488,
      lng: -71.0873
    },
    description: 'A modern dining establishment with a glass-enclosed dining room and retractable roof sections. Natural light floods the space even on cloudy days.',
    features: ['floor_to_ceiling_windows', 'skylight', 'south_facing'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Newbury_Street%2C_Boston%2C_MA%2C_USA_-_panoramio.jpg/1280px-Newbury_Street%2C_Boston%2C_MA%2C_USA_-_panoramio.jpg',
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
    coordinates: {
      lat: 42.3429,
      lng: -71.0951
    },
    description: 'A chain of parks with well-maintained walking paths and open meadows. Multiple sun-drenched spots perfect for outdoor activities.',
    features: ['hiking_trails', 'outdoor_seating', 'shade_available'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Back_Bay_Fens%2C_Boston%2C_MA%2C_USA_-_panoramio.jpg/1280px-Back_Bay_Fens%2C_Boston%2C_MA%2C_USA_-_panoramio.jpg',
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
    coordinates: {
      lat: 42.3513,
      lng: -71.0423
    },
    description: 'Modern waterfront deck with panoramic harbor views. Excellent spot for sunrise yoga or afternoon relaxation.',
    features: ['waterfront', 'outdoor_seating', 'east_facing'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Boston_Seaport_District.jpg/1280px-Boston_Seaport_District.jpg',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Boston_Harbor_Islands.jpg/1280px-Boston_Harbor_Islands.jpg',
    description: "Boston Harbor's hidden gems, perfect for a day trip with consistent sunshine and ocean breezes."
  },
  {
    id: 't2',
    name: 'SkyBar Lounge',
    type: 'indoor',
    sunScore: 88,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Newbury_Street%2C_Boston%2C_MA%2C_USA_-_panoramio.jpg/1280px-Newbury_Street%2C_Boston%2C_MA%2C_USA_-_panoramio.jpg',
    description: 'Trendy rooftop lounge with panoramic city views and excellent sun exposure until sunset.'
  },
  {
    id: 't3',
    name: 'Crystal Lake',
    type: 'outdoor',
    sunScore: 91,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Back_Bay_Fens%2C_Boston%2C_MA%2C_USA_-_panoramio.jpg/1280px-Back_Bay_Fens%2C_Boston%2C_MA%2C_USA_-_panoramio.jpg',
    description: 'Secluded lake with east-facing beaches that get amazing morning light and all-day sun.'
  }
];

export type TrendingPlace = typeof mockTrendingPlaces[number];

export const mockCities: City[] = [
  {
    id: 'prov',
    name: 'Providence',
    state: 'RI',
    sunScore: 78,
    weatherInfo: {
      temperature: 73,
      condition: 'Partly Cloudy',
      uvIndex: 6,
      sunriseTime: '5:48 AM',
      sunsetTime: '8:12 PM',
      sunlightHours: 14.4
    },
    topActivities: ['Waterplace Park', 'Roger Williams Park', 'India Point Park']
  },
  {
    id: 'port',
    name: 'Portland',
    state: 'ME',
    sunScore: 75,
    weatherInfo: {
      temperature: 70,
      condition: 'Partly Cloudy',
      uvIndex: 5,
      sunriseTime: '5:40 AM',
      sunsetTime: '8:20 PM',
      sunlightHours: 14.7
    },
    topActivities: ['Eastern Promenade', 'Portland Head Light', 'Peaks Island']
  }
];

// You can add mockCities and mockTrendingPlaces here as well if needed 