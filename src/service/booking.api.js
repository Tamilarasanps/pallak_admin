// bookingApi.js
import axios from "axios";

export const fetchAllBookings = async () => {
  const token = localStorage.getItem("token");
  // console.log('token :',token)
  try {
    // const response = await axios.get("http://localhost:5000/api/bookings", {
    const response = await axios.get(
      "https://pallaku-backend.onrender.com/api/bookings",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // ← include cookies
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
    throw error; // Rethrow for further handling in the component
  }
};
