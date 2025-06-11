import {
  ArrowLeftStartOnRectangleIcon,
  ChartBarSquareIcon,
  HomeIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { Link, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.warn("Token bulunamadı.");
      return;
    }
    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Logout başarılı:", data);
        localStorage.removeItem("access_token");
        navigate("/auth/login", { replace: true });
      })
      .catch((err) => {
        console.error("Hata:", err);
      });
  };

  const baseButtonClass =
    "flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer";

  return (
    <div className="w-screen h-screen md:w-52 lg:w-64 md:h-full flex flex-col justify-between p-4 bg-white border-r border-gray-200">
      <div>
        <div className="mb-4 grid grid-cols-[1fr_auto] items-center justify-between">
          <img src="assets/logo.png" alt="Logo" className="w-12 h-12" />
          <XMarkIcon
            className="w-6 h-6 md:hidden cursor-pointer"
            onClick={() =>
              document.querySelector("aside")?.classList.add("hidden")
            }
          />
        </div>

        <nav className="flex flex-col gap-1">
          <Link to="/" className={baseButtonClass}>
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link to="/profile" className={baseButtonClass}>
            <UserIcon className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link to="/statistics" className={baseButtonClass}>
            <ChartBarSquareIcon className="w-5 h-5" />
            <span>Statistics</span>
          </Link>
        </nav>
      </div>

      <button
        onClick={() => logout()}
        className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-200 hover:text-red-600 cursor-pointer"
      >
        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
}
