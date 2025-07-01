import { z } from "zod";

export const roomSeatSchema = z.object({
  seat_type_id: z
    .number({ invalid_type_error: "Loại ghế là bắt buộc" })
    .int("Loại ghế phải là số nguyên")
    .positive("Loại ghế phải lớn hơn 0"),

  is_maintenance: z
    .boolean({ invalid_type_error: "Trạng thái bảo trì phải là true hoặc false" }),
});

export type RoomSeatFormValues = z.infer<typeof roomSeatSchema>;

export const roomSeatSchemaDefaultValues: Partial<RoomSeatFormValues> = {
  seat_type_id: undefined,
  is_maintenance: false,
};
