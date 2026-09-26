import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import apiClient, { refreshAccessToken } from "~/api/client";
import { store } from "~/app/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    validation();
  }, []);

  const validation = async () => {
    const token = store.getState().auth.accessToken;

    if (!token) {
      try {
        await refreshAccessToken();
      } catch {
        setIsValid(false);
        return;
      }
    }
    apiClient("/api/auth/validation", {
      method: "POST",
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
