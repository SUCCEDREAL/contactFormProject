import axios from "axios";

const API = axios.create({
  baseURL: "https://contactform-backend-c2wa.onrender.com/api/v1/signup",
  withCredentials: true,
});

export default Api;
