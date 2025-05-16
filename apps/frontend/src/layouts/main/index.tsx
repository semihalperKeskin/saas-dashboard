import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-72 bg-gray-800 text-white p-4 flex-shrink-0">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-grow bg-[#EFEEEA]">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
          <h1 className="text-lg font-semibold">Page Name</h1>
        </header>

        <main className="flex-grow overflow-y-auto px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
