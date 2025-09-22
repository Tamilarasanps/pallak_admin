import axios from "axios";

const API_URL = "https://pallaku-backend.onrender.com/api/vehicles"; // Adjust port if needed
// const API_URL = "http://localhost:5000/api/vehicles"; // Adjust port if needed

export const getAllVehicles = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 add token
    },
    withCredentials: true, // 👈 if backend also sets cookies
  });

  return response.data;
};
