// AUTO-GENERATED for tenant "abc" — do not edit by hand
import { Navigate, Route, Routes } from "react-router-dom";
import Trading from '../products/trading/Trading.generated';
import Kyc from '../products/kyc/Kyc';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/trading" element={<Trading />} />
      <Route path="/kyc" element={<Kyc />} />
      <Route path="*" element={<Navigate to="/trading" replace />} />
    </Routes>
  );
}
