import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function AuthLayout() {
  return (
    <div>
      <Outlet />
      <span className="absolute">
        <ToastContainer />
      </span>
    </div>
  );
}
export default AuthLayout;
