import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import RegistrationScreen from "pages/registration-screen";
import DashboardHome from "pages/dashboard-home";
import TransactionHistory from "pages/transaction-history";
import SupportCenter from "pages/support-center";
import SpendingInsights from "pages/spending-insights";
import MoneyTransfer from "pages/money-transfer";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/registration-screen" element={<RegistrationScreen />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/support-center" element={<SupportCenter />} />
        <Route path="/spending-insights" element={<SpendingInsights />} />
        <Route path="/money-transfer" element={<MoneyTransfer />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;