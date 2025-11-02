import React from "react";
import StoreProvider from "./StoreProvider";

interface UnifiedProviderProps {
  children: React.ReactNode;
}

const UnifiedProvider: React.FC<UnifiedProviderProps> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default UnifiedProvider;
