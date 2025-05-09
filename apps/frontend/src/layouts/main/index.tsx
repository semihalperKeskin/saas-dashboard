import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { useEffect } from "react";

function MainLayout() {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate("/auth/login");
      }
    }, [user, navigate]);


  return (
    <div className="grid grid-cols-6">
      <aside className="col-span-1 min-h-screen bg-gray-800 text-white p-4">
        <Sidebar />
      </aside>
      <main className="col-span-5 grid grid-rows-12 gap-4 bg-[#EFEEEA] flex-grow">
        <div className="row-span-1 bg-white h-full border-b-2 border-gray-100 flex items-center px-4">
          Page Name
        </div>
        <div className="row-span-4 px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
