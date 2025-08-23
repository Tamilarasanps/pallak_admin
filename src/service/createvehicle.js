import axios from "axios";

const BASE_URL = "http://localhost:5000/api/vehicles";

export const createVehicle = async (formData) => {
  // return await axios.post(`http://localhost:5000/create`, formData, {
    return await axios.post(
      `https://pallaku-backend.onrender.com/create`,
    formData,
    {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
