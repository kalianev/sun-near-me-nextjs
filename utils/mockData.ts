import { Location } from '../store/locationStore';

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Gas Works Park',
    description: 'Historic industrial site turned park with stunning views of Lake Union and the Seattle skyline.',
    type: 'outdoor',
    address: '2101 N Northlake Way, Seattle, WA 98103',
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Gas+Works+Park+2101+N+Northlake+Way+Seattle+WA+98103',
    coordinates: {
      lat: 47.6459,
      lng: -122.3360
    },
    sunScore: 85,
    weatherInfo: {
      temperature: 72,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:30 AM',
      sunsetTime: '7:45 PM'
    },
    features: ['Picnic Areas', 'Walking Trails', 'Lake Views', 'Historic Structures']
  },
  {
    id: '2',
    name: 'Kerry Park',
    description: 'Iconic viewpoint offering panoramic views of downtown Seattle, the Space Needle, and Mount Rainier.',
    type: 'outdoor',
    address: '211 W Highland Dr, Seattle, WA 98119',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kerry+Park+211+W+Highland+Dr+Seattle+WA+98119',
    coordinates: {
      lat: 47.6295,
      lng: -122.3597
    },
    sunScore: 88,
    weatherInfo: {
      temperature: 70,
      condition: 'Partly Cloudy',
      uvIndex: 6,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Viewpoint', 'Photography', 'City Views', 'Mountain Views']
  },
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
    id: '4',
    name: 'Alki Beach',
    description: 'Popular beach with stunning views of downtown Seattle and the Olympic Mountains.',
    type: 'outdoor',
    address: '1702 Alki Ave SW, Seattle, WA 98116',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Alki+Beach+1702+Alki+Ave+SW+Seattle+WA+98116',
    coordinates: {
      lat: 47.5762,
      lng: -122.4096
    },
    sunScore: 90,
    weatherInfo: {
      temperature: 75,
      condition: 'Sunny',
      uvIndex: 8,
      sunriseTime: '6:30 AM',
      sunsetTime: '7:45 PM'
    },
    features: ['Beach', 'Volleyball Courts', 'Bike Path', 'Restaurants']
  },
  {
    id: '5',
    name: 'Green Lake Park',
    description: 'Popular urban park surrounding a freshwater lake with a 2.8-mile walking path.',
    type: 'outdoor',
    address: '7201 East Green Lake Dr N, Seattle, WA 98115',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Green+Lake+Park+7201+East+Green+Lake+Dr+N+Seattle+WA+98115',
    coordinates: {
      lat: 47.6785,
      lng: -122.3380
    },
    sunScore: 80,
    weatherInfo: {
      temperature: 73,
      condition: 'Partly Cloudy',
      uvIndex: 6,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Walking Path', 'Swimming Beach', 'Sports Fields', 'Playground']
  },
  {
    id: '6',
    name: 'Golden Gardens Park',
    description: 'Beautiful beach park with views of the Olympic Mountains and Puget Sound.',
    type: 'outdoor',
    address: '8498 Seaview Pl NW, Seattle, WA 98117',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Golden+Gardens+Park+8498+Seaview+Pl+NW+Seattle+WA+98117',
    coordinates: {
      lat: 47.6897,
      lng: -122.4028
    },
    sunScore: 87,
    weatherInfo: {
      temperature: 74,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:32 AM',
      sunsetTime: '7:42 PM'
    },
    features: ['Beach', 'Hiking Trails', 'Picnic Areas', 'Fire Pits']
  },
  {
    id: '7',
    name: 'Volunteer Park',
    description: 'Historic park featuring a conservatory, water tower, and Asian Art Museum.',
    type: 'outdoor',
    address: '1247 15th Ave E, Seattle, WA 98112',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Volunteer+Park+1247+15th+Ave+E+Seattle+WA+98112',
    coordinates: {
      lat: 47.6301,
      lng: -122.3157
    },
    sunScore: 83,
    weatherInfo: {
      temperature: 72,
      condition: 'Partly Cloudy',
      uvIndex: 6,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Conservatory', 'Water Tower', 'Museum', 'Lily Ponds']
  },
  {
    id: '8',
    name: 'Carkeek Park',
    description: 'Large park with beach access, forest trails, and views of the Olympic Mountains.',
    type: 'outdoor',
    address: '950 NW Carkeek Park Rd, Seattle, WA 98177',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Carkeek+Park+950+NW+Carkeek+Park+Rd+Seattle+WA+98177',
    coordinates: {
      lat: 47.7105,
      lng: -122.3768
    },
    sunScore: 81,
    weatherInfo: {
      temperature: 71,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:30 AM',
      sunsetTime: '7:45 PM'
    },
    features: ['Beach', 'Hiking Trails', 'Playground', 'Picnic Areas']
  },
  {
    id: '9',
    name: 'Seward Park',
    description: 'Peninsula park with old-growth forest, beaches, and views of Lake Washington.',
    type: 'outdoor',
    address: '5902 Lake Washington Blvd S, Seattle, WA 98118',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Seward+Park+5902+Lake+Washington+Blvd+S+Seattle+WA+98118',
    coordinates: {
      lat: 47.5497,
      lng: -122.2522
    },
    sunScore: 84,
    weatherInfo: {
      temperature: 73,
      condition: 'Sunny',
      uvIndex: 8,
      sunriseTime: '6:32 AM',
      sunsetTime: '7:42 PM'
    },
    features: ['Old Growth Forest', 'Beach', 'Bike Path', 'Audubon Center']
  },
  {
    id: '10',
    name: 'Magnuson Park',
    description: 'Large lakeside park with sports fields, beaches, and community gardens.',
    type: 'outdoor',
    address: '7400 Sand Point Way NE, Seattle, WA 98115',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Magnuson+Park+7400+Sand+Point+Way+NE+Seattle+WA+98115',
    coordinates: {
      lat: 47.6799,
      lng: -122.2559
    },
    sunScore: 86,
    weatherInfo: {
      temperature: 74,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Sports Fields', 'Beach', 'Community Gardens', 'Wetlands']
  },
  {
    id: '11',
    name: 'Myrtle Edwards Park',
    description: 'Waterfront park with views of Puget Sound and the Olympic Mountains.',
    type: 'outdoor',
    address: '3130 Alaskan Way, Seattle, WA 98121',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Myrtle+Edwards+Park+3130+Alaskan+Way+Seattle+WA+98121',
    coordinates: {
      lat: 47.6187,
      lng: -122.3547
    },
    sunScore: 89,
    weatherInfo: {
      temperature: 75,
      condition: 'Sunny',
      uvIndex: 8,
      sunriseTime: '6:30 AM',
      sunsetTime: '7:45 PM'
    },
    features: ['Bike Path', 'Beach', 'Sculpture', 'Mountain Views']
  },
  {
    id: '12',
    name: 'Washington Park Arboretum',
    description: '230-acre botanical garden with diverse plant collections and walking trails.',
    type: 'outdoor',
    address: '2300 Arboretum Dr E, Seattle, WA 98112',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Washington+Park+Arboretum+2300+Arboretum+Dr+E+Seattle+WA+98112',
    coordinates: {
      lat: 47.6377,
      lng: -122.2964
    },
    sunScore: 79,
    weatherInfo: {
      temperature: 72,
      condition: 'Partly Cloudy',
      uvIndex: 6,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Japanese Garden', 'Walking Trails', 'Plant Collections', 'Lake Views']
  },
  {
    id: '13',
    name: 'Lincoln Park',
    description: 'West Seattle park with beach access, forest trails, and views of Vashon Island.',
    type: 'outdoor',
    address: '8011 Fauntleroy Way SW, Seattle, WA 98136',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Lincoln+Park+8011+Fauntleroy+Way+SW+Seattle+WA+98136',
    coordinates: {
      lat: 47.5312,
      lng: -122.3934
    },
    sunScore: 82,
    weatherInfo: {
      temperature: 73,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:32 AM',
      sunsetTime: '7:42 PM'
    },
    features: ['Beach', 'Hiking Trails', 'Playground', 'Colman Pool']
  },
  {
    id: '14',
    name: 'Cal Anderson Park',
    description: 'Urban park in Capitol Hill with sports fields, water feature, and community gathering spaces.',
    type: 'outdoor',
    address: '1635 11th Ave, Seattle, WA 98122',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cal+Anderson+Park+1635+11th+Ave+Seattle+WA+98122',
    coordinates: {
      lat: 47.6174,
      lng: -122.3196
    },
    sunScore: 80,
    weatherInfo: {
      temperature: 71,
      condition: 'Partly Cloudy',
      uvIndex: 6,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Sports Fields', 'Water Feature', 'Dog Park', 'Community Space']
  },
  {
    id: '15',
    name: 'Kubota Garden',
    description: 'Japanese garden featuring traditional landscaping and peaceful walking paths.',
    type: 'outdoor',
    address: '9817 55th Ave S, Seattle, WA 98118',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kubota+Garden+9817+55th+Ave+S+Seattle+WA+98118',
    coordinates: {
      lat: 47.5123,
      lng: -122.2654
    },
    sunScore: 77,
    weatherInfo: {
      temperature: 70,
      condition: 'Partly Cloudy',
      uvIndex: 5,
      sunriseTime: '6:30 AM',
      sunsetTime: '7:45 PM'
    },
    features: ['Japanese Garden', 'Walking Paths', 'Water Features', 'Bamboo Grove']
  },
  {
    id: '16',
    name: 'Schmitz Preserve Park',
    description: 'Old-growth forest park with hiking trails and natural streams.',
    type: 'outdoor',
    address: '5551 SW Admiral Way, Seattle, WA 98116',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Schmitz+Preserve+Park+5551+SW+Admiral+Way+Seattle+WA+98116',
    coordinates: {
      lat: 47.5712,
      lng: -122.3876
    },
    sunScore: 76,
    weatherInfo: {
      temperature: 69,
      condition: 'Partly Cloudy',
      uvIndex: 5,
      sunriseTime: '6:32 AM',
      sunsetTime: '7:42 PM'
    },
    features: ['Hiking Trails', 'Old Growth Forest', 'Streams', 'Wildlife']
  },
  {
    id: '17',
    name: 'Woodland Park',
    description: 'Large park featuring the Woodland Park Zoo and extensive walking trails.',
    type: 'outdoor',
    address: '1000 N 50th St, Seattle, WA 98103',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Woodland+Park+1000+N+50th+St+Seattle+WA+98103',
    coordinates: {
      lat: 47.6685,
      lng: -122.3520
    },
    sunScore: 81,
    weatherInfo: {
      temperature: 72,
      condition: 'Sunny',
      uvIndex: 6,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Zoo', 'Walking Trails', 'Sports Fields', 'Playground']
  },
  {
    id: '18',
    name: 'Madison Park',
    description: 'Popular beach park on Lake Washington with swimming area and tennis courts.',
    type: 'outdoor',
    address: '43rd Ave E & E Madison St, Seattle, WA 98112',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Madison+Park+43rd+Ave+E+%26+E+Madison+St+Seattle+WA+98112',
    coordinates: {
      lat: 47.6097,
      lng: -122.2814
    },
    sunScore: 88,
    weatherInfo: {
      temperature: 74,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:30 AM',
      sunsetTime: '7:45 PM'
    },
    features: ['Beach', 'Swimming Area', 'Tennis Courts', 'Picnic Areas']
  },
  {
    id: '19',
    name: 'Leschi Park',
    description: 'Waterfront park on Lake Washington with marina and scenic views.',
    type: 'outdoor',
    address: '201 Lakeside Ave S, Seattle, WA 98144',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Leschi+Park+201+Lakeside+Ave+S+Seattle+WA+98144',
    coordinates: {
      lat: 47.5997,
      lng: -122.2874
    },
    sunScore: 85,
    weatherInfo: {
      temperature: 73,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:32 AM',
      sunsetTime: '7:42 PM'
    },
    features: ['Marina', 'Waterfront', 'Picnic Areas', 'Boat Launch']
  },
  {
    id: '20',
    name: 'Ella Bailey Park',
    description: 'Hilltop park with panoramic views of downtown Seattle and the Space Needle.',
    type: 'outdoor',
    address: '2601 W Smith St, Seattle, WA 98199',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Ella+Bailey+Park+2601+W+Smith+St+Seattle+WA+98199',
    coordinates: {
      lat: 47.6423,
      lng: -122.3774
    },
    sunScore: 90,
    weatherInfo: {
      temperature: 75,
      condition: 'Sunny',
      uvIndex: 8,
      sunriseTime: '6:35 AM',
      sunsetTime: '7:40 PM'
    },
    features: ['Viewpoint', 'Playground', 'Picnic Areas', 'City Views']
  },
  {
    id: '21',
    name: 'Olympic Sculpture Park',
    description: 'Outdoor art museum featuring large-scale sculptures and stunning views of Elliott Bay.',
    type: 'outdoor',
    address: '2901 Western Ave, Seattle, WA 98121',
    imageUrl: 'https://images.unsplash.com/photo-1515896769750-31548aa180ed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Olympic+Sculpture+Park+2901+Western+Ave+Seattle+WA+98121',
    coordinates: {
      lat: 47.6164,
      lng: -122.3555
    },
    sunScore: 86,
    weatherInfo: {
      temperature: 73,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '6:32 AM',
      sunsetTime: '7:42 PM'
    },
    features: ['Sculptures', 'Waterfront', 'Walking Path', 'Art Installations']
  }
];

export interface City {
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
}

export const mockCities: City[] = [
  {
    id: 'bos',
    name: 'Boston',
    state: 'MA',
    sunScore: 82,
    weatherInfo: {
      temperature: 75,
      condition: 'Sunny',
      uvIndex: 7,
      sunriseTime: '5:45 AM',
      sunsetTime: '8:15 PM',
      sunlightHours: 14.5
    },
    topActivities: ['Boston Common', 'Freedom Trail', 'Harbor Islands']
  },
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