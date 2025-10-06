import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";

const MealPlanner = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Meal Planner</h1>
          <p className="text-xl text-primary-foreground/90 mt-2">
            Plan your weekly meals efficiently
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="backdrop-blur-md bg-gradient-card border-border/50 shadow-glass">
          <CardHeader>
            <CardTitle className="text-2xl">Weekly Meal Plan</CardTitle>
            <CardDescription>
              Organize your meals and reduce food waste
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No meals planned yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start planning your weekly meals to stay organized and reduce waste
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Calendar className="mr-2 h-4 w-4" />
                Create Meal Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanner;
