import React from "react";
interface InputProps extends React.ComponentPropsWithRef<"input"> {
  errors: any;
  name: string;
}
const Input = ({ name, errors, onChange }: InputProps) => {
  if (errors[name]) {
  }
  const hasError = !!errors[name];
  return (
    <input
      className={`w-full h-10 px-3 py-2 text-right border border-gray-200 rounded-md
      ${hasError ? "border-red-500" : ""}
      `}
      onChange={onChange}

    />
  );
};

export default Input;
