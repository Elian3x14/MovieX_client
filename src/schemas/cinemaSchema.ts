import { z } from "zod";

export const cinemaSchema = z.object({
  name: z.string().min(1, "Tên rạp là bắt buộc"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  halls: z.coerce.number().min(1, "Số phòng chiếu phải lớn hơn 0"),
  image: z.string().url("URL hình ảnh không hợp lệ").optional(),
});

export type CinemaFormValues = z.infer<typeof cinemaSchema>;

export const cinemaSchemaDefaultValues: Partial<CinemaFormValues> = {
  name: "",
  address: "",
  halls: 1,
  image: "",
};
