import React from "react";
import NavbarItem from "@/components/NavbarItem/NavbarItem";
import { Shield, Grid } from "react-feather";
import { useUserStore } from "@/hooks/store/useUserStore";
const Navbar = () => {
  const user = useUserStore((store) => store.user);
  return (
    <nav className="py-8">
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
    </nav>
  );
};

export default Navbar;
