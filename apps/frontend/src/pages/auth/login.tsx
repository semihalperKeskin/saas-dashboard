import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
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
      </div>
    );
} 
export default Login;