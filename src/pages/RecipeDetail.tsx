import { useParams, Link } from "react-router-dom";
import { recipes } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, ArrowLeft, Check, CalendarPlus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import quinoaBowl from "@/assets/recipe-quinoa-bowl.jpg";
import chickenSalad from "@/assets/recipe-chicken-salad.jpg";
import stirFry from "@/assets/recipe-stir-fry.jpg";
import carbonara from "@/assets/recipe-pasta-carbonara.jpg";
import greekSalad from "@/assets/recipe-greek-salad.jpg";
import risotto from "@/assets/recipe-risotto.jpg";

const RecipeDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isCooked, setIsCooked] = useState(false);
  
  const recipe = recipes.find((r) => r.id === id);

  const recipeImages: Record<string, string> = {
    "mediterranean-quinoa-bowl": quinoaBowl,
    "grilled-chicken-salad": chickenSalad,
    "vegetable-stir-fry": stirFry,
    "pasta-carbonara": carbonara,
    "fresh-greek-salad": greekSalad,
    "mushroom-risotto": risotto,
  };

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Recipe Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryConfig = {
    vegetarian: { label: "Vegetarian", className: "bg-accent text-accent-foreground" },
    "non-veg": { label: "Non-Veg", className: "bg-secondary text-secondary-foreground" },
    "contains-egg": { label: "Contains Egg", className: "bg-card text-card-foreground border border-border" },
  };

  const config = categoryConfig[recipe.category];

  const handleMarkCooked = () => {
    setIsCooked(true);
    toast({
      title: "Recipe marked as cooked! 🎉",
      description: "Great job! You're helping reduce food waste.",
    });
  };

  const handleAddToPlanner = () => {
    toast({
      title: "Added to meal planner",
      description: `${recipe.title} has been added to your weekly plan.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Recipes
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={recipeImages[recipe.id]}
                alt={recipe.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-glass"
              />
            </div>
            
            <div className="md:w-2/3">
              <div className="mb-4">
                <Badge className={config.className}>{config.label}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
              
              <div className="flex flex-wrap gap-6 text-primary-foreground/90">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  <span>{recipe.calories} cal</span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={handleMarkCooked}
                  disabled={isCooked}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <Check className="mr-2 h-4 w-4" />
                  {isCooked ? "Marked as Cooked" : "Mark as Cooked"}
                </Button>
                <Button
                  onClick={handleAddToPlanner}
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Add to Planner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <Card className="backdrop-blur-md bg-gradient-card border-border/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-2xl">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Steps */}
          <Card className="backdrop-blur-md bg-gradient-card border-border/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-2xl">Cooking Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
