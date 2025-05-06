
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Competitors from "./pages/admin/Competitors";
import Results from "./pages/admin/Results";
import Status from "./pages/admin/Status";
import Events from "./pages/admin/Events";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./hooks/use-language";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/competitors" element={<Competitors />} />
            <Route path="/admin/results" element={<Results />} />
            <Route path="/admin/status" element={<Status />} />
            <Route path="/admin/events" element={<Events />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
