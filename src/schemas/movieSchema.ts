import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Tên phim là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  poster_url: z.string().url("URL không hợp lệ"),
  trailer_url: z.string().url("URL không hợp lệ").optional(),
  backdrop_url: z.string().url("URL không hợp lệ"),
  rating: z.coerce.number().min(0).max(10),
  duration: z.coerce.number().min(1),
  year: z.coerce.number().min(1900),
  director: z.string(),
  release_date: z.date().optional(),
});


export type MovieFormValues = z.infer<typeof movieSchema>;

export const movieSchemaDefaultValues: Partial<MovieFormValues> = {
  title: "",
  description: "",
  poster_url: "",
  trailer_url: "",
  backdrop_url: "",
  rating: 0,
  duration: 0,
  year: new Date().getFullYear(),
  director: "",
};