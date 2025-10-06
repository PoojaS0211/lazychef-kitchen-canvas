import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  time: string;
  servings: number;
  category: "vegetarian" | "non-veg" | "contains-egg";
}

export const RecipeCard = ({ id, title, image, time, servings, category }: RecipeCardProps) => {
  const categoryConfig = {
    vegetarian: { label: "Vegetarian", className: "bg-accent text-accent-foreground" },
    "non-veg": { label: "Non-Veg", className: "bg-secondary text-secondary-foreground" },
    "contains-egg": { label: "Contains Egg", className: "bg-card text-card-foreground border border-border" },
  };

  const config = categoryConfig[category];

  return (
    <Link to={`/recipe/${id}`}>
      <Card className="overflow-hidden backdrop-blur-md bg-gradient-card border-border/50 shadow-glass hover:shadow-glass-hover transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer group">
        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge className={config.className}>{config.label}</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{servings} servings</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
