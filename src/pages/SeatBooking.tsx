import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatSelection from "@/components/SeatSelection";
import { Button } from "@/components/ui/button";
import { Booking } from "@/data/type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, MapPin, Timer } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { TimerContainer } from "@/components/SeatBooking/TimerContainer";
import { formatDate } from "@/lib/formatDate";
import { formatTimeAMPM } from "@/lib/formatTimeAMPM";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  fetchShowtimeSeats,
} from "@/features/seat/seatSlice";
import { fetchShowtime } from "@/features/showtime/showtimeSlice";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { calculateRemainingSeconds } from "@/lib/calculateRemainingSeconds";

// Component đặt chỗ ngồi
const SeatBooking = () => {
  const navigate = useNavigate();
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string; }>();
  const { user, isLoading } = useAuth();
  const [booking, setBooking] = useState<Booking>();

  const dispatch = useDispatch();
  const selectedSeats = useSelector((state: RootState) => state.seat.selectedSeats);
  const showtime = useSelector((state: RootState) => state.showtime.selectedShowtime);

  // Lấy thông tin suất chiếu
  useEffect(() => {
    if (movieId && showtimeId) {
      dispatch(fetchShowtime(showtimeId));
    }
  }, [dispatch, movieId, showtimeId]);

  // Lấy danh sách ghế
  useEffect(() => {
    if (showtimeId) {
      dispatch(fetchShowtimeSeats(showtimeId));
    }
  }, [dispatch, showtimeId]);

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      toast.error("Bạn cần đăng nhập để đặt chỗ ngồi");
      navigate("/login");
    }
  }, [user, isLoading]);

  // Tạo session đặt vé
  useEffect(() => {
    const createBooking = async () => {
      if (!movieId || !showtimeId || !user) return;
      try {
        const payload = {
          showtime: showtimeId,
        };
        const response = await axiosInstance.post(`/bookings/`, payload);
        setBooking(response.data);
        toast.info("Phiên đặt vé đã bắt đầu! Bạn có 5 phút để xác nhận đặt chỗ.");
      } catch (error) {
        toast.error("Lỗi khi tạo phiên đặt vé");
        navigate("/");
        console.error("Lỗi tạo booking:", error);
      }
    };
    createBooking();
  }, [movieId, showtimeId, user]);

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (!booking) {
      toast.error("Không tìm thấy phiên đặt vé. Vui lòng thử lại.");
      navigate("/");
      return;
    }

    if (booking?.expired_at && new Date() > new Date(booking.expired_at)) {
      toast.error("Phiên đặt vé đã hết hạn. Vui lòng thử lại.");
      navigate("/");
      return;
    }

    if (selectedSeats.length === 0) {
      toast.error("Vui lòng chọn ít nhất một chỗ ngồi để tiếp tục.");
      return;
    }

    navigate(`/checkout`);
  };

  // Nếu chưa có dữ liệu suất chiếu
  if (!showtime) {
    return (
      <div className="container py-12 text-center">
        Thông tin đặt vé không hợp lệ.
      </div>
    );
  }

  // Tính tổng giá tiền
  const totalPrice = selectedSeats.reduce(
    (total, seat) =>
      total + Number(showtime.price) + Number(seat.seat_type.extra_price),
    0
  );

  // Giao diện chính
  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1 py-8 container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Chọn Chỗ Ngồi</h1>
              <p className="text-cinema-muted">
                Vui lòng chọn chỗ ngồi bạn muốn đặt cho bộ phim này.
              </p>
            </div>
            {booking && (
              <TimerContainer
                initialSeconds={calculateRemainingSeconds(booking.expired_at)}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-card border-none overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-lg">Sơ Đồ Ghế Ngồi</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <SeatSelection bookingId={booking?.id} showtime={showtime} />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-card border-none overflow-hidden sticky top-20">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-lg">Tóm Tắt Đặt Vé</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">
                        {showtime.movie.title}
                      </h3>
                      <p className="text-sm text-cinema-muted">
                        {showtime.movie.duration} phút •{" "}
                        {showtime.movie.genres.map((g) => g.name).join(", ")}
                      </p>
                    </div>

                    <Separator className="bg-muted" />

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Calendar size={16} className="mt-1" />
                        <div>
                          <p className="text-sm font-medium">Ngày chiếu</p>
                          <p className="text-sm text-cinema-muted">
                            {formatDate(showtime.start_time)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock size={16} className="mt-1" />
                        <div>
                          <p className="text-sm font-medium">Giờ chiếu</p>
                          <p className="text-sm text-cinema-muted">
                            {formatTimeAMPM(showtime.start_time)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="mt-1" />
                        <div>
                          <p className="text-sm font-medium">Rạp</p>
                          <p className="text-sm text-cinema-muted">
                            {showtime.cinema}
                          </p>
                          <p className="text-sm text-cinema-muted">
                            {showtime.room?.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-muted" />

                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm">Ghế đã chọn:</p>
                        <p className="text-sm">
                          {selectedSeats.length > 0
                            ? selectedSeats
                              .map((s) => `${s.seat_row}${s.seat_col}`)
                              .join(", ")
                            : "Chưa chọn"}
                        </p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm">Giá mỗi vé:</p>
                        <p className="text-sm">
                          {showtime.price.toLocaleString()} VND
                        </p>
                      </div>
                      <div className="flex justify-between font-medium">
                        <p>Tổng cộng:</p>
                        <p>{Number(totalPrice).toLocaleString()} VND</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    disabled={selectedSeats.length === 0}
                    onClick={handleCheckout}
                  >
                    Tiếp tục thanh toán
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatBooking;