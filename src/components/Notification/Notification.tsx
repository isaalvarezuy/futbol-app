import Paragraph from "../Paragraph/Paragraph";

interface Props {
  message: string;
}
const Notification = ({ message }: Props) => {
  return (
    <div
      role="alert"
      aria-label="notification"
      className="w-[680px] bg-white p-4 rounded border border-gray-200 shadow-md"
    >
      <Paragraph>{message}</Paragraph>
    </div>
  );
};

export default Notification;
