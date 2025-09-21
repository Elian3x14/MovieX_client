import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ShowtimeSeat, SeatType, Showtime, SeatStatus } from "@/data/type";
import formatCurrency from "@/lib/formatCurrency";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  setSelectedSeats,
  updateSeatsStatusByIds,
} from "@/features/seat/seatSlice";

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

const seatStatuses = [
  { color: "bg-cinema-primary", label: "Đã chọn" },
  { color: "bg-gray-500 opacity-50", label: "Không khả dụng" },
  { color: "bg-green-500", label: "Có sẵn" },
  { color: "bg-gray-500 cursor-not-allowed", label: "Đã đặt" },
];

interface SeatSelectionProps {
  bookingId: number;
  showtime: Showtime;
}

const SeatSelection = ({ bookingId, showtime }: SeatSelectionProps) => {
  const dispatch = useDispatch();
  const seats = useSelector((state: RootState) => state.seat.showtimeSeats);
  const selectedSeats = useSelector(
    (state: RootState) => state.seat.selectedSeats
  );

  // Lấy user từ Redux store (thay cho useAuth)
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const ws = new WebSocket(`${WS_BASE_URL}booking/${showtime.id}/`);

    ws.onopen = () => {
      console.log("Đã kết nối WebSocket");
      ws.send(JSON.stringify({ type: "join", bookingId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Nhận dữ liệu WebSocket:", data);

      // Bỏ qua event do chính user gửi
      if (data.sender_id && user && data.sender_id === user.id) return;

      if (data.type === "seat_added") {
        dispatch(
          updateSeatsStatusByIds({
            ids: [data.seat_id],
            status: SeatStatus.RESERVED,
          })
        );
      } else if (data.type === "seat_removed") {
        dispatch(
          updateSeatsStatusByIds({
            ids: [data.seat_id],
            status: SeatStatus.AVAILABLE,
          })
        );
      }
    };

    ws.onerror = (err) => console.error("Lỗi WebSocket", err);

    return () => ws.close();
  }, [showtime.id, bookingId, dispatch, user]);

  const seatTypes: SeatType[] = useMemo(() => {
    const map = new Map();
    seats.forEach((seat) => {
      if (!map.has(seat.seat_type.id)) {
        map.set(seat.seat_type.id, seat.seat_type);
      }
    });
    return Array.from(map.values()).sort(
      (a, b) => a.extra_price - b.extra_price
    );
  }, [seats]);

  const toggleSeat = async (seat: ShowtimeSeat) => {
    if (!bookingId) {
      toast.error("Lỗi: session chưa được khởi tạo!");
      return;
    }

    if (["reserved", "unavailable"].includes(seat.status)) return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);

    try {
      if (isSelected) {
        await axiosInstance.delete(
          `/bookings/${bookingId}/remove-seat/${seat.id}/`
        );
        dispatch(
          setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id))
        );
      } else {
        await axiosInstance.post(`/bookings/${bookingId}/add-seat/${seat.id}/`);
        dispatch(
          setSelectedSeats([
            ...selectedSeats,
            { ...seat, status: SeatStatus.SELECTED },
          ])
        );
      }
    } catch (error: any) {
      console.error("Lỗi API ghế", error);
      toast.error(error.response?.data?.error || "Không thể cập nhật ghế.");
    }
  };

  const rows = useMemo(() => {
    return Array.from(new Set(seats.map((s) => s.seat_row))).sort();
  }, [seats]);

  const getSeatsByRow = (row: string) =>
    seats
      .map((seat) =>
        seat.seat_row === row
          ? selectedSeats.some((s) => s.id === seat.id)
            ? { ...seat, status: "selected" }
            : seat
          : null
      )
      .filter(Boolean) as ShowtimeSeat[];

  const getSeatColor = (seat: ShowtimeSeat) => {
    switch (seat.status) {
      case "reserved":
      case "unavailable":
        return "bg-gray-500 cursor-not-allowed opacity-50";
      case "selected":
        return "bg-cinema-primary";
      case "available":
        return "bg-green-700 cursor-pointer hover:bg-cinema-primary/70";
      default:
        return "bg-muted";
    }
  };

  const handleConfirm = () => {
    // Thực hiện xử lý khi nhấn xác nhận
  };

  return (
    <div className="flex flex-col items-center py-4">
      {/* Màn hình */}
      <div className="mb-8 bg-black/50 w-4/5 h-2 rounded-lg mx-auto">
        <div className="text-center text-xs text-cinema-muted mt-1">
          MÀN HÌNH
        </div>
      </div>

      {/* Sơ đồ ghế */}
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
                  )} transition-colors`}
                  disabled={["reserved", "unavailable"].includes(seat.status)}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat.seat_type.name.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chú thích */}
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        {seatStatuses.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`size-4 rounded-sm ${color}`}></div>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* Loại ghế */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {seatTypes.map((seatType, index) => (
          <div key={index} className="border p-2 px-4 rounded text-center">
            <div className="text-sm font-medium">{seatType.name}</div>
            <div className="text-xs text-primary">
              {formatCurrency(Number(showtime.price))}
            </div>
          </div>
        ))}
      </div>

      {/* Xác nhận */}
      <div className="mt-4 text-center">
        <p className="mb-4">
          Ghế đã chọn:{" "}
          {selectedSeats.length > 0
            ? selectedSeats.map((s) => `${s.seat_row}${s.seat_col}`).join(", ")
            : "Chưa chọn"}
        </p>
        <Button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className="min-w-[200px]"
        >
          Xác nhận ({selectedSeats.length})
          {selectedSeats.length > 0 &&
            ` - ${formatCurrency(
              selectedSeats.reduce(
                (total, seat) => total + Number(showtime.price),
                0
              )
            )}`}
        </Button>
      </div>
    </div>
  );
};

export default SeatSelection;
