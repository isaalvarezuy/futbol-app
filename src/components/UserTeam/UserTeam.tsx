import { useSession } from "@/hooks/useSession";
import React from "react";
import UserTeamForm from "../UserTeamForm/UserTeamForm";

const UserTeam = () => {
  const user = useSession((store) => store.user);

  if (!user?.team) return <UserTeamForm />;

  return <div> team stats</div>;
};

export default UserTeam;
