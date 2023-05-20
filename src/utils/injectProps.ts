import React, { ReactElement } from "react";

export const injectProps = (
  component: any,
  props: React.ComponentProps<any>
) => {
  if (!component) return null;
  return React.cloneElement(component, props);
};
