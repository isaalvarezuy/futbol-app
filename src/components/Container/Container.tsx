import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="ml-[260px]">{children}</div>;
};

export default Container;
