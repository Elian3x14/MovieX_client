import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Tên không được để trống"),
    lastName: z.string().min(1, "Họ không được để trống"),
    email: z.string().email("Email không hợp lệ"),
    phone: z
      .string()
      .regex(/^(03|05|07|08|09)\d{8}$/, "Số điện thoại phải đúng định dạng và hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Xác nhận mật khẩu không được để trống"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

export type RegisterFormInputs = z.infer<typeof registerSchema>;