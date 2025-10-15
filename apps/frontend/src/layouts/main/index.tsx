import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { ToastContainer } from "react-toastify";

function MainLayout() {
  return (
    <div className="min-h-screen font-DM flex flex-col">
      <header className="h-12 border-b border-gray-200 flex items-center px-6 shadow-sm">
        <img src="assets/logo.png" alt="Logo" className="w-12" />
        <h1 className="text-2xl font-medium">VizionBoard</h1>
      </header>

      <div className="flex flex-1 md:w-auto">
        <Sidebar />

        <main className="flex-1 px-6 py-4">
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
