import { Routes, Route } from "react-router-dom";
import { useQuery } from "react-query";
import Dashboard from "@/components/Dashboard/Dashboard";
import Container from "@/components/Container/Container";
import TeamDetail from "@/components/TeamDetail/TeamDetail";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useStore } from "@/hooks/useStore";
import { useTeams } from "@/hooks/services/teams/useTeams";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Container>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail/:id" element={<TeamDetail />} />
          <Route path="/my-team" element={<p> team</p>} />
          <Route path="/*" element={<p>404 ish</p>} />
        </Routes>
      </Container>
    </div>
  );
};

export default LoggedInLayout;
