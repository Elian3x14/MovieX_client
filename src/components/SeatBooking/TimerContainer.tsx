import { memo, useEffect, useState } from "react";

// Thành phần hiển thị đồng hồ đếm ngược, được tối ưu bằng memo để tránh render lại không cần thiết
const TimerDisplay = memo(({ timer }: { timer: number }) => {
  // Hàm định dạng số giây thành chuỗi phút:giây (ví dụ: 3:07)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <span
      className={`font-mono font-medium ${
        timer < 60 ? "text-cinema-primary" : ""
      }`}
    >
      {formatTime(timer)}  {/* Hiển thị thời gian đếm ngược */}
    </span>
  );
});

// Thành phần chứa logic đếm ngược thời gian
export const TimerContainer = ({
  initialSeconds,
}: {
  initialSeconds: number;  // Thời gian ban đầu tính bằng giây
}) => {

  const [timer, setTimer] = useState(initialSeconds); // Trạng thái lưu trữ thời gian còn lại

  useEffect(() => {
    // Khởi động bộ đếm ngược, giảm timer mỗi giây
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown); // Nếu hết giờ, dừng đếm
          return 0;
        }
        return prev - 1; // Giảm 1 giây
      });
    }, 1000);

    // Dọn dẹp khi component bị unmount
    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="bg-card rounded-md p-2 flex items-center gap-2">
      <span className="text-cinema-muted">Phiên sẽ hết hạn sau:</span>
      <TimerDisplay timer={timer} /> {/* Gọi component hiển thị đồng hồ */}
    </div>
  );
};
