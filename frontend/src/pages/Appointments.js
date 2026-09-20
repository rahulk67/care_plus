import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import {
    Calendar,
    Clock,
    Stethoscope,
    Search,
    PlusCircle,
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Clock3,
    FileText
} from 'lucide-react';

const Appointments = () => {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

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

    // Fetch appointments from API
    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await axiosInstance.get("/api/user/appointment/list");

            // Safe check if response has res.data.appointments or direct array
            const list = Array.isArray(res.data)
                ? res.data
                : (res.data.appointments || res.data.data || []);
            setAppointments(list);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            setError("Failed to load appointments. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Search & Filter Logic
    const filteredAppointments = appointments.filter((item) => {
        const doctorMatch = item.doctor?.toLowerCase().includes(searchQuery.toLowerCase());
        const symptomsMatch = item.symptoms?.toLowerCase().includes(searchQuery.toLowerCase());
        const queryMatch = doctorMatch || symptomsMatch;

        if (statusFilter === "All") return queryMatch;
        return queryMatch && item.status?.toLowerCase() === statusFilter.toLowerCase();
    });

    // Color-coded status badge helper
    const getStatusBadge = (status) => {
        const st = (status || "Pending").toLowerCase();

        if (st === "confirmed" || st === "scheduled") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {status || "Confirmed"}
                </span>
            );
        }

        if (st === "completed") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Completed
                </span>
            );
        }

        if (st === "cancelled") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    Cancelled
                </span>
            );
        }

        // Default: Pending
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <Clock3 className="w-3.5 h-3.5 text-amber-600" />
                {status || "Pending"}
            </span>
        );
    };

    // Stats calculation
    const totalCount = appointments.length;
    const upcomingCount = appointments.filter(a => {
        const s = (a.status || "").toLowerCase();
        return s === "confirmed" || s === "scheduled" || s === "pending" || !s;
    }).length;
    const completedCount = appointments.filter(a => (a.status || "").toLowerCase() === "completed").length;

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* 1. HEADER SECTION */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                                <Calendar className="w-6 h-6" />
                            </div>
                            My Appointments
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            View and manage your scheduled doctor consultations and visit history.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/book-appointment')} // Booking page path
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Book New Appointment</span>
                    </button>
                </div>

                {/* 2. STATS OVERVIEW CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Booked</p>
                            <p className="text-2xl font-bold text-slate-900 mt-0.5">{totalCount}</p>
                        </div>
                        <div className="p-3 bg-slate-100 rounded-xl text-slate-600">
                            <FileText className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Active / Upcoming</p>
                            <p className="text-2xl font-bold text-emerald-700 mt-0.5">{upcomingCount}</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Completed</p>
                            <p className="text-2xl font-bold text-blue-700 mt-0.5">{completedCount}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* 3. SEARCH & STATUS FILTER TABS */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                            type="text"
                            placeholder="Search by doctor or symptoms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setStatusFilter(tab)}
                                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${statusFilter.toLowerCase() === tab.toLowerCase()
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. MAIN CONTENT AREA */}
                {loading ? (
                    /* Loading State */
                    <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
                        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-600">Loading your appointments...</p>
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="bg-white rounded-2xl border border-red-200 p-12 text-center shadow-sm">
                        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                        <p className="text-base font-semibold text-slate-800">{error}</p>
                        <button
                            onClick={fetchAppointments}
                            className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredAppointments.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 sm:p-16 text-center shadow-sm">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">No Appointments Found</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                            {searchQuery || statusFilter !== "All"
                                ? "Aapke search ya filter criteria se koi appointment match nahi hua."
                                : "Aapne abhi tak koi appointment book nahi kiya hai. Aaj hi apna slot book karein!"}
                        </p>
                        <button
                            onClick={() => navigate('/add-appointment')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Book Appointment Now
                        </button>
                    </div>
                ) : (
                    /* Modern Appointments Table */
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        <th className="py-4 px-6">Doctor</th>
                                        <th className="py-4 px-6">Appointment Date</th>
                                        <th className="py-4 px-6">Time Slot</th>
                                        <th className="py-4 px-6">Reason / Symptoms</th>
                                        <th className="py-4 px-6 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {filteredAppointments.map((item, index) => (
                                        <tr
                                            key={item._id || index}
                                            className="hover:bg-slate-50/80 transition-colors"
                                        >
                                            {/* Doctor Column */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                                                        <Stethoscope className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 leading-tight">
                                                            {item.doctor || "General Doctor"}
                                                        </p>
                                                        <span className="text-xs text-slate-400 font-normal">
                                                            Consultation
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date Column */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-slate-700 font-medium">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <span>{item.appointmentDate}</span>
                                                </div>
                                            </td>

                                            {/* Time Column */}
                                            <td className="py-4 px-6">
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                                                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                                                    <span>{item.appointmentTime}</span>
                                                </div>
                                            </td>

                                            {/* Symptoms Column */}
                                            <td className="py-4 px-6 max-w-xs">
                                                <p className="text-slate-600 line-clamp-2 text-xs sm:text-sm" title={item.symptoms}>
                                                    {item.symptoms || <span className="text-slate-400 italic">No symptoms mentioned</span>}
                                                </p>
                                            </td>

                                            {/* Status Column */}
                                            <td className="py-4 px-6 text-center">
                                                {getStatusBadge(item.status)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer Summary */}
                        <div className="bg-slate-50/70 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
                            <span>Showing <strong>{filteredAppointments.length}</strong> of {totalCount} appointments</span>
                            <span className="text-emerald-700 font-medium">Sync updated</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;