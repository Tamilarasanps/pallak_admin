import React, { useState } from "react";
import { motion } from "framer-motion";
import { createVehicle } from "./service/createvehicle";

export default function CreateVehicleForm({ onCreated }) {
    const [vehicle, setVehicle] = useState({
        type: "",
        capacity: "",
        options: [""],
        img: null,
        oneWayPrice: "",
        roundTripPrice: "",
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
        const data = new FormData();
        data.append("type", vehicle.type);
        data.append("capacity", vehicle.capacity);
        data.append("oneWayPrice", vehicle.oneWayPrice);
        data.append("roundTripPrice", vehicle.roundTripPrice);
        data.append("options", JSON.stringify(vehicle.options));
        if (vehicle.img) data.append("img", vehicle.img);

        try {
            await createVehicle(data);
            alert("Vehicle created!");
            onCreated && onCreated();
            setVehicle({
                type: "",
                capacity: "",
                options: [""],
                img: null,
                oneWayPrice: "",
                roundTripPrice: "",
            });
        } catch (err) {
            alert("Error: " + (err?.response?.data?.message || err.message));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white shadow-xl rounded-xl p-6 mt-10 w-[90%] mx-auto"
        >
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Create New Vehicle</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Type</label>
                    <input
                        type="text"
                        placeholder="e.g., SUV"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={vehicle.type}
                        onChange={(e) => setVehicle({ ...vehicle, type: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Capacity</label>
                    <input
                        type="text"
                        placeholder="e.g., 4 seater + 1 Driver"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={vehicle.capacity}
                        onChange={(e) => setVehicle({ ...vehicle, capacity: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">One Way Trip Price (₹)</label>
                    <input
                        type="number"
                        placeholder="Enter one way price"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={vehicle.oneWayPrice}
                        onChange={(e) => setVehicle({ ...vehicle, oneWayPrice: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Round Trip Price (₹)</label>
                    <input
                        type="number"
                        placeholder="Enter round trip price"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={vehicle.roundTripPrice}
                        onChange={(e) => setVehicle({ ...vehicle, roundTripPrice: e.target.value })}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full border border-gray-300 p-2 rounded"
                        onChange={(e) => setVehicle({ ...vehicle, img: e.target.files[0] })}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Options</label>
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
