import React, { ForwardedRef, forwardRef } from "react";
import Spinner from "../Spinner/Spinner";
import classNames from "classnames";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      disabled = false,
      type = "button",
      loading = false,
      ...rest
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const classesMapper = {
      primary:
        "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600 disabled:bg-red-100",
      secondary:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={classNames(
          "px-3 py-2 h-9 text-sm font-medium font-body rounded-md transition-all flex items-center gap-1 justify-center",
          classesMapper[variant]
        )}
        disabled={disabled}
        {...rest}
      >
        {loading ? <Spinner variant={variant} /> : children}
      </button>
    );
  }
);

export default Button;
