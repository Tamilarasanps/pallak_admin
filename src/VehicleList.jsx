import React, { useEffect, useState } from "react";
import { getAllVehicles } from "./service/vehicles";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllVehicles();
        setVehicles(data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {vehicles.map((v) => (
            <div key={v._id} className="border rounded p-3 shadow bg-white">
              <p><strong>Type:</strong> {v.type}</p>
              <p><strong>Capacity:</strong> {v.capacity}</p>
              <p><strong>One Way:</strong> ₹{v.oneWayPrice}</p>
              <p><strong>Round Trip:</strong> ₹{v.roundTripPrice}</p>
              <p><strong>Options:</strong> {v.options.join(", ")}</p>
              {v.img && (
                <img
                  src={`http://localhost:5000/uploads/${v.img}`} // Adjust if stored differently
                  alt={v.type}
                  className="mt-2 w-full h-40 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
