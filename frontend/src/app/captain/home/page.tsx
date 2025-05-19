"use client"
import CaptainDetails from '@/components/captain/CaptainDetails'
import ConfirmRidePopup from '@/components/captain/ConfirmRidePopup'
import RidePopup from '@/components/captain/RidePopup'
import { setCurrentRide, setLoading } from '@/lib/features/ride/rideSlice'
import { onMessage, sendMessage } from '@/lib/socket'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Banknote, ChevronDown, House, LogOut, MapPinned } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
  const [isBooking,setIsBooking] = useState(false);
  const [confirmRidePanel,setConfirmRidePanel] = useState(false);
  const captain = useSelector((state:any) => state.captain.currentCaptain) as Captain;
  const bookingPopupRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const dispatch = useDispatch();
  
  useGSAP(()=>{
    if(isBooking){
      gsap.to(bookingPopupRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(bookingPopupRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[isBooking]);

  useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(confirmRidePanelRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[confirmRidePanel]);

  useEffect(() => {
      if(!captain) return;
      sendMessage("join", { userType: "captain", userId:captain?._id });
      const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    sendMessage('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
        return () => clearInterval(locationInterval)
    }, [captain]);

    onMessage('new-ride', (data) => {
      dispatch(setCurrentRide(data))
      setIsBooking(true)
    })

  return (
    <div className='h-screen bg-white text-black relative w-screen'>
      <div className='fixed top-5 w-full flex justify-between px-5'>
      <img className='h-7' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <Link href={"/home"} className='p-2 bg-white rounded-full'>
        <LogOut size={20} />
      </Link>
      </div>
      
      <div className='h-2/3'>
        <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-1/3 rounded-lg p-5'>
        <CaptainDetails/>
      </div>
      <div ref={bookingPopupRef} className='fixed bottom-0 z-10 py-4 pt-6 text-black bg-white w-full translate-y-full rounded-lg'>
        <ChevronDown onClick={()=>setIsBooking(false)} className='absolute top-1 left-[49%] scale-x-150 text-gray-300 '/>
        <RidePopup setConfirmRidePanel={setConfirmRidePanel} setIsBooking={setIsBooking}/>
      </div>
      <div ref={confirmRidePanelRef} className='fixed bottom-0 z-10 py-4 pt-6 text-black bg-white w-full h-[80%] translate-y-full rounded-lg'>
        <ChevronDown onClick={()=>setConfirmRidePanel(false)} className='absolute top-1 left-[49%] scale-x-150 text-gray-300 '/>
        <ConfirmRidePopup setConfirmRidePanel={setConfirmRidePanel} setIsBooking={setIsBooking}/>
      </div>
    </div>
  )
}

export default Page