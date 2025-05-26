"use client"
import RideTracking from '@/components/RideTracking';
import { clearCurrentRide, setCurrentRide, setRideEnded } from '@/lib/features/ride/rideSlice';
import { onMessage } from '@/lib/socket';
import { RootState } from '@/lib/store';
import RideServices from '@/services/ride.service';
import { Banknote, House, IndianRupee, MapPinned } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Page = () => {
  const ride = useSelector((state: RootState) => state.ride.currentRide) as Ride;
  const dispatch = useDispatch();
  const rideService = RideServices;
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;

  const getRide = async () => {
    const res = await rideService.rideInfo(id);
    if (res.status == "success") {
      dispatch(setCurrentRide(res.data.ride));
    }
  }
  onMessage("ride-ended", (data) => {
    dispatch(setRideEnded(true));
    dispatch(clearCurrentRide())
    router.push("/home");
  })

  useEffect(() => {
    getRide();
  }, [id])

  return (
    <div className='h-screen bg-white text-black relative'>
      <Link href={"/home"} className='fixed top-5 right-3 p-2 bg-white rounded-full'>
        <House size={20} />
      </Link>
       
      <div className='h-3/5'>
      <RideTracking />
      </div>
      <div className='h-1/5 rounded-lg pt-5'>
        <div className='flex justify-between px-4 py-4'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
          <div className='text-right'>
            <h2 className='font-semibold'>{(ride?.captain as Captain)?.fullName?.firstName} {(ride?.captain as Captain)?.fullName?.lastName}</h2>
            <h4 className='text-lg font-semibold leading-4'>{(ride?.captain as Captain)?.vehicle?.plate}</h4>
            <p className='text-xs font-semibold text-gray-400'>Maruti Suzuki Alto</p>
          </div>
        </div>
        <div className='px-4 py-2  border-t-2 border-gray-200'>
          <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
            <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><MapPinned size={18} /></div>
            <div>
            <h2 className='font-semibold'>{ride?.destination}</h2>
          </div>
          </div>
          <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
            <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><Banknote size={18} /></div>
            <div>
              <h2 className='text-lg font-semibold flex items-center'><IndianRupee size={14}/>{ride?.fare}</h2>
              <p className='text-xs text-gray-500'>Cash</p>
            </div>
          </div>
        </div>
        <button className='w-[90%] py-2 font-semibold text-white bg-green-600 rounded-lg ml-5 mt-2'>Make a payment</button>
      </div>
    </div>
  )
}

export default Page