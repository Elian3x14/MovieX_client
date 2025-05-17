// src/features/showtime/showtimeAPI.ts
import axiosInstance from "@/lib/axios";

export const fetchShowtimesByMovieId = async (movieId: string) => {
  const response = await axiosInstance.get(`/movies/${movieId}/showtimes/`);
  return response.data;
};
