import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import { useCookLater } from "@/hooks/useCookLater";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/badge";
import quinoaBowl from "@/assets/recipe-quinoa-bowl.jpg";
import chickenSalad from "@/assets/recipe-chicken-salad.jpg";
import stirFry from "@/assets/recipe-stir-fry.jpg";
import carbonara from "@/assets/recipe-pasta-carbonara.jpg";
import greekSalad from "@/assets/recipe-greek-salad.jpg";
import risotto from "@/assets/recipe-risotto.jpg";

const CookLater = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { cookLaterItems, loading } = useCookLater(user?.id);

  const recipeImages: Record<string, string> = {
    "mediterranean-quinoa-bowl": quinoaBowl,
    "grilled-chicken-salad": chickenSalad,
    "vegetable-stir-fry": stirFry,
    "pasta-carbonara": carbonara,
    "greek-salad": greekSalad,
    "mushroom-risotto": risotto,
  };

  const cookLaterRecipes = recipes.filter((recipe) =>
    cookLaterItems.some((item) => item.recipe_id === recipe.id)
  );

  const getReminder = (recipeId: string) => {
    const item = cookLaterItems.find((i) => i.recipe_id === recipeId);
    return item?.reminder_date ? new Date(item.reminder_date) : null;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Clock className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Please log in</h2>
          <p className="text-muted-foreground">
            You need to be logged in to view your Cook Later list
          </p>
          <Link to="/auth">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <Link to="/">
            <Button
              variant="ghost"
              className="mb-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <Clock className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Cook Later</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your list...</p>
          </div>
        ) : cookLaterRecipes.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Clock className="w-16 h-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">No recipes saved</h2>
            <p className="text-muted-foreground">
              Start adding recipes you want to cook later!
            </p>
            <Link to="/">
              <Button>Browse Recipes</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cookLaterRecipes.map((recipe) => {
              const reminder = getReminder(recipe.id);
              return (
                <div key={recipe.id} className="space-y-2">
                  <RecipeCard {...recipe} image={recipeImages[recipe.id]} />
                  {reminder && (
                    <Badge variant="secondary" className="w-full justify-center">
                      <CalendarIcon className="w-3 h-3 mr-2" />
                      Reminder: {reminder.toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CookLater;
