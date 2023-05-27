import { Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "@/components/Dashboard/Dashboard";
import Container from "@/components/Container/Container";
import TeamDetail from "@/components/TeamDetail/TeamDetail";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useQuery } from "react-query";
import { getPlayers } from "@/services";
import { ToastContainer } from "react-toastify";
import { useStore } from "@/hooks/useStore";
import { useSession } from "@/hooks/useSession";
import { useTeams } from "@/services/teams/useTeams";

const LoggedInLayout = () => {
  const updateTeams = useStore((state) => state.updateTeams);
  const { getTeams } = useTeams();
  const navigate = useNavigate();

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
