import {
  ArrowLeftStartOnRectangleIcon,
  ChartBarSquareIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";


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
        navigate("auth/login");
      })
      .catch((err) => {
        console.error("Hata:", err);
      });
  };

  const baseButtonClass =
    "flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer";

  return (
    <div className="w-64 h-full flex flex-col justify-between p-4 bg-white border-r border-gray-200">
      <div>
        <div className="mb-4">
          <img src="assets/logo.png" alt="Logo" className="w-12 h-12" />
        </div>

        <nav className="flex flex-col gap-1">
          <button className={baseButtonClass}>
            <UserIcon className="w-5 h-5" />
            <span>Profil</span>
          </button>
          <button className={baseButtonClass}>
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button className={baseButtonClass}>
            <ChartBarSquareIcon className="w-5 h-5" />
            <span>İstatistik</span>
          </button>
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
