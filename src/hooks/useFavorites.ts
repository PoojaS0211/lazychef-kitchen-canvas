import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Favorite {
  id: string;
  recipe_id: string;
  category: string | null;
  created_at: string;
}

export const useFavorites = (userId: string | undefined) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from("user_favorites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (recipeId: string, category?: string) => {
    if (!userId) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save favorites",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("user_favorites").insert({
        user_id: userId,
        recipe_id: recipeId,
        category: category || null,
      });

      if (error) throw error;

      toast({
        title: "Added to favorites ❤️",
        description: "Recipe saved successfully",
      });

      fetchFavorites();
    } catch (error: any) {
      if (error.code === "23505") {
        toast({
          title: "Already in favorites",
          description: "This recipe is already saved",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Could not save recipe",
          variant: "destructive",
        });
      }
    }
  };

  const removeFavorite = async (recipeId: string) => {
    try {
      const { error } = await supabase
        .from("user_favorites")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Removed from favorites",
        description: "Recipe removed successfully",
      });

      fetchFavorites();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not remove recipe",
        variant: "destructive",
      });
    }
  };

  const updateCategory = async (recipeId: string, category: string) => {
    try {
      const { error } = await supabase
        .from("user_favorites")
        .update({ category })
        .eq("recipe_id", recipeId)
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Category updated",
        description: "Recipe category changed successfully",
      });

      fetchFavorites();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update category",
        variant: "destructive",
      });
    }
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some((fav) => fav.recipe_id === recipeId);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    updateCategory,
    isFavorite,
  };
};
