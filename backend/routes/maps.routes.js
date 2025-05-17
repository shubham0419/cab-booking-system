const express = require("express");
const { getCordinates, getDistanceTime, getAutoSuggestions } = require("../controllers/map.controller");
const { query } = require("express-validator");
const router = express.Router();


router.get("/get-cordinates",query('address').isString().isLength({min:3}) ,getCordinates);

router.get("/distance-time",query("origin").isString().isLength({min:3}),getDistanceTime)

router.get("/get-suggestions",query('address').isString().isLength({min:3}),getAutoSuggestions);

module.exports = router;