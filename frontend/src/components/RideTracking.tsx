import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { LoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api"
import { RootState } from '@/lib/store';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090
};

const RideTracking = () => {
  const ride = useSelector((state: RootState) => state.ride.currentRide);
  const [userPosition, setUserPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number, lng: number } | null>(null);
  const [directions, setDirections] = useState<any>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to check if lat/lng are valid numbers
  const isValidLatLng = (cord: any) => {
    if (!cord) return false;
    const lat = Number(cord.lat);
    const lng = Number(cord.lng);
    return (
      typeof lat === "number" &&
      typeof lng === "number" &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      Math.abs(lat) <= 90 &&
      Math.abs(lng) <= 180
    );
  };

  // Ensure destination is set only when valid and not null
  useEffect(() => {
    // Defensive: log and check types
    // console.log("ride.destnationCord", ride?.destnationCord);
    if (
      ride?.destnationCord &&
      (typeof ride.destnationCord.lat === "number" || typeof ride.destnationCord.lat === "string") &&
      (typeof ride.destnationCord.lng === "number" || typeof ride.destnationCord.lng === "string")
    ) {
      const lat = Number(ride.destnationCord.lat);
      const lng = Number(ride.destnationCord.lng);
      if (!isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
        setDestination({ lat, lng });
      } else {
        setDestination(null);
      }
    } else {
      setDestination(null);
    }
  }, [ride?.destnationCord]);

  useEffect(() => {
    function updateLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            });
          },
          (err) => {
            // Handle error if needed
          },
          { enableHighAccuracy: true }
        );
      }
      setDestination({lat:ride?.destnationCord.lat as number, lng:ride?.destnationCord.lng as number})
    }
    updateLocation();
    intervalRef.current = setInterval(updateLocation, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    // Only reset directions if both positions are valid
    if (userPosition && destination && isValidLatLng(destination)) {
      setDirections(null); 
    }
  }, [userPosition, destination]);

  const handleDirectionsCallback = (result: any, status: string) => {
    if (status === "OK" && result) {
      setDirections(result);
      const route = result.routes[0];
      if (route && route.legs && route.legs[0]) {
        setDistance(route.legs[0].distance.text);
      }
    }
  };

  console.log(destination);

  // Debug: log destination to verify values
  // Remove or comment out in production
  // console.log("Destination:", destination);

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userPosition || destination || defaultCenter}
          zoom={15}
        >
          {userPosition && <Marker position={userPosition} label="You" />}
          {destination && isValidLatLng(destination) && (
            <Marker position={destination} label="Destination" />
          )}
          {userPosition && destination && isValidLatLng(destination) && !directions && (
            <DirectionsService
              options={{
                origin: userPosition,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
              }}
              callback={handleDirectionsCallback}
            />
          )}
          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <div className="mt-2 text-center">
        {distance
          ? <span>Distance left: <b>{distance}</b></span>
          : <span>Calculating distance...</span>
        }
      </div>
    </div>
  )
}

export default RideTracking