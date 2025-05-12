
export default class API_CONSTANTS {
  static BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

  static getUser = "/user/profile";
  static loginUser = "/user/login";
  static registerUser = "/user/register";
  static getCaptain = "/captain/profile";
  static loginCaptain = "/captain/login";
  static registerCaptain = "/captain/register";
}