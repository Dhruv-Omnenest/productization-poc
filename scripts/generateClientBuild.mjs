import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tenantConfigurations } from "../libs/productization/src/config.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tenantId = process.argv[2];

if (!tenantId) {
  console.error("Usage: node scripts/generateClientBuild.mjs <tenantId>");
  process.exit(1);
}

const config = tenantConfigurations[tenantId];
if (!config) {
  console.error(`No configuration found for tenant "${tenantId}"`);
  process.exit(1);
}

console.log(`[pipeline] Resolving build for tenant: ${tenantId}`);

// 1. Bake ONLY this tenant's config into the bundle — never the full map
const appDir = path.resolve(__dirname, "../apps/portal/src/app");
fs.writeFileSync(
  path.join(appDir, "tenant.generated.ts"),
  `// AUTO-GENERATED for tenant "${tenantId}" — do not edit by hand
// Generated at: ${new Date().toISOString()}
import type { TenantConfiguration } from '../../../../libs/productization/src/types';

export const tenantConfiguration: TenantConfiguration = ${JSON.stringify(config, null, 2)};
`,
);
console.log(
  `[pipeline] Wrote tenant.generated.ts (only "${tenantId}" data included)`,
);

// 2. Generate routes.generated.tsx — only enabled products get imported
const products = config.products;
const routeMap = {
  trading: {
    component: "Trading",
    importPath: "../products/trading/Trading.generated",
  },
  kyc: { component: "Kyc", importPath: "../products/kyc/Kyc" },
  reports: { component: "Reports", importPath: "../products/reports/Reports" },
};

let imports = "";
let routes = "";
let firstEnabledPath = null;

for (const [key, meta] of Object.entries(routeMap)) {
  if (!products[key]?.enabled) {
    console.log(
      `[pipeline] Excluding product: ${key} (disabled for ${tenantId})`,
    );
    continue;
  }
  imports += `import ${meta.component} from '${meta.importPath}';\n`;
  routes += `      <Route path="/${key}" element={<${meta.component} />} />\n`;
  if (!firstEnabledPath) firstEnabledPath = `/${key}`;
}

if (!firstEnabledPath) {
  console.error(
    `Tenant "${tenantId}" has zero enabled products — refusing to build.`,
  );
  process.exit(1);
}

fs.writeFileSync(
  path.join(appDir, "routes.generated.tsx"),
  `// AUTO-GENERATED for tenant "${tenantId}" — do not edit by hand
import { Navigate, Route, Routes } from "react-router-dom";
${imports}
export default function AppRoutes() {
  return (
    <Routes>
${routes}      <Route path="*" element={<Navigate to="${firstEnabledPath}" replace />} />
    </Routes>
  );
}
`,
);
console.log(`[pipeline] Wrote routes.generated.tsx`);

// 3. Generate Trading.generated.tsx — sub-feature exclusion (advancedOrders)
const tradingDir = path.resolve(appDir, "../app/products/trading");
fs.mkdirSync(tradingDir, { recursive: true }); // <-- ADD THIS LINE
const advancedOrdersEnabled = products.trading?.advancedOrders?.enabled;

fs.writeFileSync(
  path.join(tradingDir, "Trading.generated.tsx"),
  `// AUTO-GENERATED for tenant "${tenantId}" — do not edit by hand
import Watchlist from './Watchlist';
${advancedOrdersEnabled ? "import AdvancedOrders from './AdvancedOrders';" : ""}

export default function Trading() {
  return (
    <div>
      <Watchlist />
      ${advancedOrdersEnabled ? "<AdvancedOrders />" : "{/* advancedOrders excluded for this tenant */}"}
    </div>
  );
}
`,
);

// 4. Record what was resolved, for the verify step
const manifestDir = path.resolve(__dirname, "../build-manifests");
fs.mkdirSync(manifestDir, { recursive: true });
fs.writeFileSync(
  path.join(manifestDir, `${tenantId}.json`),
  JSON.stringify(
    { tenantId, config, builtAt: new Date().toISOString() },
    null,
    2,
  ),
);
