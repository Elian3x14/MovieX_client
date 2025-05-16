import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Seat, SeatType, Showtime, showtimes } from "@/data/movies";
import formatCurrency from "@/lib/formatCurrency";

interface SeatSelectionProps {
  showtime: Showtime;
  seats: Seat[];
  onSeatsSelected: (seats: Seat[]) => void;
}

const seatStatuses = [
  { color: "bg-cinema-primary", label: "Selected" },
  { color: "bg-gray-500 opacity-50", label: "Unavailable" },
  { color: "bg-green-500", label: "Available" },
  { color: "bg-gray-500 cursor-not-allowed", label: "Reserved" },
];

const SeatSelection = ({
  showtime,
  seats,
  onSeatsSelected,
}: SeatSelectionProps) => {
  // Get unique seat types
  const seatTypesMap = new Map();

  seats.forEach((seat) => {
    const st = seat.seat_type;
    if (!seatTypesMap.has(st.id)) {
      seatTypesMap.set(st.id, st);
    }
  });

  const seatTypes : SeatType[] = Array.from(seatTypesMap.values()).sort(
    (a, b) => a.extra_price - b.extra_price
  );

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "reserved") return;
    if (seat.status === "unavailable") return;

    if (selectedSeats.some((s) => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, status: "selected" }]);
    }
  };

  const handleConfirm = () => {
    onSeatsSelected(selectedSeats);
  };

  const rows = Array.from(new Set(seats.map((seat) => seat.seat_row))).sort();

  const getSeatsByRow = (row: string) => {
    return seats
      .map((seat) => {
        if (seat.seat_row === row) {
          if (selectedSeats.some((s) => s.id === seat.id)) {
            return { ...seat, status: "selected" };
          }
          return seat;
        }
        return null;
      })
      .filter(Boolean) as Seat[];
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === "reserved")
      return "bg-gray-500 cursor-not-allowed opacity-50";
    if (seat.status === "selected") return "bg-cinema-primary";
    if (seat.status === "unavailable")
      return "bg-gray-500 cursor-not-allowed opacity-50";
    if (seat.status === "available") return "bg-green-700 cursor-pointer";
    return "bg-muted";
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="mb-8 bg-black/50 w-4/5 h-2 rounded-lg mx-auto">
        <div className="text-center text-xs text-cinema-muted mt-1">SCREEN</div>
      </div>

      <div className="mb-8 max-w-3xl mx-auto overflow-x-auto">
        {rows.map((row) => (
          <div
            key={row}
            className="flex items-center justify-center gap-1 mb-2"
          >
            <div className="w-6 text-center font-medium">{row}</div>
            <div className="flex gap-1">
              {getSeatsByRow(row).map((seat) => (
                <button
                  key={seat.id}
                  className={`size-6 text-[10px] rounded-t-lg flex items-center justify-center ${getSeatColor(
                    seat
                  )} transition-colors ${
                    seat.status === "available"
                      ? "hover:bg-cinema-primary/70 cursor-pointer"
                      : ""
                  }`}
                  disabled={
                    seat.status === "reserved" || seat.status === "unavailable"
                  }
                  onClick={() => toggleSeat(seat)}
                >
                  {seat.seat_type.name.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        {seatStatuses.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`size-4 rounded-sm ${color}`}></div>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* SeatType in this room */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {seatTypes.map((seatType, index) => (
          <div key={index} className="border p-2 px-4 rounded text-center">
            <div className="text-sm font-medium"> {seatType.name}</div>
            <div className="text-xs text-primary">
              {formatCurrency(seatType.extra_price + Number(showtime.price))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="mb-4">
          Selected seats:{" "}
          {selectedSeats.length > 0
            ? selectedSeats.map((s) => `${s.seat_row}${s.seat_col}`).join(", ")
            : "None"}
        </p>
        <Button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className="min-w-[200px]"
        >
          Confirm ({selectedSeats.length})
          {selectedSeats.length > 0 &&
            ` - ${(
              selectedSeats.length * showtime.price
            ).toLocaleString()} VND`}
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
