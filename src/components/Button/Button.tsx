import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
}

const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
}: ButtonProps) => {
  const classesMapper = {
    primary:
      "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600 disabled:bg-red-100",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300",
  };

  return (
    <button
      className={`px-3 py-2 text-sm font-medium font-body rounded-md transition-all
  ${classesMapper[variant]}
  `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
