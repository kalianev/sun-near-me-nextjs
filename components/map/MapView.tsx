import React, { useEffect, useState } from 'react';
import { useLocationStore } from '@/store/locationStore';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { getTopSunspots, SunspotResult } from '@/lib/utils';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

const MapView: React.FC = () => {
  const { locations, userLocation } = useLocationStore();
  const [topSunspots, setTopSunspots] = useState<SunspotResult[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<SunspotResult | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (userLocation) {
      const spots = getTopSunspots(userLocation.lat, userLocation.lng, locations);
      setTopSunspots(spots);
    }
  }, [userLocation, locations]);

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
        <p className="text-sm text-slate-500">Google Maps API key not configured</p>
      </div>
    );
  }

  const center = userLocation || {
    lat: 37.7749,
    lng: -122.4194
  };

  // Calculate bounds to fit all markers
  const bounds = new google.maps.LatLngBounds();
  if (userLocation) {
    bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lng));
  }
  topSunspots.forEach(spot => {
    bounds.extend(new google.maps.LatLng(spot.lat, spot.lng));
  });

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        onLoad={map => {
          if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            map.setZoom(13);
          } else {
            map.fitBounds(bounds);
          }
        }}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        )}

        {/* Top sunspot markers */}
        {topSunspots.map((spot) => (
          <Marker
            key={spot.name}
            position={{ lat: spot.lat, lng: spot.lng }}
            onClick={() => setSelectedSpot(spot)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#FFA500',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        ))}

        {/* Info window for selected spot */}
        {selectedSpot && (
          <InfoWindow
            position={{ lat: selectedSpot.lat, lng: selectedSpot.lng }}
            onCloseClick={() => setSelectedSpot(null)}
          >
            <div className="p-2">
              <h3 className="font-semibold">{selectedSpot.name}</h3>
              <p className="text-sm">Sun Score: {selectedSpot.sunScore}</p>
              <p className="text-sm">Distance: {selectedSpot.distanceInKm.toFixed(1)} km</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView; 