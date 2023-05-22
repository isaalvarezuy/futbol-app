import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification/Notification";
import { NotificationType } from "@/types/components/NotificationType";
import { X } from "react-feather";

export const showNotification = (
  message: string,
  timeout: number,
  type: NotificationType
) => {
  console.log("hola");
  toast(<Notification message={message} type={type} toast={toast} />, {
    autoClose: timeout,
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    closeButton: <X className={"text-gray-800 h-4 w-4 mt-2 mr-1 shrink-0"} />,
  });
};
