import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  Bell,
  Heart,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = localStorage.getItem("name") || "User";

  const menus = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Jobs",
      icon: Briefcase,
      path: "/jobs",
    },
    {
      name: "Saved Jobs",
      icon: Heart,
      path: "/saved-jobs",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-72 min-h-screen bg-white border-r shadow-lg flex flex-col">

      {/* Logo */}

      <div className="p-8 border-b">

        <h1 className="text-4xl font-extrabold text-indigo-600">
          JobFusion
        </h1>

        <p className="text-gray-500 mt-2 text-sm">
          AI Career Platform
        </p>

      </div>

      {/* User */}

      <div className="px-8 py-6 flex items-center gap-4 border-b">

        <img
          src="https://i.pravatar.cc/100?img=32"
          alt="Profile"
          className="w-14 h-14 rounded-full"
        />

        <div>

          <h2 className="font-bold text-lg">
            {userName}
          </h2>

          <p className="text-gray-500 text-sm">
            Welcome Back 👋
          </p>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 p-6">

        <div className="space-y-3">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.name}
                to={menu.path}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  location.pathname === menu.path
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-slate-100"
                }`}
              >
                <Icon size={22} />

                <span className="font-medium">
                  {menu.name}
                </span>
              </Link>
            );
          })}

        </div>

      </div>

      {/* Logout */}

      <div className="p-6 border-t">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;