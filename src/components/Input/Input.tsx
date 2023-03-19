import React from "react";
interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  register: any;
  errors: any;
  name: string;
}
const Input = ({ name, register, value, errors, onChange }: InputProps) => {
  if (errors[name]) {
  }
  const hasError = !!errors[name];
  return (
    <input
      className={`w-full h-10 px-3 py-2 text-right border border-gray-200 rounded-md
      ${hasError ? "border-red-500" : ""}
      `}
      {...register(name)}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
