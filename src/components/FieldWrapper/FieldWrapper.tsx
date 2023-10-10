import React, { ReactNode } from "react";
import Paragraph from "../Paragraph/Paragraph";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  label?: string;
  error?: FieldError;
  className?: string;
}
const InputWrapper = ({ children, label, error, className }: Props) => {
  return (
    <div className={twMerge("space-y-1 w-full", className)}>
      {label && (
        <label>
          <Paragraph size={14} weight="medium" color="text-gray-700">
            {label}
          </Paragraph>
        </label>
      )}
      {children}
      {error && error.message && (
        <Paragraph size={14} color="text-red-500">
          {error.message}
        </Paragraph>
      )}
    </div>
  );
};

export default InputWrapper;
