import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { UserSchema } from "@vizionboard/validation";
import { z } from "zod";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function showZodErrors(error: z.ZodError) {
    const messages = error.issues.map((issue) => issue.message).join(", ");
    toast.error(messages, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce,
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = UserSchema.safeParse(formData);

    if (!result.success) {
      showZodErrors(result.error);
      return;
    }

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        navigate("/auth/login");
      })
      .catch(async (error) => {
        const message = error.message || "Unexpected error";
        toast.error(message || "Unexpected error", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
              <span className="text-gray-500 text-sm">
                {" "}
                (at least 6 characters)
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full pr-10 rounded invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                minLength={6}
                required
              />

              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded w-full cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
      <div className="mt-4">
        <span className="mr-1">Already have an account?</span>
        <button
          onClick={() => navigate("/auth/login")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Register;
