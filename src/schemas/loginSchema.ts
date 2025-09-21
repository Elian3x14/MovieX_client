import { z } from "zod";

// Định nghĩa schema xác thực cho form đăng nhập
export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"), // Kiểm tra định dạng email
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự") // Kiểm tra độ dài tối thiểu của mật khẩu
    .max(30, "Mật khẩu không được vượt quá 30 ký tự"), // Giới hạn độ dài tối đa
});

// Kiểu dữ liệu của các trường trong form đăng nhập
export type LoginFormInputs = z.infer<typeof loginSchema>;