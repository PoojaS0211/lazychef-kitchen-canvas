import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, BookOpen, Calendar, Leaf, LogIn, LogOut } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import quinoaBowl from "@/assets/recipe-quinoa-bowl.jpg";
import chickenSalad from "@/assets/recipe-chicken-salad.jpg";
import stirFry from "@/assets/recipe-stir-fry.jpg";
import carbonara from "@/assets/recipe-pasta-carbonara.jpg";
import greekSalad from "@/assets/recipe-greek-salad.jpg";
import risotto from "@/assets/recipe-risotto.jpg";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const features = [
    {
      title: "Ingredient Manager",
      description: "Track your leftovers and ingredients to reduce waste",
      icon: ChefHat,
      link: "/ingredient-manager",
    },
    {
      title: "Recipe Generator",
      description: "Get recipe suggestions based on what you have",
      icon: BookOpen,
      link: "/recipe-generator",
    },
    {
      title: "Meal Planner",
      description: "Plan your weekly meals efficiently",
      icon: Calendar,
      link: "/meal-planner",
    },
    {
      title: "Eco Dashboard",
      description: "Track your environmental impact and savings",
      icon: Leaf,
      link: "/eco-dashboard",
    },
  ];

  const recipeImages: Record<string, string> = {
    "mediterranean-quinoa-bowl": quinoaBowl,
    "grilled-chicken-salad": chickenSalad,
    "vegetable-stir-fry": stirFry,
    "pasta-carbonara": carbonara,
    "greek-salad": greekSalad,
    "mushroom-risotto": risotto,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Auth Button */}
        <div className="absolute top-6 right-6 z-20">
          {user ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>

        <div className="absolute inset-0">
          <img
            src={heroKitchen}
            alt="Rustic kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="backdrop-blur-md bg-card/5 p-12 rounded-3xl border border-primary-foreground/10 animate-fade-in max-w-4xl">
            <h1 className="text-7xl md:text-8xl font-bold text-primary-foreground mb-6 tracking-tight">
              LazyChef
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/95 max-w-2xl mx-auto leading-relaxed">
              Turn leftovers into delicious meals and reduce food waste
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in">
            Smart Cooking Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to cook smarter and waste less
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-scale-in">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* Recipes Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Popular Recipes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover delicious ways to use your ingredients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                image={recipeImages[recipe.id]}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
