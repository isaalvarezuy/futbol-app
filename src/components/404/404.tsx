import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Paragraph from "../Paragraph/Paragraph";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <Paragraph size={36} weight="semibold">
        404
      </Paragraph>
      <Paragraph size={16} className="pb-12">Page Not Found</Paragraph>
      <Button onClick={() => navigate("/")}>Go To Dashboard</Button>
    </div>
  );
};

export default Page404;
