import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Booking, PaymentMethod, ShowtimeSeat } from "@/data/type";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { formatDate } from "@/lib/formatDate";
import { formatTimeAMPM } from "@/lib/formatTimeAMPM";
import formatCurrency from "@/lib/formatCurrency";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.ZALO_PAY);
  const [booking, setBooking] = useState<Booking>();
  const [seats, setSeats] = useState<ShowtimeSeat[]>([]);

  const fetchBookingDetails = async () => {
    try {
      const response = await axiosInstance.get(`users/bookings/pending/`);
      const booking = response.data;
      setBooking(booking);
    } catch (error) {
      console.error("Lỗi lấy thông tin đặt vé:", error);
      toast.error("Không thể tải thông tin đặt vé.");
      navigate("/");
    }
  };

  const fetchSeatsByBookingId = async (bookingId: number) => {
    try {
      const response = await axiosInstance.get(`booking-seats/${bookingId}/seats/`);
      setSeats(response.data);
    } catch (error) {
      console.error("Lỗi lấy ghế:", error);
      toast.error("Không thể tải danh sách ghế.");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  useEffect(() => {
    if (booking?.id) fetchSeatsByBookingId(booking.id);
  }, [booking]);

  if (!booking) {
    return (
      <div className="container py-12 text-center">
        Không tìm thấy thông tin đặt vé.
      </div>
    );
  }

  const handleCompletePayment = async () => {
    if (!booking?.id) {
      toast.error("Thông tin đặt vé không hợp lệ.");
      return;
    }

    try {
      switch (paymentMethod) {
        case PaymentMethod.ZALO_PAY: {
          const response = await axiosInstance.post(`bookings/${booking.id}/pay/zalo-pay/`);
          const paymentUrl = response.data.order_url;
          if (paymentUrl) {
            window.location.href = paymentUrl;
          } else {
            toast.error("Không thể khởi tạo thanh toán qua ZaloPay.");
          }
          break;
        }
        default:
          toast.error("Phương thức thanh toán không hỗ trợ.");
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      toast.error("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1 py-8 container">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-card border-none overflow-hidden mb-6">
                <CardHeader>
                  <CardTitle>Phương thức thanh toán</CardTitle>
                  <CardDescription>
                    Chọn phương thức thanh toán bạn muốn sử dụng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
                    className="space-y-4"
                  >
                    <div
                      className={`flex items-center space-x-3 p-3 rounded-md border ${
                        paymentMethod === PaymentMethod.ZALO_PAY
                          ? "border-cinema-primary bg-cinema-primary/10"
                          : "border-muted"
                      }`}
                    >
                      <RadioGroupItem value="zalopay" id="zalopay" />
                      <label
                        htmlFor="zalopay"
                        className="flex items-center justify-between w-full cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src="/icons/zalopay-logo.svg"
                            alt="ZaloPay Logo"
                            className="h-6 w-auto"
                          />
                        </div>
                        <div className="w-16 h-6 bg-blue-500 text-white text-sm flex items-center justify-center rounded-md font-bold">
                          ZaloPay
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-card border-none overflow-hidden sticky top-20">
                <CardHeader>
                  <CardTitle>Chi tiết đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">{booking.showtime.movie.title}</h3>
                    <p className="text-sm text-cinema-muted">
                      {booking.showtime.cinema} - {booking.showtime.room?.name}
                    </p>
                    <p className="text-sm text-cinema-muted">
                      {formatDate(booking.showtime.start_time)} •{" "}
                      {formatTimeAMPM(booking.showtime.start_time)}
                    </p>
                  </div>

                  <Separator className="bg-muted" />

                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">Số lượng vé:</p>
                      <p className="text-sm">x{seats.length}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Ghế đã chọn:</p>
                      <ul className="text-sm">
                        {seats.map((seat) => (
                          <li key={seat.id} className="flex justify-between items-center py-1">
                            <span>
                              {seat.seat_row + seat.seat_col}
                              {seat.seat_type ? ` (${seat.seat_type.name})` : ""}
                            </span>
                            <span>
                              {seat.seat_type
                                ? formatCurrency(
                                    Number(booking.showtime.price) +
                                      Number(seat.seat_type.extra_price)
                                  )
                                : formatCurrency(booking.showtime.price)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">Phí đặt vé:</p>
                      <p className="text-sm">0 VNĐ</p>
                    </div>
                  </div>

                  <Separator className="bg-muted" />

                  <div className="flex justify-between font-medium">
                    <p>Tổng cộng:</p>
                    <p>{formatCurrency(booking.total_amount)}</p>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-muted p-4 bg-muted/20">
                  <Button className="w-full" onClick={handleCompletePayment}>
                    Thanh toán ngay
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

export default Checkout;
