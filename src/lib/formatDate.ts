export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};