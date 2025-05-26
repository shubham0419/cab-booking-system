"use client"
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { RootState } from '@/lib/store';

// Types
interface Position {
  lat: number;
  lng: number;
}

interface RideState {
  currentRide?: {
    destnationCord: Position;
  };
}

// Constants
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

const DEFAULT_CENTER: Position = {
  lat: 28.6139,
  lng: 77.2090
};

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 30000
};

const UPDATE_INTERVAL = 10000; // 10 seconds
const LIBRARIES: ('drawing' | 'geometry' | 'places' | 'visualization')[] = ['geometry'];

const RideTracking: React.FC = () => {
  // Redux state
  const ride = useSelector((state: RootState) => state.ride.currentRide);
  
  // Local state
  const [userPosition, setUserPosition] = useState<Position | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const directionsCallbackRef = useRef<boolean>(false);

  // Memoized destination from ride data
  const destination = useMemo<Position | null>(() => {
    if (!ride?.destnationCord) return null;
    return {
      lat: ride?.destnationCord.lat as number,
      lng: ride?.destnationCord.lng as number
    };
  }, [ride?.destnationCord]);

  // Memoized map center
  const mapCenter = useMemo(() => {
    return userPosition || destination || DEFAULT_CENTER;
  }, [userPosition, destination]);

  // Check if positions are significantly different to avoid unnecessary updates
  const positionsChanged = useCallback((pos1: Position | null, pos2: Position | null): boolean => {
    if (!pos1 || !pos2) return true;
    const threshold = 0.0001; // ~10 meters
    return Math.abs(pos1.lat - pos2.lat) > threshold || Math.abs(pos1.lng - pos2.lng) > threshold;
  }, []);

  // Get user location
  const updateLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition: Position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        setUserPosition(prevPosition => {
          // Only update if position changed significantly
          if (!positionsChanged(prevPosition, newPosition)) {
            return prevPosition;
          }
          return newPosition;
        });
        setError(null);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(`Location error: ${err.message}`);
      },
      GEOLOCATION_OPTIONS
    );
  }, [positionsChanged]);

  // Setup location tracking
  useEffect(() => {
    updateLocation();
    intervalRef.current = setInterval(updateLocation, UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateLocation]);

  // Reset directions when positions change
  useEffect(() => {
    if (userPosition && destination) {
      setDirections(null);
      setDistance(null);
      directionsCallbackRef.current = false;
      setIsLoading(true);
    }
  }, [userPosition, destination]);

  // Directions callback
  const handleDirectionsCallback = useCallback((
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    // Prevent multiple callbacks
    if (directionsCallbackRef.current) return;
    directionsCallbackRef.current = true;
    setIsLoading(false);

    if (status === google.maps.DirectionsStatus.OK && result) {
      setDirections(result);
      const route = result.routes[0];
      const leg = route?.legs?.[0];
      if (leg?.distance?.text) {
        setDistance(leg.distance.text);
      }
      setError(null);
    } else {
      console.error("Directions request failed:", status);
      setError("Failed to calculate route");
    }
  }, []);

  // Memoized directions service options
  const directionsOptions = useMemo(() => {
    if (!userPosition || !destination) return null;
    
    return {
      origin: userPosition,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      avoidHighways: false,
      avoidTolls: false
    };
  }, [userPosition, destination]);

  return (
    <div className="w-full h-full">
      <LoadScript 
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={LIBRARIES}
        loadingElement={<div className="h-96 flex items-center justify-center">Loading Maps...</div>}
      >
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={mapCenter}
          zoom={15}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          {/* User position marker */}
          {userPosition && (
            <Marker 
              position={userPosition} 
              label={{
                text: "You",
                color: "white",
                fontWeight: "bold"
              }}
              icon={{
                url: "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3ccircle cx='12' cy='12' r='8' fill='%234285f4'/%3e%3ccircle cx='12' cy='12' r='3' fill='white'/%3e%3c/svg%3e",
                scaledSize: new google.maps.Size(24, 24)
              }}
            />
          )}
          
          {/* Destination marker */}
          {destination && (
            <Marker 
              position={destination} 
              label={{
                text: "Dest",
                color: "white",
                fontWeight: "bold"
              }}
              icon={{
                url: "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z' fill='%23ea4335'/%3e%3ccircle cx='12' cy='9' r='2.5' fill='white'/%3e%3c/svg%3e",
                scaledSize: new google.maps.Size(24, 24)
              }}
            />
          )}
          
          {/* Directions service */}
          {directionsOptions && !directionsCallbackRef.current && (
            <DirectionsService
              options={directionsOptions}
              callback={handleDirectionsCallback}
            />
          )}
          
          {/* Directions renderer */}
          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions,
                suppressMarkers: true, // We're using custom markers
                polylineOptions: {
                  strokeColor: "#4285f4",
                  strokeWeight: 4,
                  strokeOpacity: 0.8
                }
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      
      {/* Status display */}
      <div className="mt-4 text-center">
        {error && (
          <div className="text-red-600 mb-2 text-sm">
            {error}
          </div>
        )}
        
        {isLoading && (
          <div className="text-gray-600 text-sm">
            Calculating route...
          </div>
        )}
        
        {distance && !isLoading && (
          <div className="text-lg">
            Distance remaining: <span className="font-bold text-blue-600">{distance}</span>
          </div>
        )}
        
        {!userPosition && !error && (
          <div className="text-gray-600 text-sm">
            Getting your location...
          </div>
        )}
        
        {!destination && ride && (
          <div className="text-yellow-600 text-sm">
            No destination set for current ride
          </div>
        )}
      </div>
    </div>
  );
};

export default RideTracking;