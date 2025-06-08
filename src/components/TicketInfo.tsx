import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MovieData {
  title: string;
  theater: string;
  date: string;
  time: string;
  seats: string[];
  hall: string;
  format: string;
  poster: string;
}

interface TicketInfoProps {
  movieData: MovieData;
}

const TicketInfo = ({ movieData }: TicketInfoProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Thông tin vé xem phim
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="w-20 h-28 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={movieData.poster} 
              alt={movieData.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-2">{movieData.title}</h3>
            <Badge variant="secondary" className="mb-2">{movieData.format}</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Rạp:</span>
            <span className="font-medium">{movieData.theater}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Ngày chiếu:</span>
            <span className="font-medium">{movieData.date}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Giờ chiếu:</span>
            <span className="font-medium">{movieData.time}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Phòng chiếu:</span>
            <span className="font-medium">{movieData.hall}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Ghế ngồi:</span>
            <div className="flex gap-2">
              {movieData.seats.map((seat, index) => (
                <Badge key={index} variant="outline">
                  {seat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketInfo;