import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message: string, type: "success" | "warn") => {
  if (type === "success") {
    toast.success(`🦄 ${message}`, {
      position: "top-right",
      autoClose: 3500,
      theme: "light",
      transition: Flip,
    });
  } else {
    toast.warn(`🦄 ${message}`, {
      position: "top-right",
      autoClose: 3500,
      theme: "light",
      transition: Flip,
    });
  }
};

export default function ToastNotification() {
  return <ToastContainer />;
}
