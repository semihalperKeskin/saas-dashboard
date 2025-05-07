import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserInput } from "@vizionboard/validation";
import { routes } from './routes';
import { UserContext } from "~/contexts/UserContext";

export default function App() {
  const [user, setUser] = useState<UserInput | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/3");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Validation or fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <RouterProvider router={routes} />
    </UserContext.Provider>
  );
}
