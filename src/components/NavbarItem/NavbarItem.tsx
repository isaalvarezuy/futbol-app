import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import IconWrapper from "../IconWrapper/IconWrapper";
import Paragraph from "../Paragraph/Paragraph";
import classNames from "classnames";

interface Props {
  label: string;
  icon: ReactElement;
}

type Options =
  | { to: string; onClick?: undefined }
  | { to?: undefined; onClick?: () => void };
const NavbarItem = ({ to, label, icon, onClick }: Props & Options) => {
  return (
    <li>
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            classNames(
              "text-base font-medium px-4 py-3 rounded-md w-full flex gap-2 items-center hover:bg-gray-700",
              isActive && "bg-gray-700"
            )
          }
        >
          {icon}
          {label}
        </NavLink>
      ) : (
        <button
          className="text-base font-medium px-4 py-3 rounded-md w-full flex gap-2 items-center hover:bg-gray-700"
          onClick={onClick}
        >
          <IconWrapper size={24}>{icon}</IconWrapper>
          {label}
        </button>
      )}
    </li>
  );
};

export default NavbarItem;
