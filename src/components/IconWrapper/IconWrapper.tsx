import React from "react";

const IconWrapper = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="h-4 w-4 items-center flex shrink-0 flex-none ">
      {children}
    </div>
  );
};

export default IconWrapper;
