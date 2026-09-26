import { AuthInput } from "@vizionboard/validation";
import { SubmitEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "~/api/client";
import toastMessage from "~/components/toast";
import Form from "~/components/auth/Form";
import { useAppDispatch } from "~/app/hooks";
import { setAccessToken } from "~/features/authSlice";

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthInput>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    apiClient("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Login failed");
        }

        const data = await res.json();
        dispatch(setAccessToken(data.accessToken));
        navigate("/");
      })
      .catch((error) => {
        const displayMessage: string =
          error.message || "Invalid email or password. Please try again.";
        toastMessage(displayMessage, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Form
        title="Login"
        email={formData.email}
        password={formData.password}
        loading={loading}
        navigateText="/auth/register"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
export default Login;
