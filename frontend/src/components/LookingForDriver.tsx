import { setCurrentRide, setLoading } from '@/lib/features/ride/rideSlice';
import { onMessage } from '@/lib/socket';
import { Banknote, MapPin, MapPinned, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const vehicleImages = {
  "car": "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png",
  "moto": "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
  "auto": "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
}

const LookingForDriver = () => {
  const pickup = useSelector((state: any) => state.ride.pickup);
  const destination = useSelector((state: any) => state.ride.destination);
  const vehicle = useSelector((state: any) => state.ride.selectedVehicle) as "car" | "moto" | "auto";
  const price = useSelector((state: any) => state.ride.ridePrice);
  const dispatch = useDispatch();
  
  onMessage("ride-confirmed", (data: any) => {
      console.log(data);
      dispatch(setCurrentRide(data));
      dispatch(setLoading(false));
    })

  return (
    <>
      <div className='px-4 py-2 mt-3 border-t-2 border-gray-200'>
        <div className="flex items-center  gap-4 border-b-2 border-gray-100 active:bg-gray-100">
          <img className='h-8' src={vehicleImages[vehicle]} alt="vehicle.png" />
          <div className='w-full'>
            <h4 className='flex gap-4 font-semibold capitalize'>{vehicle} <span className='flex'><User strokeWidth={3} size={18} />3</span></h4>
            <h5 className='font-medium text-sm '>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, {vehicle} rides</p>
          </div>
        </div>
        <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
          <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><MapPin size={18} /></div>
          <div>
            <h2 className='text-lg font-semibold truncate max-w-[35%]'>{pickup}</h2>
          </div>
        </div>
        <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
          <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><MapPinned size={18} /></div>
          <div>
            <h2 className='text-lg font-semibold truncate  max-w-[35%]'>{destination}</h2>
          </div>
        </div>
        <div className="flex items-center py-2 gap-4  active:bg-gray-100">
          <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><Banknote size={18} /></div>
          <div>
            <h2 className='text-lg font-semibold'>{price}</h2>
            <p className='text-xs text-gray-500'>Cash</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LookingForDriver;