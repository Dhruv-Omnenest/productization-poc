import { NavLink } from "react-router-dom";

import {
  useProductization,
} from "../../../../libs/productization/src/ProductizationProvider";

export default function Sidebar() {
  const {
    configuration,
  } = useProductization();

  return (
    <aside>
      <nav>
        {configuration.products.trading.enabled && (
          <div>
            <NavLink to="/trading">
              Trading
            </NavLink>
          </div>
        )}

        {configuration.products.kyc.enabled && (
          <div>
            <NavLink to="/kyc">
              KYC
            </NavLink>
          </div>
        )}

        {configuration.products.reports.enabled && (
          <div>
            <NavLink to="/reports">
              Reports
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}