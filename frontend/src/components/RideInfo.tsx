"use client"
import { onMessage } from '@/lib/socket';
import { RootState } from '@/lib/store';
import { Banknote, IndianRupee, MapPin, MapPinned } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const RideInfo = () => {
  const router = useRouter();
  const ride = useSelector((state: RootState) => state.ride.currentRide) as Ride;

  onMessage("ride-started", (data: any) => {
    router.push(`/riding/${data._id}`);
  })

  return (
    <>
    <div className='flex justify-between px-4 pb-2 border-b-2 border-gray-200'>
      <h2 className='text-lg font-semibold text-center'>Meet at pickup point</h2>
      <p className='bg-black text-white px-2 py-1 rounded-sm'>2 min</p>
    </div>

    <div className='flex justify-between px-4 py-4'>
      <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
      <div className='text-right'>
          <h2 className='font-semibold'>{(ride?.captain as Captain)?.fullName?.firstName} {(ride?.captain as Captain)?.fullName?.lastName}</h2>
          <h4 className='text-lg font-semibold leading-4'>{(ride?.captain as Captain)?.vehicle?.plate}</h4>
          <p className='text-xs font-semibold text-gray-400'>Maruti Suzuki Alto</p>
      </div>
    </div>
      <div className='w-full px-4 py-2  border-t-2 border-gray-200'>
        <div className='flex justify-end'>
          <div>
            <p className='text-sm'>Share OTP</p>
            {ride?.otp?.split("").map((num,ind)=>(<span key={ind} className='bg-gray-100 border border-gray-400 px-2 py-1 text-xs'>{num}</span>))}
          </div>
        </div>
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
    </>
  )
}

export default RideInfo;