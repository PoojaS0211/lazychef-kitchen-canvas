import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";

const RecipeGenerator = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold">Recipe Generator</h1>
          <p className="text-xl text-primary-foreground/90 mt-2">
            Get personalized recipe suggestions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="backdrop-blur-md bg-gradient-card border-border/50 shadow-glass">
          <CardHeader>
            <CardTitle className="text-2xl">AI-Powered Recipes</CardTitle>
            <CardDescription>
              Generate recipes based on your available ingredients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to cook something amazing?</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Add your ingredients first, then let our AI suggest delicious recipes
              </p>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Recipes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipeGenerator;
