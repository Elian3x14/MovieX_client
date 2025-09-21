import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchReviewsByMovieId,
  submitReview,
} from "@/features/review/reviewSlice";
import { reviewSchema, ReviewFormData } from "@/schemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/app/store";
import { toast } from "sonner";

const ReviewForm: React.FC = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { comment: "" },
  });

  const onSubmit = async (data: ReviewFormData) => {
    if (!movieId || !user) return;

    try {
      setLoading(true);
      await dispatch(
        submitReview({ movieId, rating, comment: data.comment })
      ).unwrap();
      await dispatch(fetchReviewsByMovieId({ movieId, page: 1 })).unwrap();
      reset();
      setRating(0);
      toast.success("Đánh giá đã được gửi!");
    } catch (error: any) {
      toast.error(error?.message || "Gửi đánh giá thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Viết đánh giá</h3>

      {!user ? (
        <p className="text-sm text-muted-foreground">
          Bạn cần{" "}
          <Link
            to="/login"
            className="text-cinema-secondary underline hover:opacity-80"
          >
            đăng nhập
          </Link>{" "}
          để viết đánh giá.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Đánh giá</label>
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => {
                const star = i + 1;
                return (
                  <Star
                    key={star}
                    size={24}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    className={`cursor-pointer ${
                      star <= (hover ?? rating)
                        ? "fill-cinema-secondary text-cinema-secondary"
                        : "text-muted hover:text-cinema-secondary"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Nội dung đánh giá
            </label>
            <Textarea
              id="comment"
              {...register("comment")}
              placeholder="Viết đánh giá của bạn ở đây..."
              className="w-full min-h-[100px]"
            />
            {errors.comment && (
              <p className="text-sm text-red-500 mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi đánh giá"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
