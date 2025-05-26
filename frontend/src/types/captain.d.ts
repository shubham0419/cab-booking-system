declare interface captainData {
  email: string;
  password: string;
}

declare type registerCaptainData = {
  
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    vehicle: {
        color: string;
        plate: string;
        capacity: string;
        vehicleType: string;
    };

}

declare interface CaptainResponseData {
  captain: any;
  token: string;
}


declare type captainResType = {
  data:Captain,
  message:string,
  status:string
}
declare type CaptainloginType = {
  data:{
    captain:Captain,
    token:string
  },
  message:string,
  status:string
}

declare interface FullName {
  firstName: string; // Required, minimum 3 characters
  lastName?: string; // Optional, minimum 3 characters if provided
}


declare interface Vehicle {
  color: string; // Required, minimum 3 characters
  plate: string; // Required, minimum 3 characters
  capacity: number; // Required, minimum value of 1
  vehicleType: 'car' | 'bike' | 'auto'; // Required, must be one of these values
}

declare interface Location {
  lat?: number; 
  lng?: number; 
}

declare interface Captain {
  fullName: FullName;
  email: string; // Required, minimum 5 characters, must be valid email format
  password: string; // Required
  socketId?: string; // Optional
  status: 'active' | 'inactive'; // Default is 'active'
  vehicle: Vehicle;
  rideInfo?: {
    rideId:string,
    isRideActive:boolean,
  };  
  location?: Location; // Optional
  _id?: string; // MongoDB generated ID
  createdAt?: Date; // Mongoose timestamps
  updatedAt?: Date; // Mongoose timestamps
}

declare interface CreateCaptainInput {
  fullName: FullName;
  email: string;
  password: string;
  socketId?: string;
  vehicle: Vehicle;
  location?: Location;
}

declare interface UpdateCaptainInput {
  fullName?: {
    firstName?: string;
    lastName?: string;
  };
  email?: string;
  password?: string;
  socketId?: string;
  status?: 'active' | 'inactive';
  vehicle?: {
    color?: string;
    plate?: string;
    capacity?: number;
    vehicleType?: 'car' | 'bike' | 'auto';
  };
  location?: {
    lat?: number;
    lng?: number;
  };
}
