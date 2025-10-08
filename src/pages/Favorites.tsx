import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import quinoaBowl from "@/assets/recipe-quinoa-bowl.jpg";
import chickenSalad from "@/assets/recipe-chicken-salad.jpg";
import stirFry from "@/assets/recipe-stir-fry.jpg";
import carbonara from "@/assets/recipe-pasta-carbonara.jpg";
import greekSalad from "@/assets/recipe-greek-salad.jpg";
import risotto from "@/assets/recipe-risotto.jpg";

const Favorites = () => {
  const [user, setUser] = useState<User | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

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

  const { favorites, loading } = useFavorites(user?.id);

  const recipeImages: Record<string, string> = {
    "mediterranean-quinoa-bowl": quinoaBowl,
    "grilled-chicken-salad": chickenSalad,
    "vegetable-stir-fry": stirFry,
    "pasta-carbonara": carbonara,
    "greek-salad": greekSalad,
    "mushroom-risotto": risotto,
  };

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.some((fav) => fav.recipe_id === recipe.id)
  );

  const filteredRecipes =
    categoryFilter === "all"
      ? favoriteRecipes
      : favoriteRecipes.filter((recipe) => {
          const fav = favorites.find((f) => f.recipe_id === recipe.id);
          return fav?.category === categoryFilter;
        });

  const categories = Array.from(
    new Set(favorites.map((fav) => fav.category).filter(Boolean))
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Please log in</h2>
          <p className="text-muted-foreground">
            You need to be logged in to view your favorites
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

          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-12 h-12" />
            <h1 className="text-5xl font-bold">My Favorite Recipes</h1>
          </div>

          {categories.length > 0 && (
            <div className="flex items-center gap-4 mt-8">
              <Filter className="w-5 h-5" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category!}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading favorites...</p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">No favorites yet</h2>
            <p className="text-muted-foreground">
              Start adding recipes to your favorites!
            </p>
            <Link to="/">
              <Button>Browse Recipes</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                image={recipeImages[recipe.id]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
