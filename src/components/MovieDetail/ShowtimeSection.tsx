import React from "react";
import { Button } from "@/components/ui/button";
import formatCurrency from "@/lib/formatCurrency"; // Định dạng tiền tệ
import { Calendar } from "lucide-react"; // Icon lịch
import formatDaysLeft from "@/lib/formatDaysLeft"; // Định dạng số ngày còn lại
import { formatDate } from "@/lib/formatDate"; // Định dạng ngày tháng
import { Link, useParams } from "react-router-dom"; // Link điều hướng và hook lấy param từ URL

// Kiểu dữ liệu cho lịch chiếu theo ngày
interface ShowTimesByDate {
  [key: string]: {
    cinema: string; // Tên rạp chiếu
    times: {
      id: string;
      time: string;
      hall: string; // Phòng chiếu
      price: number; // Giá vé
    }[];
  }[];
}

// Props cho component
interface ShowtimeSectionProps {
  selectedDate: string | null; // Ngày được chọn
  setSelectedDate: (date: string) => void; // Hàm thay đổi ngày
  uniqueDates: string[]; // Danh sách các ngày có lịch chiếu
  showtimesByDate: ShowTimesByDate; // Lịch chiếu theo từng ngày
}

const ShowtimeSection: React.FC<ShowtimeSectionProps> = ({
  selectedDate,
  setSelectedDate,
  uniqueDates,
  showtimesByDate,
}) => {
  const { id: movieId } = useParams<{ id: string }>(); // Lấy movieId từ URL

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chọn ngày chiếu</h2>
      <div className="flex flex-wrap gap-2 overflow-x-auto mb-6">
        {uniqueDates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex flex-col items-center min-w-[200px] p-3 rounded-lg border ${
              selectedDate === date
                ? "border-cinema-primary bg-cinema-primary/10" // Nếu ngày đang chọn
                : "border-muted bg-card" // Ngày không được chọn
            }`}
          >
            <Calendar size={18} className="mb-1" />
            <span className="font-medium text-sm">
              {formatDate(date)} {/* Định dạng ngày hiển thị */}
            </span>
            <span className="text-xs text-cinema-muted mt-1">
              {formatDaysLeft(date)} {/* Ví dụ: "Còn 3 ngày nữa" */}
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
        <p>Không có lịch chiếu cho ngày này.</p>
      )}
    </div>
  );
};

export default ShowtimeSection;
