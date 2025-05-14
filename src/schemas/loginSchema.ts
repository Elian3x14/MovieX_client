import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"), // Validate email
  password: z
    .string()
    .min(6, "Password must be at least 6 characters") // Validate password có độ dài tối thiểu
    .max(30, "Password must not exceed 30 characters"), // Giới hạn tối đa
});

export type LoginFormInputs = z.infer<typeof loginSchema>; // Kiểu dữ liệu của form