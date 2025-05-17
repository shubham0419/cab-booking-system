const {
  getDistanceAndTime,
  getCaptainsInRadius,
  getAddressCordinates,
} = require("../helper/maps");
const { getFare, getOtp } = require("../helper/ride");
const wrapperMessage = require("../helper/wrapperMessage");
const Ride = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");

const createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;
  try {
    if (!pickup || !destination || !vehicleType) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const distanceTime = await getDistanceAndTime(pickup, destination);
    
    const fare = await getFare(pickup, destination);
    const otp = getOtp(6);
    console.log(otp);
    const ride = await Ride.create({
      user: req.user._id,
      pickup,
      destination,
      fare: fare[vehicleType],
      otp,
      status: "pending",
      duration: distanceTime.duration.value,
      distance: distanceTime.distance.value,
    });
    const cordinates = await getAddressCordinates(pickup);
    const captainsInRadius = await getCaptainsInRadius(cordinates, 3);

    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");
    rideWithUser.otp = "";
    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
    console.log(cordinates);
    console.log(rideWithUser);
    console.log(captainsInRadius);
    res.json(wrapperMessage("success", "Ride created successfully", { ride }));
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
};

const getRideFare = async (req, res) => {
  const { pickup, destination } = req.query;
  try {
    if (!pickup || !destination) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const fare = await getFare(pickup, destination);
    res.json(wrapperMessage("success", "Fare fetched successfully", { fare }));
  } catch (error) {
    console.error("Error fetching fare:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
};

const confirmRide = async (req, res) => {
  const { rideId } = req.query;
  console.log(req);
  try {
    if (!rideId ) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const ride = await Ride.findOne({ _id: rideId });
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    ride.status = "accepted";

    sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
    await ride.save();
    res.json(wrapperMessage("success", "Ride confirmed successfully", { ride }));
  } catch (error) {
    console.error("Error confirming ride:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
}

const startRide = async (req, res) => {
  const { rideId, otp } = req.body;
  try {
    if (!rideId || !otp) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const ride = await Ride.findOne({ _id: rideId });
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    if (ride.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    sendMessageToSocketId(ride.user.socketId, {
          event: 'ride-started',
          data: ride
        })
    ride.status = "ongoing";
    await ride.save();
    res.json(wrapperMessage("success", "Ride started successfully", { ride }));
  } catch (error) {
    console.error("Error starting ride:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
};

const endRide = async (req, res) => {

}

module.exports = {
  createRide,
  getRideFare,
  confirmRide,
  startRide
};
