// bookingApi.js
import axios from "axios";
import AxiosInstance from "../AxiosInstance";

export const fetchAllBookings = async () => {
  try {
    // const response = await axios.get("http://localhost:5000/api/bookings", {
    const response = await AxiosInstance.get("/bookings");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
    throw error; // Rethrow for further handling in the component
  }
};
