import React from "react";

import { useParams } from "react-router-dom";

const TeamDetail = () => {
  const { id } = useParams();

  return (
    <div className=" p-8 grid grid-cols-12 gap-4">
      <div className=" col-span-8  grid grid-cols-8 gap-4">
        <div className="col-span-8">
          {/*  <StandingsTable teams={teams} /> */}
        </div>
        <div className="col-span-3">
          {/*  <PlayersTable players={players} /> */}
        </div>
        <div className="col-span-5 h-60 bg-gray-400"></div>
      </div>
      <div className=" col-span-4 bg-teal-200 grid grid-cols-4 gap-4 content-start">
        <div className="col-span-4 h-20 bg-gray-400"></div>
        <div className="col-span-4 h-20 bg-gray-400"></div>
      </div>

      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
      <div>hola</div>
    </div>
  );
};

export default TeamDetail;
