import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Building, Briefcase, DollarSign, CheckCircle2 } from "lucide-react";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

function JobDetails() {
  const { state: job } = useLocation();
  const navigate = useNavigate();

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/jobs/${job.id}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Successfully Applied for this Role! 🎉");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Application failed or already applied.");
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700">Job Details Not Found</h2>
          <Link to="/jobs" className="mt-4 inline-block text-indigo-600 font-semibold underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-10 max-w-4xl mx-auto w-full">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 font-medium transition">
            <ArrowLeft size={18} /> Back to Recommendations
          </Link>

          <div className="bg-white shadow-sm border border-slate-100 rounded-3xl p-10">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-lg font-medium text-indigo-600 mt-2">
                  <Building size={20} /> {job.company}
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl font-bold text-sm border border-emerald-100">
                AI Verified Match
              </span>
            </div>

            {/* Badges Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="bg-slate-100 p-3 rounded-2xl"><MapPin size={20} className="text-slate-500" /></div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Location</p>
                  <p className="font-semibold">{job.location || "Remote"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="bg-slate-100 p-3 rounded-2xl"><DollarSign size={20} className="text-slate-500" /></div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Salary</p>
                  <p className="font-semibold">{job.salary || "Competitive"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="bg-slate-100 p-3 rounded-2xl"><Briefcase size={20} className="text-slate-500" /></div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Job Type</p>
                  <p className="font-semibold">Full Time</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Job Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {job.description || "We are looking for a passionate developer with strong problem-solving skills and expertise in modern full-stack frameworks to join our fast-growing engineering team."}
              </p>
            </div>

            {/* Required Skills */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Required Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(job.skills || job.matchedSkills) &&
                  (job.skills || job.matchedSkills).map((skill, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
                      <CheckCircle2 size={16} /> {skill}
                    </span>
                  ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-12 pt-8 border-t border-slate-100">
              <button
                onClick={handleApply}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg transition flex-1 text-center"
              >
                Apply Now 🚀
              </button>
              <Link
                to="/jobs"
                className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold px-8 py-4 rounded-2xl transition text-center"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;