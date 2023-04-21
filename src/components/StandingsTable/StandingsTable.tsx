import TableRow from "@/components/TableRow/TableRow";
import TableCell from "@/components/TableCell/TableCell";
import LastFiveGames from "@/components/LastFiveGames/LastFiveGames";
import TableWrapper from "@/components/TableWrapper/TableWrapper";
import StandingsTableActions from "@/components/StandingsTableActions/StandingsTableActions";
import { Team } from "@/types/Team";

const StandingsTable = ({ teams }: { teams: Team[] }) => {
  const tableHeaders = [
    { label: "#", classes: "" },
    { label: "Team", classes: "pl-2 text-left" },
    { label: "Games", classes: "" },
    { label: "W", classes: "" },
    { label: "T", classes: "" },
    { label: "L", classes: "" },
    { label: "GF", classes: "" },
    { label: "GA", classes: "" },
    { label: "GD", classes: "" },
    { label: "Pts.", classes: "" },
    { label: "Last 5", classes: "" },
    { label: "Actions", classes: "" },
  ];

  return (
    <TableWrapper>
      <table className="w-full">
        <thead>
          <TableRow>
            {tableHeaders.map((h, idx) => (
              <TableCell
                key={`${h.label}-${idx}`}
                tag="th"
                className={h.classes}
              >
                {h.label}
              </TableCell>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {teams &&
            teams.map((team: Team, idx: number) => {
              const {
                id,
                name,
                goalsFor,
                goalsAgainst,
                ties,
                loses,
                games,
                wins,
                goalDifference,
                points,
                lastFiveGames,
              } = team;

              return (
                <TableRow key={id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="text-left pl-2">{name}</TableCell>
                  <TableCell>{games}</TableCell>
                  <TableCell>{wins}</TableCell>
                  <TableCell>{ties}</TableCell>
                  <TableCell>{loses}</TableCell>
                  <TableCell>{goalsFor}</TableCell>
                  <TableCell>{goalsAgainst}</TableCell>
                  <TableCell>{goalDifference}</TableCell>
                  <TableCell>{points}</TableCell>
                  <TableCell>
                    <LastFiveGames games={lastFiveGames} />
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <StandingsTableActions team={team} />
                  </TableCell>
                </TableRow>
              );
            })}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default StandingsTable;
