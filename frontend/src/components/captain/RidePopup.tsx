import RideServices from '@/services/ride.service'
import { Banknote, IndianRupee, MapPin, MapPinned } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const RidePopup = ({setConfirmRidePanel,setIsBooking}:{setConfirmRidePanel:React.Dispatch<React.SetStateAction<boolean>>,setIsBooking:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const rideServices = RideServices;
  const ride = useSelector((state:any) => state.ride.currentRide) as Ride;

  const handleConfirmClick = async () => {
    const res = await rideServices.confirmRide(ride._id);
    console.log('object',res.status);
    if(res.status == "success"){
      setConfirmRidePanel(true);
    }
  }
  return (
    <>
      <h2 className='text-xl font-semibold mb-2 text-center'>New Ride Availabe!</h2>
      <div className='flex justify-between items-center rounded-lg mx-5 p-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 pointer-events-none'>
        <div className='flex items-center gap-2'>
          <img className='rounded-full h-12 w-12 object-cover border-2' src="https://p.kindpng.com/picc/s/24-248442_female-user-avatar-woman-profile-member-user-profile.png" alt="" />
          <h2 className='text-lg font-semibold'>{(ride?.user as User)?.fullName?.firstName} {(ride?.user as User)?.fullName?.lastName}</h2>
        </div>
        <div>
          <h4 className='text-lg font-semibold leading-5'>2.2KM</h4>
        </div>
      </div>
      <div className='px-4 py-2 '>
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
        <div className='flex gap-3'>
        <button onClick={()=>setIsBooking(false)} className='w-full py-2 font-semibold text-black bg-gray-100 rounded-lg  mt-10'>Ignore</button>
        <button onClick={handleConfirmClick} className='w-full py-2 font-semibold text-white bg-green-600 rounded-lg  mt-10'>Accept</button> 
        </div>
      </div>
    </>
  )
}

export default RidePopup