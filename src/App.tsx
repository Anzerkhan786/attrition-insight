import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/explorer" element={<Layout />}>
            <Route index element={<div className="p-6">Employee Explorer - Coming Soon</div>} />
          </Route>
          <Route path="/modeling" element={<Layout />}>
            <Route index element={<div className="p-6">Modeling & Explainability - Coming Soon</div>} />
          </Route>
          <Route path="/simulator" element={<Layout />}>
            <Route index element={<div className="p-6">Scenario Simulator - Coming Soon</div>} />
          </Route>
          <Route path="/upload" element={<Layout />}>
            <Route index element={<div className="p-6">Data Upload - Coming Soon</div>} />
          </Route>
          <Route path="/settings" element={<Layout />}>
            <Route index element={<div className="p-6">Settings - Coming Soon</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
