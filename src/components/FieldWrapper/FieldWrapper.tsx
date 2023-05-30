import React, { ReactNode } from "react";
import Paragraph from "../Paragraph/Paragraph";
import { FieldError } from "react-hook-form";

interface Props {
  children: ReactNode;
  label?: string;
  error?: FieldError;
}
const InputWrapper = ({ children, label, error }: Props) => {
  return (
    <div className="space-y-1">
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
