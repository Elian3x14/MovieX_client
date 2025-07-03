import axiosInstance from "@/lib/axios";
import { SeatType } from "@/data/type";

/**
 * Lấy danh sách loại ghế
 */
export const fetchAllSeatTypesAPI = async (): Promise<SeatType[]> => {
  const res = await axiosInstance.get("/seat-types/");
  return res.data;
};

/**
 * Lấy thông tin loại ghế theo ID
 * @param seatTypeId ID của loại ghế
 */
export const fetchSeatTypeByIdAPI = async (seatTypeId: number): Promise<SeatType> => {
  const res = await axiosInstance.get(`/seat-types/${seatTypeId}/`);
  return res.data;
}
/**
 * Tạo loại ghế mới
 * @param data Dữ liệu loại ghế mới
 */
export const createSeatTypeAPI = async (data: Omit<SeatType, "id">): Promise<SeatType> => {
  const res = await axiosInstance.post("/seat-types/", data);
  return res.data;
}

/**
 * Cập nhật thông tin loại ghế
 * @param seatTypeId ID của loại ghế cần cập nhật
 * @param data Dữ liệu cập nhật
 */
export const updateSeatTypeAPI = async (
  seatTypeId: number,
  data: Partial<SeatType>
): Promise<SeatType> => {
    const res = await axiosInstance.put(`/seat-types/${seatTypeId}/`, data);
    return res.data;
    }
/**
 * Xóa loại ghế
 * @param seatTypeId ID của loại ghế cần xóa
 * */
export const deleteSeatTypeAPI = async (seatTypeId: number): Promise<void> => {
  await axiosInstance.delete(`/seat-types/${seatTypeId}/`);
}
