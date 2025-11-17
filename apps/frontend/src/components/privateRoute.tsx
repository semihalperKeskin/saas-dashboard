import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    validation();
  }, []);

  const validation = () => {
    fetch("/api/auth/validation", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Invalid");
        }
      })
      .then((data) => {
        setIsValid(data.isValid);
      })
      .catch(() => {
        setIsValid(false);
      });
  };

  if (isValid === null) return <div>Yükleniyor...</div>;
  if (isValid === false) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
