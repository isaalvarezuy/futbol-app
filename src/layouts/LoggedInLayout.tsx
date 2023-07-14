import { Routes, Route } from "react-router-dom";
import { useQuery } from "react-query";
import Dashboard from "@/components/Dashboard/Dashboard";
import Container from "@/components/Container/Container";
import TeamDetail from "@/components/TeamDetail/TeamDetail";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useStore } from "@/hooks/store/useStore";
import { useTeams } from "@/hooks/services/teams/useTeams";
import UserTeam from "@/components/UserTeam/UserTeam";
import { useUsers } from "@/hooks/services/users/useUsers";
import { useUserStore } from "@/hooks/store/useUserStore";
import { useSession } from "@/hooks/store/useSession";
import Page404 from "@/components/404/404";

const LoggedInLayout = () => {
  const updateTeams = useStore((state) => state.updateTeams);
  const { getTeams } = useTeams();

  const { data } = useQuery({
    queryKey: ["get-teams"],
    queryFn: getTeams,
    onSuccess: (data) => {
      updateTeams(data);
    },
  });

  const { getUser } = useUsers();
  const updateUser = useUserStore((store) => store.updateUser);
  const userId = useSession((store) => store.user!.id);

  const { data: user } = useQuery({
    queryKey: ["get-user", userId],
    queryFn: () => getUser(userId),
    onSuccess: (data) => updateUser(data),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<TeamDetail />} />
          <Route path="/my-team/:id" element={<TeamDetail />} />
          <Route path="/my-team" element={<UserTeam />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </Container>
    </div>
  );
};

export default LoggedInLayout;
