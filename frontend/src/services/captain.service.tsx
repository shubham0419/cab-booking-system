import API_CONSTANTS from "@/constants/apiConstant";
import axios from "@/services/axios.service";

export default class CaptainServices {
  static getCaptain = ()=>{
    return new Promise<captainResType>(async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.getCaptain);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as captainResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static loginCaptain= (captainData:captainData)=>{
    return new Promise<CaptainloginType>(async (resolve,reject)=>{
      try {
        let res = await axios.post(API_CONSTANTS.loginUser,captainData);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as CaptainloginType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static registerCaptain = (captainData:captainData)=>{
    return new Promise<CaptainloginType>(async (resolve,reject)=>{
      try {
        let res = await axios.post(API_CONSTANTS.registerUser,captainData);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as CaptainloginType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }
}

