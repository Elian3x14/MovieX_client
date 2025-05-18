import { z } from "zod";

const reviewSchema = z.object({
  comment: z.string().min(1, "Review cannot be empty"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export { reviewSchema };
export type { ReviewFormData };