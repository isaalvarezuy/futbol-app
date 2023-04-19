interface Props {
  message: string;
}
const Notification = ({ message }: Props) => {
  return (
    <div
      role="alert"
      aria-label="notification"
      className="w-[680px] bg-green-300 p-4"
    >
      {message}
    </div>
  );
};

export default Notification;
