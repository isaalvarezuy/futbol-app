import { ReactNode } from "react";

const ChartWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center h-full p-3 bg-white border border-gray-200 rounded-md">
      {children}
    </div>
  );
};

export default ChartWrapper;
