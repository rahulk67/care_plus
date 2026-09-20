import React, { useState } from 'react';
import { 
  HeartPulse, 
  Calendar, 
  Users, 
  Stethoscope, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import AdminAppointmentsList from './AdminAppointmentsList';

const AdminPanel = () => {
  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Default active tab is 'appointments'
  const [activeTab, setActiveTab] = useState('appointments');

  const navItems = [
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: 'Live' },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'patients', label: 'Patients List', icon: Users },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Clinic Settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("careplus_token");
    localStorage.removeItem("phone");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased text-slate-800">
      
      {/* 1. MOBILE SIDEBAR BACKDROP */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR NAVIGATION */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div>
          {/* Logo */}
          <div className="h-18 flex items-center justify-between px-6 py-2 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-white text-base tracking-tight flex items-center gap-1">
                  Care<span className="text-emerald-400">Plus</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block -mt-0.5">
                  Admin Console
                </span>
              </div>
            </div>

            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="px-3 py-6 space-y-1.5">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Management
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                    ${isActive 
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm shadow-emerald-600/30' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Clinic Admin</p>
              <p className="text-[11px] text-slate-400 truncate">admin@medsync.io</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA + HEADER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-18 py-1 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <span>Dashboard</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-900 capitalize font-semibold">{activeTab}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {activeTab === 'appointments' && "Appointment Operations & Status"}
                {activeTab === 'doctors' && "Hospital Specialists"}
                {activeTab === 'patients' && "Patient Directory"}
                {activeTab === 'analytics' && "System Analytics"}
                {activeTab === 'settings' && "Clinic Settings"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Portal Online</span>
            </div>

            <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Tab Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === 'appointments' ? (
            <AdminAppointmentsList />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 capitalize">{activeTab} Management</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Manage your {activeTab} information here.
              </p>
              <button
                onClick={() => setActiveTab('appointments')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
              >
                Go to Appointments List
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;