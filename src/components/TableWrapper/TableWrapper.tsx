import React, { ReactNode } from "react";

const TableWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-3 rounded-md bg-white border border-gray-200 h-full">
      {children}
    </div>
  );
};

export default TableWrapper;
