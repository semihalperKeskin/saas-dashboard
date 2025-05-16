import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "~/contexts/UserContext";

export function Sidebar() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("auth/login")
  }

  return (
    <aside className="w-64 h-full flex flex-col p-4">
      <div className="pb-4 border-b border-gray-300 mb-4">
        <p className="font-semibold">{user?.name || "Loading..."}</p>
      </div>

      <nav className="flex flex-col gap-3 text-gray-300">
        <button className="text-left p-2 hover:text-gray-200 hover:bg-gray-600 hover:rounded-xl transition cursor-pointer">
          Profil
        </button>
        <button className="text-left p-2 hover:text-gray-200 hover:bg-gray-600 hover:rounded-xl transition cursor-pointer">
          Dashboard
        </button>
        <button className="text-left p-2 hover:text-gray-200 hover:bg-gray-600 hover:rounded-xl transition cursor-pointer">
          To-Do List
        </button>
        <button className="text-left p-2 hover:text-gray-200 hover:bg-gray-600 hover:rounded-xl transition cursor-pointer">
          İstatistik
        </button>
      </nav>

      <div className="flex-grow" />

      <div className="mt-6">
        <button
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors mt-4 cursor-pointer"
          onClick={() => logout()}
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
