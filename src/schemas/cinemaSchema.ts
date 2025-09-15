import { z } from "zod";

export const cinemaSchema = z.object({
  name: z.string().min(1, "Tên rạp là bắt buộc"),
  street: z.string().min(1, "Tên đường là bắt buộc"),
  ward: z.string().optional(),      // Không bắt buộc
  district: z.string().optional(),  // Không bắt buộc
  city: z.string().min(1, "Thành phố là bắt buộc"),
});

export type CinemaFormValues = z.infer<typeof cinemaSchema>;

export const cinemaSchemaDefaultValues: Partial<CinemaFormValues> = {
  name: "",
  street: "",
  ward: "",
  district: "",
  city: "",
};
