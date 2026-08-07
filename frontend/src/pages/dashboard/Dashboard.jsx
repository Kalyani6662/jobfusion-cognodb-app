import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    name: "Kalyani Kondapalli",
    email: "kalyanikondapalli0@gmail.com",
    college: "VFSTR",
    cgpa: "9.0",
    isProfileComplete: true
  });
  const [stats, setStats] = useState({ jobs: "1000+", match: "To Your Profile", applications: "1000+" });

  useEffect(() => {
    const email = localStorage.getItem("email") || "kalyanikondapalli0@gmail.com";
    const name = localStorage.getItem("name") || "Kalyani Kondapalli";
    
    setUserData(prev => ({ ...prev, name, email }));
    checkDatabaseProfile(email);
  }, []);

  const checkDatabaseProfile = async (email) => {
    try {
      // Database nundi real user profile fetch chestunnam
      const res = await axios.get(`http://localhost:5000/api/users/profile/${email}`);
      if (res.data && res.data.success) {
        const u = res.data;
        // Database lo college, cgpa, skills unte profile complete ainatte
        const isCompleted = Boolean(u.college && u.cgpa && u.skills);
        
        setUserData(prev => ({ 
          ...prev, 
          cgpa: u.cgpa || "", 
          college: u.college || "",
          isProfileComplete: isCompleted 
        }));
      }

      const statsRes = await axios.get("http://localhost:5000/api/jobs/stats");
      setStats({
        jobs: statsRes.data.totalJobs || 148,
        match: statsRes.data.matchScore || "99.1%",
        applications: statsRes.data.appliedCount || 4
      });
    } catch (err) {
      console.log("Checking local storage fallback.");
      const savedLocally = localStorage.getItem("profileSaved") === "true";
      setUserData(prev => ({ ...prev, isProfileComplete: savedLocally }));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-pink-500 selection:text-white font-sans">
      
      {/* Top Navbar */}
      <header className="w-full border-b border-neutral-200 bg-white/90 backdrop-blur-xl sticky top-0 z-50 px-6 lg:px-12 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm shadow-md">
            JF
          </div>
          <div>
            <span className="font-serif font-bold text-lg tracking-tight block leading-none text-neutral-900">
              JobFusion
            </span>
            <span className="text-[10px] text-neutral-400 tracking-widest uppercase font-mono mt-1 block">
              
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200">
          <Link to="/dashboard" className={`px-4 py-2 rounded-xl font-medium text-xs transition ${location.pathname === "/dashboard" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"}`}>Overview</Link>
          <Link to="/jobs" className={`px-4 py-2 rounded-xl font-medium text-xs transition ${location.pathname === "/jobs" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"}`}>Aggregated Jobs</Link>
        
          
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-xs font-semibold text-neutral-900">{userData.name}</span>
            <span className="text-[10px] text-neutral-500">{}</span>
          </div>
          <Link to="/profile" className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center font-bold text-xs shadow-sm hover:scale-105 transition">
            {userData.name.charAt(0)}
          </Link>
          <button onClick={handleLogout} className="hidden sm:flex items-center justify-center px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition border border-red-200 cursor-pointer">
            Logout
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full space-y-6 bg-neutral-50/50">
        
        {/* Profile Completion Message Card (Appears ONLY if database profile is NOT complete) */}
        {!userData.isProfileComplete && (
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-900 flex items-center justify-center text-xl shadow-inner border border-neutral-200">
                📌
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Action Required: Complete Your Profile</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Please fill out your academic details and resume to unlock live AI graph matching.</p>
              </div>
            </div>
            <Link to="/profile" className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition shadow-md whitespace-nowrap">
              Complete Profile →
            </Link>
          </div>
        )}

        {/* Hero Banner */}
        <div className="relative bg-neutral-900 text-white rounded-[2.5rem] p-8 lg:p-10 border border-neutral-800 shadow-xl overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-pink-300 bg-pink-500/20 px-3.5 py-1.5 rounded-full border border-pink-500/30">
                
              </span>
              <span className="text-[10px] font-medium text-neutral-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-serif font-normal mt-6 tracking-tight text-white leading-tight">
              Welcome back, {userData.name}.
            </h1>
            <p className="text-xs lg:text-sm text-neutral-300 mt-3 leading-relaxed max-w-xl font-light">
              Your profile is synchronized with automated feeds across LinkedIn, Indeed, and enterprise career portals.
            </p>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap items-center gap-4">
            <Link to="/jobs" className="px-6 py-3.5 rounded-2xl bg-white text-neutral-950 font-semibold text-xs hover:bg-neutral-200 transition shadow-lg">
              Explore Aggregated Jobs →
            </Link>
            <Link to="/profile" className="px-6 py-3.5 rounded-2xl bg-neutral-800 text-white font-semibold text-xs hover:bg-neutral-700 border border-neutral-700 transition">
              View Profile Nodes
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 p-6 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition">
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Live Openings</p>
              <h3 className="text-3xl font-serif font-bold text-neutral-900 mt-1.5">{stats.jobs}+</h3>
              <span className="text-[10px] text-emerald-600 font-medium mt-1 block">Synced hourly from portals</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl border border-blue-100 shadow-inner">🌐</div>
          </div>

          <div className="bg-white border border-neutral-200 p-6 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition">
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Graph Similarity</p>
              <h3 className="text-3xl font-serif font-bold text-neutral-900 mt-1.5">{stats.match}</h3>
              <span className="text-[10px] text-purple-600 font-medium mt-1 block">Optimal skill node alignment</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl border border-purple-100 shadow-inner">⚡</div>
          </div>

          <div className="bg-white border border-neutral-200 p-6 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition">
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Applications</p>
              <h3 className="text-3xl font-serif font-bold text-neutral-900 mt-1.5">{stats.applications} Submitted</h3>
              <span className="text-[10px] text-pink-600 font-medium mt-1 block">Tracking active status</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center text-2xl border border-pink-100 shadow-inner">🚀</div>
          </div>
        </div>

      </main>

    </div>
  );
}

export default Dashboard;