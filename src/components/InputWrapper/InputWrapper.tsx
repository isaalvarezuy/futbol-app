import React, { ReactNode } from "react";
import Paragraph from "../Paragraph/Paragraph";

interface Props {
  children: ReactNode;
  label: string;
}
const InputWrapper = ({ children, label }: Props) => {
  return (
    <div className="space-y-1">
      <label>
        <Paragraph size={14} weight="medium" color="text-gray-700">
          {label}
        </Paragraph>
      </label>
      {children}
    </div>
  );
};

export default InputWrapper;
