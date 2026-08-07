import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GraduationCap, Sparkles, Briefcase, ArrowRight, Upload, Phone, Building, Award, MapPin } from "lucide-react";

function CompleteProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    phone: "",
    college: "",
    degree: "",
    branch: "",
    cgpa: "",
    graduationYear: "",
    skills: "",
    preferredRole: "",
    preferredLocation: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      setProfile({
        ...profile,
        resume: files[0],
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      if (!email || !token) {
        alert("Please login first");
        navigate("/");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/profile",
        {
          email,
          phone: profile.phone,
          college: profile.college,
          degree: profile.degree,
          branch: profile.branch,
          cgpa: profile.cgpa,
          graduationYear: profile.graduationYear,
          skills: profile.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),
          preferredRole: profile.preferredRole,
          preferredLocation: profile.preferredLocation,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Profile Saved Successfully ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid lg:grid-cols-2">
        {/* Left Side: Form */}
        <div className="p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
              Complete Your Profile
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Provide your academic and skill details for accurate graph matching.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">College Name</label>
              <input
                type="text"
                name="college"
                value={profile.college}
                onChange={handleChange}
                placeholder="e.g. VFSTR / KLU"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={profile.degree}
                  onChange={handleChange}
                  placeholder="B.Tech"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={profile.branch}
                  onChange={handleChange}
                  placeholder="CSE"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">CGPA</label>
                <input
                  type="text"
                  name="cgpa"
                  value={profile.cgpa}
                  onChange={handleChange}
                  placeholder="8.5"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Graduation Year</label>
                <input
                  type="text"
                  name="graduationYear"
                  value={profile.graduationYear}
                  onChange={handleChange}
                  placeholder="2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Skills (Comma Separated)</label>
              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="Python, React, FastAPI, SQL"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Role</label>
                <input
                  type="text"
                  name="preferredRole"
                  value={profile.preferredRole}
                  onChange={handleChange}
                  placeholder="Full Stack Engineer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Location</label>
                <input
                  type="text"
                  name="preferredLocation"
                  value={profile.preferredLocation}
                  onChange={handleChange}
                  placeholder="Hyderabad / Bengaluru"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-500 transition text-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Resume</label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2 mt-6"
            >
              Save Profile & Continue <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Right Side: Gradient Showcase */}
        <div className="bg-gradient-to-br from-indigo-700 via-violet-700 to-cyan-600 p-12 lg:flex flex-col justify-center text-white hidden">
          <h2 className="text-4xl font-extrabold leading-tight">
            Map Your Profile to the Graph.
          </h2>
          <p className="mt-4 text-indigo-100 text-base leading-relaxed">
            Complete your profile once and let our graph database seamlessly map your exact skill set to high-match opportunities.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4">
              <div className="bg-white text-indigo-600 p-3 rounded-xl"><GraduationCap size={22} /></div>
              <div>
                <h4 className="font-bold">Resume Analysis</h4>
                <p className="text-xs text-indigo-100">AI extracts skills automatically.</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4">
              <div className="bg-white text-cyan-600 p-3 rounded-xl"><Sparkles size={22} /></div>
              <div>
                <h4 className="font-bold">AI Job Matching</h4>
                <p className="text-xs text-indigo-100">Matched via graph relationships.</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4">
              <div className="bg-white text-violet-600 p-3 rounded-xl"><Briefcase size={22} /></div>
              <div>
                <h4 className="font-bold">One-Click Apply</h4>
                <p className="text-xs text-indigo-100">Apply instantly to recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;