import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Leaf, TrendingUp, Award } from "lucide-react";

const EcoDashboard = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold">Eco Dashboard</h1>
          <p className="text-xl text-primary-foreground/90 mt-2">
            Track your environmental impact
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="backdrop-blur-md bg-gradient-card border-border/50 shadow-glass">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                <Leaf className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Food Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0 kg</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-gradient-card border-border/50 shadow-glass">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Money Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$0</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-gradient-card border-border/50 shadow-glass">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Eco Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Keep cooking!</p>
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-md bg-gradient-card border-border/50 shadow-glass">
          <CardHeader>
            <CardTitle className="text-2xl">Your Impact</CardTitle>
            <CardDescription>
              See how you're making a difference for the planet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Leaf className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start making an impact</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Begin tracking your ingredients and cooking recipes to see your environmental impact grow
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EcoDashboard;
