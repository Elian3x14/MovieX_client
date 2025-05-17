import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Review as MovieReview } from "@/data/type";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";
import { formatDate } from "@/lib/formatDate";
import formatDaysLeft from "@/lib/formatDaysLeft";

const ReviewSection = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSubmitReview = async () => {
    if (!name.trim()) {
      return toast({
        title: "Name is required",
        description: "Please enter your name to submit a review.",
        variant: "destructive",
      });
    }

    if (rating === 0) {
      return toast({
        title: "Rating is required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
    }

    if (!comment.trim()) {
      return toast({
        title: "Review is required",
        description: "Please write a review comment.",
        variant: "destructive",
      });
    }

    try {
      setLoading(true);

      // Sau khi submit thành công, reload lại danh sách
      const res = await axios.get(`/api/movies/${movieId}/reviews`);
      setReviews(res.data);

      // Reset form
      setName("");
      setRating(0);
      setComment("");

      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Could not submit your review. Try again later.",
        variant: "destructive",
      });
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="bg-card p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              className="w-full min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleSubmitReview}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
