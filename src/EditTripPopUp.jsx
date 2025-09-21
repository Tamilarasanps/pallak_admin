// EditTripPopup.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditTripPopUp({ trip, onClose, onUpdate, vehicles }) {
  console.log("vehicles :", trip);
  const [form, setForm] = useState({
    date: "",
    from: "",
    to: "",
    tripType: "",
    totalFare: "",
    name: "",
    mobile: "",
    vehicle: {
      type: "",
      capacity: "",
      options: [],
    },
    driverAllowance: "",
    email: "",
    pickupTime: "",
    totalKms: "",
    baseFair: "",
    tollCharge: "",
    permitCharges: "",
  });
  console.log("trip :", trip);
  useEffect(() => {
    if (trip) {
      setForm({
        date: trip.date?.slice(0, 10) || "",
        from: trip.from || "",
        to: trip.to || "",
        tripType: trip.tripType || "",
        totalFare: trip.totalFare ?? "",
        name: trip.name || "",
        mobile: trip.mobile || "",
        vehicle: trip.vehicle || { type: "", capacity: "", options: [] },
        driverAllowance: trip.driverAllowance ?? "",
        email: trip.email || "",
        pickupTime: trip.pickupTime || "",
        totalKms: trip.totalKms ?? "",
        baseFair: trip.baseFair ?? "",
        tollCharge: trip.tollCharge ?? "",
        permitCharges: trip.permitCharges ?? "",
      });
    }
  }, [trip]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://pallaku-backend.onrender.com/api/bookings/update/${trip._id}`,
        form,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      onUpdate(res.data); // send updated trip back to parent
      onClose();
    } catch (err) {
      console.error("Error updating trip:", err);
      alert("Failed to update trip");
    }
  };
  console.log("pl :", form.permitCharges);
  console.log("hgn :", trip.permitCharges);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md w-96 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Edit Trip</h2>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Pickup */}
          <div>
            <label className="block text-sm font-semibold mb-1">Pickup</label>
            <input
              type="text"
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="Pickup location"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Drop */}
          <div>
            <label className="block text-sm font-semibold mb-1">Drop</label>
            <input
              type="text"
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="Drop location"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Trip Type */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Trip Type
            </label>
            <select
              name="tripType"
              value={form.tripType}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="onwaytrip">One Way Trip</option>
              <option value="roundtrip">Round Trip</option>
            </select>
          </div>

          {/* Fare */}
          <div>
            <label className="block text-sm font-semibold mb-1">Fare</label>
            <input
              type="number"
              name="totalFare"
              value={form.totalFare}
              onChange={handleChange}
              placeholder="Fare"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold mb-1">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Pickup Time */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Pickup Time
            </label>
            <input
              type="time"
              name="pickupTime"
              value={form.pickupTime}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Vehicle Section */}
          <div>
            <label className="block text-sm font-semibold mb-1">Vehicle</label>
            <select
              name="vehicle"
              value={
                vehicles.find((v) => v.type === form.vehicle?.type)?._id || ""
              }
              onChange={(e) => {
                const selected = vehicles.find((v) => v._id === e.target.value);
                if (selected) {
                  setForm((prev) => ({
                    ...prev,
                    vehicle: {
                      type: selected.type,
                      capacity: selected.capacity,
                      options: selected.options,
                    },
                  }));
                }
              }}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.type}
                </option>
              ))}
            </select>
          </div>

          {/* Total KMs */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Total KMs
            </label>
            <input
              type="number"
              name="totalKms"
              value={form.totalKms}
              onChange={handleChange}
              placeholder="Total Kilometers"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Base Fare */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Base Fare
            </label>
            <input
              type="number"
              name="baseFair"
              value={form.baseFair}
              onChange={handleChange}
              placeholder="Base Fare"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Toll Charges */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Toll Charges
            </label>
            <input
              type="number"
              name="tollCharge"
              value={form.tollCharge}
              onChange={handleChange}
              placeholder="Toll Charges"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Permit Charges */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Permit Charges
            </label>
            <input
              type="number"
              name="permitCharges"
              value={form.permitCharges}
              onChange={handleChange}
              placeholder="Permit Charges"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Driver Allowance */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Driver Allowance
            </label>
            <input
              type="number"
              name="driverAllowance"
              value={form.driverAllowance}
              onChange={handleChange}
              placeholder="Driver Allowance"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
