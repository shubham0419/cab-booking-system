"use client"
import CompleteRide from '@/components/captain/CompleteRide';
import LiveTracking from '@/components/LiveTracking';
import RideTracking from '@/components/RideTracking';
import { setCurrentRide } from '@/lib/features/ride/rideSlice';
import RideServices from '@/services/ride.service';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';

const Page = () => {
  const [completePanel, setCompletePanel] = useState(false);
  const completePanelRef = useRef(null);
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id as string;

  const getRide = async () => {
    const res = await RideServices.rideInfo(id);
    if (res.status == "success") {
      dispatch(setCurrentRide(res.data.ride));
    }
  }

  useEffect(() => {
    getRide();
  }, [])

  useGSAP(() => {
    if (completePanel) {
      gsap.to(completePanelRef.current, {
        transform: "translateY(0)"
      })
    } else {
      gsap.to(completePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [completePanel]);

  return (
    <div className='h-screen bg-white text-black relative w-screen'>
      <div className='fixed top-5 w-full flex justify-between px-5'>
        <img className='h-7' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      </div>

      <div className='h-4/5'>
      <RideTracking/>
      </div>
      <div className='h-1/5 p-5 bg-yellow-400 flex justify-between items-center relative'>
        <ChevronUp onClick={() => setCompletePanel(true)} className='absolute top-1 left-[49%] scale-x-150 text-gray-500 ' />
        <h4 className='text-lg font-semibold'>4 KM Away</h4>
        <button onClick={() => setCompletePanel(true)} className='h-fit px-5 py-2 font-semibold text-white bg-green-600 rounded-lg '>Complete Ride</button>
      </div>
      <div ref={completePanelRef} className='fixed bottom-0 z-10 py-4 pt-6 text-black bg-white w-full translate-y-full rounded-t-lg'>
        <ChevronDown onClick={() => { setCompletePanel(false) }} className='absolute top-1 left-[49%] scale-x-150 text-gray-300 ' />
        <CompleteRide />
      </div>
    </div>
  )
}

export default Page