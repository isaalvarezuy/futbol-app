import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";

const LoadingScreen = () => {
  return (
    <div>
      <div className="w-[260px] p-2 h-full fixed left-0 top-0  animate-pulse bg-gray-300"></div>
      <div className="pl-[260px]">
        <DashboardSkeleton />
      </div>
    </div>
  );
};

export default LoadingScreen;
