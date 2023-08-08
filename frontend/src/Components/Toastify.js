import { toast } from "react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

export const showToastMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: true,
  });
};

export const showSuccessToastMessage = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: true,
  });
};

export const showErrorToastMessage = (message) => {
  showToastMessage(message, "error");
};
