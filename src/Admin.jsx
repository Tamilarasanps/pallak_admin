import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAllBookings } from "./service/booking.api";
import { useGlobalContext } from "./context/GlobalContext";
import { getAllVehicles } from "./service/vehicles";

export default function AdminPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [tripsData, setTripsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const { vehicleDetails, setVehicleDetails } = useGlobalContext();
  console.log(vehicleDetails)
  const [filters, setFilters] = useState({
    date: "",
    tripType: "",
    name: "",
    from: "",
    to: "",
  });

  const handleUpdate = async () => {
    try {
      if (!mobileNumber) return alert("Enter a valid mobile number");
      await updateAdminMobile(mobileNumber);
      alert("Admin mobile updated successfully");
    } catch (error) {
      alert("Failed to update admin mobile");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllBookings();
        const response = await getAllVehicles();
        setVehicleDetails(response)
        setTripsData(data?.tripDetails || []);
        setFilteredData(data?.tripDetails || []);
        setMobileNumber(data?.adminPhone || "");
        const total = data?.tripDetails?.reduce((sum, trip) => sum + (trip.totalFare || 0), 0);
        setTotalEarnings(total);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    let filtered = tripsData.filter((trip) => {
      return (
        (!filters.date || trip.date?.includes(filters.date)) &&
        (!filters.tripType || trip.tripType?.toLowerCase().includes(filters.tripType.toLowerCase())) &&
        (!filters.name || trip.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.from || trip.from?.toLowerCase().includes(filters.from.toLowerCase())) &&
        (!filters.to || trip.to?.toLowerCase().includes(filters.to.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  }, [filters, tripsData]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen max-w-screen bg-indigo-50 py-4 p-6 overflow-hidden md:p-12 space-y-10">
      {/*  */}
      <div className="lg:max-w-7xl mx-auto space-y-6 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="lg:text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <input
              type="tel"
              placeholder="Update Admin Mobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="px-4 py-2 w-32 lg:w-48 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleUpdate}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all"
            >
              Update
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white border-l-4 border-indigo-500 p-6 rounded-xl shadow text-center">
            <p className="text-lg font-semibold text-gray-600">Total Trips</p>
            <p className="text-3xl font-bold text-indigo-800 mt-2">{filteredData.length}</p>
          </div>
          <div className="bg-white border-l-4 border-green-500 p-6 rounded-xl shadow text-center">
            <p className="text-lg font-semibold text-gray-600">Total Earnings</p>
            <p className="text-3xl font-bold text-green-700 mt-2">₹{totalEarnings.toFixed(2)}</p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="text"
            name="tripType"
            placeholder="Trip Type"
            value={filters.tripType}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="text"
            name="from"
            placeholder="Pickup Location"
            value={filters.from}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="text"
            name="to"
            placeholder="Drop Location"
            value={filters.to}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Trip Table */}
        {/* <div className="bg-white shadow-xl  rounded-xl mt-6">
          <table className="table-auto text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Pickup</th>
                <th className="px-4 py-3">Drop</th>
                <th className="px-4 py-3">Trip Type</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Fare</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((trip, index) => (
                <tr key={trip._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 text-gray-700">{trip.date?.slice(0, 10) || "-"}</td>
                  <td className="px-4 py-3">{trip.from || "-"}</td>
                  <td className="px-4 py-3">{trip.to || "-"}</td>
                  <td className="px-4 py-3">{trip.tripType || "-"}</td>
                  <td className="px-4 py-3">{trip.vehicle?.type || "-"}</td>
                  <td className="px-4 py-3">
                    {trip.totalFare != null ? `₹ ${trip.totalFare.toFixed(2)}` : "-"}
                  </td>
                  <td className="px-4 py-3">{trip.mobile || "-"}</td>
                  
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No trips found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
    </div>
    </div >
  );
}
