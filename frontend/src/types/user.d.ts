

declare interface UserData {
  email: string;
  password: string;
}

declare interface ResponseData {
  user: any;
  token: string;
}

declare type UserResType = {
  data:User,
  message:string,
  status:string
}

declare type UserloginType = {
  data:{
    user:User,
    token:string
  },
  message:string,
  status:string
}

declare interface User {
  fullName: FullName;
  email: string; // Required, minimum 5 characters, must be valid email format
  password: string; // Required, not selected by default in queries
  socketId?: string; // Optional
  _id?: string; // MongoDB generated ID
  createdAt?: Date; // Mongoose timestamps
  updatedAt?: Date; // Mongoose timestamps
}

declare interface UpdateUserInput {
  fullName?: {
    firstName?: string;
    lastName?: string;
  };
  email?: string;
  password?: string;
  socketId?: string;
}
