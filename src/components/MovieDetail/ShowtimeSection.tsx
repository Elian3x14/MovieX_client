// components/MovieDetail/ShowtimeSection.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatCurrency from "@/lib/formatCurrency";
import { Calendar } from "lucide-react";
import formatDaysLeft from "@/lib/formatDaysLeft";
import { formatDate } from "@/lib/formatDate";
import { Link, useParams } from "react-router-dom";

interface ShowTimesByDate {
  [key: string]: {
    cinema: string;
    times: {
      id: string;
      time: string;
      hall: string;
      price: number;
    }[];
  }[];
}

interface ShowtimeSectionProps {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
  uniqueDates: string[];
  showtimesByDate: ShowTimesByDate;
}

const ShowtimeSection: React.FC<ShowtimeSectionProps> = ({
  selectedDate,
  setSelectedDate,
  uniqueDates,
  showtimesByDate,
}) => {
    const { id: movieId } = useParams<{ id: string }>();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select a date</h2>
      <div className="flex gap-2 overflow-x-auto mb-6">
        {uniqueDates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg border ${
              selectedDate === date
                ? "border-cinema-primary bg-cinema-primary/10"
                : "border-muted bg-card"
            }`}
          >
            <Calendar size={18} className="mb-1" />
            <span className="font-medium text-sm">
              {formatDate(date)}
            </span>
            <span className="text-xs text-cinema-muted mt-1">
              {formatDaysLeft(date)}
            </span>
          </button>
        ))}
      </div>

      {selectedDate && showtimesByDate[selectedDate] ? (
        <div className="space-y-4">
          {showtimesByDate[selectedDate].map((group, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-2">{group.cinema}</h3>
              <div className="flex flex-wrap gap-3">
                {group.times.map((time) => (
                  <Button key={time.id} asChild variant="secondary">
                    <Link to={`/booking/${movieId}/${time.id}`}>
                    {time.time} - {time.hall} ({formatCurrency(time.price)})
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No showtimes available for this date.</p>
      )}
    </div>
  );
};

export default ShowtimeSection;
