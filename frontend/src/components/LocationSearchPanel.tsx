import { MapPin } from 'lucide-react'
import React from 'react'

const LocationSearchPanel = ({setVehiclePanelOpen}:{setVehiclePanelOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {

  const locations = [
    "wz-283/74 ,maddi wali gali no. 3, vishnu garden, New Delhi",
    "wz-283/74 ,maddi wali gali no. 3, vishnu garden, New Delhi",
    "wz-283/74 ,maddi wali gali no. 3, vishnu garden, New Delhi",
    "wz-283/74 ,maddi wali gali no. 3, vishnu garden, New Delhi",
    "wz-283/74 ,maddi wali gali no. 3, vishnu garden, New Delhi",
    "wz-283/74 ,maddi wali gali no. 3, vishnu garden, New Delhi",
  ]

  return (
    <div className='text-black overflow-y-auto h-full'>
      {locations.map((loc)=>(
        <div onClick={()=>{setVehiclePanelOpen(true)}} className="flex items-center gap-2 py-2 px-4 border-b border-gray-50 active:bg-gray-100">
          <div className='bg-[#eee] rounded-full p-2 flex justify-center items-center font-medium'><MapPin size={18}/></div>
          <h4 className='font-medium'>{loc}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel