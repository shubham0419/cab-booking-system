declare type RideStatus =
  | "pending"
  | "accepted"
  | "ongoing"
  | "completed"
  | "cancelled";

declare type RideInput = {
  user: User | string;
  captain?: Captain | string;
  pickup: string;
  destination: string;
  fare: number;
  status?: RideStatus;
  duration?: number;
  distance?: number;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  otp: string;
};

declare type Ride = RideInput & {
  _id: string;
  destnationCord:Location
  createdAt: string;
  updatedAt: string;
};

declare type CreateRideResType = {
  status: string;
  message: string;
  data: {
    ride: Ride;
  };
};

declare type RideState = {
  activeInput: string | null;
  pickup: string | null;
  destination: string | null;
  selectedVehicle: string | null;
  ridePrice: number | null;
  currentRide: Ride | null;
  selectedVehicle: string | null;
  isEnded: boolean | null;
  isLoading: boolean;
  error: string | null;
};



declare type AddressSugestionsResType = {
  data: {
    suggestions: string[];
  };
  status: string;
  message: string;
};

declare type getFareResType = {
  status: string;
  message: string;
  data:{
    fare: FareType;
  }
};

declare type FareType = {
  auto: number;
  car: number;
  moto: number;
};
