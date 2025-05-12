import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    fetch("/api/auth/validate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) setIsValid(true);
        else throw new Error("Invalid");
      })
      .catch(() => {
        setIsValid(false);
        localStorage.removeItem("access_token");
      });
  }, [token]);


  if (isValid === null) return <div>Yükleniyor...</div>;
  if (isValid === false) return <Navigate to="/auth/login" replace />;


  return <>{children}</>;
};

export default PrivateRoute;
