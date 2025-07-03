import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cinema } from "@/data/type";

interface CinemaCardProps {
  cinema: Cinema;
}

const CinemaCard = ({ cinema }: CinemaCardProps) => {
  const fullAddress = `${cinema.street}, ${cinema.ward}, ${cinema.district}, ${cinema.city}`;

  return (
    <Card className="cinema-card overflow-hidden flex flex-col h-full bg-card border-none shadow-lg">
      <CardContent className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">{cinema.name}</h2>

        <div className="text-sm text-muted-foreground">{fullAddress}</div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            Giờ mở cửa: {cinema.opening_time} - {cinema.closing_time}
          </span>
        </div>

        <Badge variant="secondary">Phòng chiếu: {cinema.number_of_rooms}</Badge>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/admin/cinemas/${cinema.id}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CinemaCard;
