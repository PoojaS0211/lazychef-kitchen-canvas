import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export const FeatureCard = ({ title, description, icon: Icon, link }: FeatureCardProps) => {
  return (
    <Link to={link}>
      <Card className="h-full backdrop-blur-md bg-gradient-card border-border/50 shadow-glass hover:shadow-glass-hover transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
