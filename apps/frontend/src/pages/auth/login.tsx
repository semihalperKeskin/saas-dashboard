import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { AuthInput } from "@vizionboard/validation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        navigate("/");
      })
      .catch(async () => {
        const message: string = "Invalid email or password. Please try again.";
        toast.error(message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            Login
          </button>
        </form>
      </div>
      <div className="mt-4">
        <span className="mr-1">Don't have an account?</span>
        <button
          onClick={() => navigate("/auth/register")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Login;
