import { ReactNode } from "react";
import Divider from "@/components/Divider/Divider";

interface CardProps {
  children: ReactNode;
  title?: string;
}

const CardWrapper = ({ children, title }: CardProps) => {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-md ">
      {title && (
        <>
          <h2 className="text-sm font-semibold font-body">Agregar Partido</h2>
          <Divider />
        </>
      )}

      {children}
    </div>
  );
};

export default CardWrapper;
