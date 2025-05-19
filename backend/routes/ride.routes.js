const express = require("express");
const { query, body } = require("express-validator");
const { createRide, getRideFare, confirmRide, startRide, endRide, getRideInfo } = require("../controllers/ride.controller");
const { authUser,authCaptain } = require("../middlewares/auth.middleware");
const router = express.Router()


router.post("/create",authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    createRide
  )

router.get('/get-fare',authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    getRideFare
)

router.get('/confirm-ride',authCaptain,
  query('rideId').isString().isLength({ min: 3 }).withMessage('Invalid ride id'),
  confirmRide
)

router.post('/start-ride',authCaptain,
  body('rideId').isString().isLength({ min: 3 }).withMessage('Invalid ride id'),
  body('otp').isString().isLength({ min: 6 }).withMessage('Invalid otp'),
  startRide
)

router.get('/get-ride',authUser,
  query('rideId').isString().isLength({ min: 3 }).withMessage('Invalid ride id'),
  getRideInfo
)

router.get('/end-ride',authCaptain,endRide)

module.exports = router