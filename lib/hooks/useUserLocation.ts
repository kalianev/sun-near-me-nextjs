import { useState, useEffect } from 'react';
import { useLocationStore } from '@/store/locationStore';

export function useUserLocation() {
  const { setUserLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      return { lat: latitude, lng: longitude };
    } catch (err) {
      const errorMessage = err instanceof GeolocationPositionError
        ? err.message
        : 'Failed to get location';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestLocation,
    isLoading,
    error
  };
} 