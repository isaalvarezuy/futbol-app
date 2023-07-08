import React from "react";
import IconWrapper from "../IconWrapper/IconWrapper";
import Paragraph from "../Paragraph/Paragraph";

interface Props {
  icon: any;
  title: string;
  description: string;
}
const EmptyState = ({ icon, title, description }: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
        <IconWrapper size={32}>{icon}</IconWrapper>
      </div>
      <Paragraph size={16} weight="semibold" className="text-center">
        {title}
      </Paragraph>
      <Paragraph size={14} className="text-center">
        {description}
      </Paragraph>
    </div>
  );
};

export default EmptyState;
