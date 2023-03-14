import { Team } from "@/types/Team";
import { useParams } from "react-router-dom";
import TeamDetailsTable from "@/components/TeamDetailsTable/TeamDetailsTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import TableWrapper from "../TableWrapper/TableWrapper";

interface Props {
  teams?: Team[];
}
const TeamDetail = ({ teams }: Props) => {
  const { id } = useParams();
  const team = teams?.find((team) => team.id === id);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    scales: {
      x: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value:any, index:any, ticks:any) {
            return "$" + value;
          },
        },
      },
    },
  };

  if (!team) {
    return <>go back</>;
  }

  const data = {
    datasets: [
      {
        label: "Goals scored",
        data: team.gameHistory.map((game) => game.goalsScored),
        borderColor: "#D1D5DB",
        backgroundColor: "#D1D5DB",
      },
      {
        label: "Goals received",
        data: team.gameHistory.map((game) => game.goalsReceived),
        borderColor: "#374151",
        backgroundColor: "#374151",
      },
    ],
    labels: team.gameHistory.map((game) => game.against.slice(0, 4)),
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-8 ">
      <div className="grid grid-cols-8 col-span-8 gap-4 ">
        <div className="col-span-8">
          <TeamDetailsTable team={team} />
        </div>
        <div className="col-span-5">
          <TableWrapper>
            <Line data={data} options={options} />
          </TableWrapper>
        </div>
        <div className="col-span-3 bg-gray-400 h-60">
          <TableWrapper>
            <Line data={data} />
          </TableWrapper>
        </div>
      </div>
      <div className="grid content-start grid-cols-4 col-span-4 gap-4 bg-teal-200 ">
        <div className="h-20 col-span-4 bg-gray-400"></div>
        <div className="h-20 col-span-4 bg-gray-400"></div>
      </div>

      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
    </div>
  );
};

export default TeamDetail;
