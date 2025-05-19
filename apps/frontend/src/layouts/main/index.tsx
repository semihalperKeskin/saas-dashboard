import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

function MainLayout() {
  return (
    <div className="grid grid-cols-[16rem_1fr] min-h-screen">
      <aside>
        <Sidebar />
      </aside>

      <div className="grid grid-rows-[4rem_1fr] bg-[#EFEEEA]">
        <header className="bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
          <h1 className="text-lg font-semibold">Page Name</h1>
        </header>

        <main className="overflow-y-auto px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
