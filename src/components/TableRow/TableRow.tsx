import React from "react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const TableRow = ({ children }: Props) => {
  return (
    <tr className="text-center text-sm font-body border-b border-gray-200 last:border-none font-normal w-full">
      {children}
    </tr>
  );
};

export default TableRow;
