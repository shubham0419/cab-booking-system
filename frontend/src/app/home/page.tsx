"use client"
import LookingForDriver from '@/components/LookingForDriver';
import LocationSearchPanel from '@/components/LocationSearchPanel';
import VehiclePanel from '@/components/VehiclePanel';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import RideInfo from '@/components/RideInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveInput, setCurrentRide, setDestination, setLoading, setPickup } from '@/lib/features/ride/rideSlice';
import { RootState } from '@/lib/store';
import Loader from '@/components/Loader';
import { onMessage, sendMessage } from '@/lib/socket';
import LiveTracking from '@/components/LiveTracking';
import RideFinished from '@/components/RideFinished';

const Page = () => {
  const [panelOpen,setPanelOpen] = useState(false);
  const [vehiclePanelOpen,setVehiclePanelOpen] = useState(false);
  const [bookingWaiting,setBookingWaiting] = useState(false);
  const isRideEnded = useSelector((state: RootState) => state.ride.isEnded);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const bookingWaitingRef = useRef(null);

  const pickup = useSelector((state: RootState) => state.ride.pickup);
  const destination = useSelector((state: RootState) => state.ride.destination);
  const loading = useSelector((state: RootState) => state.ride.isLoading);
  const user = useSelector((state: RootState) => state.user.currentUser);
  
  const dispatch = useDispatch();

  useGSAP(()=>{
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:"70%"
      })
    }else{
      gsap.to(panelRef.current,{
        height:"0%"
      })
    }
  },[panelOpen])

  useGSAP(()=>{
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[vehiclePanelOpen]);

  useGSAP(()=>{
    if(bookingWaiting){
      gsap.to(bookingWaitingRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(bookingWaitingRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[bookingWaiting]);

  useEffect(() => {
    if(!user) return;
    sendMessage("join", { userType: "user", userId:user?._id });
  }, [user]);

  console.log(isRideEnded);

  return (
    <div className='h-screen relative'>
      <h2 className='w-16 absolute left-5 top-14 text-black font-bold text-4xl z-10'>Uber</h2>
      <div className='h-screen w-screen'>
        <LiveTracking/>
      </div>
      <RideFinished isOn={isRideEnded?isRideEnded:false}/>
      <div className='absolute top-0 flex flex-col h-screen justify-end w-full z-20'>
        <div className='h-[30%] p-4 bg-white relative rounded-t-md'>
          <ChevronDown onClick={(e)=>{e.stopPropagation();setPanelOpen(false)}} className={`text-gray-600 absolute top-3 right-5 ${!panelOpen && "hidden"}`}/>
          <h4 className='font-semibold text-3xl text-black'>Find a trip</h4>
          <form className='relative'>
            <input value={pickup ?? ""} onClick={()=>{dispatch(setActiveInput("pickup"));setPanelOpen(true)}} onChange={(e)=>dispatch(setPickup(e.target.value))} className='bg-[#eee] px-8 py-3 rounded-lg text-lg w-full mt-5 text-gray-700' type="text" placeholder='Add a pick-up location'/>
            <input value={destination ?? ""} onClick={()=>{dispatch(setActiveInput("destination"));setPanelOpen(true)}} onChange={(e)=>dispatch(setDestination(e.target.value))} className='bg-[#eee] px-8 py-3 rounded-lg text-lg w-full mt-3 text-gray-700' type="text" placeholder='Add drop location'/>
            <div className='h-[3.3rem] w-1 bg-black absolute top-[3.2rem] left-5'></div>
            <div className='w-2 h-2 rounded-full bg-black absolute top-10 left-[1.15rem]'></div>
            <div className='w-2 h-2  bg-black absolute top-[6.7rem] left-[1.15rem]'></div>
          </form>
        </div>
        <div ref={panelRef} className={`h-[0] bg-white px-1 pt-2 z-20`}>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
        </div>
        <div ref={vehiclePanelRef} className='fixed bottom-0 z-30 p-3 py-6 text-black bg-white w-full translate-y-full pt-10 rounded-lg'>
          <ChevronDown onClick={()=>{setPanelOpen(true);setVehiclePanelOpen(false)}} className='absolute top-1 left-[48%] scale-x-150 text-gray-300 '/>
          <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setBookingWaiting={setBookingWaiting} vehiclePanelOpen={vehiclePanelOpen}/>
        </div>
        <div ref={bookingWaitingRef} className='fixed bottom-0 z-30 py-4 pt-6 text-black bg-white w-full translate-y-full rounded-lg'>
          <ChevronDown onClick={()=>{setVehiclePanelOpen(true);setBookingWaiting(false)}} className='absolute top-1 left-[48%] scale-x-150 text-gray-300 '/>
          {loading?<div className='w-full'>
            <h2 className='text-xl font-semibold border-b border-gray-200 text-center pb-1 mb-2'>Looking for driver...</h2>
            <Loader/>
            <LookingForDriver/>
          </div>:<RideInfo/> }
        </div>
      </div>
    </div>
  )
}

export default Page