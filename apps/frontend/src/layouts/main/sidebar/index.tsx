import {
  ArrowLeftStartOnRectangleIcon,
  ChartBarSquareIcon,
  RectangleStackIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    {
      icon: <RectangleStackIcon className="h-4" />,
      label: "Board",
      to: "/",
    },
    {
      icon: <UserIcon className="h-4" />,
      label: "Profile",
      to: "/profile",
    },
    {
      icon: <ChartBarSquareIcon className="h-4" />,
      label: "Statistics",
      to: "/statistics",
    },
  ];

  const logout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return console.warn("Token bulunamadı.");

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.warn("Logout is failed.");
      }

      localStorage.removeItem("access_token");
      navigate("/auth/login", { replace: true });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const baseButtonClass =
    "flex items-center gap-2 text-left px-3 py-2 rounded-md transition-colors duration-150 cursor-pointer";

  return (
    <aside className="flex flex-col justify-between w-52 lg:w-64 p-4 bg-white border-r border-gray-200">
      <div>
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname.endsWith(item.to);
            const itemClass = `${baseButtonClass} ${
              isActive
                ? "bg-gray-200 font-medium text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`;
            return (
              <Link to={item.to} className={itemClass} key={item.label}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-md cursor-pointer duration-150"
      >
        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}
