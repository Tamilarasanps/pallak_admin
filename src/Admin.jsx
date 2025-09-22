import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { fetchAllBookings } from "./service/booking.api";
import { useGlobalContext } from "./context/GlobalContext";
import { getAllVehicles } from "./service/vehicles";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditTripPopUp from "./EditTripPopUp";
import axios from "axios";

export default function AdminPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [tripsData, setTripsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const { setVehicleDetails, vehicleDetails } = useGlobalContext();
  const [showPickup, setShowPickup] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    date: "",
    tripType: "",
    name: "",
    from: "",
    to: "",
    bookingId: "",
  });
  const [editingTrip, setEditingTrip] = useState(null);

  const locations = useMemo(() => {
    const allLocations = [
      ...new Set(
        tripsData.flatMap((trip) => [trip.from, trip.to].filter(Boolean))
      ),
    ];
    return allLocations.sort();
  }, [tripsData]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllBookings();
        const response = await getAllVehicles();
        setVehicleDetails(response);
        setTripsData(data?.tripDetails || []);
        setFilteredData(data?.tripDetails || []);
        setMobileNumber(data?.adminPhone || "");

        const total = data?.tripDetails?.reduce(
          (sum, trip) => sum + (trip.totalFare || 0),
          0
        );
        setTotalEarnings(total);
      } catch (error) {
        if (error?.status === 401) navigate("/login");
        console.error("Failed to fetch trips:", error);
      }
    };
    getData();
  }, []);

  const applyFilters = () => {
    let filtered = tripsData.filter((trip) => {
      return (
        (!filters.bookingId ||
          trip.bookingId
            ?.toLowerCase()
            .includes(filters.bookingId.toLowerCase())) &&
        (!filters.date || trip.date?.includes(filters.date)) &&
        (!filters.tripType ||
          trip.tripType
            ?.toLowerCase()
            .includes(filters.tripType.toLowerCase())) &&
        (!filters.name ||
          trip.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.from ||
          trip.from?.toLowerCase().includes(filters.from.toLowerCase())) &&
        (!filters.to ||
          trip.to?.toLowerCase().includes(filters.to.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateMobile = async () => {
    try {
      const res = await axios.put(
        "https://pallaku-backend.onrender.com/api/admin/mobile",
        // "http://localhost:5000/api/admin/mobile",
        { mobile: mobileNumber }, // request body
        { headers: { "Content-Type": "application/json" } } // headers
      );

      console.log("Response:", res.data);
      alert("Mobile number updated!");
    } catch (error) {
      console.error("Error updating mobile:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="w-full h-full bg-indigo-50 space-y-6 py-4 p-6 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="lg:text-3xl font-bold text-indigo-700">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <input
            type="tel"
            placeholder="Update Admin Mobile"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="px-4 py-2 w-32 lg:w-48 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            onClick={handleUpdateMobile}
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all">
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
          <p className="text-3xl font-bold text-indigo-800 mt-2">
            {filteredData.length}
          </p>
        </div>
        <div className="bg-white border-l-4 border-green-500 p-6 rounded-xl shadow text-center">
          <p className="text-lg font-semibold text-gray-600">Total Earnings</p>
          <p className="text-3xl font-bold text-green-700 mt-2">
            ₹{totalEarnings.toFixed(2)}
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <select
          name="tripType"
          value={filters.tripType}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        >
          <option value="">All Trips</option>
          <option value="onwaytrip">One Way Trip</option>
          <option value="roundtrip">Round Trip</option>
        </select>
        <input
          type="text"
          name="bookingId"
          autoComplete="off"
          placeholder="Booking ID"
          value={filters.bookingId}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="off"
          value={filters.name}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <div className="relative">
          <input
            type="text"
            name="from"
            placeholder="Pickup Location"
            autoComplete="off"
            value={filters.from}
            onChange={handleFilterChange}
            onFocus={() => setShowPickup(true)}
            onBlur={() => setTimeout(() => setShowPickup(false), 150)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none w-full"
          />
          {showPickup && locations.length > 0 && (
            <div className="absolute z-10 w-full mt-1 max-h-32 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
              {locations.map((loc, i) => (
                <div
                  key={i}
                  onMouseDown={() =>
                    setFilters((prev) => ({ ...prev, from: loc }))
                  }
                  className="p-2 cursor-pointer hover:bg-indigo-100 break-words"
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="to"
            placeholder="Drop Location"
            value={filters.to}
            autoComplete="off"
            onChange={handleFilterChange}
            onFocus={() => setShowDrop(true)}
            onBlur={() => setTimeout(() => setShowDrop(false), 150)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none w-full"
          />
          {showDrop && locations.length > 0 && (
            <div className="absolute z-10 w-full mt-1 max-h-32 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
              {locations.map((loc, i) => (
                <div
                  key={i}
                  onMouseDown={() =>
                    setFilters((prev) => ({ ...prev, to: loc }))
                  }
                  className="p-2 cursor-pointer hover:bg-indigo-100 break-words"
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={applyFilters}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all"
        >
          <Search size={18} /> Filter
        </button>
      </div>

      {/* Travel details */}
      <div className="relative w-full overflow-y-scroll h-96 bg-white rounded-md">
        <table className="absolute lg:min-w-[900px] w-full table-fixed text-sm border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left w-24">Edit</th>
              <th className="px-4 py-3 text-left w-28">Booking Id</th>
              <th className="px-4 py-3 text-left w-28">Date</th>
              <th className="px-4 py-3 text-left w-40">Pickup</th>
              <th className="px-4 py-3 text-left w-40">Drop</th>
              <th className="px-4 py-3 text-left w-32">Trip Type</th>
              <th className="px-4 py-3 text-left w-32">Vehicle</th>
              <th className="px-4 py-3 text-left w-28">Fare</th>
              <th className="px-4 py-3 text-left w-40">Mobile</th>
              <th className="px-4 py-3 text-left w-40">Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .slice()
              .reverse()
              .map((trip, index) => (
                <tr
                  key={trip._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3 whitespace-normal break-words">
                    <button
                      onClick={() => setEditingTrip(trip)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-normal break-words">
                    {trip?.bookingId || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-normal break-words">
                    {trip.date?.slice(0, 10) || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-normal break-words">
                    {trip.from || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-normal break-words">
                    {trip.to || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-normal break-words">
                    {trip.tripType || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-normal break-words">
                    {trip.vehicle?.type || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-normal break-words">
                    {trip.totalFare != null
                      ? `₹ ${trip.totalFare.toFixed(2)}`
                      : "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-normal break-words">
                    {trip.mobile || "-"}
                  </td>
                  <td className="px-4 py-3 whitespace-normal break-words">
                    {trip.name || "-"}
                  </td>
                </tr>
              ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No trips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Trip Popup */}
      {editingTrip && (
        <EditTripPopUp
          trip={editingTrip}
          vehicles={vehicleDetails}
          onClose={() => setEditingTrip(null)}
          onUpdate={(updatedTrip) => {
            setTripsData((prev) =>
              prev.map((t) => (t._id === updatedTrip._id ? updatedTrip : t))
            );
            setFilteredData((prev) =>
              prev.map((t) => (t._id === updatedTrip._id ? updatedTrip : t))
            );
          }}
        />
      )}
    </div>
  );
}
