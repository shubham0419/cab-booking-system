
export default class API_CONSTANTS {
  static BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

  static getUser = "/user/profile";
  static loginUser = "/user/login";
  static registerUser = "/user/register";
  static getCaptain = "/captain/profile";
  static loginCaptain = "/captain/login";
  static registerCaptain = "/captain/register";

  static getCurrentUser = "/current-user";

  static addressSuggestions = "/maps/get-suggestions";
  static getRideFare = "/ride/get-fare";
  static createRide = "/ride/create";
  static confirmRide = "/ride/confirm-ride";
  static startRide = "/ride/start-ride";
  static endRide = "/ride/end-ride";
  static getRide = "/ride/get-ride";
}