import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RecipeDetail from "./pages/RecipeDetail";
import IngredientManager from "./pages/IngredientManager";
import RecipeGenerator from "./pages/RecipeGenerator";
import MealPlanner from "./pages/MealPlanner";
import EcoDashboard from "./pages/EnhancedEcoDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import CookLater from "./pages/CookLater";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/ingredient-manager" element={<IngredientManager />} />
          <Route path="/recipe-generator" element={<RecipeGenerator />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/eco-dashboard" element={<EcoDashboard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cook-later" element={<CookLater />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
