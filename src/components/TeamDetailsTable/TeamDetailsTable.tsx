import { Team } from "@/types/models/Team";
import React from "react";
import LastFiveGames from "../LastFiveGames/LastFiveGames";
import TableCell from "../TableCell/TableCell";
import TableRow from "../TableRow/TableRow";
import TableWrapper from "../TableWrapper/TableWrapper";

const TeamDetailsTable = ({ team }: { team: Team }) => {
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
  ];
  const {
    name,
    games,
    wins,
    loses,
    ties,
    goalsFor,
    goalsAgainst,
    goalDifference,
    points,
    lastFiveGames,
    crest,
  } = team;
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
          <TableRow>
            <TableCell>?</TableCell>
            <TableCell className="pl-2 text-left">
              <div className="flex gap-2">
                <img
                  src={crest}
                  alt={name}
                  className="h-6 w-6 object-contain "
                />
                {name}
              </div>
            </TableCell>
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
          </TableRow>
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default TeamDetailsTable;
