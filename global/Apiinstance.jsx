import axios from "axios";

const Api = axios.create({
  baseURL: "http://13.51.206.203/api",
  withCredentials: true
});


export default Api;

export const IMAGE_BASE_URL = "http://13.51.206.203";
