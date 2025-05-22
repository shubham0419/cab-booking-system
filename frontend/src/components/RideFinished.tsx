import React, { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import "./RideFinished.css"
import { useDispatch, useSelector } from 'react-redux';
import { IndianRupee } from 'lucide-react';
import { resetRideEnded } from '@/lib/features/ride/rideSlice';

const RideFinished = ({ isOn ,captain}: { isOn: boolean ,captain?:boolean}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const ride = useSelector((state:any) => state.ride.currentRide) as Ride;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsOpen(isOn)
  }, [isOn])

  useEffect(() => {
    if (!isOpen) {
      dispatch(resetRideEnded());
    }
  },[isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=''>Ride Completed</DialogTitle>
          <DialogDescription className='flex flex-col items-center'>
            {captain ? <div className='flex flex-col items-center gap-2'>
              <div className="coin"></div>
              <h2 className='text-lg text-green-600 font-semibold flex items-center'><IndianRupee size={14}/>{ride?.fare}</h2>
              <h2 className='text-lg text-green-600 font-semibold flex items-center'>Earned</h2>
            </div>:<>
              <div className="rating mt-5">
                <input onChange={()=>setRating(5)} value="5" name="rating" id="star5" type="radio" />
                <label title="5 stars" htmlFor="star5">
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgOne"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgTwo"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <div className="ombre"></div>
                </label>

                <input onChange={()=>setRating(4)} value="4" name="rating" id="star4" type="radio" />
                <label title="4 stars" htmlFor="star4">
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgOne"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgTwo"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <div className="ombre"></div>
                </label>

                <input onChange={()=>setRating(3)} value="3" name="rating" id="star3" type="radio" />
                <label title="3 stars" htmlFor="star3">
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgOne"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgTwo"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <div className="ombre"></div>
                </label>

                <input onChange={()=>setRating(2)} value="2" name="rating" id="star2" type="radio" />
                <label title="2 stars" htmlFor="star2">
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgOne"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgTwo"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <div className="ombre"></div>
                </label>

                <input onChange={()=>setRating(1)} value="1" name="rating" id="star1" type="radio" />
                <label title="1 star" htmlFor="star1">
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgOne"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#000000"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="35"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svgTwo"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  <div className="ombre"></div>
                </label>
              </div>
              <div className="flex flex-col items-center ">
                <h4 className='text-lg font-semibold'>Rate your ride</h4>
              </div>
              <button disabled={rating<1} onClick={()=>setIsOpen(false)} className=' px-5 py-2 bg-green-600 text-white rounded-lg'>Submit</button>
            </>}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default RideFinished