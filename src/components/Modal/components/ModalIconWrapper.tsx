import { NotificationType } from "@/types/components/NotificationType";
import classnames from "classnames";

interface Props {
  Icon: any;
  type: NotificationType;
}
const ModalIconWrapper = ({ Icon, type }: Props) => {
  const colorMapper = {
    warning: "text-yellow-600 bg-yellow-100",
    error: "text-red-600 bg-red-100",
    information: "text-blue-600 bg-blue-100",
    success: "text-green-600 bg-green-100",
  };
  return (
    <div
      className={classnames(
        "h-8 w-8 bg-red-100 flex items-center justify-center rounded-full",
        colorMapper[type]
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
};

export default ModalIconWrapper;
