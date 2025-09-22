// import axios from "axios";

// const API_URL = "https://pallaku-backend.onrender.com/api/vehicles"; // Adjust port if needed
// // const API_URL = "http://localhost:5000/api/vehicles"; // Adjust port if needed

// export const getAllVehicles = async () => {
//   const response = await axios.get(API_URL);

//   return response.data;
// };

import AxiosInstance from "../AxiosInstance";

export const getAllVehicles = async () => {
  try {
    const response = await AxiosInstance.get("/vehicles");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error.message);
    throw error;
  }
};
