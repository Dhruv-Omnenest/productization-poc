import { BrowserRouter } from "react-router-dom";

import {
  ProductizationProvider,
} from "../../../../libs/productization/src/ProductizationProvider";

import {
  tenantConfigurations,
} from "../../../../libs/productization/src/config";

import AppShell from "./AppShell";
import AppRoutes from "./routes";

export default function App() {
  const configuration =
    tenantConfigurations.xyz;

  return (
    <ProductizationProvider
      configuration={configuration}
    >
      <BrowserRouter>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </BrowserRouter>
    </ProductizationProvider>
  );
}