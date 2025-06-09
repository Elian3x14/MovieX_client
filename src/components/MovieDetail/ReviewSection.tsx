import React, { useState, useEffect } from "react";
import { Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Review as MovieReview } from "@/data/type";
import { useParams } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import formatTimeSince from "@/lib/formatTimeSince";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReviewForm from "./ReviewSection/ReviewForm";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchReviewsByMovieId } from "@/features/review/reviewSlice";

const PAGE_SIZE = 3;

const ReviewSection = () => {
  const { id: movieId } = useParams<{ id: string }>();

  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(
    (state) => state.review.reviews[movieId] || []
  );
  const totalPages = useAppSelector(
    (state) => state.review.totalPages[movieId] || 1
  );
  const loading = useAppSelector((state) => state.review.loading);
  const error = useAppSelector((state) => state.review.error);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchReviewsByMovieId({ movieId, page: currentPage }));
    }
  }, [movieId, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      {reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Đánh giá từ người xem</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex space-x-2 bg-card p-4 rounded-lg shadow"
              >
                <div className="grow flex gap-2">
                  <Avatar>
                    <AvatarImage src={review.author.avatar} alt="@shadcn" />
                    <AvatarFallback>
                      {review.author.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-cinema-text">
                            @{review.author.username}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeSince(review.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="fill-cinema-secondary text-cinema-secondary size-4" />
                          <span className="text-sm text-muted-foreground">
                            {review.rating.toFixed(1)} điểm
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-cinema-text text-sm">
                      {review.comment}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button className="border p-2 rounded" title="Thích">
                    <ThumbsUp className="size-4" />
                  </button>
                  <button className="border p-2 rounded" title="Không thích">
                    <ThumbsDown className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            <span className="text-sm text-muted-foreground">
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Tiếp
            </Button>
          </div>
        </div>
      ) : loading ? (
        <div className="text-center py-6">Đang tải đánh giá...</div>
      ) : (
        <div className="text-center py-6 bg-muted/30 rounded-lg">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-2 text-lg font-medium">Chưa có đánh giá</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Hãy là người đầu tiên đánh giá bộ phim này!
          </p>
        </div>
      )}

      <ReviewForm />
    </div>
  );
};

export default ReviewSection;
