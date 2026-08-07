import { Search, Bell } from "lucide-react";

function Navbar() {
  const userName = localStorage.getItem("name") || "User";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white shadow-sm px-8 py-5 flex items-center justify-between">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back, {userName} 👋
        </h1>

        <p className="text-gray-500 mt-1">
          {today}
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="flex items-center bg-slate-100 rounded-xl px-4 py-3 w-80">

          <Search
            size={20}
            className="text-gray-500 mr-3"
          />

          <input
            type="text"
            placeholder="Search jobs..."
            className="bg-transparent outline-none w-full"
          />

        </div>

        {/* Notification */}

        <button className="relative bg-slate-100 p-3 rounded-xl hover:bg-slate-200 transition">

          <Bell size={22} />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=4f46e5&color=fff&bold=true`}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-indigo-500"
          />

          <div>

            <h3 className="font-semibold text-gray-800">
              {userName}
            </h3>

            <p className="text-sm text-gray-500">
              Job Seeker
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;