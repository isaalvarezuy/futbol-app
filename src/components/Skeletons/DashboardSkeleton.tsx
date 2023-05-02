import React from "react";
import Loader from "../Loader/Loader";

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-8 h-screen ">
      <div className="grid grid-cols-8 col-span-8 gap-4  ">
        <div className="col-span-8">
          <Loader />
        </div>
        <div className="col-span-3">
          <Loader />
        </div>
        <div className="col-span-5">
          <Loader />
        </div>

        <div className="grid content-start grid-cols-4 col-span-4 gap-4 ">
          <div className="h-32 col-span-4">
            <Loader />
          </div>
          <div className="h-32 col-span-4">
            <Loader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
