import { z } from "zod";

export const cardFormSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  expiry: z.string().min(4, "Expiry date must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});