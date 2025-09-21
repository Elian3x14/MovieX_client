import { z } from "zod";

export const profileSchema = z.object({
    username: z.string().min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
    fullName: z.string().min(3, "Họ và tên phải có ít nhất 3 ký tự"),
    email: z.string().email("Địa chỉ email không hợp lệ"),
    phone: z.string().optional(),
});
