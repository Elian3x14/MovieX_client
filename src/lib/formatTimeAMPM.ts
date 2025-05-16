export const formatTimeAMPM = (date: Date | string): string => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hh = hours % 12 || 12; // 0 => 12
  const mm = minutes < 10 ? "0" + minutes : minutes;
  return `${hh}:${mm} ${ampm}`;
};
