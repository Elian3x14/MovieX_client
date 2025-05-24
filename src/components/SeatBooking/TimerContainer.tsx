import { memo, useEffect, useState } from "react";

const TimerDisplay = memo(({ timer }: { timer: number }) => {
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
      {formatTime(timer)}
    </span>
  );
});

export const TimerContainer = ({
  initialSeconds,
}: {
  initialSeconds: number;
}) => {

  console.log("TimerContainer rendered with initialSeconds:", initialSeconds);
  const [timer, setTimer] = useState(initialSeconds);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="bg-card rounded-md p-2 flex items-center gap-2">
      <span className="text-cinema-muted">Session expires in:</span>
      <TimerDisplay timer={timer} />
    </div>
  );
};
