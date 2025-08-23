import axios from "axios";

// const BASE_URL = "https://pallaku-backend.onrender.com/api/vehicles";
const BASE_URL = "http://localhost:5000/api/vehicles";

export const createVehicle = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};
