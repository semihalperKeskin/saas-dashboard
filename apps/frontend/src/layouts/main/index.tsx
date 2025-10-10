import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { ToastContainer } from "react-toastify";
import { ChevronDoubleLeftIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`grid ${
        isSidebarOpen
          ? "grid-cols-[13rem_1fr] lg:grid-cols-[16rem_1fr]"
          : "grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr]"
      } min-h-screen`}
    >
      <div className="relative">
        <ChevronDoubleLeftIcon
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`w-6 h-6 absolute top-4 border-1 p-1 text-gray-500 cursor-pointer
            hover:bg-gray-200 hover:rounded-xl duration-150 transition-all z-10
            ${isSidebarOpen ? "right-4" : "left-4 rotate-180"}
            `}
        />
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      <div className="grid grid-rows-[4rem_1fr] bg-[#EFEEEA] w-screen md:w-auto">
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-2xl text-orange-500 font-medium">VizionBoard</h1>
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
