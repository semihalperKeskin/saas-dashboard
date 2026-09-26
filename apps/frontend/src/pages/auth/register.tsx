import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthInput, RegisterSchema } from "@vizionboard/validation";
import toastMessage from "~/components/toast";
import apiClient from "~/api/client";
import Form from "~/components/auth/Form";

function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function showZodErrors(error: z.ZodError) {
    const messages: string = error.issues
      .map((issue) => issue.message)
      .join(", ");
    toastMessage(messages, "error");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const result = RegisterSchema.safeParse(formData);

    if (!result.success) {
      showZodErrors(result.error);
      return;
    }

    apiClient("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: { message: string }) => {
        toastMessage(
          data.message || "Registration successful. Please log in.",
          "success",
        );
        navigate("/auth/login");
      })
      .catch(async (error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Unexpected error";
        toastMessage(
          message || "Registration failed. Please try again.",
          "error",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <Form
          title="Register"
          email={formData.email}
          password={formData.password}
          loading={loading}
          navigateText="/auth/login"
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
export default Register;
