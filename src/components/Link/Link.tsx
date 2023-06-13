import React from "react";
import { NavLink } from "react-router-dom";
import Paragraph from "../Paragraph/Paragraph";
import classnames from "classnames";
import { Colors, Luminance } from "@/types/components/Colors";



interface Props {
  to: string;
  children: string;
  weight?: "semibold" | "regular" | "medium";
  size?: 12 | 14 | 16 | 18 | 20 | 36;
  color?: `text-${Colors}-${Luminance}`;
  className?: string;
}
const Link = ({
  to,
  children,
  weight = "semibold",
  size = 14,
  color = "text-gray-800",
  className,
}: Props) => {
  return (
    <NavLink to={to}>
      <Paragraph
        weight={weight}
        size={size}
        color={color}
        className={classnames("underline", className)}
      >
        {children}
      </Paragraph>
    </NavLink>
  );
};

export default Link;
