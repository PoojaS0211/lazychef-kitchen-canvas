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
    <Link to={`/recipe/${id}`} className="group">
      <Card className="overflow-hidden backdrop-blur-md bg-gradient-card border-border/50 shadow-glass hover:shadow-glass-hover transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer">
        <div className="relative overflow-hidden h-56">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <Badge className={`${config.className} shadow-lg`}>{config.label}</Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-semibold text-xl mb-4 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{servings} servings</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
