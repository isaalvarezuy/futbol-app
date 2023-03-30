import { forwardRef } from "@/utils/fowardRef";
import { ComponentPropsWithoutRef, type ForwardedRef } from "react";
import "./Input.css";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  errors: any;
  name: string;
}
const Input = forwardRef(
  (
    { name, errors, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const hasError = !!errors[name];
    return (
      <input
        name={name}
        ref={ref}
        className={`w-full h-10 px-3 py-2 border border-gray-200 rounded-md
      ${hasError ? "border-red-500" : ""}
      `}
        {...rest}
      />
    );
  }
);

export default Input;
