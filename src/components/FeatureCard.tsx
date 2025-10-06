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
    <Link to={link} className="group">
      <Card className="h-full backdrop-blur-md bg-gradient-card border-border/50 shadow-glass hover:shadow-glass-hover transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer">
        <CardHeader className="p-8">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-2xl mb-3">{title}</CardTitle>
          <CardDescription className="text-base text-muted-foreground leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
