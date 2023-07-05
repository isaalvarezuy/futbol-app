import classNames from "classnames";
import Loader from "../Loader/Loader";

const TeamDetailSkeleton = ({ isUserTeam }: { isUserTeam: boolean }) => {
  return (
    <div
      className={classNames(
        "grid gap-4 p-8 h-screen ",
        isUserTeam ? "grid-cols-12" : "grid-cols-8"
      )}
    >
      <div className="grid grid-cols-8 col-span-9 gap-4  ">
        <div className="col-span-8">
          <Loader />
        </div>
        <div className="col-span-5">
          <Loader />
        </div>
        <div className="col-span-3 ">
          <Loader />
        </div>
        <div className="col-span-5">
          <Loader />
        </div>
        <div className="col-span-3 ">
          <Loader />
        </div>
      </div>
      {isUserTeam && (
        <div className="grid content-start grid-cols-3 col-span-3 gap-4 ">
          <div className="h-32 col-span-4">
            <Loader />
          </div>
          <div className="h-32 col-span-4">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetailSkeleton;
