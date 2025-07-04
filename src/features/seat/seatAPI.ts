// features/seat/seatAPI.ts
import axiosInstance from "@/lib/axios";
import { ShowtimeSeat } from "@/data/type";

/**
 * Lấy danh sách ghế theo ID
 * @param seatId ID của ghế
 */
export const fetchSeatByIdAPI = async (seatId: number): Promise<ShowtimeSeat> => {
    const res = await axiosInstance.get(`/seats/${seatId}/`);
    return res.data;
}

/**
 * Lấy danh sách ghế theo suất chiếu
 */
export const fetchSeatsByShowtimeAPI = async (showtimeId: string): Promise<ShowtimeSeat[]> => {
    const res = await axiosInstance.get(`/showtimes/${showtimeId}/seats/`);
    return res.data;
};

/**
 * Lấy danh sách ghế theo phòng
 */
export const fetchSeatsByRoomAPI = async (roomId: number): Promise<ShowtimeSeat[]> => {
    const res = await axiosInstance.get(`/rooms/${roomId}/seats/`);
    return res.data;
};

/**
 * Toggle trạng thái ghế (ví dụ chuyển từ available → reserved)
 */
export const toggleSeatStatus = async (seatId: number): Promise<ShowtimeSeat> => {
    const res = await axiosInstance.patch(`/seats/${seatId}/toggle-booked/`);
    return res.data;
};

/**
 * Cập nhật thông tin ghế
 * @param seatId ID của ghế cần cập nhật
 * @param data Dữ liệu cập nhật
 */
export const updateSeatAPI = async (
    seatId: number,
    data: Partial<ShowtimeSeat>
): Promise<ShowtimeSeat> => {
    const res = await axiosInstance.put(`/seats/${seatId}/`, data);
    return res.data;
}