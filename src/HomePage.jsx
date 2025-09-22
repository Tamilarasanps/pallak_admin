// In HomePage.jsx or any protected page
import { useEffect } from "react";
import axios from "../utils/axiosInstance"; // adjust path if needed

const HomePage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/home"); // token will be auto-attached
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return <div>Welcome to the home page</div>;
};

export default HomePage;
