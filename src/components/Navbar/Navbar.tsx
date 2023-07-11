import React from "react";
import NavbarItem from "@/components/NavbarItem/NavbarItem";
import { Shield, Grid, LogOut } from "react-feather";
import { useUserStore } from "@/hooks/store/useUserStore";
const Navbar = () => {
  const user = useUserStore((store) => store.user);
  return (
    <nav className="py-8 flex flex-col h-full justify-between">
      <ul>
        <NavbarItem
          to="dashboard"
          label="Dashboard"
          icon={<Grid className="h-5" />}
        />
        <NavbarItem
          to={`my-team${user?.team ? `/${user.team.id}` : ""}`}
          label="My team"
          icon={<Shield className="h-5" />}
        />
      </ul>
      <ul>
        <NavbarItem
          onClick={() => console.log("")}
          label="Log out"
          icon={<LogOut className="h-5" />}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
