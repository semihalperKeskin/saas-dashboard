import { Bounce, toast } from "react-toastify";

const toastMessage = (message: string, type: "success" | "error") => {
  const options = {
    position: "bottom-left" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored" as const,
    transition: Bounce,
  };

  if (type === "success") {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};

export default toastMessage;
