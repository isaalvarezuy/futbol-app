import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  label: string;
  icon: ReactElement;
}
const NavbarItem = ({ to, label, icon }: Props) => {
  const baseClasses =
    "text-base font-medium px-4 py-3 rounded-md mb-3 w-full block flex gap-2 items-center";
  const activeClasses =
    "text-base font-medium px-4 py-3 rounded-md mb-2 bg-gray-700";
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${baseClasses} ${activeClasses}` : baseClasses
        }
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
};

export default NavbarItem;
