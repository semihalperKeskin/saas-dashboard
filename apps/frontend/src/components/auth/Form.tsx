import { SubmitEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";

export type FormProps = {
  title: string;
  email: string;
  password: string;
  loading: boolean;
  navigateText: string;
  handleSubmit: SubmitEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

function Form({
  title,
  email,
  password,
  loading,
  navigateText,
  handleChange,
  handleSubmit,
}: FormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
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
              value={email}
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
                value={password}
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
                  <VisibilityOffIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <VisibilityIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>
          <Button
            size="medium"
            type="submit"
            fullWidth={true}
            loading={loading}
            endIcon={<SendIcon />}
            loadingPosition="end"
            variant="contained"
          >
            {title}
          </Button>
        </form>
      </div>
      <div className="mt-4">
        <span className="mr-1">Already have an account?</span>
        <button
          onClick={() => navigate(navigateText)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          {title == "Login" ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Form;
