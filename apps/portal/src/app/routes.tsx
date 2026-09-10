import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Kyc from "../products/kyc/Kyc";
import Reports from "../products/reports/Reports";
import Trading from "../products/trading/Trading";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/trading"
        element={<Trading />}
      />

      <Route
        path="/kyc"
        element={<Kyc />}
      />

      <Route  
        path="/reports"
        element={<Reports />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/trading"
            replace
          />
        }
      />
    </Routes>
  );
}