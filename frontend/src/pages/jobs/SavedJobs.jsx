import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function SavedJobs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Mock or localStorage saved jobs
    setSavedJobs([
      { jobId: "1", title: "Software Engineer - Cloud & Backend", company: "Microsoft", location: "Hyderabad / Remote", source: "LinkedIn", applyLink: "https://linkedin.com", match: "98.5%" },
      { jobId: "2", title: "Full Stack Developer - React & Python", company: "Amazon", location: "Bengaluru", source: "Indeed", applyLink: "https://indeed.com", match: "96.2%" }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-pink-500 selection:text-white font-sans">
      
      {/* Modern Floating Top Navbar */}
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
              Graph Aggregator
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200">
          <Link to="/dashboard" className={`px-4 py-2 rounded-xl font-medium text-xs transition ${location.pathname === "/dashboard" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"}`}>
            Overview
          </Link>
          <Link to="/jobs" className={`px-4 py-2 rounded-xl font-medium text-xs transition ${location.pathname === "/jobs" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"}`}>
            Aggregated Jobs
          </Link>
          <Link to="/saved-jobs" className={`px-4 py-2 rounded-xl font-medium text-xs transition ${location.pathname === "/saved-jobs" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"}`}>
            Shortlisted
          </Link>
          <Link to="/profile" className={`px-4 py-2 rounded-xl font-medium text-xs transition ${location.pathname === "/profile" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"}`}>
            Profile Nodes
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center font-bold text-xs shadow-sm hover:scale-105 transition">
            K
          </Link>
          <button onClick={handleLogout} className="hidden sm:flex items-center justify-center px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition border border-red-200 cursor-pointer">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full space-y-6 bg-neutral-50/50">
        
        {/* Banner */}
        <div className="bg-neutral-900 text-white rounded-[2.5rem] p-8 lg:p-10 border border-neutral-800 shadow-xl">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-pink-300 bg-pink-500/20 px-3.5 py-1.5 rounded-full border border-pink-500/30">
            Bookmarked Openings
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-normal mt-4 tracking-tight">
            Shortlisted Positions ⭐
          </h1>
          <p className="text-xs lg:text-sm text-neutral-300 mt-2 font-light max-w-xl">
            Review your bookmarked company listings and apply whenever you're ready.
          </p>
        </div>

        {/* Saved Jobs List */}
        <div className="space-y-4">
          {savedJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center shadow-sm">
              <p className="text-neutral-500 text-sm">No shortlisted jobs found.</p>
            </div>
          ) : (
            savedJobs.map((job, index) => (
              <div key={index} className="bg-white border border-neutral-200 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:border-neutral-300 transition">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase px-3 py-1 bg-pink-50 text-pink-600 rounded-lg border border-pink-200">
                      Source: {job.source}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-3 py-1 bg-purple-50 text-purple-600 rounded-lg border border-purple-200">
                      Match: {job.match}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-900 mt-1">{job.title}</h3>
                  <p className="text-xs text-neutral-500">{job.company} • {job.location}</p>
                </div>

                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition shadow-md whitespace-nowrap"
                >
                  Apply Directly →
                </a>
              </div>
            ))
          )}
        </div>

      </main>

    </div>
  );
}

export default SavedJobs;