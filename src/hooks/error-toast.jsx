import { useCallback } from "react";
import { toast } from "react-toastify";

const useErrorToast = () => {
  const showErrorMessage = useCallback((message) => {
    if (message) {
      toast.error(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  return {
    showErrorMessage,
  };
};

export default useErrorToast;
