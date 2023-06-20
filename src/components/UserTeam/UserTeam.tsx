import { useSession } from "@/hooks/useSession";
import React from "react";

const UserTeam = () => {
  const user = useSession((store) => store.user);

  if (!user?.team) return <div>must add team</div>;

  return <div> team stats</div>;
};

export default UserTeam;
