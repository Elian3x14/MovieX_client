import axiosInstance from "@/lib/axios";
import { Cinema } from "@/data/type";
import { CinemaFormValues } from "@/schemas/cinemaSchema";

/**
 * Lấy danh sách tất cả rạp chiếu
 */
export const fetchAllCinemasAPI = async (): Promise<Cinema[]> => {
  const res = await axiosInstance.get<Cinema[]>("/cinemas/");
  return res.data;
};

/**
 * Lấy thông tin rạp chiếu theo ID
 */
export const fetchCinemaByIdAPI = async (id: number): Promise<Cinema> => {
  const res = await axiosInstance.get<Cinema>(`/cinemas/${id}/`);
  return res.data;
};

/**
 * Tạo mới rạp chiếu
 */
export const createCinemaAPI = async (data: CinemaFormValues): Promise<Cinema> => {
  const res = await axiosInstance.post<Cinema>("/cinemas/", data);
  return res.data;
};

/**
 * Cập nhật rạp chiếu theo ID
 */
export const updateCinemaAPI = async (
  id: number,
  data: Partial<CinemaFormValues>
): Promise<Cinema> => {
  const res = await axiosInstance.put<Cinema>(`/cinemas/${id}/`, data);
  return res.data;
};

/**
 * Xoá rạp chiếu theo ID
 */
export const deleteCinemaAPI = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/cinemas/${id}/`);
};
