import { NotebookText, Timer } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const CaptainDetails = () => {
  const captain = useSelector((state:any) => state.captain.currentCaptain) as Captain;
  
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <img className='rounded-full h-12 w-12 object-cover border-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPrTBPxjgQtxbR_H3BQ_QhM0DVz9eaHSoVv-WGiklBOS2X4heHr1WqAawX2RTqv2J2SNI&usqp=CAU" alt="" />
          <h2 className='text-lg font-semibold capitalize'>{captain?.fullName?.firstName} {captain?.fullName?.lastName}</h2>
        </div>
        <div>
          <h4 className='text-lg font-semibold leading-5'>$229</h4>
          <p className='text-gray-400 text-xs'>Earned</p>
        </div>
      </div>
      <div className='bg-gray-200 rounded-xl px-3 py-7 flex justify-evenly mt-5 border border-gray-300'>
        <div className='flex flex-col items-center'>
          <Timer className='font-semibold'/>
          <h4 className='font-semibold leading-5'>10.2</h4>
          <p className='text-xs text-gray-500'>Hours Online</p>
        </div>
        <div className='flex flex-col items-center'>
          <Timer className='font-semibold'/>
          <h4 className='font-semibold leading-5'>10.2</h4>
          <p className='text-xs text-gray-500'>Hours Online</p>
        </div>
        <div className='flex flex-col items-center'>
          <NotebookText className='font-semibold'/>
          <h4 className='font-semibold leading-5'>10.2</h4>
          <p className='text-xs text-gray-500'>Hours Online</p>
        </div>
      </div>
    </>

  )
}

export default CaptainDetails