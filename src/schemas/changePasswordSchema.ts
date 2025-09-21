import { z } from "zod";

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(6, "Mật khẩu cũ phải có ít nhất 6 ký tự"),
    new_password: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirm_password: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
