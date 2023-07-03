import { useSession } from "@/hooks/store/useSession";
import React from "react";
import UserTeamForm from "../UserTeamForm/UserTeamForm";
import { useQuery } from "react-query";
import { useUsers } from "@/hooks/services/users/useUsers";
import { useUserStore } from "@/hooks/store/useUserStore";

const UserTeam = () => {
  const { getUser } = useUsers();
  const updateUser = useUserStore((store) => store.updateUser);
  const userId = useSession((store) => store.user!.id);
  const { data: user, isLoading } = useQuery({
    queryKey: ["get-user", userId],
    queryFn: () => getUser(userId),
    onSuccess: (data) => updateUser(data),
  });

  if (!user?.team) return <UserTeamForm />;

  return (
    <div>
      {user?.team.name}
      team stats
    </div>
  );
};

export default UserTeam;
