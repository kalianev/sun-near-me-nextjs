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

export const locations: Location[] = [
  {
    id: "1",
    name: "Baker Beach",
    description: "A scenic beach with stunning views of the Golden Gate Bridge and Marin Headlands.",
    type: "beach",
    coordinates: {
      lat: 37.7937,
      lng: -122.4838
    },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
    sunScore: 9.5,
    bestTime: {
      sunrise: "6:45 AM",
      sunset: "7:30 PM",
      goldenHour: "6:30 PM"
    },
    activities: ["Photography", "Beach Walk", "Picnic", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Picnic Tables"]
  },
  {
    id: "2",
    name: "Lands End Trail",
    description: "A coastal trail offering panoramic views of the Pacific Ocean and Golden Gate Bridge.",
    type: "trail",
    coordinates: {
      lat: 37.7786,
      lng: -122.5118
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 8.5,
    bestTime: {
      sunrise: "6:50 AM",
      sunset: "7:35 PM",
      goldenHour: "6:35 PM"
    },
    activities: ["Hiking", "Photography", "Bird Watching", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Visitor Center"]
  },
  {
    id: "3",
    name: "Crissy Field",
    description: "A waterfront park with stunning views of the Golden Gate Bridge and San Francisco Bay.",
    type: "park",
    coordinates: {
      lat: 37.8024,
      lng: -122.4658
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.0,
    bestTime: {
      sunrise: "6:40 AM",
      sunset: "7:25 PM",
      goldenHour: "6:25 PM"
    },
    activities: ["Walking", "Cycling", "Photography", "Picnic"],
    amenities: ["Restrooms", "Parking", "Cafe", "Bike Rentals"]
  },
  {
    id: "4",
    name: "Twin Peaks",
    description: "The highest point in San Francisco offering 360-degree views of the city.",
    type: "viewpoint",
    coordinates: {
      lat: 37.7516,
      lng: -122.4475
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.8,
    bestTime: {
      sunrise: "6:35 AM",
      sunset: "7:20 PM",
      goldenHour: "6:20 PM"
    },
    activities: ["Photography", "Sunrise Viewing", "Sunset Viewing"],
    amenities: ["Parking", "Viewing Platforms"]
  },
  {
    id: "5",
    name: "Fort Point",
    description: "Historic fort with dramatic views of the Golden Gate Bridge from below.",
    type: "viewpoint",
    coordinates: {
      lat: 37.8106,
      lng: -122.4770
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 8.7,
    bestTime: {
      sunrise: "6:42 AM",
      sunset: "7:27 PM",
      goldenHour: "6:27 PM"
    },
    activities: ["Photography", "History Tour", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Visitor Center"]
  },
  {
    id: "6",
    name: "Ocean Beach",
    description: "A long, sandy beach perfect for sunset walks and beach activities.",
    type: "beach",
    coordinates: {
      lat: 37.7604,
      lng: -122.5117
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.2,
    bestTime: {
      sunrise: "6:48 AM",
      sunset: "7:33 PM",
      goldenHour: "6:33 PM"
    },
    activities: ["Beach Walk", "Photography", "Surfing", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Outdoor Showers"]
  },
  {
    id: "7",
    name: "Sutro Baths",
    description: "Historic ruins with dramatic ocean views and sunset photography opportunities.",
    type: "viewpoint",
    coordinates: {
      lat: 37.7785,
      lng: -122.5139
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.3,
    bestTime: {
      sunrise: "6:46 AM",
      sunset: "7:31 PM",
      goldenHour: "6:31 PM"
    },
    activities: ["Photography", "History Tour", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Visitor Center"]
  },
  {
    id: "8",
    name: "Golden Gate Park",
    description: "Large urban park with various gardens and scenic spots.",
    type: "park",
    coordinates: {
      lat: 37.7694,
      lng: -122.4862
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 8.8,
    bestTime: {
      sunrise: "6:44 AM",
      sunset: "7:29 PM",
      goldenHour: "6:29 PM"
    },
    activities: ["Walking", "Photography", "Picnic", "Gardens"],
    amenities: ["Restrooms", "Parking", "Cafes", "Museums"]
  },
  {
    id: "9",
    name: "Palace of Fine Arts",
    description: "Historic landmark with beautiful architecture and reflecting pool.",
    type: "viewpoint",
    coordinates: {
      lat: 37.8024,
      lng: -122.4488
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 8.9,
    bestTime: {
      sunrise: "6:41 AM",
      sunset: "7:26 PM",
      goldenHour: "6:26 PM"
    },
    activities: ["Photography", "Walking", "Architecture Tour"],
    amenities: ["Restrooms", "Parking", "Cafe"]
  },
  {
    id: "10",
    name: "Aquatic Park",
    description: "Historic waterfront park with views of the bay and Alcatraz.",
    type: "park",
    coordinates: {
      lat: 37.8060,
      lng: -122.4211
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 8.6,
    bestTime: {
      sunrise: "6:43 AM",
      sunset: "7:28 PM",
      goldenHour: "6:28 PM"
    },
    activities: ["Walking", "Photography", "Swimming", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Beach", "Pier"]
  },
  {
    id: "11",
    name: "Coit Tower",
    description: "Historic tower offering panoramic views of the city and bay.",
    type: "viewpoint",
    coordinates: {
      lat: 37.8024,
      lng: -122.4058
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.4,
    bestTime: {
      sunrise: "6:39 AM",
      sunset: "7:24 PM",
      goldenHour: "6:24 PM"
    },
    activities: ["Photography", "City Views", "Sunrise Viewing", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Elevator"]
  },
  {
    id: "12",
    name: "Fort Mason",
    description: "Historic military post with waterfront views and cultural venues.",
    type: "park",
    coordinates: {
      lat: 37.8065,
      lng: -122.4312
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 8.7,
    bestTime: {
      sunrise: "6:40 AM",
      sunset: "7:25 PM",
      goldenHour: "6:25 PM"
    },
    activities: ["Walking", "Photography", "Museums", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Cafes", "Galleries"]
  },
  {
    id: "13",
    name: "Marshall's Beach",
    description: "Secluded beach with dramatic views of the Golden Gate Bridge.",
    type: "beach",
    coordinates: {
      lat: 37.7917,
      lng: -122.4830
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.6,
    bestTime: {
      sunrise: "6:47 AM",
      sunset: "7:32 PM",
      goldenHour: "6:32 PM"
    },
    activities: ["Photography", "Beach Walk", "Sunset Viewing"],
    amenities: ["Beach Access"]
  },
  {
    id: "14",
    name: "Presidio Tunnel Tops",
    description: "New park with panoramic views of the Golden Gate Bridge and bay.",
    type: "park",
    coordinates: {
      lat: 37.8014,
      lng: -122.4587
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.1,
    bestTime: {
      sunrise: "6:45 AM",
      sunset: "7:30 PM",
      goldenHour: "6:30 PM"
    },
    activities: ["Walking", "Photography", "Picnic", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Cafe", "Playground"]
  },
  {
    id: "15",
    name: "China Beach",
    description: "Small, sheltered beach with views of the Golden Gate Bridge.",
    type: "beach",
    coordinates: {
      lat: 37.7912,
      lng: -122.4912
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.2,
    bestTime: {
      sunrise: "6:46 AM",
      sunset: "7:31 PM",
      goldenHour: "6:31 PM"
    },
    activities: ["Photography", "Beach Walk", "Swimming", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Beach Access"]
  },
  {
    id: "16",
    name: "Fort Funston",
    description: "Clifftop park with dramatic ocean views and hang gliding.",
    type: "park",
    coordinates: {
      lat: 37.7197,
      lng: -122.5028
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.3,
    bestTime: {
      sunrise: "6:49 AM",
      sunset: "7:34 PM",
      goldenHour: "6:34 PM"
    },
    activities: ["Hiking", "Photography", "Hang Gliding", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking", "Visitor Center"]
  },
  {
    id: "17",
    name: "Bernal Heights Park",
    description: "Hilltop park with 360-degree views of the city.",
    type: "viewpoint",
    coordinates: {
      lat: 37.7414,
      lng: -122.4141
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.7,
    bestTime: {
      sunrise: "6:38 AM",
      sunset: "7:23 PM",
      goldenHour: "6:23 PM"
    },
    activities: ["Photography", "Walking", "Sunrise Viewing", "Sunset Viewing"],
    amenities: ["Parking"]
  },
  {
    id: "18",
    name: "Glen Canyon Park",
    description: "Natural canyon with hiking trails and wildlife.",
    type: "park",
    coordinates: {
      lat: 37.7374,
      lng: -122.4434
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 8.4,
    bestTime: {
      sunrise: "6:44 AM",
      sunset: "7:29 PM",
      goldenHour: "6:29 PM"
    },
    activities: ["Hiking", "Photography", "Nature Watching"],
    amenities: ["Restrooms", "Parking", "Playground"]
  },
  {
    id: "19",
    name: "Grand View Park",
    description: "Small park with panoramic views of the city and ocean.",
    type: "viewpoint",
    coordinates: {
      lat: 37.7564,
      lng: -122.4658
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.5,
    bestTime: {
      sunrise: "6:41 AM",
      sunset: "7:26 PM",
      goldenHour: "6:26 PM"
    },
    activities: ["Photography", "Sunrise Viewing", "Sunset Viewing"],
    amenities: ["Parking"]
  },
  {
    id: "20",
    name: "Sutro Heights Park",
    description: "Historic park with ocean views and Victorian architecture.",
    type: "park",
    coordinates: {
      lat: 37.7783,
      lng: -122.5108
    },
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000",
    sunScore: 9.0,
    bestTime: {
      sunrise: "6:47 AM",
      sunset: "7:32 PM",
      goldenHour: "6:32 PM"
    },
    activities: ["Photography", "Walking", "History Tour", "Sunset Viewing"],
    amenities: ["Restrooms", "Parking"]
  }
]

export interface Recommendation {
  id: string
  location: Location
  bestTime: string
  reason: string
  sunScore: number
}

export const recommendations: Recommendation[] = [
  {
    id: "1",
    location: locations[0], // Baker Beach
    bestTime: "4:00 PM - Golden Hour",
    reason: "Perfect for sunset photography with the Golden Gate Bridge in the background",
    sunScore: 9.5
  },
  {
    id: "2",
    location: locations[1], // Lands End Trail
    bestTime: "6:30 AM - Sunrise",
    reason: "Dramatic morning light on the coastal cliffs",
    sunScore: 8.5
  },
  {
    id: "3",
    location: locations[2], // Crissy Field
    bestTime: "5:30 PM - Golden Hour",
    reason: "Beautiful golden light on the Golden Gate Bridge",
    sunScore: 9.0
  },
  {
    id: "4",
    location: locations[3], // Twin Peaks
    bestTime: "6:35 AM - Sunrise",
    reason: "360-degree panoramic views of the city at sunrise",
    sunScore: 9.8
  },
  {
    id: "5",
    location: locations[4], // Fort Point
    bestTime: "6:42 AM - Sunrise",
    reason: "Unique perspective of the Golden Gate Bridge from below",
    sunScore: 8.7
  },
  {
    id: "6",
    location: locations[5], // Ocean Beach
    bestTime: "6:48 AM - Sunrise",
    reason: "Long stretch of beach perfect for morning walks and photography",
    sunScore: 9.2
  },
  {
    id: "7",
    location: locations[6], // Sutro Baths
    bestTime: "6:46 AM - Sunrise",
    reason: "Historic ruins with dramatic ocean views",
    sunScore: 9.3
  },
  {
    id: "8",
    location: locations[7], // Golden Gate Park
    bestTime: "6:44 AM - Sunrise",
    reason: "Peaceful morning light through the trees and gardens",
    sunScore: 8.8
  },
  {
    id: "9",
    location: locations[8], // Palace of Fine Arts
    bestTime: "6:41 AM - Sunrise",
    reason: "Classical architecture bathed in morning light",
    sunScore: 8.9
  },
  {
    id: "10",
    location: locations[9], // Aquatic Park
    bestTime: "6:43 AM - Sunrise",
    reason: "Historic waterfront with views of Alcatraz",
    sunScore: 8.6
  },
  {
    id: "11",
    location: locations[10], // Coit Tower
    bestTime: "6:39 AM - Sunrise",
    reason: "Panoramic city views from above",
    sunScore: 9.4
  },
  {
    id: "12",
    location: locations[11], // Fort Mason
    bestTime: "6:40 AM - Sunrise",
    reason: "Waterfront views with historic architecture",
    sunScore: 8.7
  },
  {
    id: "13",
    location: locations[12], // Marshall's Beach
    bestTime: "6:47 AM - Sunrise",
    reason: "Secluded beach with dramatic bridge views",
    sunScore: 9.6
  },
  {
    id: "14",
    location: locations[13], // Presidio Tunnel Tops
    bestTime: "6:45 AM - Sunrise",
    reason: "New park with panoramic bridge views",
    sunScore: 9.1
  },
  {
    id: "15",
    location: locations[14], // China Beach
    bestTime: "6:46 AM - Sunrise",
    reason: "Sheltered beach perfect for morning photography",
    sunScore: 9.2
  }
]

// Old mock locations and related types have been moved to mock-data.ts
// Keep only real or unique data in this file.

// (If you have real API data or unique types, keep them here. Otherwise, this file can be cleaned up.) 