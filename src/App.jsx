import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AdminPage from "./Admin";
import EditVehicles from "./EditVehicles";
import CreateVehicleForm from "./CreateVehicles";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AdminPage />} />
        <Route path="/edit" element={<EditVehicles />} />
        <Route path="/create" element={<CreateVehicleForm />} />
      </Route>
    </Routes>
  );
}
