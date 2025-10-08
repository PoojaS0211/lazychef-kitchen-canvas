-- Create user_favorites table
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint to prevent duplicate favorites
CREATE UNIQUE INDEX user_favorites_user_recipe_unique ON public.user_favorites(user_id, recipe_id);

-- Enable RLS
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_favorites
CREATE POLICY "Users can view their own favorites"
  ON public.user_favorites
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites"
  ON public.user_favorites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own favorites"
  ON public.user_favorites
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON public.user_favorites
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create user_cook_later table
CREATE TABLE public.user_cook_later (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  reminder_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint
CREATE UNIQUE INDEX user_cook_later_user_recipe_unique ON public.user_cook_later(user_id, recipe_id);

-- Enable RLS
ALTER TABLE public.user_cook_later ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_cook_later
CREATE POLICY "Users can view their own cook later items"
  ON public.user_cook_later
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cook later items"
  ON public.user_cook_later
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cook later items"
  ON public.user_cook_later
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cook later items"
  ON public.user_cook_later
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create user_eco_stats table
CREATE TABLE public.user_eco_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  cooked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  servings_made INTEGER NOT NULL DEFAULT 1,
  ingredients_used TEXT[] NOT NULL DEFAULT '{}',
  waste_saved_grams INTEGER DEFAULT 0,
  carbon_saved_kg DECIMAL(10, 2) DEFAULT 0.0
);

-- Enable RLS
ALTER TABLE public.user_eco_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_eco_stats
CREATE POLICY "Users can view their own eco stats"
  ON public.user_eco_stats
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own eco stats"
  ON public.user_eco_stats
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own eco stats"
  ON public.user_eco_stats
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own eco stats"
  ON public.user_eco_stats
  FOR DELETE
  USING (auth.uid() = user_id);