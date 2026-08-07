import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

function PostJob() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    requiredSkills: "",
  });

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/jobs",
        {
          title: jobData.title,
          company: jobData.company,
          description: jobData.description,
          location: jobData.location,
          requiredSkills: jobData.requiredSkills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Real Job Posted Successfully! 🚀");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Failed to post job");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">
              Post a Real Job Opening 💼
            </h1>
            <p className="text-gray-500 mb-8">
              Add a real-world position to your platform's graph database.
            </p>

            <form onSubmit={handlePostJob} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold text-gray-700 block mb-2">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Full Stack Engineer"
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={jobData.company}
                    onChange={handleChange}
                    placeholder="e.g. Google, Microsoft, Infosys"
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold text-gray-700 block mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    placeholder="e.g. Hyderabad / Remote"
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-2">
                    Required Skills (Comma Separated)
                  </label>
                  <input
                    type="text"
                    name="requiredSkills"
                    value={jobData.requiredSkills}
                    onChange={handleChange}
                    placeholder="Python, React, FastAPI, SQL"
                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-2">
                  Job Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={jobData.description}
                  onChange={handleChange}
                  placeholder="Describe the job responsibilities and requirements..."
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
                >
                  Publish Job
                </button>
                <Link
                  to="/jobs"
                  className="border px-8 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJob;