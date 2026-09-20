import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DoctorAdd from "./pages/DoctorAdd";
import AddAppointment from "./pages/AddAppointment";
import Appointments from "./pages/Appointments";
import axiosInstance from "./utils/axiosInstance";
import { useEffect, useState } from "react";
import AdminPanel from "./admin/AdminPanel";
function App() {

 

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/doctor" element={<DoctorAdd />} />
        <Route path="/book-appointment" element={<AddAppointment />} />
        <Route path="/my-appointments" element={<Appointments />} />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
