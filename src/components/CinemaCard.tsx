import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cinema } from "@/data/type";

interface CinemaCardProps {
  cinema: Cinema;
}

const CinemaCard = ({ cinema }: CinemaCardProps) => {
  const fullAddress = [cinema.street, cinema.ward, cinema.district, cinema.city]
    .filter(Boolean) // Bỏ các phần undefined hoặc chuỗi rỗng
    .join(", ");

  return (
    <Card className="overflow-hidden border-none bg-card shadow-lg">
      <CardContent className="p-5">
        <div>
          <h3 className="text-lg font-semibold mb-2">{cinema.name}</h3>
          <div className="flex items-start gap-2 text-cinema-muted mb-3 text-sm">
            <MapPin size={16} className="mt-1" />
            <p>{fullAddress}</p>
          </div>
        </div>
        <Button className="w-full">
          Xem các phim tại rạp
        </Button>
      </CardContent>
    </Card>
  );
};

export default CinemaCard;
