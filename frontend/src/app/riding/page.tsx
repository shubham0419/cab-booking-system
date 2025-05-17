import { Banknote, House, MapPinned } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='h-screen bg-white text-black relative'>
      <Link href={"/home"} className='fixed top-5 right-3 p-2 bg-white rounded-full'>
        <House size={20} />
      </Link>
      
      <div className='h-1/2'>
        <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-1/2 rounded-lg'>
        <div className='flex justify-between px-4 py-4'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
          <div className='text-right'>
            <h2 className='font-semibold'>Sarthak</h2>
            <h4 className='text-lg font-semibold leading-4'>DL04 C9 7035</h4>
            <p className='text-xs font-semibold text-gray-400'>Maruti Suzuki Alto</p>
          </div>
        </div>
        <div className='px-4 py-2  border-t-2 border-gray-200'>
          <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
            <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><MapPinned size={18} /></div>
            <div>
              <h2 className='text-lg font-semibold'>wz-283/74</h2>
              <p className='text-xs text-gray-500'>maddi wali gali no. 3, vishnu garden, New Delhi</p>
            </div>
          </div>
          <div className="flex items-center py-2 gap-4 border-b-2 border-gray-100 active:bg-gray-100">
            <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><Banknote size={18} /></div>
            <div>
              <h2 className='text-lg font-semibold'>$195</h2>
              <p className='text-xs text-gray-500'>Cash</p>
            </div>
          </div>
        </div>
        <button className='w-[90%] py-2 font-semibold text-white bg-green-600 rounded-lg ml-5 mt-10'>Make a payment</button>
      </div>
    </div>
  )
}

export default Page