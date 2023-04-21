import { NotificationType } from "@/types/components/NotificationType";
import Paragraph from "../Paragraph/Paragraph";
import { AlertTriangle, CheckCircle, Info, X, XOctagon } from "react-feather";
import classnames from "classnames";
import { toast } from "react-toastify";

interface Props {
  message: string;
  type: NotificationType;
  toast: typeof toast;
}
const Notification = ({ message, type, toast }: Props) => {
  const baseIconClasses = "h-4 w-4 shrink-0 mt-1";
  const colorMapper = {
    warning: "text-yellow-600",
    error: "text-red-600",
    information: "text-blue-600",
    success: "text-green-600",
  };
  const iconClassName = classnames(baseIconClasses, colorMapper[type]);
  const iconMapper = {
    warning: <AlertTriangle className={iconClassName} />,
    error: <XOctagon className={iconClassName} />,
    information: <Info className={iconClassName} />,
    success: <CheckCircle className={iconClassName} />,
  };

  return (
    <div className="flex items-start gap-2">
      {iconMapper[type]}
      <Paragraph>{message}</Paragraph>
     
    </div>
  );
};

export default Notification;
