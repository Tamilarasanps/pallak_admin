import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "./context/GlobalContext";
import { getAllVehicles } from "./service/vehicles";
import toast from "react-hot-toast";

export default function EditVehicles() {
  const [editData, setEditData] = useState({});
  const [imageFiles, setImageFiles] = useState({});
  const { vehicleDetails, setVehicleDetails } = useGlobalContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllVehicles();
        setVehicleDetails(response);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const initial = {};
    vehicleDetails?.forEach((v) => {
      initial[v._id] = {
        type: v.type,
        capacity: v.capacity,
        oneWayPrice: v.oneWayPrice,
        roundTripPrice: v.roundTripPrice,
        oneWayTripMinKm: v.oneWayTripMinKm,
        roundTripMinKm: v.roundTripMinKm,
        driverAllowance: v.driverAllowance,
        options: [...v.options],
      };
    });
    setEditData(initial);
  }, [vehicleDetails]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) => ({ ...prev, [id]: file }));
    }
  };

  const handleOptionChange = (id, index, value) => {
    const updatedOptions = [...(editData[id]?.options || [])];
    updatedOptions[index] = value;
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        options: updatedOptions,
      },
    }));
  };

  const handleAddOption = (id) => {
    const updatedOptions = [...(editData[id]?.options || [])];
    updatedOptions.push("");
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        options: updatedOptions,
      },
    }));
  };

  const handleDeleteOption = (id, index) => {
    const updatedOptions = [...(editData[id]?.options || [])];
    updatedOptions.splice(index, 1);
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        options: updatedOptions,
      },
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const updated = editData[id];
      const formData = new FormData();
      formData.append("type", updated.type);
      formData.append("capacity", updated.capacity);
      formData.append("oneWayPrice", updated.oneWayPrice);
      formData.append("roundTripPrice", updated.roundTripPrice);
      formData.append("oneWayTripMinKm", updated.oneWayTripMinKm);
      formData.append("roundTripMinKm", updated.roundTripMinKm);
      formData.append("driverAllowance", updated.driverAllowance);
      formData.append("options", JSON.stringify(updated.options));

      if (imageFiles[id]) {
        formData.append("img", imageFiles[id]);
      }

      const res = await axios.put(
        // `http://localhost:5000/api/vehicles/update-vehicle/${id}`,
        `https://pallaku-backend.onrender.com/api/vehicles/update-vehicle/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Refresh state with updated vehicle
      setVehicleDetails((prev) =>
        prev.map((veh) => (veh._id === id ? { ...veh, ...res?.data } : veh))
      );

      toast.success("Vehicle updated!", { position: "top-center" });
    } catch (err) {
      console.error(err);
      toast.error("Update failed", { position: "top-center" });
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this vehicle?"
      );
      if (!confirm) return;

      //       await axios.delete(
      //         `http://localhost:5000/api/vehicles/delete-vehicle/${id}`
      // );
      await axios.delete(
        `https://pallaku-backend.onrender.com/api/vehicles/delete-vehicle/${id}`
      );
      setVehicleDetails((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed", { position: "top-center" });
    }
  };
  console.log("veh :", vehicleDetails);
  console.log("edi :", editData);
  return (
    <div className="lg:p-6 space-y-6">
      {vehicleDetails?.map((v) => (
        <div
          key={v._id}
          className="border p-6 rounded-lg shadow-lg space-y-6 bg-white"
        >
          <div className="flex flex-col md:flex-row items-start md:space-x-6 space-y-4 md:space-y-0">
            <img
              src={`https://pallaku-backend.onrender.com/image/${v.img}`}
              // src={`http://localhost:5000/image/${v.img}`}
              alt="vehicle"
              className="w-full md:w-40 h-28 object-cover rounded"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block text-sm font-semibold mb-1">Type</label>
                <input
                  name="type"
                  value={editData[v._id]?.type || ""}
                  onChange={(e) => handleChange(e, v._id)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Capacity
                </label>
                <input
                  name="capacity"
                  value={editData[v._id]?.capacity || ""}
                  onChange={(e) => handleChange(e, v._id)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  One Way Trip Price
                </label>
                <input
                  name="oneWayPrice"
                  type="number"
                  value={editData[v._id]?.oneWayPrice || ""}
                  onChange={(e) => handleChange(e, v._id)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Round Trip Price
                </label>
                <input
                  name="roundTripPrice"
                  type="number"
                  value={editData[v._id]?.roundTripPrice || ""}
                  onChange={(e) => handleChange(e, v._id)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  One Way Trip Min Km
                </label>
                <input
                  name="oneWayTripMinKm"
                  type="number"
                  value={editData[v._id]?.oneWayTripMinKm || ""}
                  onChange={(e) => handleChange(e, v._id)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Round Trip Min Km
                </label>
                <input
                  name="roundTripMinKm"
                  type="number"
                  value={editData[v._id]?.roundTripMinKm || ""}
                  onChange={(e) => handleChange(e, v._id)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Driver Allowance (per day)
                </label>
                <input
                  name="driverAllowance"
                  type="number"
                  value={editData[v._id]?.driverAllowance || ""}
                  onChange={(e) => handleChange(e, v._id)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-1">
                  Change Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, v._id)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Options</label>
            {(editData[v._id]?.options || []).map((opt, i) => (
              <div key={i} className="relative w-full sm:w-auto">
                <input
                  value={opt}
                  onChange={(e) => handleOptionChange(v._id, i, e.target.value)}
                  className="border p-2 pr-10 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteOption(v._id, i)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
                  title="Remove option"
                >
                  &times;
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleAddOption(v._id)}
              className="bg-green-500 text-white px-3 py-1 text-sm rounded"
            >
              + Add Option
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => handleUpdate(v._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteVehicle(v._id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
