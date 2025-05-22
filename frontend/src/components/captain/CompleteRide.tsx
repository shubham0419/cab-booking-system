import { Banknote, IndianRupee, MapPin, MapPinned } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import RideServices from '@/services/ride.service';
import { clearCurrentRide, setCurrentRide, setRideEnded } from '@/lib/features/ride/rideSlice';
import { useRouter } from 'next/navigation';

const CompleteRide = () => {
  const [payment,setPayment] = useState(false);
  const ride = useSelector((state:any) => state.ride.currentRide) as Ride;
  const dispatch = useDispatch();
  const rideServices = RideServices;
  const router = useRouter()

  const rideFinished = async() => {
    const res = await rideServices.endRide(ride._id);
    if(res.status === "success"){
      dispatch(clearCurrentRide());
      dispatch(setRideEnded(true));
      router.push("/captain/home");
    }
  }

  return (
    <>
      <h2 className='text-xl font-semibold mb-2 text-center'>Finish his ride</h2>
      <div className='flex justify-between items-center rounded-lg mx-5 p-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 pointer-events-none'>
        <div className='flex items-center gap-2'>
          <img className='rounded-full h-12 w-12 object-cover border-2' src="https://p.kindpng.com/picc/s/24-248442_female-user-avatar-woman-profile-member-user-profile.png" alt="" />
          <h2 className='text-lg font-semibold'>{(ride?.user as User)?.fullName?.firstName} {(ride?.user as User)?.fullName?.lastName}</h2>
        </div>
        <div>
          <h4 className='text-lg font-semibold leading-5'>2.2KM</h4>
        </div>
      </div>
      <div className='px-4 py-2 mt-8 border-t-2 border-gray-200'>
        <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
          <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><MapPin size={18}/></div>
          <div>
            <h2 className='font-semibold'>{ride?.pickup}</h2>
          </div>
        </div>
        <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
          <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><MapPinned size={18}/></div>
          <div>
            <h2 className='font-semibold'>{ride?.destination}</h2>
          </div>
        </div>
        <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
          <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><Banknote size={18}/></div>
          <div>
            <h2 className='text-lg font-semibold flex items-center'><IndianRupee size={14}/>{ride?.fare}</h2>
            <p className='text-xs text-gray-500'>Cash</p>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 py-3'>
        <div className='flex gap-2 items-center'>
          <Checkbox onCheckedChange={()=>setPayment(prev=>!prev)} className={`${!payment && "border-red-500"}`} id='payment-check'/>
          <label className={`${!payment && "text-red-500"}`} htmlFor="payment-check">Payment Recieved</label>
      </div>
        <button onClick={rideFinished} disabled={payment} className={`w-full flex justify-center mt-1 py-2 font-semibold text-white ${payment?"bg-green-600":"bg-gray-400"} rounded-lg `}>Finish Ride</button> 
      </div>
    </>
  )
}

export default CompleteRide