import React, { useEffect, useState, useRef } from 'react'
import { LoadScript, Marker, GoogleMap } from "@react-google-maps/api"
import { useSelector } from 'react-redux'

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 28.6139, // Default to New Delhi
  lng: 77.2090
};

const LiveTracking = () => {
  const [position, setPosition] = useState<{ lat: number, lng: number } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function updateLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
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
    }
    updateLocation();
    intervalRef.current = setInterval(updateLocation, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <div className='w-full h-full'>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position || defaultCenter}
          zoom={15}
        >
          {position && (
            <Marker position={position} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default LiveTracking