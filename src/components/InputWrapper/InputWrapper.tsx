import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
}
const InputWrapper = ({ children, label }: Props) => {
  return (
    <div className="space-y-1">
      <label className="font-body text-sm font-medium text-gray-700 capitalize ">
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputWrapper;
