import axios from "axios";

const Api = axios.create({
  baseURL: "http://13.51.206.203:9000/api",
  withCredentials: true
});


export default Api;


