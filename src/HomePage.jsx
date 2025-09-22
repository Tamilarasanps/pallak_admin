// In HomePage.jsx or any protected page
import { useEffect } from "react";
import AxiosInstance from "./axiosInstance";

const HomePage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("/home"); // token will be auto-attached
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
