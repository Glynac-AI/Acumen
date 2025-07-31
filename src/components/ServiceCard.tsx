
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className,
  iconClassName
}: ServiceCardProps) => {
  return (
    <div className={cn("service-card group", className)}>
      <div className={cn(
        "w-12 h-12 rounded-lg bg-ph/10 text-ph flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-ph group-hover:text-white",
        iconClassName
      )}>
        <Icon className="w-5 h-5" />
      </div>
      
      <h3 className="text-xl font-medium mb-3 group-hover:text-ph transition-colors duration-300">{title}</h3>
      
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceCard;
