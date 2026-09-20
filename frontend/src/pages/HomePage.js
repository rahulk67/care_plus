import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  ShieldCheck,
  HeartPulse,
  User,
  Search,
  Phone,
  CheckCircle2,
  Menu,
  X,
  Activity,
  FileText,
  BellRing,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased relative">
      {/* 24/7 Emergency Bar */}
      <div className="bg-emerald-700 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium">
        <span>Need urgent medical attention? Call 24/7 Emergency Helpline: </span>
        <a href="tel:18002273669" className="underline font-bold hover:text-emerald-200 ml-1">
          +1 (800) 227-3669
        </a>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo */}
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                  Care<span className="text-emerald-600">Plus</span>
                </span>
                <span className="text-[11px] block -mt-1 font-semibold text-slate-500 uppercase tracking-widest">
                  Patient Portal
                </span>
              </div>
            </div>

            {/* Middle: Clean Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</a>
              <a href="#why-us" className="hover:text-emerald-600 transition-colors">Why CarePlus</a>
              <a href="#specialties" className="hover:text-emerald-600 transition-colors">Specialties</a>
              <a href="#support" className="hover:text-emerald-600 transition-colors">Support</a>
            </nav>

            {/* Right: Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to='/admin'
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 hover:text-red-50 rounded-lg transition-all"
              >
                <ArrowRight className="w-4 h-4 " />
                View Admin
              </Link>
              <Link
                to='/my-appointments'
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
              >
                <User className="w-4 h-4 text-slate-500" />
                My Appointments
              </Link>

              <Link
                to='/book-appointment'
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm shadow-emerald-600/30 hover:shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>

            <Link
              to='/admin'
              className="md:hidden inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 hover:text-red-50 rounded-lg transition-all"
            >
              <ArrowRight className="w-4 h-4 " />
              View Admin
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">How It Works</a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">Why CarePlus</a>
              <a href="#specialties" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">Specialties</a>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <Link to="my-appointments" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg">
                <User className="w-4 h-4 text-slate-500" />
                My Appointments
              </Link>
              <Link to="book-appointment" className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg">
                <Calendar className="w-4 h-4" />
                Book Your First Appointment
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-emerald-50/60 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-medium mb-6">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Zero Waiting Time • Instant Doctor Confirmation</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Fast, hassle-free doctor appointments for you and your family.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Skip traditional clinic phone lines and crowded waiting rooms. Select your specialist, choose a confirmed time slot, and receive live queue updates directly on your phone.
            </p>

            {/* Quick Booking Search Form */}
            <div className="mt-8 sm:mt-10 bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 text-left">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success(`Slots available for ${selectedSpecialty || 'General Physician'} on ${selectedDate || 'today'}`);
                  // setInterval(() => { navigate('/book-appointment') }, 4000);
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Specialty / Department
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 font-medium"
                    >
                      <option value="">General Physician</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Orthopedic">Orthopedic</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Check Available Slots</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free Booking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Specialists
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant SMS Alerts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="border-y border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">&lt; 15 mins</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Avg. Wait Time</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">25,000+</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Appointments Booked</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">120+</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Verified Doctors</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">99.2%</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process: How it helps get faster appointments */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs sm:text-sm font-bold text-emerald-600 uppercase tracking-wider">
              3 Simple Steps
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
              How our system helps you get faster care
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Find Your Specialist</h3>
              <p className="mt-2 text-sm text-slate-600">
                Filter by medical specialty, experience, doctor ratings, and consultation fee to select the right professional.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Choose a Live Slot</h3>
              <p className="mt-2 text-sm text-slate-600">
                View real-time calendar openings and choose a morning or evening time that fits your exact schedule.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Get Digital Token & Alerts</h3>
              <p className="mt-2 text-sm text-slate-600">
                Receive your digital token via SMS and email. Track live queue position so you only arrive when it's your turn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section id="why-us" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs sm:text-sm font-bold text-emerald-600 uppercase tracking-wider">
              Core Benefits
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
              Designed around patient convenience
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-base">Live Queue Tracking</h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Track current token numbers on mobile to avoid waiting in crowded clinic lobbies.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-3">
                <BellRing className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-base">Smart SMS Reminders</h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Automated text updates 2 hours before your visit so you never miss an appointment.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-base">Digital Health Records</h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Access past visit history, electronic prescriptions, and lab reports anytime.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 text-base">Safe & Confidential</h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Encrypted medical details compliant with modern healthcare privacy standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready to book your consultation without the wait?
          </h3>
          <p className="mt-3 text-emerald-100 text-sm sm:text-base">
            Join thousands of patients who save time every day using our instant appointment portal.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to='/book-appointment' className="w-full sm:w-auto px-7 py-3 bg-white text-emerald-800 font-bold text-sm rounded-lg shadow-md hover:bg-emerald-50">
              Book Your First Appointment
            </Link>
            <Link to='/my-appointments' className="w-full sm:w-auto px-6 py-3 bg-emerald-800/60 hover:bg-emerald-800/80 text-white font-medium text-sm rounded-lg border border-emerald-400/30">
              View My Appointments
            </Link>
          </div>
        </div>
      </section>

      {/* Normal Professional Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-xl mb-3">
                <HeartPulse className="h-5 w-5 text-emerald-500" />
                <span>Care<span className="text-emerald-500">Plus</span></span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Streamlining healthcare access with modern appointment scheduling and real-time patient queue management.
              </p>
            </div>

            <div>
              <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">For Patients</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="/book-appointment" className="hover:text-white transition-colors">Book Doctor</a></li>
                <li><a href="/my-appointments" className="hover:text-white transition-colors">My Appointments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Prescriptions & Records</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Patient FAQs</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Top Departments</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">General Medicine</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cardiology</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pediatrics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Orthopedics</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Clinic Contact</h5>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Support: +1 (800) 555-0199</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Health Avenue, Suite 400</span>
                </p>
                <p className="text-slate-500 pt-1">
                  Hours: Mon – Sat (8:00 AM – 8:00 PM)
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <p>© {new Date().getFullYear()} CarePlus Patient Management System. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
              <a href="#" className="hover:text-slate-400">HIPAA Compliant</a>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}