import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Bars2Icon } from "@heroicons/react/16/solid";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";

function MainLayout() {
  const asideRef = useRef<HTMLElement | null>(null);

  const menuButton = () => {
    asideRef.current?.classList.toggle("hidden");
  };

  return (
    <div className="relative grid md:grid-cols-[13rem_1fr] lg:grid-cols-[16rem_1fr] min-h-screen">
      <aside ref={asideRef} className="absolute md:relative hidden md:block">
        <Sidebar />
      </aside>

      <div className="grid grid-rows-[4rem_1fr] bg-[#EFEEEA] w-screen md:w-auto">
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-2xl text-orange-500 font-medium">VizionBoard</h1>
          <button onClick={() => menuButton()} className="md:hidden">
            <Bars2Icon className="w-5 h-5" />
          </button>
        </header>

        <main className="overflow-y-auto px-6 py-4">
          <Outlet />
        </main>
      </div>
      <span className="absolute">
        <ToastContainer />
      </span>
    </div>
  );
}

export default MainLayout;
