import { setCurrentRide, setLoading, setRidePrice, setSelectedVehicle } from '@/lib/features/ride/rideSlice';
import RideServices from '@/services/ride.service';
import { IndianRupee, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const VehiclePanel = ({setBookingWaiting,setVehiclePanelOpen,vehiclePanelOpen}:{setBookingWaiting:React.Dispatch<React.SetStateAction<boolean>>,setVehiclePanelOpen:React.Dispatch<React.SetStateAction<boolean>>,vehiclePanelOpen:boolean}) => {
  const pickup = useSelector((state:any) => state.ride.pickup);
  const destination = useSelector((state:any) => state.ride.destination);
  const [fare, setFare] = React.useState<FareType>({
    auto: 0,
    car: 0,
    moto: 0});
  const dispatch = useDispatch();
  const rideServices = RideServices;

  const getFare = async () => {
    const res = await rideServices.getRideFare(pickup, destination);
    if (res.status === "success") {
      setFare(res.data.fare);
    }
  }
  
  useEffect(()=>{
    if(!vehiclePanelOpen) return;
    getFare();
  },[vehiclePanelOpen])

  const handleVehicleSelect = (vehicle: string) => {
    setVehiclePanelOpen(false);
    setBookingWaiting(true);
    dispatch(setSelectedVehicle(vehicle));
    dispatch(setLoading(true));
    findRide(vehicle);
  }

  const findRide = async(selectedVehicle:string) => {
    const res = await rideServices.createRide(selectedVehicle,pickup as string,destination as string);
    dispatch(setCurrentRide(res.data.ride));
    dispatch(setRidePrice(res.data.ride.fare));
  }

  return (
    <>
      <div onClick={()=>handleVehicleSelect("car")} className='flex justify-between items-center p-3 border-2 border-gray-200 active:border-black rounded-xl mb-3'>
        <img className='h-16 pl-5 pr-6' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
        <div className='w-full'>
          <h4 className='flex gap-4 font-semibold '>Uber Go <span className='flex'><User strokeWidth={3} size={18} />4</span></h4>
          <h5 className='font-medium text-sm '>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-bold flex items-center'><IndianRupee size={14}/> {fare.car}</h2>
      </div>
      <div onClick={()=>handleVehicleSelect("moto")} className='flex justify-between items-center p-3 border-2 border-gray-200 active:border-black rounded-xl mb-3'>
        <img className='h-16 pr-3' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
        <div className='w-full'>
          <h4 className='flex gap-4 font-semibold '>Moto <span className='flex'><User strokeWidth={3} size={18} />1</span></h4>
          <h5 className='font-medium text-sm '>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, motorcyle rides</p>
        </div>
        <h2 className='text-lg font-bold flex items-center'><IndianRupee size={14}/> {fare.moto}</h2>
      </div>
      <div onClick={()=>handleVehicleSelect("auto")} className='flex justify-between items-center p-3 border-2 border-gray-200 active:border-black rounded-xl mb-3'>
        <img className='h-16 pr-3' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className='w-full'>
          <h4 className='flex gap-4 font-semibold '>Auto <span className='flex'><User strokeWidth={3} size={18} />3</span></h4>
          <h5 className='font-medium text-sm '>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
        </div>
        <h2 className='text-lg font-bold flex items-center'><IndianRupee size={14}/> {fare.auto}</h2>
      </div>
    </>
  )
}

export default VehiclePanel