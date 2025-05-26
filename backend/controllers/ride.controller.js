const {
  getDistanceAndTime,
  getCaptainsInRadius,
  getAddressCordinates,
} = require("../helper/maps");
const { getFare, getOtp } = require("../helper/ride");
const wrapperMessage = require("../helper/wrapperMessage");
const Captain = require("../models/captain.model");
const Ride = require("../models/ride.model");
const User = require("../models/user.model");
const { sendMessageToSocketId } = require("../socket");

const createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;
  try {
    if (!pickup || !destination || !vehicleType) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const destnationCord = await getAddressCordinates(destination);
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
      destnationCord
    });
    const cordinates = await getAddressCordinates(pickup);
    const captainsInRadius = await getCaptainsInRadius(cordinates, 3);

    console.log(captainsInRadius);

    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");
    rideWithUser.otp = "";
    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
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
  try {
    if (!rideId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    await Ride.findByIdAndUpdate(
      { _id: rideId },
      { status: "confirmed", captain: req.user._id },
    )
    
    const ride = await Ride.findOne({ _id: rideId }).populate("user").populate("captain");
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    

    res.json(
      wrapperMessage("success", "Ride confirmed successfully", { ride })
    );
  } catch (error) {
    console.error("Error confirming ride:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
};

const startRide = async (req, res) => {
  const { rideId, otp } = req.body;
  try {
    if (!rideId || !otp) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const ride = await Ride.findOne({ _id: rideId }).populate("user");
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    if (ride.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    Promise.all([
      await User.findByIdAndUpdate(
        { _id: ride.user._id },
        { 
          rideInfo: {
            isRideActive: true,
            rideId: ride._id,
          },
         },
      ),
      await Captain.findByIdAndUpdate(
        { _id: ride.captain },
        { rideInfo: {
            isRideActive: true,
            rideId: ride._id,
        }},
      ),
    ])
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    ride.status = "ongoing";
    await ride.save();
    res.json(wrapperMessage("success", "Ride started successfully", { ride }));
  } catch (error) {
    console.error("Error starting ride:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
};

const getRideInfo = async (req, res) => {
  const { rideId } = req.query;
  try {
    if (!rideId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const ride = await Ride.findOne({ _id: rideId }).populate("user").populate("captain");
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.json(wrapperMessage("success", "Ride fetched successfully", { ride }));
  } catch (error) {
    console.error("Error fetching ride:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
}

const endRide = async (req, res) => {
  const { rideId} = req.query;
  try {
    if (!rideId) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const ride = await Ride.findOne({ _id: rideId }).populate("user").populate("captain");
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    Promise.all([
      await User.findByIdAndUpdate(
        { _id: ride.user._id },
        { rideInfo: {
          isRideActive: false,
          rideId: null,
        } },
      ),
      await Captain.findByIdAndUpdate(
        { _id: ride.captain._id },
        { rideInfo: {
          isRideActive: false,
          rideId: null,
        }},
      ),
    ])
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    ride.status = "completed";
    await ride.save();
    res.json(wrapperMessage("success", "Ride ended successfully", { ride }));
  } catch (error) {
    console.error("Error ending ride:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  } 
};

module.exports = {
  createRide,
  getRideFare,
  confirmRide,
  startRide,
  endRide,
  getRideInfo,
};
