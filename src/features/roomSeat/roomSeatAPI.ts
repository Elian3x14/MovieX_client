import { Seat } from "@/data/type";
import axiosInstance from "@/lib/axios";
import { SeatFormValues } from "@/schemas/seatSchema";

/**
 * Lấy danh sách ghế theo roomId
 */
export const fetchSeatsByRoomAPI = async (roomId: string): Promise<Seat[]> => {
  const res = await axiosInstance.get<Seat[]>(`rooms/${roomId}/seats/`);
  return res.data;
};

/**
 * Cập nhật nhiều ghế trong phòng (roomId)
 * Truyền vào danh sách SeatFormValues kèm id của từng ghế
 */
export const updateSeatsByRoomAPI = async (
  roomId: string,
  seats: (SeatFormValues & { id: number })[]
): Promise<Seat[]> => {
  const res = await axiosInstance.put<Seat[]>(`rooms/${roomId}/seats/`, seats);
  return res.data;
};
