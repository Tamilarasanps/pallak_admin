import axios from "axios";

const API_URL = "http://localhost:5000/api/vehicles"; // Adjust port if needed

export const getAllVehicles = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};
