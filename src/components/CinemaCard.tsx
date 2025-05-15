
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cinema } from "@/data/movies";

interface CinemaCardProps {
  cinema: Cinema;
}

const CinemaCard = ({ cinema }: CinemaCardProps) => {
  return (
    <Card className="overflow-hidden border-none bg-card shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">{cinema.name}</h3>
            <div className="flex items-start gap-2 text-cinema-muted mb-3">
              <MapPin size={16} className="mt-1" />
              <p>{cinema.address}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-muted">
            {cinema.halls} Halls
          </Badge>
        </div>
        <Button className="w-full">View Showtimes</Button>
      </CardContent>
    </Card>
  );
};

export default CinemaCard;
