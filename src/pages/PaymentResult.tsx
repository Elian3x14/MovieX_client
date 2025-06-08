import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, Mail, Calendar, Clock, MapPin, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TicketInfo from '@/components/TicketInfo';
import PaymentDetails from '@/components/PaymentDetails';

const PaymentResult = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // TODO: Sử dụng dữ liệu thực tế từ API hoặc context
  const movieData = {
    title: "Spider-Man: No Way Home",
    theater: "CGV Vincom Center",
    date: "15/06/2024",
    time: "19:30",
    seats: ["G7", "G8"],
    hall: "Rạp 3",
    format: "2D Phụ đề",
    poster: "/placeholder.svg"
  };

  const paymentData = {
    bookingId: "BK001234567",
    totalAmount: 240000,
    ticketPrice: 200000,
    serviceFee: 20000,
    discount: 20000,
    paymentMethod: "Thẻ tín dụng",
    cardNumber: "**** **** **** 1234",
    transactionId: "TXN789012345"
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center transform transition-all duration-1000 ${showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <div className={`absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-green-200 animate-ping transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
          
          <h1 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 transform transition-all duration-1000 delay-300 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Thanh toán thành công!
          </h1>
          <p className={`text-lg text-muted-foreground transform transition-all duration-1000 delay-500 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Vé xem phim của bạn đã được đặt thành công. Chúc bạn xem phim vui vẻ!
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 transform transition-all duration-1000 delay-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Ticket Information */}
          <TicketInfo movieData={movieData} />

          {/* Payment Details */}
          <PaymentDetails paymentData={paymentData} />
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mt-8 transform transition-all duration-1000 delay-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            <Download className="w-5 h-5 mr-2" />
            Tải vé PDF
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            <Mail className="w-5 h-5 mr-2" />
            Gửi email xác nhận
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/')}
            className="px-8"
          >
            Về trang chủ
          </Button>
        </div>

        {/* Additional Info */}
        <div className={`mt-8 text-center transform transition-all duration-1000 delay-1200 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <p className="text-sm text-yellow-800">
                <strong>Lưu ý:</strong> Vui lòng mang theo CCCD/CMND và mã đặt vé khi đến rạp. 
                Đến rạp trước 15 phút để làm thủ tục check-in.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;