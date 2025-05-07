import { useEffect } from "react";
import { useUser } from "~/contexts/UserContext";

export function Sidebar() {
  const user = useUser();

  useEffect(() => {}, []);

  return (
    <aside>
      <div className="border-b-1 border-gray-700">
        <div className="mb-3">{user?.name || "Loading..."}</div>
      </div>
      <div>Profil</div>
      <div>Dashboard</div>
      <div>To-Do List</div>
      <div>İstatistik</div>
    </aside>
  );
}
