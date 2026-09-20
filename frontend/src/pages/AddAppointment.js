import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Stethoscope,
  FileText,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const AddAppointment = () => {

  const navigate = useNavigate();

  // 1. Exact Form State with your required fields
  const initialFormData = {
    patientName: "",
    age: "",
    gender: "",
    patientPhone: "",
    patientAddress: "",
    doctor: "",
    appointmentDate: "",
    appointmentTime: "",
    symptoms: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);

  useEffect(() => {
    const checkuserlogin = async () => {
      try {
        const res = await axiosInstance.get("/api/me")
        if (!res.data.success) {
          navigate("/auth");
        }
      } catch (error) {
        navigate("/auth");
      }
    }
    checkuserlogin();

  }, [])

  // 2. Fetch Doctors from API
  useEffect(() => {
    setDoctorsLoading(true);
    axiosInstance.get("/api/user/doctors")
      .then((res) => {
        // Safe check if response is direct array or { doctors: [...] }
        const doctorList = Array.isArray(res.data)
          ? res.data
          : (res.data.doctors || res.data.data || []);
        setDoctors(doctorList);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setErrorMessage("Doctors list load nahi ho payi. Please check connection.");
      })
      .finally(() => {
        setDoctorsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  // 3. Handle Appointment Submission
  const handleAddAppointment = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.doctor) {
      setErrorMessage("Kripya ek doctor select karein.");
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting Form Data: ", formData);
      const res = await axiosInstance.post("/api/user/appointment/add", formData);
      console.log("Appointment Created: ", res.data);

      // Booked data ko modal preview ke liye save karein
      setBookedDetails({ ...formData });

      // Form reset karein aur success modal open karein
      setFormData(initialFormData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Appointment error: ", error);
      const msg = error.response?.data?.message || "Appointment schedule nahi ho saka. Dobara koshish karein.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // Past dates prevent karne ke liye (aaj ki date se start)
  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header Banner */}
        <div className="bg-white rounded-t-2xl border border-slate-200 border-b-0 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Book an Appointment
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Specialist consultation ke liye details fill karein.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2.5 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-b-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleAddAppointment} className="space-y-6">

            {/* SECTION 1: Patient Details */}
            <div>
              <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> 1. Patient Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="patientName"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    placeholder="e.g. 26"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-700"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Patient Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      name="patientPhone"
                      placeholder="e.g. +91 9876543210"
                      value={formData.patientPhone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Patient Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="patientAddress"
                      placeholder="e.g. Sector 14, Delhi"
                      value={formData.patientAddress}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* SECTION 2: Doctor & Schedule */}
            <div>
              <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Stethoscope className="w-4 h-4" /> 2. Doctor & Timing
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Doctor Dropdown with Specialization in Brackets */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Doctor <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      required
                      disabled={doctorsLoading}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800 disabled:opacity-60"
                    >
                      <option value="">
                        {doctorsLoading ? "Loading doctors..." : "-- Select Doctor --"}
                      </option>
                      {doctors.map((doc, idx) => {
                        const doctorName = doc.name || doc.doctorName || `Doctor #${idx + 1}`;
                        const specialist = doc.specialist || doc.specialization || doc.department || "General";
                        return (
                          <option key={doc._id || idx} value={doctorName}>
                            {doctorName} ({specialist})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Appointment Date */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      name="appointmentDate"
                      min={todayDateString}
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Appointment Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Appointment Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* SECTION 3: Symptoms */}
            <div>
              <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" /> 3. Symptoms / Problem
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Symptoms Details
                </label>
                <textarea
                  rows="3"
                  name="symptoms"
                  placeholder="Kripya apni takleef ya bimari likhein (e.g. fever for 2 days, back pain...)"
                  value={formData.symptoms}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
                ></textarea>
              </div>
            </div>

            {/* Submit Button with Loading Spinner */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scheduling Appointment...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm & Book Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =========================================
          SUCCESS MODAL (POPUP)
         ========================================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 text-center relative animate-in fade-in zoom-in duration-150">

            {/* Top Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            {/* Modal Heading */}
            <h3 className="text-xl font-bold text-slate-900">
              Appointment Scheduled Successfully!
            </h3>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
              Aapka appointment confirm ho chuka hai.
            </p>

            {/* Summary Details */}
            {bookedDetails && (
              <div className="my-5 bg-slate-50 rounded-xl p-4 text-left border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-800">{bookedDetails.patientName} ({bookedDetails.gender}, {bookedDetails.age} yrs)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-semibold text-emerald-700">{bookedDetails.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-semibold text-slate-800">{bookedDetails.appointmentDate} at {bookedDetails.appointmentTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-semibold text-slate-800">{bookedDetails.patientPhone}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/my-appointments'); // Redirects to appointments list
                }}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Appointments</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAppointment;