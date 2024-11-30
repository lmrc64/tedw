import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message: string, type: "success" | "warn" | "error" | "info" | "default") => {
  
  const toastConfig = {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  };

  const toastTypes = {
    success: () => toast.success(`🦄 ${message}`, toastConfig),
    warn: () => toast.warn(`🦄 ${message}`, toastConfig),
    error: () => toast.error(`🦄 ${message}`, toastConfig),
    info: () => toast.info(`🦄 ${message}`, toastConfig),
    default: () => toast(`🦄 ${message}`, toastConfig),
  };
  
  toastTypes[type]();

};

export default function ToastNotification() {
  return <ToastContainer />;
}
