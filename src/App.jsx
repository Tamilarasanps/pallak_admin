import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AdminPage from "./Admin";
import EditVehicles from "./EditVehicles";
import CreateVehicleForm from "./CreateVehicles";
import { Toaster } from "react-hot-toast";
import Login from "./Login";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<AdminPage />} />
          <Route path="/edit" element={<EditVehicles />} />
          <Route path="/create" element={<CreateVehicleForm />} />
        </Route>
      </Routes>
    </>
  );
}
