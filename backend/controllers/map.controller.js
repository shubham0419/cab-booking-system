const { validationResult } = require("express-validator");
const { getAddressCordinates, getDistanceAndTime, getAddressSuggestions } = require("../helper/maps");
const wrapperMessage = require("../helper/wrapperMessage");



module.exports.getCordinates = async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Please provide a valid address" });
  }
  const { address } = req.query;
  try {
    const cordinates = await getAddressCordinates(address);
    if (!cordinates) {
      return res.status(400).json({ message: "Invalid address" });
    }
    
    res.json(wrapperMessage("success", "cordinates fetched successfully",{cordinates}))
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
}


module.exports.getDistanceTime = async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Please provide a valid address" });
  }
  const { origin,destination } = req.query;
  try {
    const {distance,duration} = await getDistanceAndTime(origin,destination);
    
    res.json(wrapperMessage("success", "distance and time fetched successfully", {distance,duration}))
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
}


module.exports.getAutoSuggestions = async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Please provide a valid address" });
  }
  const { address } = req.query;
  try {
    const suggestions = await getAddressSuggestions(address);
    res.json(wrapperMessage("success", "suggestions are : ", {suggestions}))
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    res.status(error.code || 500).json(wrapperMessage("failed", error.message));
  }
}
