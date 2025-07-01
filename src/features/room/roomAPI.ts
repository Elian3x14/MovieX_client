// /features/room/roomAPI.ts
import axiosInstance from "@/lib/axios";
import { Room } from "@/data/type";
import { RoomFormValues } from "@/schemas/roomSchema";

/**
 * Lấy danh sách tất cả phòng chiếu
 */
export const fetchAllRoomsAPI = async (): Promise<Room[]> => {
  const res = await axiosInstance.get<Room[]>("/rooms/");
  return res.data;
};

/**
 * Lấy thông tin phòng chiếu theo ID
 */
export const fetchRoomByIdAPI = async (id: number): Promise<Room> => {
  const res = await axiosInstance.get<Room>(`/rooms/${id}/`);
  return res.data;
};

/**
 * Tạo mới phòng chiếu
 */
export const createRoomAPI = async (data: RoomFormValues): Promise<Room> => {
  const res = await axiosInstance.post<Room>("/rooms/", data);
  return res.data;
};

/**
 * Cập nhật phòng chiếu theo ID
 */
export const updateRoomAPI = async (
  id: number,
  data: Partial<RoomFormValues>
): Promise<Room> => {
  const res = await axiosInstance.put<Room>(`/rooms/${id}/`, data);
  return res.data;
};

/**
 * Xoá phòng chiếu theo ID
 */
export const deleteRoomAPI = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/rooms/${id}/`);
};
