import toast, { useToaster } from "react-hot-toast";
import Notification from "../Notification/Notification";

const NotificationContainer = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  return (
    <div
      className="fixed bottom-4 left-0 w-full flex flex-col items-center gap-2"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        return (
          <Notification message={toast.message as string} key={toast.id} />
        );
      })}
    </div>
  );
};

export default NotificationContainer;
