import { ChefHat, BookOpen, Calendar, Leaf } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import quinoaBowl from "@/assets/recipe-quinoa-bowl.jpg";
import chickenSalad from "@/assets/recipe-chicken-salad.jpg";
import stirFry from "@/assets/recipe-stir-fry.jpg";
import carbonara from "@/assets/recipe-pasta-carbonara.jpg";
import greekSalad from "@/assets/recipe-greek-salad.jpg";
import risotto from "@/assets/recipe-risotto.jpg";

const Index = () => {
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
    "fresh-greek-salad": greekSalad,
    "mushroom-risotto": risotto,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroKitchen}
            alt="Rustic kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="backdrop-blur-sm bg-card/10 p-8 rounded-2xl border border-border/20 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground mb-4">
              LazyChef
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl">
              Turn leftovers into delicious meals and reduce food waste
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
          Smart Cooking Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* Recipes Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              image={recipeImages[recipe.id]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
