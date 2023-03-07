import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  tag?: "th" | "td";
}

const TableCell = ({ className, children, tag = "td" }: Props) => {
  const Tag = tag;
  return <Tag className={`py-3 ${className}`}>{children}</Tag>;
};

export default TableCell;
