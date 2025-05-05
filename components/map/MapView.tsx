import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLocationStore } from '@/lib/location-store';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

const MapView: React.FC = () => {
  const { locations, userLocation } = useLocationStore();

  const center = userLocation || {
    lat: 37.7749,
    lng: -122.4194
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            title={location.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView; 