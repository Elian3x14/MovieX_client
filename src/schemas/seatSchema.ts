// schemas/seatSchema.ts

import { z } from "zod";

// Seat form validation schema
export const seatSchema = z.object({
    seat_type_id: z.number({
        required_error: "Loại ghế là bắt buộc",
        invalid_type_error: "Loại ghế không hợp lệ",
    }).min(1, "Loại ghế là bắt buộc"),
    is_maintenance: z.boolean().optional(),
});

export type SeatFormValues = z.infer<typeof seatSchema>;
