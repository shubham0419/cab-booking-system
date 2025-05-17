const { default: axios } = require("axios");
const Captain = require("../models/captain.model");
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

module.exports.getAddressCordinates = async (address) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    );
    if (data.status === "OK") {
      return {
        ltd: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      };
    }
    throw new Error("Invalid address");
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw new Error("Error fetching coordinates");
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      throw new Error("Please provide origin and destination");
    }
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`
    );
    if (data.status === "OK") {
      if (data.rows[0].elements[0].status == "ZERO_RESULTS") {
        throw new Error("no result found");
      }
      return {
        distance: data.rows[0].elements[0].distance,
        duration: data.rows[0].elements[0].duration,
      };
    }
    throw new Error("Invalid address");
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw new Error("Error fetching coordinates");
  }
};


module.exports.getAddressSuggestions = async (address) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${apiKey}`
    );
    if (data.status === "OK") {
      return data.predictions.map(prediction => prediction.description).filter(value => value);
    }
    throw new Error("Invalid address");
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw new Error("Error fetching coordinates");
  }
}


module.exports.getCaptainsInRadius = async (location, radius) => {
  try {
    const captains = await Captain.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ location.ltd, location.lng ], radius / 6371 ]
            }
        }
    });
    return captains;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw new Error("Error fetching coordinates");
  }
}