import { useSession } from "@/hooks/store/useSession";
import React from "react";
import UserTeamForm from "../UserTeamForm/UserTeamForm";
import { useUserStore } from "@/hooks/store/useUserStore";
import TeamDetail from "../TeamDetail/TeamDetail";

const UserTeam = () => {
  const user = useUserStore((store) => store.user);

  if (!user?.team) return <UserTeamForm />

  return (
   
      <TeamDetail teamId={user?.team.id} />
      
  );
};

export default UserTeam;
