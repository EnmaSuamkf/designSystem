import React from "react";

import { DesignSystemProvider } from "./DesignSystemProvider";

// eslint-disable-next-line react/prop-types
export const DesignSystemTestingProvider = ({ children }) => {
  return <DesignSystemProvider>{children}</DesignSystemProvider>;
};
