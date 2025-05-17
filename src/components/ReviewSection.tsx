import React, { useState, useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Review as MovieReview } from "@/data/type";
import { useParams } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import formatDaysLeft from "@/lib/formatDaysLeft";
import ReviewForm from "./MovieDetail/ReviewSection/ReviewForm";

const ReviewSection = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<MovieReview[]>([]);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(`/movies/${movieId}/reviews/`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast({
        title: "Error fetching reviews",
        description: "Could not load reviews. Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const handleSubmitReview = async () => {};

  return (
    <div className="space-y-8">
      {reviews.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">User Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-cinema-text">
                        @{review.author.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDaysLeft(review.date)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="fill-cinema-secondary text-cinema-secondary size-4" />
                      <span className="text-sm text-muted-foreground">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-cinema-text">{review.comment}</p>
                {/* Nút đánh giá review hữu ích */}
                <div className="mt-4 flex gap-2">
                  <button className="text-xs px-3 py-1 rounded-md border border-muted hover:bg-muted/50 transition">
                    Hữu ích
                  </button>
                  <button className="text-xs px-3 py-1 rounded-md border border-muted hover:bg-muted/50 transition">
                    Không hữu ích
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-muted/30 rounded-lg">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-2 text-lg font-medium">No reviews yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Be the first to review this movie
          </p>
        </div>
      )}

      <ReviewForm />
    </div>
  );
};

export default ReviewSection;
