import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const tenantId = process.argv[2];
if (!tenantId) {
  console.error("Usage: node scripts/runPipeline.mjs <tenantId>");
  process.exit(1);
}

console.log(`\n===== PIPELINE START — tenant: ${tenantId} =====\n`);

console.log("[1/3] Generating tenant-specific build files...");
execSync(`npx tsx scripts/generateClientBuild.mjs ${tenantId}`, {
  stdio: "inherit",
});

console.log("\n[2/3] Building...");
execSync(`npx nx build portal --outputPath=dist/${tenantId}`, {
  stdio: "inherit",
});

console.log(
  "\n[3/3] Verifying disabled products/features are absent from bundle...",
);
verify(tenantId);

console.log(
  `\n===== PIPELINE COMPLETE — dist/${tenantId} ready to deploy =====\n`,
);

function verify(tenantId) {
  const manifest = JSON.parse(
    fs.readFileSync(`build-manifests/${tenantId}.json`, "utf-8"),
  );
  const assetsDir = path.resolve(`dist/${tenantId}/assets`);
  const files = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".js"));
  const bundleText = files
    .map((f) => fs.readFileSync(path.join(assetsDir, f), "utf-8"))
    .join("\n");

  // check disabled products
  for (const [key, val] of Object.entries(manifest.config.products)) {
    if (!val.enabled) {
      const leaked = bundleText.toLowerCase().includes(key);
      console.log(
        leaked
          ? `  ⚠ POSSIBLE LEAK: "${key}"`
          : `  ✓ Confirmed excluded: ${key}`,
      );
    }
  }
  // check other tenants' data isn't present
  for (const otherId of ["abc", "xyz"].filter((id) => id !== tenantId)) {
    const leaked = bundleText.includes(otherId);
    console.log(
      leaked
        ? `  ⚠ OTHER TENANT DATA LEAKED: "${otherId}"`
        : `  ✓ No trace of tenant "${otherId}"`,
    );
  }
}
