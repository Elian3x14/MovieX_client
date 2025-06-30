// features/movie/movieAPI.ts
import { Movie } from "@/data/type";
import { MovieFormValues } from "@/schemas/movieSchema";
import axiosInstance from "@/lib/axios";

/**
 * Lấy danh sách tất cả phim
 */
export const fetchAllMoviesAPI = async (): Promise<Movie[]> => {
  const res = await axiosInstance.get<Movie[]>("movies/");
  return res.data;
};

/**
 * Lấy chi tiết phim theo ID
 */
export const fetchMovieByIdAPI = async (id: string): Promise<Movie> => {
  const res = await axiosInstance.get<Movie>(`movies/${id}/`);
  return res.data;
};

/**
 * Tạo mới phim
 */
export const createMovieAPI = async (data: MovieFormValues): Promise<Movie> => {
  const formattedData = {
    ...data,
    release_date: data.release_date
      ? data.release_date.toISOString().split("T")[0]
      : undefined,
  };
  const res = await axiosInstance.post<Movie>("movies/", formattedData);
  return res.data;
};

/**
 * Cập nhật phim theo ID
 */
export const updateMovieAPI = async (id: string, data: MovieFormValues): Promise<Movie> => {
  const formattedData = {
    ...data,
    release_date: data.release_date
      ? data.release_date.toISOString().split("T")[0]
      : undefined,
  };
  const res = await axiosInstance.put<Movie>(`movies/${id}/`, formattedData);
  return res.data;
};
/**
 * Xóa phim theo ID
 */
export const deleteMovieAPI = async (id: string): Promise<void> => {
  await axiosInstance.delete(`movies/${id}/`);
    // Không cần trả về gì, chỉ cần xóa thành công
}