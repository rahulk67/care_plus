import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { 
  Calendar, 
  Clock, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock3, 
  Stethoscope, 
  Phone, 
  Loader2, 
  AlertCircle, 
  Check, 
  RefreshCw 
} from 'lucide-react';

const AdminAppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [updatingId, setUpdatingId] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  // 1. Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get("/api/user/appointment/list");
      
      const list = Array.isArray(res.data) 
        ? res.data 
        : (res.data.appointments || res.data.data || []);
      setAppointments(list);
    } catch (err) {
      console.error("Admin fetch appointments error:", err);
      setError("Appointments load nahi ho sake. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 2. Perform Status Update (Confirm, Complete, Cancel)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      setFeedbackMsg(null);

      const payload = {
        id: id,
        appointmentId: id,
        status: newStatus
      };

      console.log("Updating status:", payload);
      await axiosInstance.post("/api/user/appointment/update", payload);

      // Optimistic Local State Update
      setAppointments((prev) =>
        prev.map((item) =>
          (item._id === id || item.id === id) ? { ...item, status: newStatus } : item
        )
      );

      setFeedbackMsg({
        type: "success",
        text: `Appointment successfully updated to "${newStatus}"!`
      });

      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err) {
      console.error("Status update error:", err);
      const serverMsg = err.response?.data?.message || "Status update nahi ho paya.";
      setFeedbackMsg({
        type: "error",
        text: serverMsg
      });
      setTimeout(() => setFeedbackMsg(null), 4000);
    } finally {
      setUpdatingId(null);
    }
  };

  // Analytics Counters
  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => (a.status || "").toLowerCase() === "pending" || !a.status).length;
  const confirmedCount = appointments.filter(a => (a.status || "").toLowerCase() === "confirmed" || (a.status || "").toLowerCase() === "scheduled").length;
  const completedCount = appointments.filter(a => (a.status || "").toLowerCase() === "completed").length;
  const cancelledCount = appointments.filter(a => (a.status || "").toLowerCase() === "cancelled").length;

  // Search and Filter
  const filteredAppointments = appointments.filter((item) => {
    const q = searchQuery.toLowerCase();
    const patientMatch = (item.patientName || "").toLowerCase().includes(q);
    const doctorMatch = (item.doctor || "").toLowerCase().includes(q);
    const phoneMatch = (item.patientPhone || "").toLowerCase().includes(q);
    const symptomsMatch = (item.symptoms || "").toLowerCase().includes(q);

    const matchesSearch = patientMatch || doctorMatch || phoneMatch || symptomsMatch;

    if (statusFilter === "All") return matchesSearch;
    return matchesSearch && (item.status || "pending").toLowerCase() === statusFilter.toLowerCase();
  });

  const renderStatusBadge = (status) => {
    const st = (status || "Pending").toLowerCase();

    if (st === "confirmed" || st === "scheduled") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
        </span>
      );
    }
    if (st === "completed") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Check className="w-3.5 h-3.5" /> Completed
        </span>
      );
    }
    if (st === "cancelled") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle className="w-3.5 h-3.5" /> Cancelled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <Clock3 className="w-3.5 h-3.5" /> Pending
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* 1. TOP ANALYTICS STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Total Visits</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm">
          <p className="text-xs font-semibold text-amber-700 uppercase">Pending Review</p>
          <p className="text-2xl font-bold text-amber-800 mt-1">{pendingCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
          <p className="text-xs font-semibold text-emerald-700 uppercase">Confirmed</p>
          <p className="text-2xl font-bold text-emerald-800 mt-1">{confirmedCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20 shadow-sm">
          <p className="text-xs font-semibold text-blue-700 uppercase">Completed</p>
          <p className="text-2xl font-bold text-blue-800 mt-1">{completedCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-xs font-semibold text-rose-700 uppercase">Cancelled</p>
          <p className="text-2xl font-bold text-rose-800 mt-1">{cancelledCount}</p>
        </div>
      </div>

      {/* 2. TOAST FEEDBACK NOTIFICATION */}
      {feedbackMsg && (
        <div className={`p-3.5 rounded-xl border text-sm flex items-center gap-2.5 ${
          feedbackMsg.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {feedbackMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          )}
          <span className="font-medium">{feedbackMsg.text}</span>
        </div>
      )}

      {/* 3. SEARCH & FILTER CONTROLS */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search patient, doctor, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5">
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  statusFilter.toLowerCase() === tab.toLowerCase()
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={fetchAppointments}
            title="Refresh List"
            className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* 4. APPOINTMENTS TABLE */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-600">Appointments load ho rahe hain...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-red-200 p-12 text-center shadow-sm">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="text-base font-semibold text-slate-800">{error}</p>
          <button onClick={fetchAppointments} className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg">
            Retry
          </button>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Koi Appointment Nahi Mila</h3>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Patient Details</th>
                  <th className="py-3.5 px-5">Doctor Assigned</th>
                  <th className="py-3.5 px-5">Date & Slot</th>
                  <th className="py-3.5 px-5">Symptoms</th>
                  <th className="py-3.5 px-5 text-center">Status</th>
                  <th className="py-3.5 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAppointments.map((appointment) => {
                  const appId = appointment._id || appointment.id;
                  const isUpdating = updatingId === appId;
                  const currentStatus = (appointment.status || "Pending").toLowerCase();

                  return (
                    <tr key={appId} className="hover:bg-slate-50/70 transition-colors">
                      {/* Patient Details */}
                      <td className="py-4 px-5">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                            {appointment.patientName ? appointment.patientName.charAt(0).toUpperCase() : 'P'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 leading-snug">
                              {appointment.patientName || "Patient"}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                              {appointment.age && <span>{appointment.age} yrs</span>}
                              {appointment.gender && <span>• {appointment.gender}</span>}
                            </div>
                            {appointment.patientPhone && (
                              <p className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span>{appointment.patientPhone}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Doctor Assigned */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                            <Stethoscope className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-slate-800">{appointment.doctor || "Doctor"}</span>
                        </div>
                      </td>

                      {/* Date & Slot */}
                      <td className="py-4 px-5">
                        <div className="text-xs space-y-1">
                          <p className="font-medium text-slate-800 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{appointment.appointmentDate}</span>
                          </p>
                          <p className="text-slate-500 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{appointment.appointmentTime}</span>
                          </p>
                        </div>
                      </td>

                      {/* Symptoms */}
                      <td className="py-4 px-5 max-w-xs">
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {appointment.symptoms || <span className="text-slate-400 italic">None</span>}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5 text-center">
                        {renderStatusBadge(appointment.status)}
                      </td>

                      {/* Actions: Confirm, Complete, Cancel */}
                      <td className="py-4 px-5 text-center">
                        {isUpdating ? (
                          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium py-1">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 flex-wrap">
                            {/* CONFIRM BUTTON */}
                            <button
                              type="button"
                              disabled={currentStatus === "confirmed"}
                              onClick={() => handleUpdateStatus(appId, "Confirmed")}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                                currentStatus === "confirmed"
                                  ? "opacity-30 cursor-not-allowed bg-emerald-50 text-emerald-700"
                                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Confirm</span>
                            </button>

                            {/* COMPLETE BUTTON */}
                            <button
                              type="button"
                              disabled={currentStatus === "completed"}
                              onClick={() => handleUpdateStatus(appId, "Completed")}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                                currentStatus === "completed"
                                  ? "opacity-30 cursor-not-allowed bg-blue-50 text-blue-700"
                                  : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                              }`}
                            >
                              <Check className="w-3 h-3 text-blue-600" />
                              <span>Complete</span>
                            </button>

                            {/* CANCEL BUTTON */}
                            <button
                              type="button"
                              disabled={currentStatus === "cancelled"}
                              onClick={() => handleUpdateStatus(appId, "Cancelled")}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                                currentStatus === "cancelled"
                                  ? "opacity-30 cursor-not-allowed bg-rose-50 text-rose-700"
                                  : "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                              }`}
                            >
                              <XCircle className="w-3 h-3 text-rose-600" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentsList;