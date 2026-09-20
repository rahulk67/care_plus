import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import {
    HeartPulse,
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';

const AuthPage = () => {
    const navigate = useNavigate();

    // Mode: false = Login, true = Register
    const [isRegister, setIsRegister] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    // Switch between Login and Register
    const toggleAuthMode = (mode) => {
        setIsRegister(mode === 'register');
        setError(null);
        setSuccessMsg(null);
        setFormData({ name: "", email: "", password: "", phone: "" });
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(null);
    };

    // 1. REGISTER SUBMIT
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);

        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            setError("Kripya sabhi zaroori fields bharein.");
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.post('/api/user/register', formData);
            console.log("Register response:", response.data);

            if (response.data.success || response.status === 200 || response.status === 201) {
                setSuccessMsg(response.data.message || "Registration safal raha! Ab aap login kar sakte hain.");

                // 1 second baad auto-switch to Login
                setTimeout(() => {
                    setIsRegister(false);
                    setSuccessMsg("Account create ho gaya! Kripya apna phone aur password daal kar login karein.");
                }, 1200);
            } else {
                setError(response.data.message || "Registration fail ho gaya. Dobara try karein.");
            }
        } catch (err) {
            console.error("Registration error:", err);
            const serverMsg = err.response?.data?.message || "Registration ke dauran error aaya.";
            setError(serverMsg);
        } finally {
            setLoading(false);
        }
    };

    // 2. LOGIN SUBMIT
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);

        if (!formData.phone || !formData.password) {
            setError("Phone number aur password dono zaroori hain.");
            return;
        }

        try {
            setLoading(true);
            const loginPayload = {
                phone: formData.phone,
                password: formData.password
            };

            const response = await axiosInstance.post('/api/user/login', loginPayload);
            console.log("Login response:", response.data);

            if (response.data.success || response.status === 200) {
                // Token and user details store karein
                const token = response.data.jwtToken || response.data.token;
                if (token) {
                    localStorage.setItem("careplus_token", token);
                }
                if (response.data.user?.phone) {
                    localStorage.setItem("phone", response.data.user.phone);
                }
                if (response.data.user?.name) {
                    localStorage.setItem("userName", response.data.user.name);
                }

                setSuccessMsg("Login safal raha! Redirecting...");

                // Redirect to appointments list page
                setTimeout(() => {
                    navigate('/my-appointments');
                }, 900);
            } else {
                setError(response.data.message || "Galat phone number ya password.");
            }
        } catch (err) {
            console.error("Login error:", err);
            const serverMsg = err.response?.data?.message || "Phone number ya password galat hai.";
            setError(serverMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundImage: "url(/3.jpeg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">

                {/* Brand Logo */}
                <div className="flex justify-center items-center gap-2.5 mb-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                        <HeartPulse className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Med<span className="text-emerald-600">Sync</span>
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-center text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
                    {isRegister ? "Create your patient account" : "Sign in to patient portal"}
                </h2>
                <p className="mt-1 text-center text-xs sm:text-sm text-slate-500">
                    {isRegister
                        ? "Register once to schedule visits and track health records"
                        : "Access your upcoming appointments and prescription history"}
                </p>

                {/* Tab Switcher */}
                <div className="mt-6 p-1 bg-slate-200/80 rounded-xl flex">
                    <button
                        type="button"
                        onClick={() => toggleAuthMode('login')}
                        className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${!isRegister
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleAuthMode('register')}
                        className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${isRegister
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        Register Account
                    </button>
                </div>
            </div>

            {/* Form Card */}
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-200/80">

                    {/* Error Alert Box */}
                    {error && (
                        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success Alert Box */}
                    {successMsg && (
                        <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">

                        {/* NAME FIELD (Only Register) */}
                        {isRegister && (
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="e.g. John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={isRegister}
                                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
                                    />
                                </div>
                            </div>
                        )}

                        {/* EMAIL FIELD (Only Register) */}
                        {isRegister && (
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="patient@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required={isRegister}
                                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
                                    />
                                </div>
                            </div>
                        )}

                        {/* PHONE NUMBER FIELD (Both Login & Register) */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="e.g. 9876543210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
                                />
                            </div>
                        </div>

                        {/* PASSWORD WITH SHOW/HIDE */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON WITH SPINNER */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>{isRegister ? "Creating Account..." : "Signing In..."}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{isRegister ? "Register Account" : "Sign In to Portal"}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* TOGGLE BOTTOM LINK */}
                    <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                        {isRegister ? (
                            <p className="text-xs sm:text-sm text-slate-600">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => toggleAuthMode('login')}
                                    className="font-bold text-emerald-600 hover:text-emerald-700 underline ml-1 cursor-pointer"
                                >
                                    Sign in here
                                </button>
                            </p>
                        ) : (
                            <p className="text-xs sm:text-sm text-slate-600">
                                Don't have a patient account yet?{' '}
                                <button
                                    type="button"
                                    onClick={() => toggleAuthMode('register')}
                                    className="font-bold text-emerald-600 hover:text-emerald-700 underline ml-1 cursor-pointer"
                                >
                                    Create one now
                                </button>
                            </p>
                        )}
                    </div>

                    {/* Security Badge */}
                    <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Encrypted & HIPAA Compliant Data Storage</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;