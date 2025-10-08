import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, TrendingDown, Flame, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const EnhancedEcoDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [ecoStats, setEcoStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (user) {
      fetchEcoStats();
    }
  }, [user]);

  const fetchEcoStats = async () => {
    try {
      const { data, error } = await supabase
        .from("user_eco_stats")
        .select("*")
        .order("cooked_at", { ascending: false });

      if (error) throw error;
      setEcoStats(data || []);
    } catch (error) {
      console.error("Error fetching eco stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalWasteSaved = ecoStats.reduce(
    (sum, stat) => sum + (stat.waste_saved_grams || 0),
    0
  );
  const totalCarbonSaved = ecoStats.reduce(
    (sum, stat) => sum + parseFloat(stat.carbon_saved_kg || 0),
    0
  );
  const recipesCooked = ecoStats.length;
  const averageServings =
    recipesCooked > 0
      ? (ecoStats.reduce((sum, stat) => sum + stat.servings_made, 0) / recipesCooked).toFixed(1)
      : 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Leaf className="w-16 h-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Please log in</h2>
          <p className="text-muted-foreground">
            You need to be logged in to view your eco dashboard
          </p>
          <Link to="/auth">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const ecoTips = [
    "Plan meals ahead to buy only what you need",
    "Store ingredients properly to extend their shelf life",
    "Use leftover ingredients creatively in new recipes",
    "Compost food scraps to reduce landfill waste",
    "Choose seasonal and local ingredients when possible",
    "Batch cook and freeze portions for later use",
  ];

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
            <Leaf className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Eco Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card border-border/50 shadow-glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Waste Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(totalWasteSaved / 1000).toFixed(2)} kg</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalWasteSaved} grams of food saved
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Carbon Footprint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCarbonSaved.toFixed(2)} kg</div>
              <p className="text-xs text-muted-foreground mt-1">
                CO₂ emissions reduced
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Recipes Cooked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{recipesCooked}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total meals prepared
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Avg Servings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageServings}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Servings per recipe
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Eco Tips */}
        <Card className="bg-gradient-card border-border/50 shadow-glass mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
              Tips for Reducing Food Waste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ecoTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {ecoStats.length > 0 && (
          <Card className="bg-gradient-card border-border/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-2xl">Recent Cooking Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ecoStats.slice(0, 10).map((stat) => (
                  <div
                    key={stat.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/50"
                  >
                    <div>
                      <p className="font-medium capitalize">
                        {stat.recipe_id.replace(/-/g, " ")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(stat.cooked_at).toLocaleDateString()} • {stat.servings_made} servings
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        {stat.waste_saved_grams}g saved
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.carbon_saved_kg}kg CO₂
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {ecoStats.length === 0 && !loading && (
          <Card className="bg-gradient-card border-border/50 shadow-glass">
            <CardContent className="py-12 text-center">
              <Leaf className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Your Eco Journey</h3>
              <p className="text-muted-foreground mb-6">
                Cook recipes and track your environmental impact!
              </p>
              <Link to="/">
                <Button>Browse Recipes</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedEcoDashboard;
