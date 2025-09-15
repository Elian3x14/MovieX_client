import React from "react";
import { Link } from "react-router-dom";
import { Film, Mail, MapPin, Phone } from "lucide-react";
import Brand from "./Brand";

const Footer = () => {
  const linkClass = "text-cinema-muted hover:text-cinema-primary transition";
  const footerText = "Đặt vé xem phim trực tuyến cho các bộ phim mới nhất tại rạp. Trải nghiệm điện ảnh và giải trí đỉnh cao.";

  return (
    <footer className="bg-black text-cinema-text pt-12 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo và mô tả */}
          <div className="flex flex-col gap-4">
            <Brand />
            <p className="text-cinema-muted mt-2">{footerText}</p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="flex flex-col gap-2">
              <li><Link to="/movies" className={linkClass}>Phim</Link></li>
              <li><Link to="/cinemas" className={linkClass}>Rạp chiếu</Link></li>
              <li><Link to="/promotions" className={linkClass}>Khuyến mãi</Link></li>
              <li><Link to="/about" className={linkClass}>Về chúng tôi</Link></li>
            </ul>
          </div>

          {/* Chính sách pháp lý */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pháp lý</h3>
            <ul className="flex flex-col gap-2">
              <li><Link to="/terms" className={linkClass}>Điều khoản dịch vụ</Link></li>
              <li><Link to="/privacy" className={linkClass}>Chính sách bảo mật</Link></li>
              <li><Link to="/refund" className={linkClass}>Chính sách hoàn tiền</Link></li>
              <li><Link to="/faq" className={linkClass}>Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1" size={16} />
                <span className="text-cinema-muted">123 Đường Chính, Trung tâm Thành phố, Quốc gia</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1" size={16} />
                <span className="text-cinema-muted">+1 234 567 8901</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1" size={16} />
                <span className="text-cinema-muted">support@cinemaplus.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-cinema-muted text-sm">
          <p>© {new Date().getFullYear()} CinemaPlus. Bản quyền đã được bảo hộ.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
