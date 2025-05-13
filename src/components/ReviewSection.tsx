
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Review as MovieReview } from "@/data/movies";

interface ReviewSectionProps {
  movieId: string;
  reviews: MovieReview[];
  onAddReview?: (review: Omit<MovieReview, "id" | "date">) => void;
}

const ReviewSection = ({ movieId, reviews = [], onAddReview }: ReviewSectionProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name to submit a review.",
        variant: "destructive",
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Rating is required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Review is required",
        description: "Please write a review comment.",
        variant: "destructive",
      });
      return;
    }

    if (onAddReview) {
      onAddReview({
        author: name,
        rating,
        comment,
      });
      
      // Reset form
      setName("");
      setRating(0);
      setComment("");
      
      toast({
        title: "Review submitted",
        description: "Thank you for your review!",
      });
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
                    <div className="font-medium">{review.author}</div>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= review.rating ? "fill-cinema-secondary text-cinema-secondary" : "text-muted"}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-cinema-text">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-muted/30 rounded-lg">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-2 text-lg font-medium">No reviews yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Be the first to review this movie</p>
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

          <Button onClick={handleSubmitReview} className="w-full">
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
