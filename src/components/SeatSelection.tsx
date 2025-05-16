
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Seat as SeatType } from "@/data/movies";

interface SeatSelectionProps {
  seats: SeatType[];
  onSeatsSelected: (seats: SeatType[]) => void;
}

const SeatSelection = ({ seats, onSeatsSelected }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
  
  const toggleSeat = (seat: SeatType) => {
    if (seat.status !== "available") return;
    
    if (selectedSeats.some(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, status: "selected" }]);
    }
  };
  
  const handleConfirm = () => {
    onSeatsSelected(selectedSeats);
  };
  
  const rows = Array.from(new Set(seats.map(seat => seat.seat_row))).sort();
  
  const getSeatsByRow = (row: string) => {
    return seats.map(seat => {
      if (seat.seat_row === row) {
        if (selectedSeats.some(s => s.id === seat.id)) {
          return { ...seat, status: "selected" };
        }
        return seat;
      }
      return null;
    }).filter(Boolean) as SeatType[];
  };
  
  const getSeatColor = (seat: SeatType) => {
    if (seat.status === "reserved") return "bg-gray-500 cursor-not-allowed opacity-50";
    if (seat.status === "selected") return "bg-cinema-primary";
    
    if (seat.seat_type.name === "vip") return "bg-cinema-secondary text-black";
    if (seat.seat_type.name === "premium") return "bg-accent";
    return "bg-muted";
  };
  
  return (
    <div className="flex flex-col items-center py-4">
      <div className="mb-8 bg-black/50 w-4/5 h-2 rounded-lg mx-auto">
        <div className="text-center text-xs text-cinema-muted mt-1">SCREEN</div>
      </div>
      
      <div className="mb-8 max-w-3xl mx-auto overflow-x-auto">
        {rows.map(row => (
          <div key={row} className="flex items-center justify-center gap-1 mb-2">
            <div className="w-6 text-center font-medium">{row}</div>
            <div className="flex gap-1">
              {getSeatsByRow(row).map(seat => (
                <button
                  key={seat.id}
                  className={`w-6 h-6 text-[10px] rounded-t-lg flex items-center justify-center ${getSeatColor(seat)} transition-colors ${seat.status === "available" ? "hover:bg-cinema-primary/70 cursor-pointer" : ""}`}
                  disabled={seat.status === "reserved" || seat.status === "unavailable"}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat.seat_col}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded-sm"></div>
          <span className="text-sm">Standard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent rounded-sm"></div>
          <span className="text-sm">Premium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cinema-secondary rounded-sm"></div>
          <span className="text-sm">VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cinema-primary rounded-sm"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 opacity-50 rounded-sm"></div>
          <span className="text-sm">Unavailable</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="mb-4">
          Selected seats: {selectedSeats.length > 0 
            ? selectedSeats.map(s => `${s.seat_row}${s.seat_col}`).join(", ") 
            : "None"}
        </p>
        <Button 
          onClick={handleConfirm} 
          disabled={selectedSeats.length === 0}
          className="min-w-[200px]"
        >
          Confirm ({selectedSeats.length}) 
          {selectedSeats.length > 0 && ` - ${(selectedSeats.length * 120000).toLocaleString()} VND`}
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
