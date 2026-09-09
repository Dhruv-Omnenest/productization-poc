import { createContext, useContext, type ReactNode } from "react";

import type { TenantConfiguration } from "./types";

interface ProductizationContextValue {
  configuration: TenantConfiguration;
}

const ProductizationContext = createContext<
  ProductizationContextValue | undefined
>(undefined);

interface ProductizationProviderProps {
  configuration: TenantConfiguration;
  children: ReactNode;
}

export function ProductizationProvider({
  configuration,
  children,
}: ProductizationProviderProps) {
  return (
    <ProductizationContext.Provider value={{ configuration }}>
      {children}
    </ProductizationContext.Provider>
  );
}

export function useProductization() {
  const context = useContext(ProductizationContext);

  if (!context) {
    throw new Error(
      "useProductization must be used inside ProductizationProvider",
    );
  }

  return context;
}
