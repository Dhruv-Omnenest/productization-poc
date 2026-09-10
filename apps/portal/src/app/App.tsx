import { BrowserRouter } from "react-router-dom";
import { ProductizationProvider } from "../../../../libs/productization/src/ProductizationProvider";
import { tenantConfigurations } from "../../../../libs/productization/src/config";
import AppShell from "./AppShell";
import AppRoutes from "./routes";


export default function App() {
  return (
    <ProductizationProvider configuration={tenantConfigurations.abc}>
      <BrowserRouter>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </BrowserRouter>
    </ProductizationProvider>
  );
}