import React from "react";

export const forwardRef = React.forwardRef as <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;
