import React from "react";
import Loader from "../Loader/Loader";

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-8 h-screen">
      <div className="grid grid-cols-8 col-span-9 gap-4 content-start">
        <div className="col-span-8 h-96">
          <Loader />
        </div>
        <div className="col-span-3 h-40">
          <Loader />
        </div>
        <div className="col-span-5 h-40">
          <Loader />
        </div>
      </div>
      <div className="grid content-start grid-cols-4 col-span-3 gap-4 ">
        <div className="h-40 col-span-4">
          <Loader />
        </div>
        <div className="h-40 col-span-4">
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
