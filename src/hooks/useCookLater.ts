import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CookLaterItem {
  id: string;
  recipe_id: string;
  reminder_date: string | null;
  notes: string | null;
  created_at: string;
}

export const useCookLater = (userId: string | undefined) => {
  const [cookLaterItems, setCookLaterItems] = useState<CookLaterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchCookLater();
    } else {
      setCookLaterItems([]);
      setLoading(false);
    }
  }, [userId]);

  const fetchCookLater = async () => {
    try {
      const { data, error } = await supabase
        .from("user_cook_later")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCookLaterItems(data || []);
    } catch (error) {
      console.error("Error fetching cook later items:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCookLater = async (
    recipeId: string,
    reminderDate?: Date,
    notes?: string
  ) => {
    if (!userId) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save recipes",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("user_cook_later").insert({
        user_id: userId,
        recipe_id: recipeId,
        reminder_date: reminderDate?.toISOString() || null,
        notes: notes || null,
      });

      if (error) throw error;

      toast({
        title: "Added to Cook Later 📅",
        description: reminderDate
          ? `Reminder set for ${reminderDate.toLocaleDateString()}`
          : "Recipe saved to your list",
      });

      fetchCookLater();
    } catch (error: any) {
      if (error.code === "23505") {
        toast({
          title: "Already in Cook Later",
          description: "This recipe is already in your list",
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

  const removeFromCookLater = async (recipeId: string) => {
    try {
      const { error } = await supabase
        .from("user_cook_later")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Removed from Cook Later",
        description: "Recipe removed successfully",
      });

      fetchCookLater();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not remove recipe",
        variant: "destructive",
      });
    }
  };

  const updateReminder = async (recipeId: string, reminderDate: Date | null) => {
    try {
      const { error } = await supabase
        .from("user_cook_later")
        .update({ reminder_date: reminderDate?.toISOString() || null })
        .eq("recipe_id", recipeId)
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Reminder updated",
        description: reminderDate
          ? `Set for ${reminderDate.toLocaleDateString()}`
          : "Reminder removed",
      });

      fetchCookLater();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update reminder",
        variant: "destructive",
      });
    }
  };

  const isCookLater = (recipeId: string) => {
    return cookLaterItems.some((item) => item.recipe_id === recipeId);
  };

  return {
    cookLaterItems,
    loading,
    addToCookLater,
    removeFromCookLater,
    updateReminder,
    isCookLater,
  };
};
