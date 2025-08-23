import React, { useState } from "react";
import { motion } from "framer-motion";
import { createVehicle } from "./service/createvehicle";
import toast from "react-hot-toast";

export default function CreateVehicleForm({ onCreated }) {
  const [vehicle, setVehicle] = useState({
    type: "",
    capacity: "",
    options: [""],
    img: null,
    oneWayPrice: "",
    roundTripPrice: "",
    oneWayTripMinKm: "",
    roundTripMinKm: "",
    driverAllowance: "",
  });

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...vehicle.options];
    updatedOptions[index] = value;
    setVehicle({ ...vehicle, options: updatedOptions });
  };

  const handleAddOption = () => {
    setVehicle({ ...vehicle, options: [...vehicle.options, ""] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Null / empty checks
    if (!vehicle.type?.trim()) return toast.error("Vehicle type is required");
    if (!vehicle.capacity?.trim()) return toast.error("Capacity is required");
    if (!vehicle.oneWayPrice) return toast.error("One way price is required");
    if (!vehicle.roundTripPrice)
      return toast.error("Round trip price is required");
    if (!vehicle.oneWayTripMinKm)
      return toast.error("One way min km is required");
    if (!vehicle.roundTripMinKm)
      return toast.error("Round trip min km is required");
    if (!vehicle.driverAllowance)
      return toast.error("Driver allowance is required");
    if (!vehicle.img) return toast.error("Vehicle image is required");

    const data = new FormData();
    data.append("type", vehicle.type);
    data.append("capacity", vehicle.capacity);
    data.append("oneWayPrice", vehicle.oneWayPrice);
    data.append("roundTripPrice", vehicle.roundTripPrice);
    data.append("oneWayTripMinKm", vehicle.oneWayTripMinKm);
    data.append("roundTripMinKm", vehicle.roundTripMinKm);
    data.append("driverAllowance", vehicle.driverAllowance);
    data.append("options", JSON.stringify(vehicle.options));
    if (vehicle.img) data.append("img", vehicle.img);

    try {
      await createVehicle(data);
      toast.success("✅ Vehicle created successfully!");
      onCreated && onCreated();
      setVehicle({
        type: "",
        capacity: "",
        options: [""],
        img: null,
        oneWayPrice: "",
        roundTripPrice: "",
        oneWayTripMinKm: "",
        roundTripMinKm: "",
        driverAllowance: "",
      });
    } catch (err) {
      toast.error("❌ " + (err?.response?.data?.message || err.message));
    }
  };

  // 🧩 Reusable input config
  const inputFields = [
    {
      label: "Vehicle Type",
      name: "type",
      type: "text",
      placeholder: "e.g., SUV",
    },
    {
      label: "Capacity",
      name: "capacity",
      type: "text",
      placeholder: "e.g., 4 seater + 1 Driver",
    },
    {
      label: "One Way Trip Price (₹)",
      name: "oneWayPrice",
      type: "number",
      placeholder: "Enter one way price",
    },
    {
      label: "Round Trip Price (₹)",
      name: "roundTripPrice",
      type: "number",
      placeholder: "Enter round trip price",
    },
    {
      label: "One Way Trip Min Km",
      name: "oneWayTripMinKm",
      type: "number",
      placeholder: "Enter one way min km",
    },
    {
      label: "Round Trip Min Km",
      name: "roundTripMinKm",
      type: "number",
      placeholder: "Enter round trip min km",
    },
    {
      label: "Driver Allowance (per day)",
      name: "driverAllowance",
      type: "number",
      placeholder: "Enter driver allowance",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-xl rounded-xl p-6 mt-10 w-[90%] mx-auto"
    >
      <h2 className="text-xl font-bold text-indigo-700 mb-4">
        Create New Vehicle
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* 🔁 Mapped Inputs */}
        {inputFields.map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              className="w-full border border-gray-300 p-2 rounded"
              value={vehicle[name]}
              onChange={(e) =>
                setVehicle({ ...vehicle, [name]: e.target.value })
              }
            />
          </div>
        ))}

        {/* 📷 Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Vehicle Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(e) => setVehicle({ ...vehicle, img: e.target.files[0] })}
          />
        </div>

        {/* 🧩 Options */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Options
          </label>
          {vehicle.options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              className="w-full mb-2 border border-gray-300 p-2 rounded"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="text-sm text-indigo-600 mt-1 hover:underline"
          >
            + Add Option
          </button>
        </div>

        {/* ✅ Submit */}
        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Vehicle
          </button>
        </div>
      </form>
    </motion.div>
  );
}
