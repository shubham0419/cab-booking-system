import API_CONSTANTS from "@/constants/apiConstant";
import axios from "@/services/axios.service";
import Cookies from "js-cookie";
export default class RideServices {
  
  static createRide = (vehicleType:string,pickup:string,destination:string)=>{
    return new Promise<CreateRideResType>(async (resolve,reject)=>{
      try {
        let res = await axios.post(API_CONSTANTS.createRide,{pickup,destination,vehicleType});
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as CreateRideResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static getSuggestions= (address:string)=>{
    return new Promise<AddressSugestionsResType>(async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.addressSuggestions,{
          params:{
            address:address
          },
        });
        if (res?.data?.status == "failed") return reject(res.data.message);
        return resolve(JSON.parse(JSON.stringify(res.data)) as AddressSugestionsResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static getRideFare = (pickup:string,destination:string)=>{
    return new Promise<getFareResType>(async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.getRideFare,{
          params:{
            pickup,
            destination
          }
        });
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as getFareResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static confirmRide = (rideId:string)=>{
    return new Promise<CreateRideResType>(async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.confirmRide,{
          params:{
            rideId
          },
        });
        if (res?.data?.status == "failed") return reject(res.data.message);
        return resolve(JSON.parse(JSON.stringify(res.data)) as CreateRideResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static startRide = (rideId:string,otp:string)=>{
    return new Promise<CreateRideResType>(async (resolve,reject)=>{
      try {
        let res = await axios.post(API_CONSTANTS.startRide,{
            rideId,
            otp
        });
        if (res?.data?.status == "failed") return reject(res.data.message);
        return resolve(JSON.parse(JSON.stringify(res.data)) as CreateRideResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }
  
  static rideInfo = (rideId:string)=>{
    return new Promise<CreateRideResType>(async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.getRide,{
          params:{
            rideId
          }
        });
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as CreateRideResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static endRide = (rideId:string)=>{
    return new Promise<CreateRideResType>(async (resolve,reject)=>{
      try {
        let res = await axios.post(API_CONSTANTS.endRide,{
            rideId,
        });
        if (res?.data?.status == "failed") return reject(res.data.message);
        return resolve(JSON.parse(JSON.stringify(res.data)) as CreateRideResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }
}

