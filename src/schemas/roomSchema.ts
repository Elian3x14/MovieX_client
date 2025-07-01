import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(1, "Tên phòng là bắt buộc"),
  no_row: z
    .number({ invalid_type_error: "Số hàng ghế phải là số" })
    .int("Số hàng ghế phải là số nguyên")
    .positive("Số hàng ghế phải lớn hơn 0"),
  no_column: z
    .number({ invalid_type_error: "Số cột ghế phải là số" })
    .int("Số cột ghế phải là số nguyên")
    .positive("Số cột ghế phải lớn hơn 0"),
  cinema_id: z
    .number({ invalid_type_error: "ID rạp là bắt buộc" })
    .int("ID rạp phải là số nguyên")
    .positive("ID rạp phải lớn hơn 0"),
});

export type RoomFormValues = z.infer<typeof roomSchema>;

export const roomSchemaDefaultValues: Partial<RoomFormValues> = {
  name: "",
  no_row: 1,
  no_column: 1,
  cinema_id: undefined,
};
