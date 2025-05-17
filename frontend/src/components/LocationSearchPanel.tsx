import RideServices from '@/services/ride.service';
import { MapPin, Loader2 } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { debounce } from 'lodash';
import { setDestination, setPickup } from '@/lib/features/ride/rideSlice';

interface LocationSearchPanelProps {
  setVehiclePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationSearchPanel: React.FC<LocationSearchPanelProps> = ({setVehiclePanelOpen,setPanelOpen}) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pickup = useSelector((state: RootState) => state.ride.pickup);
  const destination = useSelector((state: RootState) => state.ride.destination);
  const activeInput = useSelector((state: RootState) => state.ride.activeInput);

  const dispatch = useDispatch();

  
  const rideServices = React.useMemo(() => RideServices, []);
  
  const debouncedGetSuggestions = useCallback(
    debounce(async (address: string) => {
      if (!address || address.trim() === '') {
        setLocations([]);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await rideServices.getSuggestions(address);
        setLocations(res.data.suggestions || []);
      } catch (err) {
        console.error('Error fetching location suggestions:', err);
        setError('Failed to load suggestions. Please try again.');
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [rideServices]
  );
  
  useEffect(() => {
    debouncedGetSuggestions(pickup as string);

    return () => {
      debouncedGetSuggestions.cancel();
    };
  }, [pickup, debouncedGetSuggestions]);
  
  useEffect(() => {
    debouncedGetSuggestions(destination as string);
    

    return () => {
      debouncedGetSuggestions.cancel();
    };
  }, [destination, debouncedGetSuggestions]);
  
  const handleLocationSelect = (location: string) => {
    if(activeInput === 'pickup') {
      dispatch(setPickup(location));
    }
    if(activeInput === 'destination') {
      dispatch(setDestination(location));
    }
    if(pickup && destination) {
      setPanelOpen(false);
      setVehiclePanelOpen(true);
    }
  };
  
  return (
    <div className="text-black overflow-y-auto h-full flex flex-col">
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      )}
      
      {error && (
        <div className="text-red-500 p-4 text-center">
          {error}
        </div>
      )}
      
      {!isLoading && !error && locations.length === 0 && (
        <div className="text-gray-500 p-4 text-center">
          No location suggestions found. Try entering a different address.
        </div>
      )}
      
      {locations.map((location, index) => (
        <div
          key={`location-${index}`}
          onClick={() => handleLocationSelect(location)}
          className="flex items-center gap-3 py-3 px-4 border-b border-gray-100 active:bg-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="bg-gray-100 rounded-full p-2 flex justify-center items-center">
            <MapPin size={18} className="text-gray-700" />
          </div>
          <h4 className="font-medium text-gray-800">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;