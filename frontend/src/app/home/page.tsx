"use client"
import { ArrowLeftFromLine, ChevronDown, Undo2, User } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '@/components/LocationSearchPanel';

const Page = () => {
  const [pickup,setPickup] = useState("");
  const [drop,setDrop] = useState("");
  const [panelOpen,setPanelOpen] = useState(false);
  const [vehiclePanelOpen,setVehiclePanelOpen] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const handleRideSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }

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
      setPanelOpen(false);
      gsap.to(vehiclePanelRef.current,{
        transform:"translateY(0)"
      })
    }else{
      setPanelOpen(true);
      gsap.to(vehiclePanelRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[vehiclePanelOpen]);


  return (
    <div className='h-screen relative'>
      <h2 className='w-16 absolute left-5 top-5 text-black font-bold text-4xl'>Uber</h2>

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg" alt="" />
      </div>
      <div className='absolute top-0 flex flex-col h-screen justify-end w-full'>
        <div className='h-[30%] p-4 bg-white relative rounded-t-md '>
          <ChevronDown onClick={(e)=>{e.stopPropagation();setPanelOpen(false)}} className={`text-gray-600 absolute top-3 right-5 ${!panelOpen && "hidden"}`}/>
          <h4 className='font-semibold text-3xl text-black'>Find a trip</h4>
          <form className='relative' onSubmit={handleRideSubmit}>
            <input  onClick={()=>setPanelOpen(true)} onChange={(e)=>setPickup(e.target.value)} className='bg-[#eee] px-8 py-3 rounded-lg text-lg w-full mt-5 text-gray-700' type="text" placeholder='Add a pick-up location'/>
            <input  onClick={()=>setPanelOpen(true)} onChange={(e)=>setDrop(e.target.value)} className='bg-[#eee] px-8 py-3 rounded-lg text-lg w-full mt-3 text-gray-700' type="text" placeholder='Add drop location'/>
            <div className='h-[3.3rem] w-1 bg-black absolute top-[3.2rem] left-5'></div>
            <div className='w-2 h-2 rounded-full bg-black absolute top-10 left-[1.15rem]'></div>
            <div className='w-2 h-2  bg-black absolute top-[6.7rem] left-[1.15rem]'></div>
          </form>
        </div>
        <div ref={panelRef} className={`h-[0] bg-white px-1 pt-2`}>
          <LocationSearchPanel setVehiclePanelOpen={setVehiclePanelOpen}/>
        </div>m,
        <div ref={vehiclePanelRef} className='fixed bottom-0 z-10 p-3 py-6 text-black bg-white w-full translate-y-full pt-10'>
          <Undo2 onClick={()=>setVehiclePanelOpen(false)} className='absolute top-2 right-3 active:bg-gray-100'/>
          <div className='flex justify-between items-center p-3 border-2 border-gray-200 active:border-black rounded-xl mb-3'>
            <img className='h-16 pr-3' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
            <div className='w-full'>
              <h4 className='flex gap-4 font-semibold '>Uber Go <span className='flex'><User strokeWidth={3} size={18}/>4</span></h4>
              <h5 className='font-medium text-sm '>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
            </div>
            <h2 className='text-lg font-bold'>$193</h2>
          </div>
          <div className='flex justify-between items-center p-3 border-2 border-gray-200 active:border-black rounded-xl mb-3'>
            <img className='h-16 pr-3' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
            <div className='w-full'>
              <h4 className='flex gap-4 font-semibold '>Moto <span className='flex'><User strokeWidth={3} size={18}/>1</span></h4>
              <h5 className='font-medium text-sm '>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, motorcyle rides</p>
            </div>
            <h2 className='text-lg font-bold'>$65</h2>
          </div>
          <div className='flex justify-between items-center p-3 border-2 border-gray-200 active:border-black rounded-xl mb-3'>
            <img className='h-16 pr-3' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
            <div className='w-full'>
              <h4 className='flex gap-4 font-semibold '>Auto <span className='flex'><User strokeWidth={3} size={18}/>3</span></h4>
              <h5 className='font-medium text-sm '>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
            </div>
            <h2 className='text-lg font-bold'>$135</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page