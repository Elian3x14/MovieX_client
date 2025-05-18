import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { fetchReviewsByMovieId, submitReview } from "@/features/review/reviewSlice";
import axiosInstance from "@/lib/axios";
import { ReviewFormData, reviewSchema } from "@/schemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ReviewForm: React.FC = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await dispatch(
        submitReview({ movieId: movieId!, rating, comment: data.comment })
      );
      dispatch(fetchReviewsByMovieId({ movieId: movieId!, page: 1 })); // Refresh review list
      reset();
      setRating(0);
      toast.success("Review submitted!");
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      {!user ? (
        <p className="text-sm text-muted-foreground">
          You must be{" "}
          <a
            href="/login"
            className="text-cinema-secondary underline hover:opacity-80"
          >
            logged in
          </a>{" "}
          to write a review.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <Star
                  key={star}
                  size={24}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className={`cursor-pointer ${
                    star <= (hoveredStar ?? rating)
                      ? "fill-cinema-secondary text-cinema-secondary"
                      : "text-muted hover:text-cinema-secondary"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Your Review
            </label>
            <Textarea
              id="comment"
              {...register("comment")}
              placeholder="Write your review here..."
              className="w-full min-h-[100px]"
            />
            {errors.comment && (
              <p className="text-sm text-red-500 mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
