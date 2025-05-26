import { UserInput } from "@vizionboard/validation";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "~/contexts/UserContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserInput | null>(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    fetch("/api/auth/validation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setIsValid(true);
          return res.json();
        } else {
          throw new Error("Invalid");
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setIsValid(false);
        localStorage.removeItem("access_token");
      });
  }, [token]);

  if (isValid === null) return <div>Yükleniyor...</div>;
  if (isValid === false) return <Navigate to="/auth/login" replace />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default PrivateRoute;
