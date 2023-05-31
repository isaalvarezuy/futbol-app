import classNames from "classnames";
import React from "react";

const IconWrapper = ({
  children,
  size = 16,
}: {
  children: React.ReactElement;
  size?: 12 | 16 | 20 | 24;
}) => {
  const sizeMapper = {
    12: "h-3 w-3",
    16: "h-4 w-4",
    20: "h-5 w-5",
    24: "h-6 w-6",
  };
  return (
    <div
      className={classNames(
        sizeMapper[size],
        "items-center flex shrink-0 flex-none "
      )}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
