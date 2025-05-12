import API_CONSTANTS from "@/constants/apiConstant";
import axios from "@/services/axios.service";

export default class UserServices {
  static getUser = ()=>{
    return new Promise<UserResType>(async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.getUser);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as UserResType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static loginUser = (userData:UserData)=>{
    return new Promise<UserloginType>(async (resolve,reject)=>{
      try {
        let res = await axios.post(API_CONSTANTS.loginUser,userData);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as UserloginType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }

  static registerUser = (userData:User)=>{
    return new Promise<UserloginType>(async (resolve,reject)=>{
      try {
        let res = await axios.post(API_CONSTANTS.registerUser,userData);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as UserloginType);
      } catch (error:any) {
        return reject(error);
      }
    })
  }
}

