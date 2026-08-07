import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    schoolName: "",
    tenthMarks: "",
    collegeName: "",
    twelfthMarks: "",
    btechCgpa: "",
    resume: null,
    resumeName: "",
  });

  useEffect(() => {
    const loggedEmail = localStorage.getItem("email") || "";
    const loggedName = localStorage.getItem("name") || "";

    const savedProfile = JSON.parse(localStorage.getItem(`userProfile_${loggedEmail}`));
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      setProfile((prev) => ({
        ...prev,
        name: loggedName,
        email: loggedEmail,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        resume: file,
        resumeName: file.name,
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/update-profile", profile);
    } catch (err) {
      console.warn("Backend sync skipped, saving locally...", err);
    }

    localStorage.setItem(`userProfile_${profile.email}`, JSON.stringify(profile));
    localStorage.setItem("name", profile.name);
    
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-neutral-950 text-white flex flex-col overflow-hidden m-0 p-0 selection:bg-pink-500 selection:text-white">
      
      {/* Top Navbar */}
      <header className="h-16 border-b border-neutral-800 px-8 flex items-center justify-between bg-neutral-950 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-950 text-pink-300 border border-pink-500/40 flex items-center justify-center text-xs font-bold shadow">
            JF
          </div>
          <div>
            <span className="font-bold text-base text-white tracking-wide block leading-tight">JobFusion</span>
            <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase">Graph Aggregator</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <div className="flex items-center gap-3 border-l pl-6 border-neutral-800">
            <div className="text-right">
              <p className="text-xs font-bold text-white">{profile.name || "User"}</p>
              <p className="text-[10px] text-neutral-400">{profile.email || "user@example.com"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-neutral-900 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          
          {/* Header Title & Edit Button */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-pink-500 rounded-full inline-block"></span>
              Student Profile
            </h1>
            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 bg-purple-950 hover:bg-purple-900 text-pink-200 border border-pink-500/40 text-xs font-semibold rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-purple-900 hover:bg-purple-800 text-pink-100 border border-pink-500/50 text-xs font-semibold rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
                >
                  💾 Save Changes
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 shadow-xl space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-200 border-b border-neutral-800 pb-2 flex items-center gap-2">
                  <span className="text-pink-400">👤</span> Personal Information
                </h3>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-neutral-900/60 rounded-xl font-semibold text-neutral-200 border border-neutral-800/80">
                      {profile.name || <span className="text-neutral-500 italic font-normal">Not provided</span>}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Email ID</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-neutral-900/60 rounded-xl font-semibold text-neutral-200 border border-neutral-800/80">
                      {profile.email || <span className="text-neutral-500 italic font-normal">Not provided</span>}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-neutral-900/60 rounded-xl font-semibold text-neutral-200 border border-neutral-800/80">
                      {profile.phone || <span className="text-neutral-500 italic font-normal">Not provided</span>}
                    </p>
                  )}
                </div>
              </div>

              {/* Academic Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-200 border-b border-neutral-800 pb-2 flex items-center gap-2">
                  <span className="text-pink-400">🎓</span> Academic Information
                </h3>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">School Name (10th)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="schoolName"
                      value={profile.schoolName}
                      onChange={handleChange}
                      placeholder="Enter school name"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-neutral-900/60 rounded-xl font-semibold text-neutral-200 border border-neutral-800/80">
                      {profile.schoolName || <span className="text-neutral-500 italic font-normal">Not provided</span>}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">10th Marks (%)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="tenthMarks"
                        value={profile.tenthMarks}
                        onChange={handleChange}
                        placeholder="e.g. 90%"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500"
                      />
                    ) : (
                      <p className="p-3 bg-neutral-900/60 rounded-xl font-semibold text-neutral-200 border border-neutral-800/80">
                        {profile.tenthMarks || <span className="text-neutral-500 italic font-normal">N/A</span>}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-neutral-400 font-medium mb-1">12th Marks (%)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="twelfthMarks"
                        value={profile.twelfthMarks}
                        onChange={handleChange}
                        placeholder="e.g. 85%"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500"
                      />
                    ) : (
                      <p className="p-3 bg-neutral-900/60 rounded-xl font-semibold text-neutral-200 border border-neutral-800/80">
                        {profile.twelfthMarks || <span className="text-neutral-500 italic font-normal">N/A</span>}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">College Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="collegeName"
                      value={profile.collegeName}
                      onChange={handleChange}
                      placeholder="Enter college name"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-neutral-900/60 rounded-xl font-semibold text-neutral-200 border border-neutral-800/80">
                      {profile.collegeName || <span className="text-neutral-500 italic font-normal">Not provided</span>}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">B.Tech CGPA</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="btechCgpa"
                      value={profile.btechCgpa}
                      onChange={handleChange}
                      placeholder="e.g. 8.5 CGPA"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500"
                    />
                  ) : (
                    <p className="p-3 bg-neutral-900/60 rounded-xl font-semibold text-neutral-200 border border-neutral-800/80">
                      {profile.btechCgpa || <span className="text-neutral-500 italic font-normal">Not provided</span>}
                    </p>
                  )}
                </div>

              </div>

            </div>

            {/* Resume Upload Section */}
            <div className="pt-4 border-t border-neutral-800">
              <label className="block text-xs font-bold text-neutral-300 mb-2">📄 Upload Resume</label>
              {isEditing ? (
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-950 file:text-pink-200 file:border file:border-pink-500/40 hover:file:bg-purple-900 cursor-pointer"
                />
              ) : (
                <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
                  <span>{profile.resumeName || "No resume uploaded yet"}</span>
                  {profile.resumeName && <span className="text-emerald-400 font-bold">✓ Attached</span>}
                </div>
              )}
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}

export default Profile;