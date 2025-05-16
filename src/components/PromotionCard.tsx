
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Promotion } from "@/data/type";

interface PromotionCardProps {
  promotion: Promotion;
}

const PromotionCard = ({ promotion }: PromotionCardProps) => {
  const validUntil = new Date(promotion.validUntil).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden border-none bg-card shadow-lg">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={promotion.image}
          alt={promotion.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{promotion.title}</h3>
        <p className="text-cinema-muted mb-3">{promotion.description}</p>
        <p className="text-xs text-cinema-muted mb-4">Valid until: {validUntil}</p>
        <Button variant="outline" className="w-full">View Details</Button>
      </CardContent>
    </Card>
  );
};

export default PromotionCard;
