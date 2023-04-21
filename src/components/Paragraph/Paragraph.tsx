import classnames from "classnames";
import React from "react";

type Colors = "red" | "purple" | "blue" | "green" | "gray";
type Luminance = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface Props {
  children: string;
  weight?: "semibold" | "regular" | "medium";
  size?: 12 | 14 | 16 | 18 | 20 | 36;
  color?: `text-${Colors}-${Luminance}`;
  className?: string;
}

const Paragraph = ({
  children,
  weight = "regular",
  size = 14,
  color = "text-gray-800",
  className,
}: Props) => {
  const fontWeigthMapper = {
    semibold: "font-semibold",
    medium: "font-medium",
    regular: "font-normal",
  };
  const fontSizeMapper = {
    12: "text-xs",
    14: "text-sm",
    16: "text-base",
    18: "text-lg",
    20: "text-xl",
    36: "text-4xl",
  };
  return (
    <p
      className={classnames(
        "font-body",
        fontWeigthMapper[weight],
        fontSizeMapper[size],
        color,
        className
      )}
    >
      {children}
    </p>
  );
};

export default Paragraph;
