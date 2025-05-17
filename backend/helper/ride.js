const { getDistanceAndTime } = require("./maps");
const crypto = require("crypto");

module.exports.getFare = async (pickup, destination) => {
  try {
    const distanceTime = await getDistanceAndTime(pickup, destination);

    const baseFare = {
      auto: 20,
      car: 40,
      moto: 10,
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8,
    };

    const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5,
    };

    const fare = {
      auto: Math.round(
        baseFare.auto +
          (distanceTime.distance.value / 1000) * perKmRate.auto +
          (distanceTime.duration.value / 60) * perMinuteRate.auto
      ),
      car: Math.round(
        baseFare.car +
          (distanceTime.distance.value / 1000) * perKmRate.car +
          (distanceTime.duration.value / 60) * perMinuteRate.car
      ),
      moto: Math.round(
        baseFare.moto +
          (distanceTime.distance.value / 1000) * perKmRate.moto +
          (distanceTime.duration.value / 60) * perMinuteRate.moto
      ),
    };

    return fare;
  } catch (error) {
    console.error("Error fetching fare:", error);
    throw new Error(error.message);
  }
};

module.exports.getOtp = (num) => {
  function generateOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
  }
  return generateOtp(num);
};
